const API_BASE = import.meta.env.VITE_API_URL || "";

function resolveTenantSlug() {
  const host = window.location.hostname;
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN;

  if (baseDomain) {
    // Production: check if host is a subdomain of baseDomain
    if (host === baseDomain) return null;
    if (host.endsWith("." + baseDomain)) {
      return host.replace("." + baseDomain, "");
    }
    return null;
  }

  // Dev fallback: subdomain.localhost
  const parts = host.split(".");
  if (parts.length === 2 && parts[1] === "localhost") return parts[0];
  return null;
}

const TENANT_SLUG = resolveTenantSlug();

class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

let isRefreshing = false;

async function tryRefresh() {
  if (isRefreshing) return false;
  isRefreshing = true;
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/token/refresh/`, {
      method: "POST",
      credentials: "include",
      ...(TENANT_SLUG && { headers: { "X-Tenant": TENANT_SLUG } }),
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    isRefreshing = false;
  }
}

async function apiRequest(path, options = {}) {
  const url = `${API_BASE}/api/v1${path}`;

  const headers = {
    ...(TENANT_SLUG && { "X-Tenant": TENANT_SLUG }),
    ...options.headers,
  };

  // Don't set Content-Type for FormData (file uploads)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    credentials: "include",
    ...options,
    headers,
  };

  let response = await fetch(url, config);

  // If 401, try refreshing the token once
  if (response.status === 401 && !options._retried) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      response = await fetch(url, { ...config, _retried: true });
    }
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      body.detail || body.non_field_errors?.[0] || "Request failed";
    throw new ApiError(message, response.status, body);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  get: (path) => apiRequest(path),
  post: (path, data) =>
    apiRequest(path, {
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    }),
  put: (path, data) =>
    apiRequest(path, { method: "PUT", body: JSON.stringify(data) }),
  patch: (path, data) =>
    apiRequest(path, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (path) => apiRequest(path, { method: "DELETE" }),
  upload: (path, formData, method = "POST") =>
    apiRequest(path, { method, body: formData }),
};

export { ApiError, TENANT_SLUG };
