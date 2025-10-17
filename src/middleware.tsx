import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { authConfigs } from "./config/websiteConfig/authConfig";

const nextIntlMiddleware = createMiddleware(routing);

// helper to extract cookie value
function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

async function verifyJwtEdge(token: string | null) {
  if (!token) return false;
  try {
    // dynamic import para evitar bundling cuando no se usa
    const jose = await import("jose");
    const secret = new TextEncoder().encode(process.env.AUTH_JWT_SECRET ?? "");
    // Asegúrate que JWT_ALG coincide (HS256 en este ejemplo)
    await jose.jwtVerify(token, secret);
    return true;
  } catch (err) {
    console.warn("JWT verify failed:", err);
    return false;
  }
}

// Helper para inspeccionar si una Response proviene de rewrite (varios headers posibles)
function isRewriteResponse(res: Response | NextResponse | null) {
  if (!res) return false;
  try {
    // distintos nombres que Next/edge puede añadir — revisa cuales aparecen en tu entorno
    const headers = (res as any).headers;
    if (!headers) return false;
    const candidates = [
      'x-middleware-rewrite',
      'x-nextjs-rewrite',
      'x-middleware-subrequest',
      'x-nextjs-cache'
    ];
    for (const h of candidates) {
      if (typeof headers.get === 'function' && headers.get(h)) return true;
      if ((headers as any)[h]) return true;
    }
  } catch (e) {
    // ignore
  }
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 0) Passthrough rápido para assets/infra (no ejecutar lógica)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 1) Rutas admin
  if (pathname.startsWith("/admin")) {
    const cookieHeader = req.headers.get("cookie");
    const token = getCookieValue(cookieHeader, authConfigs.cookieName);

    // Si usas provider 'custom' y quieres verificación en Edge -> verifica JWT aquí
    if (authConfigs.source === "custom") {
      const isValid = await verifyJwtEdge(token ?? null);
      // comportamiento para /admin/login
      if (pathname === "/admin/login" || pathname === "/admin/login/") {
        if (isValid) return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        return NextResponse.next();
      }

      // otras rutas dentro de /admin/*
      if (!isValid) return NextResponse.redirect(new URL("/admin/login", req.url));
      return NextResponse.next();
    }

    // Para firebase (u otros providers que no verifiques en Edge),
    // solo comprueba existencia de cookie y delega verificación real al servidor.
    if (authConfigs.source === "firebase" || authConfigs.source === "mock" || !authConfigs.source) {
      // /admin/login -> si tiene cookie, redirigir al dashboard (optimista)
      if (pathname === "/admin/login" || pathname === "/admin/login/") {
        if (token) {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        return NextResponse.next();
      }

      // /admin or /admin/ -> similar
      if (pathname === "/admin" || pathname === "/admin/") {
        if (token) return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // Para cualquier otra ruta en /admin/* -> si no hay cookie, forzar login
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // si hay cookie, permitir (verificación real en servidor)
      return NextResponse.next();
    }

    // fallback: permitir
    return NextResponse.next();
  }

  // 2) Resto: intl

  const locales = Array.isArray((routing as any).locales) ? (routing as any).locales : ['en','es'];

  const hasLocalePrefix = locales.some((l: string) =>
    pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocalePrefix) {
    // ya está localizada — no necesitamos que next-intl haga rewrites
    return NextResponse.next();
  }
  
  const res = await nextIntlMiddleware(req);

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
