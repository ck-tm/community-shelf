import { serverApi, getTenantSlug } from "@/lib/api";
import { itemListJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import ListDetailClient from "./ListDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const list = await serverApi.get(`/lists/${id}/`);
    return {
      title: list.title,
      description: list.description || `Curated list: ${list.title}`,
    };
  } catch {
    return { title: "List not found" };
  }
}

export default async function ListDetailPage({ params }) {
  const { id } = await params;
  const tenantSlug = await getTenantSlug();
  let list = null;
  let titles = [];
  try {
    const [listRes, titlesRes] = await Promise.all([
      serverApi.get(`/lists/${id}/`),
      serverApi.get("/titles/"),
    ]);
    list = listRes;
    titles = titlesRes.results || titlesRes || [];
  } catch {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sand-500">List not found.</p>
      </div>
    );
  }

  return (
    <section>
      <JsonLd data={itemListJsonLd(list, titles, tenantSlug)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Lists", href: "/lists" },
            { name: list.title },
          ],
          tenantSlug
        )}
      />
      <ListDetailClient initialList={list} />
    </section>
  );
}
