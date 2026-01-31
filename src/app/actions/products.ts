"use server";

import { revalidatePath } from "next/cache";
import { ZodError, output } from "zod";
import jwt from "jsonwebtoken";
import getProductService from "@/config/productServiceInstance";
import admin from "@/app/utils/firebaseAdmin";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { sanitizeFileName, removeUndefined } from "@/app/utils/functions";
import { newProductSchema, newProductImagesSchema, fileSchema } from "@/app/utils/apis/validatePayload";
import { dbCollections } from "../utils/utils";
import { productProps, User } from "../utils/types";

async function getAdminUser() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(authConfigs.cookieName)?.value;

  if (!token) return { success: false, response: "No autenticado"};

  let uid: string | number = "";
  if (authConfigs.source === "firebase") {
    let decodedToken: admin.auth.DecodedIdToken | null = null;
    try {
      decodedToken = await admin.auth().verifySessionCookie(token, true);
    } catch (err) {
      console.debug("verifySessionCookie falló, intentando verifyIdToken", err);
    }
    if (!decodedToken) {
      try {
        decodedToken = await admin.auth().verifyIdToken(token);
      } catch (err) {
        console.error("Ambos métodos fallaron:", err);
        return { success: false, response: "Token inválido" };
      }
    }
    uid = decodedToken!.uid;
  } else if (authConfigs.source === "custom") {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) return { success: false, response: "Configuración del servidor incompleta"};
    try {
      const payload = jwt.verify(token, jwtSecret) as any;
      uid = payload.sub ?? payload.uid ?? "";
    } catch (err) {
      console.warn(err);
      return { success: false, response: "Token inválido, sesión fallida"}
    }
  } else return { success: false, response: "Proveedor de autenticación desconocido"};
  if (!uid) {
    return { success: false, response: "Token inválido"};
  }
  const userCol = admin.firestore().collection(dbCollections.users);
  const q = userCol.where("uid", "==", uid).limit(1);
  const snap = await q.get();
  if (snap.empty) return { success: false, response: "Usuario no encontrado" };
  const userData = snap.docs[0].data() as User;
  if (!userData) return { success: false, response: "Problema al autenticar usuario" }
  if (userData.role !== "admin") return { success: false, response: "Permisos insuficientes" };
  return { success: true, response: { id: uid, role: userData.role, username: userData.name }}
}

