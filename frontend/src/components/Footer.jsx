import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TENANT_SLUG } from "../api/client";
import { useData } from "../context/DataContext";

function TenantLocationLink() {
  const { siteConfig } = useData();

  const hasLocation = siteConfig.address || siteConfig.city;
  if (!hasLocation) return null;

  const parts = [siteConfig.address, siteConfig.city, siteConfig.country].filter(Boolean);
  const label = parts.join(", ");

  const inner = (
    <span className="inline-flex items-center gap-1 text-xs text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400">
      <MapPin className="size-3 shrink-0 text-teal-700 dark:text-teal-400" />
      {label}
    </span>
  );

  return siteConfig.googleMapsUrl ? (
    <a href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-sand-200/60 dark:border-night-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-xs text-sand-500 dark:text-night-400">
          &copy; {new Date().getFullYear()} {t("footer.brand")}
        </p>
        {TENANT_SLUG && <TenantLocationLink />}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="text-xs font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
          >
            {t("footer.contact")}
          </Link>
          <Link
            to="/terms"
            className="text-xs font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
          >
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
