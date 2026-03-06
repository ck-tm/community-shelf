(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__140a91e5._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
    const { hostname, pathname } = request.nextUrl;
    const baseDomain = ("TURBOPACK compile-time value", "localhost") || "localhost";
    // ── Tenant detection ──────────────────────────────────────────
    let tenantSlug = "";
    if (hostname !== baseDomain && hostname.endsWith("." + baseDomain)) {
        tenantSlug = hostname.replace("." + baseDomain, "");
    } else if (hostname !== "localhost" && hostname.split(".").length === 2 && hostname.endsWith(".localhost")) {
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
        "/feed"
    ];
    if (skipRewrite.some((p)=>pathname === p || pathname.startsWith(p + "/"))) {
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.headers.set("x-tenant-slug", tenantSlug);
        response.headers.set("x-locale", locale);
        response.headers.set("x-theme", theme);
        return response;
    }
    // Already on an internal path — don't double-rewrite
    if (pathname.startsWith("/platform") || pathname.startsWith("/tenant")) {
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.headers.set("x-tenant-slug", tenantSlug);
        response.headers.set("x-locale", locale);
        response.headers.set("x-theme", theme);
        return response;
    }
    // ── Rewrite to internal prefix ────────────────────────────────
    const prefix = tenantSlug ? "/tenant" : "/platform";
    const url = request.nextUrl.clone();
    url.pathname = `${prefix}${pathname}`;
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(url);
    response.headers.set("x-tenant-slug", tenantSlug);
    response.headers.set("x-locale", locale);
    response.headers.set("x-theme", theme);
    return response;
}
const config = {
    matcher: [
        // Match all paths except static files, _next, and api routes
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__140a91e5._.js.map