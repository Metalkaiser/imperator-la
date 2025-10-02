// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "@/app/utils/firebaseAdmin";
import { authConfigs } from "@/config/websiteConfig/authConfig";

const COOKIE_NAME = authConfigs.cookieName ?? "imperator_admin_session";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
    const cookieValue = match ? decodeURIComponent(match[1]) : null;

    // Si Firebase, opcionalmente revocar refresh tokens para forzar logout global
    if (authConfigs.source === "firebase" && cookieValue) {
      try {
        // decode session cookie to get uid
        const decoded = await admin.auth().verifySessionCookie(cookieValue).catch(() => null);
        if (decoded?.uid) {
          await admin.auth().revokeRefreshTokens(decoded.uid);
        }
      } catch (e) {
        console.warn("firebase revoke refresh tokens failed", e);
      }
    }

    // Borra cookie (setear maxAge=0)
    const res = NextResponse.json({ ok: true, message: "Logged out" });
    res.cookies.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
    return res;
  } catch (err) {
    console.error("logout error:", err);
    const res = NextResponse.json({ ok: false, message: "Logout error" }, { status: 500 });
    res.cookies.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
    return res;
  }
}
