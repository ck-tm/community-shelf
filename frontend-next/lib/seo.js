/**
 * JSON-LD structured data generators for SEO.
 * Used by server components to inject <script type="application/ld+json">.
 */

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || "https://library.costico.eu";
const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "library.costico.eu";

function tenantUrl(slug) {
  return `https://${slug}.${BASE_DOMAIN}`;
}

/**
 * Book schema — for TitleDetail pages.
 */
export function bookJsonLd(title, tenantSlug) {
  const url = `${tenantUrl(tenantSlug)}/title/${title.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title.title,
    author: {
      "@type": "Person",
      name: title.author,
    },
    ...(title.isbn && { isbn: title.isbn }),
    ...(title.year && { datePublished: String(title.year) }),
    ...(title.publisher && {
      publisher: { "@type": "Organization", name: title.publisher },
    }),
    ...(title.language && { inLanguage: title.language }),
    ...(title.pages && { numberOfPages: title.pages }),
    ...(title.description && { description: title.description }),
    ...(title.cover_image && { image: title.cover_image }),
    url,
    offers: {
      "@type": "Offer",
      availability:
        title.copies?.some((c) => c.status === "available")
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}

/**
 * Library / Organization schema — for About pages.
 */
export function libraryJsonLd(siteConfig, tenantSlug) {
  const url = tenantUrl(tenantSlug);
  return {
    "@context": "https://schema.org",
    "@type": "Library",
    name: siteConfig.title,
    ...(siteConfig.description && { description: siteConfig.description }),
    url,
    ...(siteConfig.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        ...(siteConfig.city && { addressLocality: siteConfig.city }),
        ...(siteConfig.country && { addressCountry: siteConfig.country }),
      },
    }),
    ...(siteConfig.logo && { logo: siteConfig.logo }),
  };
}

/**
 * ItemList schema — for list detail pages.
 */
export function itemListJsonLd(list, titles, tenantSlug) {
  const url = `${tenantUrl(tenantSlug)}/lists/${list.id}`;
  const allTitleIds = list.sections?.flatMap((s) => s.titleIds) || [];
  const items = allTitleIds
    .map((id, i) => {
      const t = titles.find((ti) => ti.id === id);
      if (!t) return null;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Book",
          name: t.title,
          author: { "@type": "Person", name: t.author },
          url: `${tenantUrl(tenantSlug)}/title/${t.id}`,
        },
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    ...(list.description && { description: list.description }),
    url,
    numberOfItems: items.length,
    itemListElement: items,
  };
}

/**
 * WebSite + SearchAction schema — for the browse page.
 */
export function websiteJsonLd(siteConfig, tenantSlug) {
  const url = tenantUrl(tenantSlug);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BreadcrumbList schema.
 */
export function breadcrumbJsonLd(items, tenantSlug) {
  const base = tenantUrl(tenantSlug);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href ? `${base}${item.href}` : undefined,
    })),
  };
}

/**
 * Render JSON-LD as a <script> tag (for use in server components).
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
