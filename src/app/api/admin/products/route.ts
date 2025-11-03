import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import { dbCollections } from "@/app/utils/utils";
import getProductService from "@/config/productServiceInstance";
import { getCategoriesWithSubcategories, getActiveCategoryWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { checkMime, getCookieValue } from "@/app/utils/functions";
import { NewProduct } from "@/app/utils/types";

/* ---------- Types ---------- */
type VariantInput = {
  color?: string;
  sku?: string;
  image?: string | null;
  stock?: { name?: string; quantity?: number | string }[];
};

function sanitizeFileName(s: string) {
  return String(s)
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "") // quitar caracteres raros
    .trim()
    .replace(/\s+/g, "_"); // espacios -> _
}

function toIntSafe(v: any, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

/** Verifica token y devuelve usuario (uid, role, username). Lanza Response via throw NextResponse.json */
async function verifyAdminFromReq(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const token = getCookieValue(cookieHeader, authConfigs.cookieName);

  if (!token) {
    throw NextResponse.json({ status: 401, message: "No session token" }, { status: 401 });
  }

  let uid: string | number = "";
  if (authConfigs.source === "firebase") {
    let decodedToken: admin.auth.DecodedIdToken | null = null;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (e1) {
      console.warn("verifyIdToken failed, trying verifySessionCookie", e1);
      try {
        decodedToken = await admin.auth().verifySessionCookie(token, true);
      } catch (e2) {
        console.error(e2);
        throw NextResponse.json({ status: 401, message: "Invalid or expired session" }, { status: 401 });
      }
    }
    uid = decodedToken!.uid;
  } else if (authConfigs.source === "custom" || authConfigs.source === "mock") {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) throw NextResponse.json({ status: 500, message: "Server config missing" }, { status: 500 });
    try {
      const payload = jwt.verify(token, jwtSecret) as any;
      uid = payload.sub ?? payload.uid ?? "";
    } catch (err) {
      console.warn(err);
      throw NextResponse.json({ status: 401, message: "Invalid custom JWT" }, { status: 401 });
    }
  } else {
    throw NextResponse.json({ status: 500, message: "Unknown auth provider" }, { status: 500 });
  }

  if (!uid) {
    throw NextResponse.json({ status: 401, message: "Invalid token" }, { status: 401 });
  }

  // Obtener user role desde Firestore (implementado)
  const usersCol = admin.firestore().collection(dbCollections.users);
  const q = usersCol.where("uid", "==", uid).limit(1);
  const snap = await q.get();
  if (snap.empty) {
    throw NextResponse.json({ status: 403, message: "User not found or unauthorized" }, { status: 403 });
  }
  const userData = snap.docs[0].data() as any;
  const userRole: string = userData?.role ?? "";
  const username: string = userData?.name ?? userData?.email ?? "";

  if (userRole !== "admin") {
    throw NextResponse.json({ status: 403, message: "Insufficient permissions" }, { status: 403 });
  }

  return { uid, userRole, username };
}

/* ---------- Validations (mantengo tu lógica pero más compacta) ---------- */
function validateVariants(
  variants: VariantInput[] | null | undefined,
  mainSku: string,
  opts?: {
    skuDiffChars?: number;
    disallowSuffixEqualMain?: boolean;
  }
) {
  const skuDiffChars = Math.max(0, Math.floor(opts?.skuDiffChars ?? 1));
  const disallowSuffixEqualMain = opts?.disallowSuffixEqualMain ?? false;

  if (!mainSku || typeof mainSku !== "string" || !mainSku.trim()) {
    return { ok: false, message: "mainSku inválido" };
  }
  const main = mainSku.trim();

  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    return { ok: false, message: "variants debe ser un array no vacío" };
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
    if (!v || typeof v !== "object") return { ok: false, message: `La variante en índice ${i} debe ser un objeto` };
    const rawSku = String(v.sku ?? "").trim();
    if (!rawSku) return { ok: false, message: `La variante ${i} no tiene sku` };
    if (rawSku.length !== main.length) return { ok: false, message: `La variante ${i} sku debe tener ${main.length} caracteres` };

    const skuPrefix = rawSku.slice(0, rawSku.length - skuDiffChars);
    const skuSuffix = rawSku.slice(rawSku.length - skuDiffChars);

    if (skuPrefix !== prefix) return { ok: false, message: `La variante ${i} tiene prefijo distinto. Se esperaba "${prefix}"` };
    if (!/^[A-Za-z0-9]+$/.test(skuSuffix)) return { ok: false, message: `Suffix "${skuSuffix}" inválido en variante ${i}` };
    if (disallowSuffixEqualMain && skuSuffix === mainSuffix) return { ok: false, message: `La variante ${i} no puede tener el mismo suffix que el mainSku` };
    if (seenSuffix.has(skuSuffix)) return { ok: false, message: `Suffix duplicado "${skuSuffix}" en variante ${i}` };

    seenSuffix.add(skuSuffix);

    if (!Array.isArray(v.stock) || v.stock.length === 0) return { ok: false, message: `La variante ${i} debe tener stock declarado` };
    const stockNormalized: { name: string; quantity: number }[] = [];
    for (let j = 0; j < v.stock.length; j++) {
      const st = v.stock[j] as any;
      if (!st || typeof st !== "object") return { ok: false, message: `Stock inválido en variante ${i} índice ${j}` };
      const name = String(st.name ?? "").trim();
      if (!name) return { ok: false, message: `La variante ${i} stock[${j}] debe tener un nombre` };
      const q = Number(st.quantity);
      if (!Number.isFinite(q) || q < 0 || !Number.isInteger(q)) {
        return { ok: false, message: `Formato de stock incorrecto en variante ${i} stock[${j}]` };
      }
      stockNormalized.push({ name, quantity: q });
    }

    parsed.push({ color: String(v.color ?? "").trim(), sku: rawSku, image: null, stock: stockNormalized });
  }

  return { ok: true, parsed };
}

