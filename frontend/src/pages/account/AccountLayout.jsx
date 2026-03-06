import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, UserCog } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AccountLayout() {
  const { t } = useTranslation();

  const links = [
    { to: "/account", label: t("account.myRentals"), icon: BookOpen, end: true },
    { to: "/account/details", label: t("account.myDetails"), icon: UserCog },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-teal-700/10 text-teal-800 dark:bg-teal-400/10 dark:text-teal-400"
        : "text-sand-500 hover:text-teal-800 hover:bg-warm dark:text-night-400 dark:hover:text-teal-400 dark:hover:bg-night-800"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-56">
          <h2 className="mb-4 font-heading text-lg text-teal-900 dark:text-cream">
            {t("account.myAccount")}
          </h2>
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={linkClass}
              >
                <link.icon className="size-4" />
                {link.label}
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
