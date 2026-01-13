import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import { dbCollections } from "@/app/utils/utils";
import getProductService from "@/config/productServiceInstance";
import { NewActivityLog, productProps, NewProduct } from "@/app/utils/types";
import { getCookieValue } from "@/app/utils/functions";
import { updateProductSchema } from "@/app/utils/apis/validatePayload";
import { diffObjects, validateVariants } from "@/app/utils/functions";
import { buildUploads } from "@/app/utils/apis/buildUploads";
import z from "zod";

/**
 * 
 * Verifies that the request is made by an authenticated admin user.
 * @param req The incoming NextRequest
 * @returns An object containing uid, userRole, and username if verification is successful
 * @throws NextResponse with appropriate status and message if verification fails
 */
async function verifyAdminFromReq(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const token = getCookieValue(cookieHeader, authConfigs.cookieName);

  if (!token) {
    throw NextResponse.json({ status: 401, message: "No session token" }, { status: 401 });
  }


  let decodedToken: admin.auth.DecodedIdToken | null = null;
  let uid: string | number = "";
  if (authConfigs.source === "firebase") {
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (e1) {
      console.warn(e1);
      try {
        decodedToken = await admin.auth().verifySessionCookie(token, true);
      } catch (e2) {
        console.error(e2);
        throw NextResponse.json({ status: 401, message: "Invalid or expired session" }, { status: 401 });
      }
    }
    uid = decodedToken.uid;    
  } else if (authConfigs.source === 'custom' || authConfigs.source === 'mock') {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) throw NextResponse.json({ status: 500, message: 'Server config missing' }, { status: 500 });
    try {
      const payload = jwt.verify(token, jwtSecret) as any;
      uid = payload.sub ?? payload.uid ?? payload.sub;
    } catch (err) {
      console.error(err);
      throw NextResponse.json({ status: 401, message: 'Invalid custom JWT' }, { status: 401 });
    }
  } else {
    throw NextResponse.json({ status: 500, message: "Unknown auth provider" }, { status: 500 });
  }

  if (!uid) {
    throw NextResponse.json({ status: 401, message: "Invalid token" }, { status: 401 });
  }

  let userRole: string = "";
  let username: string = "";

  if (authConfigs.source === "firebase") {
    const usersCol = admin.firestore().collection(dbCollections.users);
    const q = usersCol.where("uid", "==", uid).limit(1);
    const snap = await q.get();
    if (snap.empty) {
      throw NextResponse.json({ status: 403, message: "User not found or unauthorized" }, { status: 403 });
    }
    const userDoc = snap.docs[0];
    const userData = userDoc.data() as any;
    userRole = userData?.role ?? null;
    username = userData?.name ?? userData?.email ?? "";
  } else {
    throw NextResponse.json({ status: 503, message: "DB queries not yet implemented" }, { status: 503 });
  }
  
  if (userRole !== "admin") {
    throw NextResponse.json({ status: 403, message: "Insufficient permissions" }, { status: 403 });
  }

  return {uid, userRole, username}
}

