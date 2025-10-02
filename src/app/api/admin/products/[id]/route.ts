import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import admin from "@/app/utils/firebaseAdmin";
import { dbCollections } from "@/app/utils/utils";
import getProductService from "@/config/productServiceInstance";
import { productProps } from "@/app/utils/types";

/** Request body type for PATCH */
type PatchBody = Partial<productProps>

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

/** buildDiff que ignora timestamps (updatedAt/createdAt/deletedAt/timestamp y sufijos "At") */
function buildDiff(oldData: any, partial: Record<string, any>) {
  const ignoredKeyPattern = /(updatedAt|createdAt|deletedAt|timestamp)$/i;
  const diffs: { item: string; oldValue: any; newValue: any }[] = [];

  for (const key of Object.keys(partial)) {
    if (ignoredKeyPattern.test(key) || key.toLowerCase().includes("timestamp") || key.toLowerCase().endsWith("at")) {
      continue;
    }
    const oldVal = oldData?.[key];
    const newVal = partial[key];
    if (oldVal === undefined && newVal === undefined) continue;

    let changed = false;
    try {
      if (typeof oldVal === "object" || typeof newVal === "object") {
        changed = JSON.stringify(oldVal) !== JSON.stringify(newVal);
      } else {
        changed = oldVal !== newVal;
      }
    } catch {
      changed = oldVal !== newVal;
    }

    if (changed) diffs.push({ item: key, oldValue: oldVal, newValue: newVal });
  }

  return diffs;
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

function validateVariants(
  variants: VariantInput[] | null | undefined,
  mainSku: string,
  opts?: {
    skuDiffChars?: number; // cuántos chars finales pueden diferir (por defecto 1)
    requireNonEmptyImage?: boolean; // exige image no vacío
    disallowSuffixEqualMain?: boolean; // evita suffix igual al mainSku suffix
  }
): { ok: true; parsed: { color: string; sku: string; image: string | null; stock: { name: string; quantity: number }[] }[] }
  | { ok: false; message: string } {
  const skuDiffChars = Math.max(0, Math.floor(opts?.skuDiffChars ?? 1));
  const requireNonEmptyImage = opts?.requireNonEmptyImage ?? true;
  const disallowSuffixEqualMain = opts?.disallowSuffixEqualMain ?? true;

  if (!mainSku || typeof mainSku !== "string" || !mainSku.trim()) {
    return { ok: false, message: "mainSku inválido" };
  }
  const main = mainSku.trim();

  // permitir null/undefined si no quieres obligarlo
  if (variants === null || variants === undefined) {
    return { ok: false, message: "Las variantes son obligatorias" };
  }

  if (!Array.isArray(variants)) {
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

    if (disallowSuffixEqualMain && skuSuffix === mainSuffix && variants.length > 1) {
      return { ok: false, message: `La variante ${i} no puede tener el mismo suffix que el mainSku` };
    }
    if (seenSuffix.has(skuSuffix)) {
      return { ok: false, message: `Suffix duplicado "${skuSuffix}" en variante ${i}` };
    }
    seenSuffix.add(skuSuffix);

    // image (si debe ser no vacío)
    const image = v.image === null ? null : String(v.image ?? "");
    if (requireNonEmptyImage && (!image || image.trim() === "")) {
      return { ok: false, message: `La variante ${i} debe tener una miniatura (image)` };
    }

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

    parsed.push({ color, sku: rawSku, image: image === "" ? null : image, stock: stockNormalized });
  }

  return { ok: true, parsed };
}

/* --------------- PATCH handler --------------- */
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
    } else {
      //Eliminar descuento
      allowed.discount = null;
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

    if (body.variants !== undefined && body.mainSku !== undefined) {
      const vRes = validateVariants(body.variants, body.mainSku);
      if (!vRes.ok) return NextResponse.json({ status: 400, message: vRes.message }, { status: 400 });
      allowed.variants = body.variants;
    }

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

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ status: 400, message: "No allowed fields present" }, { status: 400 });
    }

    
    const productsCol = admin.firestore().collection(dbCollections.products);
    const prodRef = productsCol.doc(String(id));
    const prodSnap = await prodRef.get();
    if (!prodSnap.exists) {
      return NextResponse.json({ status: 404, message: "Product not found" }, { status: 404 });
    }
    const prevData = prodSnap.data() as any;

    allowed.updatedAt = Date.now();
    await prodRef.update(allowed);

    try {
      const diffs = buildDiff(prevData, allowed);
      const logsCol = admin.firestore().collection(dbCollections.activity_logs);
      await logsCol.add({
        timestamp: Date.now(),
        userId: uid,
        username: username ?? "",
        action: "product_edited",
        target: { collection: "products", item: String(id) },
        diff: diffs.map((d) => ({ item: d.item, oldValue: d.oldValue, newValue: d.newValue })),
      });
    } catch (logErr) {
      console.error("Failed to write activity log:", logErr);
    }


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

    // write log
    try {
      const logsCol = admin.firestore().collection(dbCollections.activity_logs);
      await logsCol.add({
        timestamp: Date.now(),
        userId: uid,
        username,
        action: "product_deleted",
        target: { collection: "products", item: String(id) }
      });
    } catch (logErr) {
      console.error("Failed to write activity log:", logErr);
    }

    return NextResponse.json({ status: 200, response: { id, message: result.response ?? "Deleted" } }, { status: 200 });
  } catch (err: any) {
    if (err instanceof Response) return err;
    console.error("DELETE /api/admin/products/[id] error:", err);
    return NextResponse.json({ status: 500, message: err?.message ?? "Internal server error" }, { status: 500 });
  }
}