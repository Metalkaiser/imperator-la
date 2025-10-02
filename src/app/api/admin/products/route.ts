import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import { dbCollections, storagePath } from "@/app/utils/utils";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { checkMime } from "@/app/utils/functions";

type VariantInput = {
  color?: string;
  sku?: string;
  image?: string | null;
  stock?: { name?: string; quantity?: number | string }[];
};

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Verifica token y devuelve usuario (uid, role, username). Lanza Response via throw NextResponse.json */
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
      console.warn(err);
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

function validateVariants(
  variants: VariantInput[] | null | undefined,
  mainSku: string,
  opts?: {
    skuDiffChars?: number; // cuántos chars finales pueden diferir (por defecto 1)
    disallowSuffixEqualMain?: boolean; // evita suffix igual al mainSku suffix
  }
): { ok: true; parsed: { color: string; sku: string; image: string | null; stock: { name: string; quantity: number }[] }[] }
  | { ok: false; message: string } {
  const skuDiffChars = Math.max(0, Math.floor(opts?.skuDiffChars ?? 1));
  const disallowSuffixEqualMain = opts?.disallowSuffixEqualMain ?? true;

  if (!mainSku || typeof mainSku !== "string" || !mainSku.trim()) {
    return { ok: false, message: "mainSku inválido" };
  }
  const main = mainSku.trim();

  if (variants === null || variants === undefined) {
    return { ok: false, message: "Las variantes son obligatorias" };
  }

  if (!Array.isArray(variants) || variants.length === 0) {
    return { ok: false, message: "variants debe ser un array" };
  }

  if (main.length <= skuDiffChars) {
    return { ok: false, message: `mainSku debe tener más de ${skuDiffChars} caracteres` };
  }
  const prefix = main.slice(0, main.length - skuDiffChars);
  const mainSuffix = main.slice(main.length - skuDiffChars);

  const seenSuffix = new Set<string>();
  const parsed: { color: string; sku: string; image: string | null; stock: { name: string; quantity: number }[] }[] = [];

  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    if (typeof v !== "object" || v === null) {
      return { ok: false, message: `La variante en índice ${i} debe ser un objeto` };
    }

    const rawSku = String(v.sku ?? "").trim();
    if (!rawSku) return { ok: false, message: `La variante ${i} no tiene sku` };

    // verificar longitud y prefijo/suffix según regla
    if (rawSku.length !== main.length) {
      return { ok: false, message: `La variante ${i} sku debe tener la misma longitud que el mainSku (${main.length} caracteres)` };
    }
    const skuPrefix = rawSku.slice(0, rawSku.length - skuDiffChars);
    const skuSuffix = rawSku.slice(rawSku.length - skuDiffChars);

    if (skuPrefix !== prefix) {
      return { ok: false, message: `La variante ${i} tiene prefijo distinto. Se esperaba prefijo "${prefix}"` };
    }

    // patrón simple para suffix (alfanumérico). Ajusta si necesitas solo dígitos u otro patrón.
    if (!/^[A-Za-z0-9]+$/.test(skuSuffix)) {
      return { ok: false, message: `La variante ${i} suffix "${skuSuffix}" no cumple el patrón permitido` };
    }

    if (disallowSuffixEqualMain && skuSuffix === mainSuffix) {
      return { ok: false, message: `La variante ${i} no puede tener el mismo suffix que el mainSku` };
    }
    if (seenSuffix.has(skuSuffix)) {
      return { ok: false, message: `Suffix duplicado "${skuSuffix}" en variante ${i}` };
    }
    seenSuffix.add(skuSuffix);

    // stock: debe ser array no vacío (según tu regla) y cada item válido
    if (!Array.isArray(v.stock) || v.stock.length === 0) {
      return { ok: false, message: `La variante ${i} debe tener stock declarado` };
    }
    const stockNormalized: { name: string; quantity: number }[] = [];
    for (let j = 0; j < v.stock.length; j++) {
      const st = v.stock[j] as any;
      if (typeof st !== "object" || st === null) {
        return { ok: false, message: `Stock inválido en variante ${i} índice ${j}` };
      }
      const name = String(st.name ?? "").trim();
      if (!name) return { ok: false, message: `La variante ${i} stock[${j}] debe tener un nombre` };
      const q = Number(st.quantity);
      if (!Number.isFinite(q) || q < 0 || !Number.isInteger(q)) {
        return { ok: false, message: `Formato de stock incorrecto en variante ${i} stock[${j}]` };
      }
      stockNormalized.push({ name, quantity: q });
    }

    // color: normalizar a string (puede quedar vacío si lo permites)
    const color = String(v.color ?? "").trim();

    parsed.push({ color, sku: rawSku, image: null, stock: stockNormalized });
  }

  return { ok: true, parsed };
}

