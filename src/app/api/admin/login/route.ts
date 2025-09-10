// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthService } from "@/config/auth/authServiceInstance";
import admin from "@/app/utils/firebaseAdmin"; // tu inicializador de firebase-admin (server-only)
import { authConfigs } from "@/config/websiteConfig/authConfig";
import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs"; // si usas bcrypt para passwords en DB

// Helpers (ajusta según tu proyecto)
const COOKIE_NAME = authConfigs.cookieName || "imperator_admin_session";
const IS_PROD = process.env.NODE_ENV === "production";
const sessionExpiration = Number(authConfigs.jwtExpirationMs);

// Ejemplo simplificado: función que verifica credenciales en DB (reemplaza por tu impl)
async function verifyUser(email: string, password: string) {
  const authService = await getAuthService();
  const userData = await authService.getCurrentUser();

  if (!userData) return null;
  
  return null;
}

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();
  if (!idToken) {
    return NextResponse.json({ ok: false, message: "idToken required" }, { status: 400 });
  }
  if (authConfigs.source === "firebase") {
    try {
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: sessionExpiration });

      const res = NextResponse.json({ ok: true, message: "Login successful (firebase)" }, { status: 200 });
      res.cookies.set(COOKIE_NAME, sessionCookie, {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "lax",
        path: "/",
        maxAge: Math.floor(sessionExpiration / 1000), // en segundos
      });
      return res;
    } catch (err: any) {
      console.error("login firebase error:", err);
      return NextResponse.json({ ok: false, message: err?.message ?? "Invalid token" }, { status: 401 });
    }
  }

  if (authConfigs.source === "custom" || authConfigs.source === "mock") {
    try {
      const { uid, email, role } = await req.json();
      // Firma JWT (payload mínimo; añade claims/roles según necesidad)
      const payload = { sub: uid, email: email, roles: role ?? [] };
      const jwtSecret = process.env.AUTH_JWT_SECRET;
      if (!jwtSecret) {
        console.error("JWT_SECRET missing");
        return NextResponse.json({ ok: false, message: "Server misconfiguration" }, { status: 500 });
      }

      const token = jwt.sign(payload, jwtSecret, { expiresIn: sessionExpiration });
      // Decide maxAge en segundos para cookie (coincidir con expiresIn si es numérico)
      const maxAge = (() => {
        const ex = process.env.JWT_EXPIRES ?? "7d";
        // intenta parse simple si en segundos
        if (/^\d+$/.test(ex)) return Number(ex);
        // default 7d = 7*24*3600
        return 7 * 24 * 3600;
      })();

      const res = NextResponse.json({ ok: true, message: "Login successful (custom)" }, { status: 200 });
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "lax",
        path: "/",
        maxAge,
      });
      return res;
    } catch (err) {
      console.error("login custom error:", err);
      return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
    }
  }

  // fallback: provider desconocido
  console.error("Unknown auth provider");
  return NextResponse.json({ ok: false, message: "Auth provider not configured" }, { status: 500 });
}
