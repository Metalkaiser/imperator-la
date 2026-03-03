"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import admin from "@/app/utils/firebaseAdmin";
import getProductService from "@/config/productServiceInstance";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import { dbCollections } from "@/app/utils/utils";
import { NewActivityLog, User } from "@/app/utils/types";
import { fileSchema } from "@/app/utils/apis/validatePayload";
import { userProfileStoragePath } from "@/app/utils/utils";

const ALLOWED_IMAGE_MIMES = ["image/webp", "image/jpeg", "image/png"];
const MAX_IMAGE_BYTES = 512_000;

type AdminUserResult =
  | { success: true; response: { id: string; role: string; username: string; docId: string } }
  | { success: false; response: string };

export type UpdateMyProfileImageResult = {
  success: boolean;
  imageUrl?: string;
  error?: string;
};

async function getAdminUser(): Promise<AdminUserResult> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(authConfigs.cookieName)?.value;

  if (!token) return { success: false, response: "No autenticado" };

  let uid = "";
  if (authConfigs.source === "firebase") {
    let decodedToken: admin.auth.DecodedIdToken | null = null;
    try {
      decodedToken = await admin.auth().verifySessionCookie(token, true);
    } catch {
      decodedToken = null;
    }
    if (!decodedToken) {
      try {
        decodedToken = await admin.auth().verifyIdToken(token);
      } catch {
        return { success: false, response: "Token inválido" };
      }
    }
    uid = decodedToken.uid;
  } else if (authConfigs.source === "custom") {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) return { success: false, response: "Configuración del servidor incompleta" };
    try {
      const payload = jwt.verify(token, jwtSecret) as any;
      uid = String(payload.sub ?? payload.uid ?? "");
    } catch {
      return { success: false, response: "Token inválido, sesión fallida" };
    }
  } else {
    return { success: false, response: "Proveedor de autenticación desconocido" };
  }

  if (!uid) return { success: false, response: "Token inválido" };

  const userCol = admin.firestore().collection(dbCollections.users);
  const snap = await userCol.where("uid", "==", uid).limit(1).get();
  if (snap.empty) return { success: false, response: "Usuario no encontrado" };

  const docRef = snap.docs[0];
  const userData = docRef.data() as User;
  if (!userData) return { success: false, response: "Problema al autenticar usuario" };
  //if (userData.role !== "admin") return { success: false, response: "Permisos insuficientes" };

  return {
    success: true,
    response: {
      id: uid,
      role: userData.role,
      username: userData.name,
      docId: docRef.id,
    },
  };
}

export async function updateMyProfileImageAction(formData: FormData): Promise<UpdateMyProfileImageResult> {
  try {
    const authResult = await getAdminUser();
    if (!authResult.success) return { success: false, error: authResult.response };
    const adminUser = authResult.response;

    const image = formData.get("image");
    if (!(image instanceof File) || image.size === 0) {
      return { success: false, error: "Debes seleccionar una imagen válida" };
    }

    if (!ALLOWED_IMAGE_MIMES.includes(image.type)) {
      return {
        success: false,
        error: `Formato no permitido. Usa: ${ALLOWED_IMAGE_MIMES.join(", ")}`,
      };
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return { success: false, error: `La imagen debe pesar máximo ${MAX_IMAGE_BYTES / 1024} KB` };
    }

    try {
      fileSchema.parse(image);
    } catch (error) {
      if (error instanceof ZodError) {
        return { success: false, error: error.issues[0]?.message ?? "Archivo inválido" };
      }
      return { success: false, error: "Archivo inválido" };
    }

    const dbService = await getProductService();
    const uploadRes = await dbService.uploadImage(image, `users/profiles/${adminUser.id}`);
    if (!uploadRes.ok || !uploadRes.url) {
      return { success: false, error: uploadRes.error ?? "No se pudo subir la imagen" };
    }

    const usersCol = admin.firestore().collection(dbCollections.users);
    await usersCol.doc(adminUser.docId).update({
      image: `${userProfileStoragePath}/${uploadRes.url}`,
      updatedAt: Date.now(),
    });

    const logData: NewActivityLog = {
      userId: adminUser.id,
      username: adminUser.username.toLowerCase(),
      action: "user_edited",
      target: { collection: dbCollections.users, item: adminUser.id },
      diff: [{ item: "image", oldValue: "-", newValue: "updated" }],
    };
    const logRes = await dbService.setActivityLog(logData);
    if (logRes.status !== 200) console.warn("Activity log not saved");

    revalidatePath("/admin/settings");

    return { success: true, imageUrl: uploadRes.url };
  } catch (error: any) {
    console.error("updateMyProfileImageAction error:", error);
    return { success: false, error: error?.message ?? "Error interno del servidor" };
  }
}
