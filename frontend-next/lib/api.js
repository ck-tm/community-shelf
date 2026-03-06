/**
 * Server-side API client.
 * Forwards JWT cookies and X-Tenant header to the Django backend.
 */
import { cookies, headers } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

/**
 * Get the tenant slug from middleware headers.
 */
export async function getTenantSlug() {
  const h = await headers();
  return h.get("x-tenant-slug") || "";
}

/**
 * Get the locale from middleware headers.
 */
export async function getLocale() {
  const h = await headers();
  return h.get("x-locale") || "ro";
}

/**
 * Get the theme from middleware headers.
 */
export async function getTheme() {
  const h = await headers();
  return h.get("x-theme") || "light";
}

/**
 * Server-side fetch that forwards cookies and tenant header.
 */
export async function serverFetch(path, options = {}) {
  const url = `${API_BASE}/api/v1${path}`;

  // Forward cookies from the incoming request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const tenantSlug = await getTenantSlug();

  const fetchHeaders = {
    "Content-Type": "application/json",
    ...(cookieHeader && { Cookie: cookieHeader }),
    ...(tenantSlug && { "X-Tenant": tenantSlug }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: fetchHeaders,
    // Don't cache by default for dynamic data
    cache: options.cache || "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.detail || body.non_field_errors?.[0] || "Request failed";
    throw new ApiError(message, response.status, body);
  }

  if (response.status === 204) return null;
  return response.json();
}

// ── Convenience methods ─────────────────────────────────────────

export const serverApi = {
  get: (path, options) => serverFetch(path, { method: "GET", ...options }),
  post: (path, data, options) =>
    serverFetch(path, {
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
      ...options,
    }),
};