// ---------- LÍMITES DE TAMAÑO (bytes) ----------
const DEFAULT_THUMB_MAX = 500 * 1024; // 300 KB
const DEFAULT_IMAGE_MAX = 1500 * 1024; // 1.5 MB
const DEFAULT_VARIANT_MAX = 500 * 1024; // 300 KB
const DEFAULT_TOTAL_MAX = 10 * 1024 * 1024; // 10 MB total (thumbnail + images + variants)

/** lee un entero de env var, fallback si no existe o inválida */
function getEnvBytes(varName: string, fallback: number) {
  const v = process.env[varName];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : fallback;
}

const THUMB_MAX_BYTES = getEnvBytes("UPLOAD_MAX_THUMB_BYTES", DEFAULT_THUMB_MAX);
const IMAGE_MAX_BYTES = getEnvBytes("UPLOAD_MAX_IMAGE_BYTES", DEFAULT_IMAGE_MAX);
const VARIANT_MAX_BYTES = getEnvBytes("UPLOAD_MAX_VARIANT_BYTES", DEFAULT_VARIANT_MAX);
const TOTAL_MAX_BYTES = getEnvBytes("UPLOAD_MAX_TOTAL_IMAGES_BYTES", DEFAULT_TOTAL_MAX);


async function processAndUpload(file: File, destPath: string) {
  const dbService = await getProductService();
  return dbService.uploadImage(file, destPath);
}

async function createNewProduct(product: NewProduct) {
  const dbService = await getProductService();
  return dbService.createProduct(product);
}

