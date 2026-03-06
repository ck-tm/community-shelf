"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * Returns a helper that picks the right language variant of a field.
 *
 * Usage:
 *   const l = useLocalize();
 *   l(type, "name")        → type.nameRo when lang=ro, else type.name
 *   l(siteConfig, "title") → siteConfig.titleRo when lang=ro, else siteConfig.title
 */
export function useLocalize() {
  const { i18n } = useTranslation();

  return useCallback(
    (obj, field) => {
      if (!obj) return "";
      const roKey = field + "Ro";
      if (i18n.language === "ro" && obj[roKey]) return obj[roKey];
      return obj[field] || "";
    },
    [i18n.language]
  );
}
