/**
 * API proxy — forwards /api/* requests to the Django backend.
 *
 * Why a route handler instead of next.config.js rewrites?
 * 1. Preserves trailing slashes (Django requires them).
 * 2. Injects X-Tenant from the subdomain automatically.
 * 3. Rewrites Set-Cookie Domain so auth cookies work when the
 *    frontend runs on localhost but connects to a remote API.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const IS_DEV = process.env.NODE_ENV !== "production";
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost";

// --- Tenant detection (mirrors middleware.js logic) ---

function detectTenant(request) {
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost";
  const host = request.headers.get("host") || "";
  const hostname = host.replace(/:\d+$/, "");

  if (hostname !== baseDomain && hostname.endsWith("." + baseDomain)) {
    return hostname.replace("." + baseDomain, "");
  }
  if (
    hostname !== "localhost" &&
    hostname.split(".").length === 2 &&
    hostname.endsWith(".localhost")
  ) {
    return hostname.split(".")[0];
  }
  return "";
}

// --- Hop-by-hop headers that should not be forwarded ---

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "te",
  "trailer",
  "upgrade",
]);

// --- Proxy handler ---

async function proxy(request) {
  // Use the original URL path to preserve trailing slashes (Django requires them).
  // The [...path] params strip the trailing slash, so we read from the URL directly.
  const url = new URL(request.url);
  const dest = `${API_URL}${url.pathname}${url.search}`;

  // Build forwarded headers
  const headers = new Headers();
  for (const [key, value] of request.headers) {
    if (!HOP_BY_HOP.has(key.toLowerCase()) && key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  }

  // Always inject X-Tenant from the detected subdomain
  const tenant = detectTenant(request);
  if (tenant) headers.set("X-Tenant", tenant);

  // Forward to Django
  const init = { method: request.method, headers, redirect: "manual" };
  if (request.body && !["GET", "HEAD"].includes(request.method)) {
    init.body = request.body;
    init.duplex = "half";
  }

  const upstream = await fetch(dest, init);

  // Copy response headers, rewriting Set-Cookie for localhost dev
  const resHeaders = new Headers();
  for (const [key, value] of upstream.headers) {
    if (HOP_BY_HOP.has(key.toLowerCase())) continue;
    if (key.toLowerCase() === "set-cookie") continue; // handled below
    resHeaders.append(key, value);
  }

  // Rewrite cookies so they work on the current frontend domain.
  // Django sets Domain=.library.costico.eu which the browser rejects
  // on next-library.costico.eu (different domain). We rewrite it.
  const cookies = upstream.headers.getSetCookie?.() || [];
  for (const cookie of cookies) {
    let fixed = cookie;
    if (IS_DEV) {
      // Dev: strip Domain (let browser default to localhost)
      fixed = fixed.replace(/;\s*Domain=[^;]*/gi, "");
      // Strip Secure (localhost is HTTP)
      fixed = fixed.replace(/;\s*Secure/gi, "");
      // Downgrade SameSite=None to Lax (None requires Secure)
      fixed = fixed.replace(/;\s*SameSite=None/gi, "; SameSite=Lax");
    } else {
      // Production: rewrite Domain to the Next.js frontend base domain
      // so cookies are shared across platform + tenant subdomains
      fixed = fixed.replace(
        /;\s*Domain=[^;]*/gi,
        `; Domain=.${BASE_DOMAIN}`
      );
    }
    resHeaders.append("set-cookie", fixed);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: resHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
