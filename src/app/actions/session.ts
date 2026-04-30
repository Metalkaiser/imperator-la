"use server";

import admin from "@/app/utils/firebaseAdmin";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import { dbCollections } from "@/app/utils/utils";
import type { User } from "@/app/utils/types";
import { normalizeRole } from "@/app/utils/utils";

export type SessionUser = {
  id: string | number;
  role: string;
  username: string;
  email?: string;
};

export async function getSessionUser(requireAdmin = false): Promise<{ success: boolean; response?: SessionUser; error?: string }> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(authConfigs.cookieName)?.value;

  if (!token) return { success: false, error: "No autenticado" };

  let uid: string | number = "";
  if (authConfigs.source === "firebase") {
    let decodedToken: admin.auth.DecodedIdToken | null = null;
    try {
      decodedToken = await admin.auth().verifySessionCookie(token, true);
    } catch {
      try {
        decodedToken = await admin.auth().verifyIdToken(token);
      } catch {
        return { success: false, error: "Token inválido" };
      }
    }
    uid = decodedToken?.uid ?? "";
  } else if (authConfigs.source === "custom") {
    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) return { success: false, error: "Configuración del servidor incompleta" };

    try {
      const { default: jwt } = await import("jsonwebtoken");
      const payload = jwt.verify(token, jwtSecret) as any;
      uid = payload.sub ?? payload.uid ?? "";
    } catch {
      return { success: false, error: "Token inválido" };
    }
  } else {
    return { success: false, error: "Proveedor de autenticación desconocido" };
  }

  if (!uid) return { success: false, error: "Token inválido" };

  const userCol = admin.firestore().collection(dbCollections.users);
  const snap = await userCol.where("uid", "==", uid).limit(1).get();
  if (snap.empty) return { success: false, error: "Usuario no encontrado" };

  const userData = snap.docs[0].data() as User;
  if (!userData) return { success: false, error: "Problema al autenticar usuario" };
  if (userData.isDeleted) return { success: false, error: "Cuenta eliminada" };

  const role = normalizeRole(userData.role);
  if (requireAdmin && role !== "admin") {
    return { success: false, error: "Permisos insuficientes" };
  }

  return {
    success: true,
    response: {
      id: uid,
      role,
      username: userData.name,
      email: userData.email,
    },
  };
}
