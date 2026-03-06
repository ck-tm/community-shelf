import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Library, Sun, Moon, LogOut, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function PlatformNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    document.title = t("nav.pageTitle");
  }, [t]);

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

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 border-b border-sand-200/60 bg-cream/80 backdrop-blur-md dark:border-night-800/60 dark:bg-night-950/80"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm dark:bg-teal-700">
            <Library className="size-[18px]" />
          </div>
          <span className="font-heading text-xl text-teal-900 dark:text-cream">
            {t("nav.brand")}
          </span>
        </Link>

        {/* Desktop right side */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            to="/contact"
            className="rounded-xl px-3 py-2 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-cream"
          >
            {t("nav.contact")}
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                {t("nav.dashboard")}
              </Link>
              <button
                onClick={handleLogout}
                className="flex size-9 items-center justify-center rounded-full text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
                aria-label={t("nav.signOut")}
              >
                <LogOut className="size-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-cream"
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                {t("nav.createLibrary")}
              </Link>
            </>
          )}

          <button
            onClick={() => setDark(!dark)}
            className="flex size-9 items-center justify-center rounded-full bg-sand-100 text-sand-500 transition hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
            aria-label={dark ? t("nav.lightMode") : t("nav.darkMode")}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
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
            <Link
              to="/contact"
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:text-cream dark:hover:bg-night-800"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:text-cream dark:hover:bg-night-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="size-4" /> {t("nav.signOut")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:text-cream dark:hover:bg-night-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="block rounded-xl bg-teal-700 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.createLibrary")}
                </Link>
              </>
            )}
          </div>

          {/* Theme & Language */}
          <div className="mt-3 flex items-center justify-between border-t border-sand-200/60 px-4 pt-3 dark:border-night-800">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
            >
              {dark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
              {dark ? t("nav.lightMode") : t("nav.darkMode")}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
