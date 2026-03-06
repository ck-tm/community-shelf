"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Tag,
  BookOpen,
  Layers,
  ClipboardList,
  Wrench,
  FileText,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { href: "/admin", label: t("adminNav.overview"), icon: LayoutDashboard, end: true },
    { href: "/admin/types", label: t("adminNav.types"), icon: Tag },
    { href: "/admin/titles", label: t("adminNav.titles"), icon: BookOpen },
    { href: "/admin/lists", label: t("adminNav.curatedLists"), icon: Layers },
    { href: "/admin/inquiries", label: t("adminNav.inquiries"), icon: ClipboardList },
    { href: "/admin/config", label: t("adminNav.siteConfig"), icon: Wrench },
    { href: "/admin/description", label: t("adminNav.descriptionPage"), icon: FileText },
  ];

  const isActive = (link) => {
    if (link.end) return pathname === link.href;
    return pathname.startsWith(link.href);
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="shrink-0 lg:w-56">
            <h2 className="mb-3 font-heading text-lg text-teal-900 dark:text-cream">
              {t("adminNav.admin")}
            </h2>
            <nav className="grid grid-cols-3 gap-1 lg:flex lg:flex-col">
              {links.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-medium transition-colors duration-150 lg:flex-row lg:gap-2.5 lg:px-3 lg:py-2 lg:text-sm ${
                      active
                        ? "bg-teal-700/10 text-teal-800 dark:bg-teal-400/10 dark:text-teal-400"
                        : "text-sand-500 hover:text-teal-800 hover:bg-warm dark:text-night-400 dark:hover:text-teal-400 dark:hover:bg-night-800"
                    }`}
                  >
                    <link.icon className="size-4 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
