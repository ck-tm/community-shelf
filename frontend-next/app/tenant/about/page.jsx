import { serverApi, getTenantSlug } from "@/lib/api";
import { libraryJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import AboutClient from "./AboutClient";

export async function generateMetadata() {
  try {
    const config = await serverApi.get("/site-config/");
    return {
      title: `About ${config.title || "this library"}`,
      description: config.description || "Learn more about this community library.",
      openGraph: {
        title: `About ${config.title || "this library"}`,
        description: config.description || "Learn more about this community library.",
      },
    };
  } catch {
    return { title: "About" };
  }
}

export default async function AboutPage() {
  const tenantSlug = await getTenantSlug();
  let config = {};
  try {
    config = await serverApi.get("/site-config/");
  } catch {
    // fallback — client component will read from DataContext
  }

  return (
    <section>
      {config.title && <JsonLd data={libraryJsonLd(config, tenantSlug)} />}
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", href: "/" },
            { name: "About" },
          ],
          tenantSlug
        )}
      />
      <AboutClient />
    </section>
  );
}
