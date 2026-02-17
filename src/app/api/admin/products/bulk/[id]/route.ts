import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import getProductService from "@/config/productServiceInstance";
import { dbCollections } from "@/app/utils/utils";
import { productProps, NewActivityLog } from "@/app/utils/types";
import { diffObjects } from "@/app/utils/functions";
import { getCookieValue } from "@/app/utils/functions";

type PatchBody = Partial<productProps>

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

export async function PATCH(req: NextRequest, ctx: any) {
  try {
    const id = ctx?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ status: 400, message: "Missing product id" }, { status: 400 });

    const { uid, username } = await verifyAdminFromReq(req);

    const body = (await req.json()) as PatchBody | undefined;
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ status: 400, message: "Empty body" }, { status: 400 });
    }

    const allowed: Record<string, any> = {};

    if (body.price !== undefined) {
      const n = Number(body.price);
      if (Number.isNaN(n) || !isFinite(n) || n < 0) {
        return NextResponse.json({ status: 400, message: "Invalid price" }, { status: 400 });
      }
      allowed.price = n;
    }

    if (body.discount !== undefined) {
      const d = body.discount;
      if (d === null) {
        allowed.discount = null;
      } else if (
        typeof d === "object" &&
        (d.type === 0 || d.type === 1) &&
        typeof d.value !== "undefined" &&
        !Number.isNaN(Number(d.value)) &&
        isFinite(Number(d.value)) &&
        Number(d.value) >= 0
      ) {
        const val = Number(d.value);
        if (d.type === 0 && val > 100) {
          return NextResponse.json({ status: 400, message: "Discount percent cannot be > 100" }, { status: 400 });
        }
        allowed.discount = { type: Number(d.type), value: val };
      } else {
        return NextResponse.json({ status: 400, message: "Invalid discount object" }, { status: 400 });
      }
    }

    if (body.status !== undefined) {
      const s = Number(body.status);
      if (!Number.isFinite(s) || ![0, 1, 2].includes(s)) {
        return NextResponse.json({ status: 400, message: "Invalid status (allowed: 0,1,2)" }, { status: 400 });
      }
      allowed.status = s;
      allowed.isDeleted = s === 2 ? true : false;
    } else if (typeof body.isDeleted === "boolean") {
      allowed.isDeleted = Boolean(body.isDeleted);
      if (body.isDeleted === true && allowed.status === undefined) {
        allowed.status = 2;
      }
    }

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ status: 400, message: "No allowed fields present" }, { status: 400 });
    }
    console.log(body, allowed);
    //return NextResponse.json({ status: 200, response: { id, updatedFields: body } }, { status: 200 });

    const dbService = await getProductService();

    const updateRes = await dbService.updateProduct(id, allowed);
    if (!updateRes || updateRes.status !== 200) {
      return NextResponse.json({ status: updateRes?.status ?? 500, message: updateRes?.response ?? "Update failed" }, { status: updateRes?.status ?? 500 });
    }

    const productRes = await dbService.getItemById(id, dbCollections.products);
    if (productRes.status !== 200) return NextResponse.json({ status: productRes.status, message: productRes.code ?? "Product fetch failed" }, { status: productRes.status });

    const existingProduct = productRes.response as productProps;
    const updatedData = { ...existingProduct, ...allowed };
    const diffs = diffObjects(existingProduct, updatedData);

    const logData: NewActivityLog = {
      userId: uid,
      username: username.toLowerCase(),
      action: "product_edit",
      target: { collection: "products", item: id }
    };
    if (diffs.length) logData.diff = diffs;
    const newLog = await dbService.setActivityLog(logData);
    if (newLog.status !== 200) console.warn("Activity log not saved");

    return NextResponse.json({ status: 200, response: { id, updatedFields: allowed } }, { status: 200 });

  } catch (err: any) {
    console.error("PATCH /api/admin/products/[id] error:", err);
    const message = err?.message ?? "Internal server error";
    return NextResponse.json({ status: 500, message }, { status: 500 });
  }
}