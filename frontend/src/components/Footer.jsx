import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TENANT_SLUG } from "../api/client";
import { useData } from "../context/DataContext";

function TenantFooterInfo() {
  const { siteConfig } = useData();
  const { t } = useTranslation();

  const hasLocation = siteConfig.address || siteConfig.city;
  if (!hasLocation) return null;

  const locationParts = [siteConfig.city, siteConfig.country].filter(Boolean).join(", ");

  return (
    <div className="mb-4 flex items-start gap-2 text-xs text-sand-500 dark:text-night-400">
      <MapPin className="mt-0.5 size-3.5 shrink-0 text-teal-700 dark:text-teal-400" />
      <div>
        {siteConfig.address && (
          <p>
            {siteConfig.googleMapsUrl ? (
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-teal-800 dark:hover:text-teal-400"
              >
                {siteConfig.address}
              </a>
            ) : (
              siteConfig.address
            )}
          </p>
        )}
        {locationParts && <p>{locationParts}</p>}
      </div>
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-sand-200/60 dark:border-night-800">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {TENANT_SLUG && <TenantFooterInfo />}
        <div className="flex items-center justify-between">
          <p className="text-xs text-sand-500 dark:text-night-400">
            &copy; {new Date().getFullYear()} {t("footer.brand")}
          </p>
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
      </div>
    </footer>
  );
}
