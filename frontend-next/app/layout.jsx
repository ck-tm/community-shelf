import "./globals.css";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/context/ThemeProvider";
import { I18nProvider } from "@/context/I18nProvider";
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Community Shelf",
  description: "Discover and borrow books from community libraries near you.",
};

export default async function RootLayout({ children }) {
  const h = await headers();
  const locale = h.get("x-locale") || "ro";
  const theme = h.get("x-theme") || "light";

  return (
    <html lang={locale} className={theme === "dark" ? "dark" : ""} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider initialTheme={theme}>
          <I18nProvider initialLocale={locale}>
            <AuthProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
