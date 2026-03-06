/**
 * RSS feed — per-tenant feed of titles.
 * Returns valid RSS XML with recently added titles.
 */

import { headers } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "library.costico.eu";

async function fetchJson(path, extraHeaders = {}) {
  try {
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
      headers: { "Content-Type": "application/json", ...extraHeaders },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const h = await headers();
  const tenantSlug = h.get("x-tenant-slug") || "";

  if (!tenantSlug) {
    return new Response("RSS feed is only available on library subdomains.", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const [config, titlesRes] = await Promise.all([
    fetchJson("/site-config/", { "X-Tenant": tenantSlug }),
    fetchJson("/titles/", { "X-Tenant": tenantSlug }),
  ]);

  const titles = titlesRes?.results || titlesRes || [];
  const siteUrl = `https://${tenantSlug}.${BASE_DOMAIN}`;
  const siteName = config?.title || tenantSlug;

  // Build RSS XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `<channel>\n`;
  xml += `  <title>${escapeXml(siteName)}</title>\n`;
  xml += `  <link>${siteUrl}</link>\n`;
  xml += `  <description>${escapeXml(config?.description || `Catalog of ${siteName}`)}</description>\n`;
  xml += `  <language>en</language>\n`;
  xml += `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  xml += `  <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml" />\n`;

  // Add most recent titles (up to 50)
  for (const title of titles.slice(0, 50)) {
    const titleUrl = `${siteUrl}/title/${title.id}`;
    const available = title.copies?.filter((c) => c.status === "available").length || 0;

    xml += `  <item>\n`;
    xml += `    <title>${escapeXml(title.title)}</title>\n`;
    xml += `    <link>${titleUrl}</link>\n`;
    xml += `    <guid isPermaLink="true">${titleUrl}</guid>\n`;
    xml += `    <description>${escapeXml(
      `${title.title} by ${title.author}. Type: ${title.type}. ${available} copies available.${title.description ? " " + title.description : ""}`
    )}</description>\n`;
    xml += `    <author>${escapeXml(title.author)}</author>\n`;
    if (title.cover_image) {
      xml += `    <enclosure url="${escapeXml(title.cover_image)}" type="image/jpeg" />\n`;
    }
    xml += `  </item>\n`;
  }

  xml += `</channel>\n`;
  xml += `</rss>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