/* --------------- PATCH handler --------------- */
export async function PATCH(req: NextRequest, ctx: any) {
  try {
    const id = ctx?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ status: 400, message: "Missing product id" }, { status: 400 });

    const { uid, username } = await verifyAdminFromReq(req);

    let form: FormData;
    try {
      form = await req.formData();
    } catch (error) {
      console.error(error)
      return NextResponse.json({ status: 400, message: "Invalid form data" }, { status: 400 });
    }
    
    const payloadRaw = form.get("payload");

    if (!payloadRaw || typeof payloadRaw !== "string") {
      return NextResponse.json({ status: 400, message: "Missing payload JSON" }, { status: 400 });
    }

    let body: any;
    try {
      const json = JSON.parse(payloadRaw);
      
      const isPayloadEmpty = !json || Object.keys(json).length === 0;
      const hasOtherFields = [...form.keys()].some(k => k !== "payload");

      if (isPayloadEmpty && !hasOtherFields) {
        return NextResponse.json(
          { status: 400, message: "Empty body" },
          { status: 400 }
        );
      }


      const parsed = updateProductSchema.safeParse(json);

      if (!parsed.success) {
        return NextResponse.json({
          status: 400,
          message: "Invalid payload",
          errors: z.treeifyError(parsed.error)
        }, { status: 400 });
      }

      body = json;
    } catch (err) {
      console.error("Invalid payload JSON:", err);
      return NextResponse.json({ status: 400, message: "payload JSON inválido" }, { status: 400 });
    }

    const dbService = await getProductService();
    const productRes = await dbService.getItemById(id, dbCollections.products);
    if (productRes.status !== 200) return NextResponse.json({ status: productRes.status, message: productRes.code ?? "Product fetch failed" }, { status: productRes.status });

    const existingProduct = productRes.response as productProps;


    if (body.variants) {
      const varValidated = validateVariants(body.variants, body.mainSku ?? existingProduct.mainSku);
      if (!varValidated.ok) return NextResponse.json({ status: 503, message: varValidated.message }, { status: 503 });
    }

    // process uploads: thumbnail, variants, additional images
    // We'll mutate `body` to set the resulting URLs before validation + save.

    const uploads = await buildUploads({form, existing: existingProduct, body, dbService});

    if (!uploads.updates.images && Array.isArray(body.images) && body.images.length === 0) {
      return NextResponse.json({ status: 400, message: "At least one product image is required." }, { status: 400 });
    }

    const allowed: Partial<NewProduct> = {
      ...body,
      ...uploads.updates
    };

    if ("status" in allowed) {
      allowed.isDeleted = body.isDeleted ?? allowed.status === 2;
    }

    Object.keys(allowed).forEach(key => {
      if (allowed[key as keyof typeof allowed] === undefined) {
        delete allowed[key as keyof typeof allowed];
      }
    });


    // finalmente actualizar producto
    const updateRes = await dbService.updateProduct(id, allowed);
    if (!updateRes || updateRes.status !== 200) {
      return NextResponse.json({ status: updateRes?.status ?? 500, message: updateRes?.response ?? "Update failed" }, { status: updateRes?.status ?? 500 });
    }

    const logData: NewActivityLog = {
      userId: uid,
      username: username.toLowerCase(),
      action: "product_edit",
      target: { collection: "products", item: id }
    };
    const modifiedProduct = { ...existingProduct, ...allowed };
    const diffs = diffObjects(existingProduct, modifiedProduct);
    if (diffs.length) logData.diff = diffs;
    const newLog = await dbService.setActivityLog(logData);
    if (newLog.status !== 200) console.warn("Activity log not saved");
    

    // devolver actualizado
    return NextResponse.json({ status: 200, response: { id, updateRes } }, { status: 200 });
  } catch (err: any) {
    console.error("PATCH /api/admin/products/[id] error:", err);
    const message = err.message ?? "Internal server error";
    return NextResponse.json({ status: err.status ?? 500, message }, { status: err.status ?? 500 });
  }
}

/* --------------- DELETE handler --------------- */
export async function DELETE(req: NextRequest, ctx: any) {
  try {
    const id = ctx?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ status: 400, message: "Missing product id" }, { status: 400 });

    const { uid, username } = await verifyAdminFromReq(req);

    // call product service deleteProduct
    const dbService = await getProductService();
    const result = await dbService.deleteProduct(String(id));

    if (!result || result.status !== 200) {
      return NextResponse.json({ status: 400, message: result.response ?? "Delete operation failed" }, { status: 400 });
    }

    const logData: NewActivityLog = {
      userId: uid,
      username: username.toLowerCase(),
      action: "product_delete",
      target: {
        collection: "products",
        item: id
      },
      diff: [
        { item: "isDeleted", oldValue: false, newValue: true }
      ]
    }

    const newLog = await dbService.setActivityLog(logData);

    if (newLog.status !== 200) console.warn("The new activity log could not be saved in the DB");

    return NextResponse.json({ status: 200, response: { id, message: result.response ?? "Deleted" } }, { status: 200 });
  } catch (err: any) {
    if (err instanceof Response) return err;
    console.error("DELETE /api/admin/products/[id] error:", err);
    return NextResponse.json({ status: 500, message: err?.message ?? "Internal server error" }, { status: 500 });
  }
}