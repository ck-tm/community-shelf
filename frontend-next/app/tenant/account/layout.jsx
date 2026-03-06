"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { href: "/account", label: t("account.myRentals"), icon: BookOpen, end: true },
    { href: "/account/details", label: t("account.myDetails"), icon: UserCircle },
  ];

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Sidebar */}
          <nav className="flex shrink-0 gap-2 sm:w-48 sm:flex-col">
            {links.map((link) => {
              const isActive = link.end
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-50 text-teal-800 dark:bg-teal-800/30 dark:text-teal-300"
                      : "text-sand-500 hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
                  }`}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
