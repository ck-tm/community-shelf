"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tags, BookOpen, Layers, MessageSquare, Settings, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { href: "/admin", label: t("adminNav.overview"), icon: LayoutDashboard, end: true },
    { href: "/admin/types", label: t("adminNav.types"), icon: Tags },
    { href: "/admin/titles", label: t("adminNav.titles"), icon: BookOpen },
    { href: "/admin/lists", label: t("adminNav.curatedLists"), icon: Layers },
    { href: "/admin/inquiries", label: t("adminNav.inquiries"), icon: MessageSquare },
    { href: "/admin/config", label: t("adminNav.siteConfig"), icon: Settings },
    { href: "/admin/description", label: t("adminNav.descriptionPage"), icon: FileText },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <nav className="flex shrink-0 gap-1 overflow-x-auto lg:w-52 lg:flex-col">
            {links.map((link) => {
              const active = link.end ? pathname === link.href : (!link.end && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-teal-50 text-teal-800 dark:bg-teal-800/30 dark:text-teal-300"
                      : "text-sand-500 hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
                  }`}
                >
                  <link.icon className="size-4 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Content */}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
