import { serverApi, getTenantSlug } from "@/lib/api";
import { DataProvider } from "@/context/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function TenantLayout({ children }) {
  const tenantSlug = await getTenantSlug();

  // Fetch all tenant data server-side
  let initialData = {};
  try {
    const [titlesRes, typesRes, listsRes, configRes, descPageRes] = await Promise.all([
      serverApi.get("/titles/"),
      serverApi.get("/types/"),
      serverApi.get("/lists/"),
      serverApi.get("/site-config/"),
      serverApi.get("/description-page/"),
    ]);
    initialData = {
      titles: titlesRes.results || titlesRes,
      types: typesRes.results || typesRes,
      curatedLists: listsRes.results || listsRes,
      siteConfig: configRes,
      descriptionPage: descPageRes,
    };
  } catch (err) {
    console.error("Failed to fetch tenant data:", err);
  }

  return (
    <DataProvider initialData={initialData}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer isTenant siteConfig={initialData.siteConfig} />
      </div>
    </DataProvider>
  );
}