export async function createProductAction(prevState: any, formData: FormData) {
  try {
    const authResult = await getAdminUser();
    if (!authResult.success) return { success: false, error: authResult.response }
    const adminUser = authResult.response as { id: string | number; role: string; username: string };

    const payloadRaw = formData.get("payload");
    if (typeof payloadRaw !== "string") return { success: false, error: "Payload JSON requerido" };

    let payload;
    try {
      payload = JSON.parse(payloadRaw);
    } catch {
      return { success: false, error: "JSON inválido" };
    }

    let data:output<typeof newProductSchema>
    try {
      data = newProductSchema.parse(payload);
    } catch (error) {
      if (error instanceof ZodError) return { success: false, error: error.issues }
      return { success: false, error: "Error de validación" }
    }

    // 4. Extraer y validar archivos
    const thumbnail = formData.get("thumbnail") as File | null;
    const images = formData.getAll("images") as File[];

    if (!thumbnail || thumbnail.size === 0) return { success: false, error: "Miniatura requerida" };
    if (!images.length) return { success: false, error: "Al menos una (1) imagen de producto requerida"};
    
    try {
      newProductImagesSchema.parse({
        thumbnail: thumbnail,
        images: images
      });
    } catch (error) {
      if (error instanceof ZodError) return { success: false, error: error.issues }
      return { success: false, error: "Error de validación" }
    }

    // Variant images (dinámicas)
    const variantImages: File[] = [];
    for (let i = 0; i < data.variants.length; i++) {
      const file = formData.get(`variant_${data.variants[i].sku}_image`) as File | null;
      if (!file || file.size === 0) {
        return { success: false, error: `La variante SKU ${data.variants[i].sku} requiere su miniatura`}
      }
      if (data.mainSku.slice(0,-1) !== data.variants[i].sku.slice(0,-1))
        return { success: false, error: `La variante SKU ${data.variants[i].sku} no coincide con el SKU principal (${data.mainSku.slice(0,-1)}X)`}
      const fileResult = fileSchema.safeParse(file);
      if (!fileResult.success) return { 
        success: false,
        error: `Variante ${i+1} (${data.variants[i].sku}): ${fileResult.error.issues[0].message}`
      }
      variantImages.push(file);
    }

    // 5. Aquí tu lógica de negocio/upload (copia/pega del POST viejo)
    const dbService = await getProductService();

    const categoriesList = getCategoriesWithSubcategories();
    if (data.category === undefined || data.category >= categoriesList.length) {
      return { success: false, error: "Categoría inválida" };
    }

    const categoryData = categoriesList[data.category];
    let basePath = `products/${categoryData.slug}`;
    if (data.subcategory == undefined && categoryData.subcategories.length > 0) {
      return { success: false, error: "La subcategoría es obligatoria para esta categoría" };
    }
    if (data.subcategory !== undefined) {
      basePath += `/${categoryData.subcategories[data.subcategory].slug}`;
    }

    const safeName = sanitizeFileName(data.name);
    const safeMainSku = sanitizeFileName(data.mainSku);

    // Subir thumbnail
    const thumbPath = `products/thumbnails/${safeMainSku}`;
    const thumbUpload = await dbService.uploadImage(thumbnail, thumbPath);
    if (!thumbUpload.ok || !thumbUpload.url) return { success: false, error: "Fallo al subir miniatura" };

    // Subir images
    const imageUrls = await Promise.all(
      images.map(async (file, i) => {
        const path = `${basePath}/${safeName}_${i}`;
        const res = await dbService.uploadImage(file, path);
        //if (!res.ok) throw new Error(`Fallo imagen ${i}`);
        if (res.ok && res.url) return res.url;
      })
    );

    const testImg = imageUrls.filter(url => url !== undefined);

    if (imageUrls.length === 0 || imageUrls.some(url => url === undefined)) {
      return { success: false, error: "Las subidas de las imágenes fallaron por completo" };
    }

    // Subir variant images
    const variantUrls = await Promise.all(
      variantImages.map(async (file, i) => {
        const path = `products/skus/${sanitizeFileName(data.variants[i].sku)}`;
        const res = await dbService.uploadImage(file, path);
        if (res.ok && res.url) return res.url;
      })
    );

    const testVar = variantUrls.filter(url => url !== undefined);

    if (variantUrls.length === 0 || variantUrls.some(url => url === undefined)) {
      return { success: false, error: "Las subidas de las imágenes de las variantes fallaron por completo" };
    }

    // Construir producto final
    const now = Date.now();
    const newProduct = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      subcategory: data.subcategory,
      mainSku: data.mainSku,
      status: data.status,
      discount: data.discount,
      variants: data.variants.map((v, i) => ({
        ...v,
        image: testVar[i],
      })),
      thumbnail: thumbUpload.url,
      images: testImg,
      createdAt: now,
      waLink: encodeURIComponent(data.name)
    };

    const cleanProduct = removeUndefined(newProduct);

    // Guardar en DB
    const createRes = await dbService.createProduct((cleanProduct as productProps));
    if (createRes.code !== "success") {
      return { success: false, error: "Falló al crear producto" };
    }

    const newLog = {
      action: "product_created",
      userId: adminUser.id,
      username: adminUser.username,
      timestamp: now,
      details: {
        productId: createRes.response,
      }
    };
    const setNewLog = await dbService.setActivityLog(newLog);

    console.log("Log guardado:", setNewLog);

    // Revalidar path de inventario
    revalidatePath("/admin/inventory");

    return {
      success: true,
      message: createRes
    };
  } catch (err: any) {
    console.error("Error en createProductAction:", err);
    return {
      success: false,
      error: err.message || "Error interno al crear producto",
    };
  }
}