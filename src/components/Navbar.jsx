import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Library, User, Sun, Moon } from "lucide-react";

export default function Navbar() {
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

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-teal-800 dark:text-teal-400"
        : "text-sand-400 hover:text-teal-800 dark:text-night-600 dark:hover:text-teal-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-sand-200/60 bg-cream/85 backdrop-blur-xl transition-colors duration-300 dark:border-white/5 dark:bg-night-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:scale-[1.03] dark:bg-teal-700">
            <Library className="size-[18px]" />
          </div>
          <span className="hidden font-heading text-xl text-teal-900 sm:inline dark:text-cream">
            CityShelf
          </span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <NavLink to="/" end className={linkClass}>
            Browse
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="flex size-9 items-center justify-center rounded-full bg-sand-100 transition-all duration-200 hover:bg-sand-200 dark:bg-night-800 dark:hover:bg-night-700"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-sand-400" />
            )}
          </button>

          <button className="flex size-9 items-center justify-center rounded-full bg-sand-100 transition-colors duration-200 hover:bg-sand-200 dark:bg-night-800 dark:hover:bg-night-700">
            <User className="size-4 text-sand-400 dark:text-night-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
