import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import { dbCollections } from "@/app/utils/utils";
import getProductService from "@/config/productServiceInstance";
import { NewActivityLog, productProps } from "@/app/utils/types";
import { getActiveCategoryWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { diffObjects, getCookieValue, validateVariants } from "@/app/utils/functions";

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

async function processAndUpload(file: File, destPath: string) {
  const dbService = await getProductService();
  return dbService.uploadImage(file, destPath);
}

/* --------------- PATCH handler --------------- */
export async function PATCH(req: NextRequest, ctx: any) {
  try {
    const id = ctx?.params?.id as string | undefined;
    if (!id) return NextResponse.json({ status: 400, message: "Missing product id" }, { status: 400 });

     const { uid, username } = await verifyAdminFromReq(req);

    // parse formdata (tu frontend siempre envía FormData)
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
      body = JSON.parse(payloadRaw);
    } catch (err) {
      console.error("Invalid payload JSON:", err);
      return NextResponse.json({ status: 400, message: "payload JSON inválido" }, { status: 400 });
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ status: 400, message: "Empty body" }, { status: 400 });
    }

    const dbService = await getProductService();
    const productRes = await dbService.getItemById(id, dbCollections.products);

    if (productRes.status !== 200) return NextResponse.json({ status: productRes.status, message: productRes.code ?? "Product fetch failed" }, { status: productRes.status });

    const existingProduct = productRes.response as productProps;

    // -----------------------
    // Helpers / validations
    // -----------------------
    const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB (ajusta si quieres)
    const ALLOWED_MIMES = ["image/webp", "image/jpeg", "image/png"];

    function isValidFile(f: any) {
      if (!f || !(f instanceof File)) return false;
      if (f.size === 0 || f.size > MAX_IMAGE_BYTES) return false;
      if (f.type && !ALLOWED_MIMES.includes(f.type)) return false;
      return true;
    }

    // process uploads: thumbnail, variants, additional images
    // We'll mutate `body` to set the resulting URLs before validation + save.

    // 1) Thumbnail
    const thumbnailFile = form.get("thumbnail");
    if (thumbnailFile && thumbnailFile instanceof File) {
      if (!isValidFile(thumbnailFile)) {
        return NextResponse.json({ status: 400, message: "Thumbnail inválido (size o tipo)" }, { status: 400 });
      }
      const thumbPath = `products/thumbnails/${body.mainSku ?? existingProduct.mainSku}`;
      const uploadThumb = await processAndUpload(thumbnailFile, thumbPath);
      if (!uploadThumb.ok || !uploadThumb.url) {
        return NextResponse.json({ status: 500, message: `Error uploading thumbnail: ${uploadThumb.error ?? 'unknown'}` }, { status: 500 });
      }
      // try delete old thumbnail if exists and function available
      if (existingProduct.thumbnail) {
        try { 
          const delRes = await dbService.deleteImage(existingProduct.thumbnail);
          console.log(delRes.message);
        } catch (e) { console.warn("Could not delete old thumbnail", e); }
      }
      body.thumbnail = uploadThumb.url;
    } else {
      // si no se sube fichero, el frontend ya habrá incluido body.thumbnail con las URLs vigentes
      // no hacemos nada
    }

    // 2) Variants: subir archivos si vienen en form
    if (Array.isArray(body.variants) && body.variants.length > 0) {
      // Prepare array of upload promises
      const variantUploadPromises: Promise<{ index: number; ok: boolean; url?: string; error?: any }>[] = [];

      for (let i = 0; i < body.variants.length; i++) {
        const v = body.variants[i];
        // intenta por sku primero (campo puede venir url-encoded si usaste encodeURIComponent)
        const sku = String(v?.sku ?? "").trim();
        // nombres posibles en form:
        const skuField = sku ? `variant_${sku}_image` : null;
        const idxField = `variant_${i}_image`;

        let file: any = null;
        if (skuField && form.get(skuField)) file = form.get(skuField);
        else if (form.get(idxField)) file = form.get(idxField);

        if (file && file instanceof File) {
          // validate file
          if (!isValidFile(file)) {
            return NextResponse.json({ status: 400, message: `Invalid file for variant index ${i}` }, { status: 400 });
          }

          // build path and queue upload
          const path = `products/skus/${v?.sku ?? `variant_${i}`}`;

          const p = (async (index: number, fileRef: File, dest: string) => {
            try {
              const up = await processAndUpload(fileRef, dest);
              if (!up.ok || !up.url) {
                return { index, ok: false, error: up.error ?? "upload error" };
              }
              // try delete old variant image if exists
              const oldImg = existingProduct.variants?.[index]?.image;
              if (oldImg) {
                try {
                  const delRes = await dbService.deleteImage(oldImg);
                  console.log(delRes.message);
                } catch (e) { console.warn("Could not delete old variant image", e); }
              }
              return { index, ok: true, url: up.url };
            } catch (e) {
              return { index, ok: false, error: e };
            }
          })(i, file as File, path);

          variantUploadPromises.push(p);
        } else {
          // no file for this variant -> nothing to upload
        }
      } // end for

      // await all
      if (variantUploadPromises.length) {
        const results = await Promise.all(variantUploadPromises);
        // apply urls to body.variants
        for (const r of results) {
          if (!r.ok) {
            return NextResponse.json({ status: 500, message: `Error uploading variant image index ${r.index}: ${r.error ?? "unknown"}` }, { status: 500 });
          }
          body.variants[r.index] = { ...(body.variants[r.index] ?? {}), image: r.url };
        }
      }
    }

    // 3) Additional product images (client attaches image_0, image_1, ...)
    // We'll collect keys in form that start with "image_" (and are File)
    const newImagesUrls: string[] = [];
    let i = 0;
    for (const entry of Array.from(form.keys())) {
      if (!entry.startsWith("image_")) continue;
      const f = form.get(entry);
      if (f && f instanceof File) {
        if (!isValidFile(f)) {
          return NextResponse.json({ status: 400, message: `Invalid additional image file: ${entry}` }, { status: 400 });
        }
        const categoryObject = getActiveCategoryWithSubcategories(existingProduct.category, "es");
        const categorySlug = categoryObject.activeCategory.slug;
        const subCategorySlug = (categoryObject.activeCategory.subcategories.length > 0 && existingProduct.subcategory) ?
          categoryObject.activeCategory.subcategories[existingProduct.subcategory].slug : "";
        const categoryPath = subCategorySlug ? `${categorySlug}/${subCategorySlug}` : categorySlug;
        const path = `products/${categoryPath}/${existingProduct.name}_${i}`;
        const up = await processAndUpload(f as File, path);
        i++;
        if (!up.ok || !up.url) {
          return NextResponse.json({ status: 500, message: `Error uploading image ${entry}: ${up.error ?? "unknown"}` }, { status: 500 });
        }
        newImagesUrls.push(up.url);
      }
    }

    // Merge images: the client includes body.images (URLs left after deletes).
    // We'll combine body.images (existing URLs the admin kept) + newly uploaded ones.
    const keptImages: string[] = Array.isArray(body.images) ? body.images.filter((x: any) => typeof x === "string" && x) : [];
    //delete "blob:..." URLs if any slipped in
    const filteredKeptImages = keptImages.filter(url => !url.startsWith("blob:"));
    body.images = [...filteredKeptImages, ...newImagesUrls];
    
    for (const imgUrl of existingProduct.images) {
      try {
        if (!(body.images as string[]).includes(imgUrl)) {
          const delRes = await dbService.deleteImage(imgUrl);
          console.log(delRes.message);
        }
      } catch (e) { console.warn("Could not delete removed product image", e); }
    }

    // ---------------------------------------
    // VALIDACIONES y build allowed object
    // (se basa en tu bloque comentado — lo reuso y adapto)
    // ---------------------------------------
    const allowed: Partial<productProps> = {};
    // price
    if (body.price !== undefined) {
      const n = Number(body.price);
      if (Number.isNaN(n) || !isFinite(n) || n < 0) {
        return NextResponse.json({ status: 400, message: "Invalid price" }, { status: 400 });
      }
      allowed.price = n;
    }
    // discount
    if (body.discount !== undefined) {
      const d = body.discount;
      if (d === null) {
        delete allowed.discount;
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
      } else if (body.discount.value === 0) { delete allowed.discount } else {
        return NextResponse.json({ status: 400, message: "Invalid discount object" }, { status: 400 });
      }
    } else if (body.discount === null) {
      delete allowed.discount;
    }

    // status / isDeleted
    if (body.status !== undefined) {
      const s = Number(body.status);
      if (!Number.isFinite(s) || ![0, 1, 2].includes(s)) {
        return NextResponse.json({ status: 400, message: "Invalid status (allowed: 0,1,2)" }, { status: 400 });
      }
      allowed.status = s;
      if (s === 2) allowed.isDeleted = true;
      else if (allowed.isDeleted !== undefined) delete allowed.isDeleted;
    } else if (typeof body.isDeleted === "boolean") {
      allowed.isDeleted = Boolean(body.isDeleted);
      if (body.isDeleted === true && allowed.status === undefined) {
        allowed.status = 2;
      }
    }

    // variants validation (if provided, require mainSku too)
    if (body.variants !== undefined && body.mainSku !== undefined) {
      const vRes = validateVariants(body.variants, body.mainSku);
      if (!vRes.ok) return NextResponse.json({ status: 400, message: vRes.message }, { status: 400 });
      allowed.variants = body.variants;
    } else if (body.variants !== undefined && body.mainSku === undefined) {
      // if variants changed but mainSku not provided, reject
      return NextResponse.json({ status: 400, message: "mainSku is required when updating variants" }, { status: 400 });
    }

    // name / description
    if (body.name !== undefined) {
      if (typeof body.name !== "string" || body.name.trim() === "") {
        return NextResponse.json({ status: 400, message: "El nombre debe ser un string no vacío" }, { status: 400 });
      }
      allowed.name = body.name.trim();
    }
    if (body.description !== undefined) {
      if (typeof body.description !== "string" || body.description.trim() === "") {
        return NextResponse.json({ status: 400, message: "La descripción debe ser un string no vacío" }, { status: 400 });
      }
      allowed.description = body.description.trim();
    }

    // thumbnail & images & mainSku & price & status & other allowed fields
    if (body.thumbnail !== undefined) {
      if (typeof body.thumbnail === "string" && body.thumbnail.trim() !== "") {
        allowed.thumbnail = body.thumbnail.trim();
      } else if (body.thumbnail === null || body.thumbnail === "") {
        // explicit removal
        allowed.thumbnail = "";
      }
    }

    if (body.images !== undefined) {
      if (!Array.isArray(body.images)) {
        return NextResponse.json({ status: 400, message: "images debe ser un array" }, { status: 400 });
      }
      if (!body.images.length) {
        return NextResponse.json({ status: 400, message: "Debe haber al menos una imagen de producto" }, { status: 400 });
      }
      // body.images already contains kept URLs + newly uploaded URLs
      allowed.images = body.images;
    }

    if (body.mainSku !== undefined) {
      if (typeof body.mainSku !== "string" || !body.mainSku.trim()) {
        return NextResponse.json({ status: 400, message: "mainSku inválido" }, { status: 400 });
      }
      allowed.mainSku = String(body.mainSku).trim();
    }

    // si no hay campos permitidos (allowed) -> error
    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ status: 400, message: "No allowed fields present" }, { status: 400 });
    }

    // finalmente actualizar producto
    const updateRes = await dbService.updateProduct(id, allowed);
    if (!updateRes || updateRes.status !== 200) {
      return NextResponse.json({ status: updateRes?.status ?? 500, message: updateRes?.code ?? "Update failed" }, { status: updateRes?.status ?? 500 });
    }

    // opcional: registrar actividad si tienes uid/username (está comentado arriba)
    
    const logData: NewActivityLog = {
      userId: uid,
      username: username.toLowerCase(),
      action: "product_edit",
      target: { collection: "products", item: id }
    };
    const diffs = diffObjects(productRes.response, allowed);
    if (diffs.length) logData.diff = diffs;
    const newLog = await dbService.setActivityLog(logData);
    if (newLog.status !== 200) console.warn("Activity log not saved");
    

    // devolver actualizado
    return NextResponse.json({ status: 200, response: { id, updatedFields: allowed } }, { status: 200 });
  } catch (err: any) {
    console.error("PATCH /api/admin/products/[id] error:", err);
    const message = err?.message ?? "Internal server error";
    return NextResponse.json({ status: 500, message }, { status: 500 });
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