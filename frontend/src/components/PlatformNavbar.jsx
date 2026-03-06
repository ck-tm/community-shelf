import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Library, Sun, Moon, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function PlatformNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-sand-200/60 bg-cream/80 backdrop-blur-md dark:border-night-800/60 dark:bg-night-950/80">
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <LanguageSwitcher />

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="flex size-9 items-center justify-center rounded-full bg-sand-100 text-sand-500 transition hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
            aria-label={dark ? t("nav.lightMode") : t("nav.darkMode")}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

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
        </div>
      </div>
    </nav>
  );
}