/* ------------------ POST handler optimizado ------------------ */
export async function POST(req: NextRequest) {
  try {
    await verifyAdminFromReq(req);

    const form = await req.formData();
    const payloadRaw = form.get("payload");

    if (!payloadRaw || typeof payloadRaw !== "string") {
      return NextResponse.json({ status: 400, message: "Missing payload JSON" }, { status: 400 });
    }

    let payload: any;
    try {
      payload = JSON.parse(payloadRaw);
    } catch (err) {
      console.error("Invalid payload JSON:", err);
      return NextResponse.json({ status: 400, message: "payload JSON inválido" }, { status: 400 });
    }

    // Validaciones básicas y normalización temprana
    if (!payload) return NextResponse.json({ status: 400, message: "Empty body" }, { status: 400 });

    const name = String(payload.name ?? "").trim();
    const description = String(payload.description ?? "").trim();
    const mainSku = String(payload.mainSku ?? "").trim();
    const price = Number(payload.price ?? NaN);
    const status = toIntSafe(payload.status, -1);
    const categoryRaw = payload.category;
    const subcategoryRaw = payload.subcategory;

    if (!name) return NextResponse.json({ status: 400, message: "El nombre del producto es obligatorio" }, { status: 400 });
    if (!description) return NextResponse.json({ status: 400, message: "La descripción del producto es obligatoria" }, { status: 400 });
    if (!mainSku) return NextResponse.json({ status: 400, message: "mainSku es obligatorio" }, { status: 400 });
    if (isNaN(price) || price < 0) return NextResponse.json({ status: 400, message: "El precio debe ser un número >= 0" }, { status: 400 });
    if (![0, 1, 2].includes(status)) return NextResponse.json({ status: 400, message: "El estado debe ser 0,1 o 2" }, { status: 400 });

    // variants
    const vRes = validateVariants(payload.variants, mainSku);
    if (!vRes.ok || vRes.parsed === undefined) return NextResponse.json({ status: 400, message: `Invalid variants: ${vRes.message}` }, { status: 400 });

    // discount (opcional)
    if (payload.discount) {
      if (isNaN(Number(payload.discount.value)) || Number(payload.discount.value) < 0) {
        return NextResponse.json({ status: 400, message: "El valor del descuento debe ser >= 0" }, { status: 400 });
      }
      if (payload.discount.type === undefined || ![0, 1].includes(Number(payload.discount.type))) {
        return NextResponse.json({ status: 400, message: "Tipo de descuento inválido" }, { status: 400 });
      }
    }

    // categorías
    if (categoryRaw === undefined) {
      return NextResponse.json({ status: 400, message: "La categoría es obligatoria" }, { status: 400 });
    }
    const cRes = subcategoryRaw !== undefined ? validateCategories(categoryRaw, subcategoryRaw) : validateCategories(categoryRaw);
    if (!cRes.ok) return NextResponse.json({ status: 400, message: cRes.message }, { status: 400 });
    if (typeof cRes.message === "object") {
      payload.category = cRes.message.category;
      payload.subcategory = cRes.message.subcategory;
    }

    // archivos
    const thumbnailFile = form.get("thumbnail") as File | null;
    if (!thumbnailFile) return NextResponse.json({ status: 400, message: "thumbnail (miniatura) es obligatoria" }, { status: 400 });
    if (!checkMime(thumbnailFile)) return NextResponse.json({ status: 400, message: "thumbnail debe ser .webp" }, { status: 400 });

    // Size check thumbnail
    if (typeof (thumbnailFile as any).size === "number" && (thumbnailFile as any).size > THUMB_MAX_BYTES) {
      return NextResponse.json({
        status: 413,
        message: `Thumbnail demasiado grande. Tamaño máximo permitido: ${Math.round(THUMB_MAX_BYTES / 1024)} KB`
      }, { status: 413 });
    }

    const imagesFormEntries = form.getAll("images") ?? [];
    const imageFiles: File[] = imagesFormEntries.filter((x) => x instanceof File) as File[];
    if (!imageFiles.length) return NextResponse.json({ status: 400, message: "Las imágenes de producto son obligatorias" }, { status: 400 });
    // Size & mime check for product images
    for (let i = 0; i < imageFiles.length; i++) {
      const f = imageFiles[i];
      if (!checkMime(f)) return NextResponse.json({ status: 400, message: "Todas las imágenes deben ser .webp" }, { status: 400 });
      const size = (f as any).size;
      if (typeof size === "number" && size > IMAGE_MAX_BYTES) {
        return NextResponse.json({
          status: 413,
          message: `Imagen de producto ${i} demasiado grande. Tamaño máximo: ${Math.round(IMAGE_MAX_BYTES / 1024)} KB`
        }, { status: 413 });
      }
    }

    // variant images presence & mime & size
    for (let i = 0; i < vRes.parsed.length; i++) {
      const vi = form.get(`variant_${i}_image`) as File | null;
      if (!vi) return NextResponse.json({ status: 400, message: `Cada variante (index ${i}) requiere una imagen` }, { status: 400 });
      if (!checkMime(vi)) return NextResponse.json({ status: 400, message: `La imagen de la variante ${i} debe ser .webp` }, { status: 400 });
      const vsize = (vi as any).size;
      if (typeof vsize === "number" && vsize > VARIANT_MAX_BYTES) {
        return NextResponse.json({
          status: 413,
          message: `Imagen de variante ${i} demasiado grande. Tamaño máximo: ${Math.round(VARIANT_MAX_BYTES / 1024)} KB`
        }, { status: 413 });
      }
    }

    // (Opcional) validar tamaño total combinado
    let totalBytes = 0;
    const thumbSize = typeof (thumbnailFile as any).size === "number" ? (thumbnailFile as any).size : 0;
    totalBytes += thumbSize;
    for (const f of imageFiles) totalBytes += typeof (f as any).size === "number" ? (f as any).size : 0;
    for (let i = 0; i < vRes.parsed.length; i++) {
      const vi = form.get(`variant_${i}_image`) as File;
      totalBytes += typeof (vi as any).size === "number" ? (vi as any).size : 0;
    }
    if (totalBytes > TOTAL_MAX_BYTES) {
      return NextResponse.json({
        status: 413,
        message: `El tamaño total de los archivos (${Math.round(totalBytes / 1024)} KB) excede el límite permitido (${Math.round(TOTAL_MAX_BYTES / 1024)} KB)`
      }, { status: 413 });
    }

    // Build paths y subir archivos (en paralelo donde tenga sentido)
    const locale = req.headers.get("locale") || "es";
    const categoryFolder = getActiveCategoryWithSubcategories(payload.category, locale);
    let imagesBasePath = `products/${categoryFolder.activeCategory.slug}`;
    if (categoryFolder.activeCategory.subcategories.length > 0 && payload.subcategory !== undefined) {
      imagesBasePath += `/${categoryFolder.activeCategory.subcategories[payload.subcategory].slug}`;
    }

    // Saneamiento de nombres para paths
    const safeName = sanitizeFileName(name);
    const safeMainSku = sanitizeFileName(mainSku);

    // 1) thumbnail
    const thumbPath = `products/thumbnails/${safeMainSku}.webp`;

    // 2) images (mapear paths)
    const imageUploads = imageFiles.map((f, i) => {
      const path = `${imagesBasePath}/${safeName}_${i}.webp`;
      return processAndUpload(f, path);
    });

    // 3) variant images
    const variantUploads = vRes.parsed.map((v, i) => {
      const vf = form.get(`variant_${i}_image`) as File;
      const path = `products/skus/${sanitizeFileName(v.sku)}.webp`;
      return processAndUpload(vf, path);
    });

    // Ejecutar subidas en paralelo (thumbnail por separado para poder asegurar existencia)
    const [thumbnailQuery, imagesResults, variantsResults] = await Promise.all([
      processAndUpload(thumbnailFile, thumbPath),
      Promise.all(imageUploads),
      Promise.all(variantUploads),
    ]);

    if (!thumbnailQuery || !thumbnailQuery.ok || !thumbnailQuery.url) {
      return NextResponse.json({ status: 500, message: `Error uploading thumbnail: ${thumbnailQuery?.error ?? "unknown"}` }, { status: 500 });
    }

    const imagesUrls: string[] = [];
    for (let i = 0; i < imagesResults.length; i++) {
      const r = imagesResults[i];
      if (!r || !r.ok || !r.url) {
        return NextResponse.json({ status: 500, message: `Error uploading image ${i}: ${r?.error ?? "unknown"}` }, { status: 500 });
      }
      imagesUrls.push(r.url);
    }

    const varImgsUrl: string[] = [];
    for (let i = 0; i < variantsResults.length; i++) {
      const r = variantsResults[i];
      if (!r || !r.ok || !r.url) {
        return NextResponse.json({ status: 500, message: `Error uploading variant image ${i}: ${r?.error ?? "unknown"}` }, { status: 500 });
      }
      varImgsUrl.push(r.url);
    }

    // combinar variantes con URLs
    const definiteVariants = vRes.parsed.map((v, i) => ({ ...v, image: varImgsUrl[i] ?? null }));

    const now = Date.now();
    const waLink = encodeURIComponent(name); // más robusto

    const newProduct: any = {
      name,
      description,
      price: Number(price),
      category: Number(payload.category),
      subcategory: payload.subcategory !== undefined ? Number(payload.subcategory) : undefined,
      mainSku,
      status,
      discount: payload.discount ?? undefined,
      waLink,
      variants: definiteVariants,
      thumbnail: thumbnailQuery.url,
      images: imagesUrls,
      createdAt: now,
    };

    if (!payload.discount) {
      delete newProduct.discount;
    }

    // guardar producto
    try {
      const createRes = await createNewProduct(newProduct);
      if (!createRes.response) {
        return NextResponse.json({ status: createRes.status, message: `Error saving product: ${createRes.response ?? "unknown"}` }, { status: 500 });
      }
      return NextResponse.json({ status: 201, message: "Producto creado", productId: createRes.response }, { status: 201 });
    } catch (err) {
      console.error("createNewProduct error:", err);
      return NextResponse.json({ status: 500, message: `Error saving product: ${String(err)}` }, { status: 500 });
    }
  } catch (error: any) {
    // verifyAdminFromReq lanza NextResponse.json en errores de auth; aquí capturamos errores inesperados
    console.error("POST /admin/products error:", error);
    return NextResponse.json({ status: error?.status ?? 503, message: error?.message ?? String(error) }, { status: error?.status ?? 503 });
  }
}

function validateCategories(cat: string, subcat?: string) {
  const allCats = getCategoriesWithSubcategories("es");
  const catInt = Number(cat);
  if (cat === "" || isNaN(catInt) || catInt >= allCats.length) {
    return { ok: false, message: "Categoría inválida" };
  }
  const subcats = allCats[catInt].subcategories;
  if (subcats.length > 0) {
    if (subcat === "" || isNaN(Number(subcat)) || Number(subcat) >= subcats.length) {
      return { ok: false, message: "Subcategoría inválida" };
    }
  }
  return { ok: true, message: { category: Number(cat), subcategory: subcats.length ? Number(subcat) : undefined } };
}
