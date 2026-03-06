import { NavLink, Outlet } from "react-router-dom";
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

export default function AdminLayout() {
  const { t } = useTranslation();

  const links = [
    { to: "/admin", label: t("adminNav.overview"), icon: LayoutDashboard, end: true },
    { to: "/admin/types", label: t("adminNav.types"), icon: Tag },
    { to: "/admin/titles", label: t("adminNav.titles"), icon: BookOpen },
    { to: "/admin/lists", label: t("adminNav.curatedLists"), icon: Layers },
    { to: "/admin/inquiries", label: t("adminNav.inquiries"), icon: ClipboardList },
    { to: "/admin/config", label: t("adminNav.siteConfig"), icon: Wrench },
    { to: "/admin/description", label: t("adminNav.descriptionPage"), icon: FileText },
  ];

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-medium transition-colors duration-150 lg:flex-row lg:gap-2.5 lg:px-3 lg:py-2 lg:text-sm ${
      isActive
        ? "bg-teal-700/10 text-teal-800 dark:bg-teal-400/10 dark:text-teal-400"
        : "text-sand-500 hover:text-teal-800 hover:bg-warm dark:text-night-400 dark:hover:text-teal-400 dark:hover:bg-night-800"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-56">
          <h2 className="mb-3 font-heading text-lg text-teal-900 dark:text-cream">
            {t("adminNav.admin")}
          </h2>
          <nav className="grid grid-cols-3 gap-1 lg:flex lg:flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={linkClass}
              >
                <link.icon className="size-4 shrink-0" />
                <span className="truncate">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
