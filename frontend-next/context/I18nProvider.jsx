"use client";

import { useEffect } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import ro from "@/i18n/ro.json";
import en from "@/i18n/en.json";

// Initialize i18next (singleton — runs once)
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ro: { translation: ro },
      en: { translation: en },
    },
    lng: "ro", // default; overridden by initialLocale prop
    fallbackLng: "ro",
    interpolation: { escapeValue: false },
  });
}

export function I18nProvider({ initialLocale = "ro", children }) {
  // Sync i18next language with server-detected locale
  useEffect(() => {
    if (i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

/**
 * Client-side language change — updates cookie + i18next.
 */
export function changeLanguage(lng) {
  i18n.changeLanguage(lng);
  document.cookie = `lang=${lng};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
}
