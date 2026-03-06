import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";

export default function PlatformLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PlatformNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