function validateCategories(cat: string, subcat?: string) {
  const allCats = getCategoriesWithSubcategories("es");
  const catInt = Number(cat);
  if (cat === "" || isNaN(catInt) || catInt >= allCats.length) {
    return { ok: false, message: "Categoría inválida" }
  }
  const subcats = allCats[catInt].subcategories;
  if (subcats.length > 0) {
    if (subcat === "" || isNaN(Number(subcat)) || Number(subcat) >= subcats.length) {
      return { ok: false, message: "Subcategoría inválida" }
    }
  }
  return { ok: true, message: {category: Number(cat), subcategory: subcats.length ? Number(subcat) : undefined} }
}

/*function validateImage(file: File) {
  if (!file) {
    return { ok: false, result: "Todas las imágenes son obligatorias" }
  }
  if (checkMime(file)) {
    return { ok: false, result: "Todas las imágenes deben ser .webp" };
  }
  return { ok: true, result: "Imagen válida" }
}*/

/* ---------- helper: convertir File -> Buffer ---------- */
async function fileToBuffer(file: File): Promise<Buffer> {
  const ab = await file.arrayBuffer();
  return Buffer.from(ab);
}

async function processAndUpload(file: File, destPath: string) {
  const token = uuidv4();
  const bucket = admin.storage().bucket();

  const metadata = {
    contentType: "image/webp",
    metadata: {
      firebaseStorageDownloadTokens: token,
    },
  };

  const buf = await fileToBuffer(file);

  const fileRef = bucket.file(destPath);
  await fileRef.save(buf, { metadata, resumable: false });
  const encodedPath = encodeURIComponent(destPath);
  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedPath}?alt=media&token=${token}`;
  const relative = publicUrl.replace(storagePath, "");

  return relative;
};

/* --------------- POST handler --------------- */
export async function POST(req: NextRequest) {
  const { userRole } = await verifyAdminFromReq(req);
  
  if (userRole !== "admin") return NextResponse.json({ status: 403, message: "Unauthorized user" }, { status: 403 });

  //Save new product
  try {
    const form = await req.formData();

    const payloadRaw = form.get("payload");

    if (!payloadRaw || typeof payloadRaw !== "string") {
      return NextResponse.json({ status: 400, message: "Missing payload JSON" }, { status: 400 });
    }

    const payload = JSON.parse(payloadRaw as string) as any;

    if (!payload) {
      return NextResponse.json({ status: 400, message: "Empty body" }, { status: 400 });
    }

    const vRes = validateVariants(payload.variants, payload.mainSku);

    if (!vRes.ok) {
      return NextResponse.json({ status: 400, message: `Invalid variants: ${vRes.message}` }, { status: 400 });
    }

    if (payload.category === undefined) {
      return NextResponse.json({ status: 400, message: "La categoría es obligatoria" }, { status: 400 });
    }

    const cRes = payload.subcategory !== undefined ? 
      validateCategories(payload.category, payload.subcategory) :
      validateCategories(payload.category);

    if (!cRes.ok) {
      return NextResponse.json({ status: 400, message: cRes.message }, { status: 400 });
    } else if (typeof cRes.message === 'object'){
      const categs = cRes.message
      payload.category = categs.category
      payload.subcategory = categs.subcategory !== undefined ? categs.subcategory : undefined;
    }

    const thumbnailFile = form.get("thumbnail") as File | null;
    if (!thumbnailFile) {
      return NextResponse.json({ status: 400, message: "thumbnail (miniatura) es obligatoria" }, { status: 400 });
    }

    if (!checkMime(thumbnailFile)) {
      return NextResponse.json({ status: 400, message: "thumbnail (miniatura) debe ser .webp" }, { status: 400 });
    }

    const imagesFormEntries = form.getAll("images") ?? [];
    const imageFiles: File[] = imagesFormEntries.filter((x) => x instanceof File) as File[];

    if (!imageFiles.length) {
      return NextResponse.json({ status: 400, message: "Las imágenes de producto son obligatorias" }, { status: 400 });
    }

    for (let i = 0; i < imageFiles.length; i++) {
      if (!checkMime(imageFiles[i])) {
        return NextResponse.json({ status: 400, message: "Las imágenes del producto deben ser .webp" }, { status: 400 });
      }
    }

    for (let index = 0; index < payload.variants.length; index++) {
      const variantImage = form.get(`variant_${index}_image`) as File | null;;
      if (!variantImage) {
        return NextResponse.json({ status: 400, message: "Cada variante requiere una imagen miniatura" }, { status: 400 });
      }
      if (!checkMime(variantImage)) {
        return NextResponse.json({ status: 400, message: "Las imágenes de cada variante deben ser .webp" }, { status: 400 });
      }
    }

    // subir thumbnail
    const thumbPath = `${payload.mainSku}.webp`;
    const thumbnailUrl = await processAndUpload(thumbnailFile, thumbPath);

    // subir images múltiples
    const imagesUrls: string[] = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const f = imageFiles[i];
      const pathName = `${payload.name}_${i}.webp`;
      const url = await processAndUpload(f, pathName);
      imagesUrls.push(url);
    }

    const varImgsUrl: string[] = [];
    for (let index = 0; index < payload.variants.length; index++) {
      const variantImage = form.get(`variant_${index}_image`) as File;
      const pathname = `${payload.variants[index].sku}.webp`;
      const url = await processAndUpload(variantImage, pathname);
      varImgsUrl.push(url);
    }

    const definiteVariants = vRes.parsed.map((v, i) => ({
      ...v,
      image: varImgsUrl[i] ?? null
    }));

    const now = Date.now();

    const waLink: string = (payload.name as string).replace(" ", "%20");
    
    const newProduct = {
      name: String(payload.name ?? "").trim(),
      description: String(payload.description ?? "").trim(),
      price: Number(payload.price ?? 0),
      category: Number(payload.category),
      subcategory: payload.subcategory !== undefined ? Number(payload.subcategory) : undefined,
      mainSku: String(payload.mainSku ?? "").trim(),
      status: payload.status ?? 0,
      discount: undefined,
      waLink: waLink,
      variants: definiteVariants,
      thumbnail: thumbnailUrl,
      images: imagesUrls,
      createdAt: now,
    }

    if (payload.discount) {
      newProduct["discount"] = payload.discount;
    } else {
      delete newProduct.discount;
    }

    if (payload.subcategory) {
      newProduct.subcategory = Number(payload.subcategory);
    } else {
      delete newProduct.subcategory;
    }

    try {
      const prodCol = admin.firestore().collection(dbCollections.products);
      const result = await prodCol.add(newProduct);
      return NextResponse.json({ status: 201, message: "Producto creado", productId: result.id }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ status: 500, message: `Error saving product: ${error}` }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ status: 503, message: error }, { status: 503 });
  }
}