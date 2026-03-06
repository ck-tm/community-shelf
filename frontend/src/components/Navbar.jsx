import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Library, Settings, Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useLocalize } from "../hooks/useLocalize";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { siteConfig } = useData();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const l = useLocalize();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    document.title = `${l(siteConfig, "title")} — ${l(siteConfig, "description")}`;
  }, [siteConfig.title, l, siteConfig]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-teal-800 dark:text-teal-400"
        : "text-sand-500 hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-teal-50 text-teal-800 dark:bg-teal-800/30 dark:text-teal-300"
        : "text-sand-500 hover:bg-sand-100 dark:text-cream dark:hover:bg-night-800"
    }`;

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 border-b border-sand-200/60 bg-cream/85 backdrop-blur-xl transition-colors duration-300 dark:border-white/5 dark:bg-night-950/90"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:scale-[1.03] dark:bg-teal-700">
            {siteConfig.logo ? (
              <img src={siteConfig.logo} alt="Logo" className="size-5 object-contain" />
            ) : (
              <Library className="size-[18px]" />
            )}
          </div>
          <span className=" font-heading text-xl text-teal-900 sm:inline dark:text-cream">
            {l(siteConfig, "title")}
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-5 sm:flex sm:gap-7">
          <NavLink to="/" end className={linkClass}>{t("tenantNav.browse")}</NavLink>
          <NavLink to="/lists" className={linkClass}>{t("tenantNav.lists")}</NavLink>
          <NavLink to="/about" className={linkClass}>{t("tenantNav.about")}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t("tenantNav.contact")}</NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `flex size-9 items-center justify-center rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-teal-800 text-white dark:bg-teal-700"
                      : "bg-sand-100 text-sand-500 hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
                  }`
                }
                aria-label={t("tenantNav.myAccount")}
              >
                <User className="size-4" />
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex size-9 items-center justify-center rounded-full transition-colors duration-200 ${
                      isActive
                        ? "bg-teal-800 text-white dark:bg-teal-700"
                        : "bg-sand-100 text-sand-500 hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
                    }`
                  }
                  aria-label={t("tenantNav.admin")}
                >
                  <Settings className="size-4" />
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="flex size-9 items-center justify-center rounded-full bg-sand-100 text-sand-500 transition-colors duration-200 hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
                aria-label={t("tenantNav.signOut")}
              >
                <LogOut className="size-4" />
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              {t("tenantNav.login")}
            </NavLink>
          )}

          <button
            onClick={() => setDark(!dark)}
            className="flex size-9 items-center justify-center rounded-full bg-sand-100 transition-all duration-200 hover:bg-sand-200 dark:bg-night-800 dark:hover:bg-night-700"
            aria-label={dark ? t("tenantNav.lightMode") : t("tenantNav.darkMode")}
          >
            {dark ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-sand-500" />
            )}
          </button>

          <LanguageSwitcher />
        </div>

        {/* Mobile: burger only */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-9 items-center justify-center rounded-full bg-sand-100 text-sand-500 transition hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-sand-200/60 bg-cream/95 px-4 pb-4 pt-2 backdrop-blur-xl dark:border-white/5 dark:bg-night-950/95 sm:hidden">
          <div className="space-y-1">
            <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>{t("tenantNav.browse")}</NavLink>
            <NavLink to="/lists" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>{t("tenantNav.lists")}</NavLink>
            <NavLink to="/about" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>{t("tenantNav.about")}</NavLink>
            <NavLink to="/contact" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>{t("tenantNav.contact")}</NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/account" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                  {t("tenantNav.myAccount")}
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                    {t("tenantNav.adminPanel")}
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="size-4" /> {t("tenantNav.signOut")}
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="block rounded-xl bg-teal-700 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
                onClick={() => setMenuOpen(false)}
              >
                {t("tenantNav.login")}
              </NavLink>
            )}
          </div>

          {/* Theme & Language */}
          <div className="mt-3 flex items-center justify-between border-t border-sand-200/60 px-4 pt-3 dark:border-night-800">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
            >
              {dark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
              {dark ? t("tenantNav.lightMode") : t("tenantNav.darkMode")}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
