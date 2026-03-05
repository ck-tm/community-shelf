/**
 * Cloudflare Pages middleware — injects Open Graph / SEO meta tags
 * at the edge before serving the SPA shell.
 *
 * Runs on every request. For bot/crawler user-agents and known
 * shareable paths (/, /title/:id, /lists/:id), it fetches metadata
 * from the Django API and injects <meta> tags into the HTML <head>.
 */

const API_BASE = "https://api-library.costico.eu";
const BASE_DOMAIN = "library.costico.eu";

const BOT_UA =
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|discord|slackbot|applebot|pinterestbot/i;

function isCrawler(ua) {
  return BOT_UA.test(ua || "");
}

function resolveTenant(hostname) {
  if (hostname === BASE_DOMAIN) return null;
  if (hostname.endsWith("." + BASE_DOMAIN)) {
    return hostname.replace("." + BASE_DOMAIN, "");
  }
  return null;
}

function escHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html, meta) {
  const tags = [
    `<title>${escHtml(meta.title)}</title>`,
    `<meta name="description" content="${escHtml(meta.description)}" />`,
    `<meta property="og:title" content="${escHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escHtml(meta.description)}" />`,
    `<meta property="og:type" content="${meta.type || "website"}" />`,
    `<meta property="og:url" content="${escHtml(meta.url)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escHtml(meta.description)}" />`,
  ];
  if (meta.image) {
    tags.push(`<meta property="og:image" content="${escHtml(meta.image)}" />`);
    tags.push(`<meta name="twitter:image" content="${escHtml(meta.image)}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  }
  return html.replace("</head>", tags.join("\n    ") + "\n  </head>");
}

async function fetchJson(url, tenant) {
  const headers = { Accept: "application/json" };
  if (tenant) headers["X-Tenant"] = tenant;
  try {
    const res = await fetch(url, { headers, cf: { cacheTtl: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getMeta(request) {
  const url = new URL(request.url);
  const tenant = resolveTenant(url.hostname);
  const path = url.pathname;

  // Platform landing page
  if (!tenant) {
    return {
      title: "Community Shelf — Your Community Library, Online",
      description:
        "Share books, games, music, and more with your neighborhood. Community Shelf gives every community the tools to run a beautiful, modern lending library.",
      url: url.href,
    };
  }

  // Tenant: title detail page /title/:id
  const titleMatch = path.match(/^\/title\/(\d+)\/?$/);
  if (titleMatch) {
    const data = await fetchJson(
      `${API_BASE}/api/v1/titles/${titleMatch[1]}/`,
      tenant
    );
    if (data) {
      return {
        title: `${data.title} — ${data.author || ""}`,
        description: data.description || `${data.title} by ${data.author || "Unknown"}`,
        image: data.cover_image || null,
        type: "book",
        url: url.href,
      };
    }
  }

  // Tenant: curated list detail /lists/:id
  const listMatch = path.match(/^\/lists\/(\d+)\/?$/);
  if (listMatch) {
    const data = await fetchJson(
      `${API_BASE}/api/v1/lists/${listMatch[1]}/`,
      tenant
    );
    if (data) {
      return {
        title: data.title,
        description: data.description || "A curated list",
        url: url.href,
      };
    }
  }

  // Tenant: homepage — fetch site config
  const config = await fetchJson(`${API_BASE}/api/v1/config/`, tenant);
  if (config) {
    return {
      title: config.siteTitle || tenant,
      description: config.description || "A community library",
      url: url.href,
    };
  }

  return {
    title: tenant,
    description: "A community library powered by Community Shelf",
    url: url.href,
  };
}

export async function onRequest(context) {
  const { request, next } = context;
  const ua = request.headers.get("user-agent") || "";

  // Only intercept HTML requests from crawlers
  const accept = request.headers.get("accept") || "";
  if (!isCrawler(ua) || !accept.includes("text/html")) {
    return next();
  }

  // Get the original response (the SPA shell)
  const response = await next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const meta = await getMeta(request);
  const html = await response.text();
  const injected = injectMeta(html, meta);

  return new Response(injected, {
    status: response.status,
    headers: response.headers,
  });
}
