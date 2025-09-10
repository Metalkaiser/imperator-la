// src/app/api/admin/me/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "@/app/utils/firebaseAdmin";
import { authConfigs } from "@/config/websiteConfig/authConfig";
import { dbCollections } from "@/app/utils/utils"; // coincide con el usado en tus servicios
import type { currentUser, User } from "@/app/utils/types";

const COOKIE_NAME = authConfigs.cookieName ?? "imperator_admin_session";

/**
 * Mapear role -> permisos por defecto (ajusta según tu negocio).
 * Si tu documento de usuario ya contiene `permissions`, se usará ese campo en vez de este mapa.
 */
function mapRoleToPermissions(role: string | undefined): string[] {
  switch ((role || "").toLowerCase()) {
    case "admin":
      return ["users.read", "users.write", "settings.manage", "items.read", "items.write"];
    case "editor":
      return ["items.read", "items.write"];
    case "viewer":
      return ["items.read"];
    default:
      return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
    const sessionCookie = match ? decodeURIComponent(match[1]) : null;

    if (!sessionCookie) {
      return NextResponse.json({ ok: false, message: "No session cookie" }, { status: 401 });
    }

    // Verificar session cookie con firebase-admin.
    // verifySessionCookie lanza si inválida; usamos catch para manejar fallo.
    const decoded = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true)
      .catch(() => null);

    if (!decoded) {
      return NextResponse.json({ ok: false, message: "Invalid or expired session" }, { status: 401 });
    }

    const uid = decoded.uid;
    if (!uid) {
      return NextResponse.json({ ok: false, message: "Invalid token payload" }, { status: 401 });
    }

    // Consultar Firestore por el documento del usuario.
    // En tu servicio cliente usabas: query(... where("uid","==", uid) ...). Repetimos aquí.
    const usersCollection = dbCollections.users;
    const snap = await admin.firestore().collection(usersCollection).where("uid", "==", uid).limit(1).get();

    if (snap.empty) {
      // No se encontró usuario en la colección de usuarios (posible inconsistencia)
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 401 });
    }

    const doc = snap.docs[0].data() as User;

    // Si el usuario está marcado como eliminado, denegar acceso
    if (doc.isDeleted) {
      return NextResponse.json({ ok: false, message: "Account deleted" }, { status: 403 });
    }

    // Construir currentUser conforme a tu tipo
    const permissions = (doc as any).permissions ?? mapRoleToPermissions(doc.role);

    const current: currentUser = {
      uid: doc.uid,
      name: doc.name,
      email: doc.email,
      role: doc.role,
      permissions,
      lastLogin: doc.lastLogin ?? null,
      image: doc.image ?? undefined,
    };

    // Opcional: actualizar lastLogin en la DB (comenta si no lo quieres)
    // await admin.firestore().collection(usersCollection).doc(snap.docs[0].id).update({ lastLogin: new Date().toISOString() });

    return NextResponse.json({ ok: true, user: current }, { status: 200 });
  } catch (err) {
    console.error("/api/admin/me error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
