"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ initialTheme = "light", children }) {
  const [dark, setDarkState] = useState(initialTheme === "dark");

  // Apply theme class on mount and change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const setDark = useCallback((value) => {
    const isDark = typeof value === "function" ? value(dark) : value;
    setDarkState(isDark);
    // Persist to cookie
    document.cookie = `theme=${isDark ? "dark" : "light"};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), [setDark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
