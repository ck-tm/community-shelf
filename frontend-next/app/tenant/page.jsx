import { serverApi, getTenantSlug } from "@/lib/api";
import { websiteJsonLd, JsonLd } from "@/lib/seo";
import BrowseClient from "./BrowseClient";

export async function generateMetadata() {
  try {
    const config = await serverApi.get("/site-config/");
    return {
      title: config.title || "Browse catalog",
      description: config.description || "Browse and borrow books from this community library.",
      openGraph: {
        title: config.title || "Browse catalog",
        description: config.description || "Browse and borrow books from this community library.",
      },
    };
  } catch {
    return { title: "Browse catalog" };
  }
}

export default async function BrowsePage() {
  const tenantSlug = await getTenantSlug();
  let config = {};
  try {
    config = await serverApi.get("/site-config/");
  } catch {
    // fallback
  }

  return (
    <>
      {config.title && <JsonLd data={websiteJsonLd(config, tenantSlug)} />}
      <BrowseClient />
    </>
  );
}
