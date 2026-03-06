const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "library.costico.eu";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/login", "/register", "/dashboard"],
      },
    ],
    sitemap: `https://${BASE_DOMAIN}/sitemap.xml`,
  };
}
