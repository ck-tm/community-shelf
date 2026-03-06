import { serverApi, getTenantSlug } from "@/lib/api";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import ListsClient from "./ListsClient";

export async function generateMetadata() {
  try {
    const config = await serverApi.get("/site-config/");
    return {
      title: `Curated Lists — ${config.title || "Library"}`,
      description: `Browse curated reading lists from ${config.title || "this library"}.`,
    };
  } catch {
    return { title: "Curated Lists" };
  }
}

export default async function ListsPage() {
  const tenantSlug = await getTenantSlug();

  return (
    <section>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", href: "/" },
            { name: "Curated Lists" },
          ],
          tenantSlug
        )}
      />
      <ListsClient />
    </section>
  );
}
