import { serverApi, getTenantSlug } from "@/lib/api";
import { bookJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import TitleDetailClient from "./TitleDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const title = await serverApi.get(`/titles/${id}/`);
    const available = title.copies?.filter((c) => c.status === "available").length || 0;
    return {
      title: `${title.title} by ${title.author}`,
      description: title.description || `${title.title} by ${title.author}. ${available} copies available.`,
      openGraph: {
        title: `${title.title} by ${title.author}`,
        description: title.description || `Browse and borrow ${title.title}`,
        type: "book",
        ...(title.cover_image && { images: [{ url: title.cover_image }] }),
      },
    };
  } catch {
    return { title: "Title not found" };
  }
}

export default async function TitlePage({ params }) {
  const { id } = await params;
  const tenantSlug = await getTenantSlug();
  let title = null;
  try {
    title = await serverApi.get(`/titles/${id}/`);
  } catch {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sand-500">Title not found.</p>
      </div>
    );
  }

  return (
    <article>
      <JsonLd data={bookJsonLd(title, tenantSlug)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Catalog", href: "/" },
            { name: title.title },
          ],
          tenantSlug
        )}
      />
      <TitleDetailClient initialTitle={title} />
    </article>
  );
}
