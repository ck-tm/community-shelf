import { NextResponse } from "next/server";

/**
 * Edge middleware — runs before every request.
 * 1. Detects tenant slug from subdomain.
 * 2. Reads locale + theme cookies.
 * 3. Rewrites the URL to the internal /platform/* or /tenant/* prefix
 *    so both can share the same public paths (/, /contact, /login, etc.).
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost";

  // Use the Host header for tenant detection (request.nextUrl.hostname
  // returns the server bind address in dev mode, not the actual hostname).
  const hostHeader = request.headers.get("host") || "";
  const hostname = hostHeader.replace(/:\d+$/, ""); // strip port

  // ── Tenant detection ──────────────────────────────────────────
  let tenantSlug = "";
  if (hostname !== baseDomain && hostname.endsWith("." + baseDomain)) {
    tenantSlug = hostname.replace("." + baseDomain, "");
  } else if (
    hostname !== "localhost" &&
    hostname.split(".").length === 2 &&
    hostname.endsWith(".localhost")
  ) {
    // Dev: subdomain.localhost
    tenantSlug = hostname.split(".")[0];
  }

  // ── Locale from cookie ────────────────────────────────────────
  const locale = request.cookies.get("lang")?.value || "ro";

  // ── Theme from cookie ─────────────────────────────────────────
  const theme = request.cookies.get("theme")?.value || "light";

  // ── Skip rewriting for root-level routes (SEO files etc.) ─────
  const skipRewrite = [
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/feed",
  ];
  if (skipRewrite.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const response = NextResponse.next();
    response.headers.set("x-tenant-slug", tenantSlug);
    response.headers.set("x-locale", locale);
    response.headers.set("x-theme", theme);
    return response;
  }

  // Already on an internal path — don't double-rewrite
  if (pathname.startsWith("/platform") || pathname.startsWith("/tenant")) {
    const response = NextResponse.next();
    response.headers.set("x-tenant-slug", tenantSlug);
    response.headers.set("x-locale", locale);
    response.headers.set("x-theme", theme);
    return response;
  }

  // ── Rewrite to internal prefix ────────────────────────────────
  const prefix = tenantSlug ? "/tenant" : "/platform";
  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${pathname}`;

  const response = NextResponse.rewrite(url);
  response.headers.set("x-tenant-slug", tenantSlug);
  response.headers.set("x-locale", locale);
  response.headers.set("x-theme", theme);

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, and api routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
