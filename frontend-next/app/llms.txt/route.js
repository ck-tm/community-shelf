/**
 * llms.txt — Machine-readable overview for AI agents.
 * Returns structured text about the platform or specific tenant.
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

export async function GET() {
  const h = await headers();
  const tenantSlug = h.get("x-tenant-slug") || "";

  let text = "";

  if (tenantSlug) {
    // ── Tenant llms.txt ─────────────────────────────────────────
    const [config, titlesRes, listsRes] = await Promise.all([
      fetchJson("/site-config/", { "X-Tenant": tenantSlug }),
      fetchJson("/titles/", { "X-Tenant": tenantSlug }),
      fetchJson("/lists/", { "X-Tenant": tenantSlug }),
    ]);

    const titles = titlesRes?.results || titlesRes || [];
    const lists = listsRes?.results || listsRes || [];
    const siteUrl = `https://${tenantSlug}.${BASE_DOMAIN}`;

    text += `# ${config?.title || tenantSlug}\n`;
    text += `> ${config?.description || "A community library on Community Shelf"}\n\n`;
    text += `URL: ${siteUrl}\n`;

    if (config?.address || config?.city) {
      text += `Location: ${[config.address, config.city, config.country].filter(Boolean).join(", ")}\n`;
    }

    text += `\n## Catalog\n\n`;
    text += `This library has ${titles.length} titles available for browsing and borrowing.\n\n`;

    if (titles.length > 0) {
      text += `### Titles\n\n`;
      for (const t of titles.slice(0, 100)) {
        const available = t.copies?.filter((c) => c.status === "available").length || 0;
        text += `- [${t.title}](${siteUrl}/title/${t.id}) by ${t.author}`;
        if (t.year) text += ` (${t.year})`;
        text += ` — ${t.type}, ${available} available\n`;
      }
      if (titles.length > 100) {
        text += `\n... and ${titles.length - 100} more titles. Browse the full catalog at ${siteUrl}\n`;
      }
    }

    if (lists.length > 0) {
      text += `\n### Curated Lists\n\n`;
      for (const l of lists) {
        const count = l.sections?.reduce((sum, s) => sum + s.titleIds.length, 0) || 0;
        text += `- [${l.title}](${siteUrl}/lists/${l.id}) — ${count} titles\n`;
      }
    }

    text += `\n## Actions\n\n`;
    text += `- Browse catalog: ${siteUrl}\n`;
    text += `- View curated lists: ${siteUrl}/lists\n`;
    text += `- About this library: ${siteUrl}/about\n`;
    text += `- Contact: ${siteUrl}/contact\n`;
  } else {
    // ── Platform llms.txt ───────────────────────────────────────
    const tenantsRes = await fetchJson("/platform/tenants/");
    const tenants = tenantsRes?.results || tenantsRes || [];

    text += `# Community Shelf\n`;
    text += `> A platform for community libraries. Discover, borrow, and share books.\n\n`;
    text += `URL: https://${BASE_DOMAIN}\n\n`;

    text += `## Libraries\n\n`;
    text += `Community Shelf hosts ${tenants.length} community libraries:\n\n`;

    for (const t of tenants) {
      const url = `https://${t.slug}.${BASE_DOMAIN}`;
      text += `- [${t.name}](${url})`;
      if (t.city || t.country) {
        text += ` — ${[t.city, t.country].filter(Boolean).join(", ")}`;
      }
      text += `\n`;
    }

    text += `\n## About\n\n`;
    text += `Community Shelf is a free platform that enables anyone to create and manage a community library.\n`;
    text += `Each library gets its own subdomain, catalog management, and borrowing system.\n\n`;

    text += `## Actions\n\n`;
    text += `- Browse all libraries: https://${BASE_DOMAIN}\n`;
    text += `- Create a library: https://${BASE_DOMAIN}/register\n`;
    text += `- Contact: https://${BASE_DOMAIN}/contact\n`;
  }

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
