/**
 * Dynamic sitemap.xml — includes all tenant URLs, titles, and lists.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "library.costico.eu";

function tenantUrl(slug) {
  return `https://${slug}.${BASE_DOMAIN}`;
}

async function fetchJson(path, headers = {}) {
  try {
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
      headers: { "Content-Type": "application/json", ...headers },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function sitemap() {
  const urls = [];
  const now = new Date();

  // Platform pages
  const platformBase = `https://${BASE_DOMAIN}`;
  urls.push(
    { url: platformBase, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${platformBase}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${platformBase}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${platformBase}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${platformBase}/copyright`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  );

  // Fetch all tenants
  const tenantsRes = await fetchJson("/platform/tenants/");
  const tenants = tenantsRes?.results || tenantsRes || [];

  for (const tenant of tenants) {
    const base = tenantUrl(tenant.slug);

    // Tenant static pages
    urls.push(
      { url: base, lastModified: now, changeFrequency: "daily", priority: 0.9 },
      { url: `${base}/about`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
      { url: `${base}/lists`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
      { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
      { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/copyright`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    );

    // Fetch tenant titles
    const titlesRes = await fetchJson("/titles/", { "X-Tenant": tenant.slug });
    const titles = titlesRes?.results || titlesRes || [];
    for (const title of titles) {
      urls.push({
        url: `${base}/title/${title.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Fetch tenant lists
    const listsRes = await fetchJson("/lists/", { "X-Tenant": tenant.slug });
    const lists = listsRes?.results || listsRes || [];
    for (const list of lists) {
      urls.push({
        url: `${base}/lists/${list.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return urls;
}
