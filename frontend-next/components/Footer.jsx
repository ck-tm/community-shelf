"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { pinFriendlyUrl } from "@/utils/maps";

function TenantLocationLink({ siteConfig }) {
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
    <a href={pinFriendlyUrl(siteConfig.googleMapsUrl)} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

const linkClass =
  "text-xs text-sand-400 transition hover:text-teal-800 dark:text-night-500 dark:hover:text-teal-400";

export default function Footer({ isTenant = false, siteConfig = null }) {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-sand-200/60 dark:border-night-800">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          {/* Copyright + made by */}
          <div className="text-xs text-sand-400 dark:text-night-500">
            <p>&copy; {new Date().getFullYear()} {t("footer.brand")}</p>
            <p className="mt-0.5">
              {t("footer.madeWith")}{" "}
              <a
                href="https://costico.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sand-500 transition hover:text-teal-700 dark:text-night-400 dark:hover:text-teal-400"
              >
                costico.eu
              </a>
            </p>
          </div>

          {/* Address (tenant only) */}
          {isTenant && siteConfig && <TenantLocationLink siteConfig={siteConfig} />}

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/contact" className={linkClass}>
              {t("footer.contact")}
            </Link>
            <span className="text-sand-200 dark:text-night-800">·</span>
            <Link href="/terms" className={linkClass}>
              {t("footer.terms")}
            </Link>
            <span className="text-sand-200 dark:text-night-800">·</span>
            <Link href="/privacy" className={linkClass}>
              {t("footer.privacy")}
            </Link>
            <span className="text-sand-200 dark:text-night-800">·</span>
            <Link href="/copyright" className={linkClass}>
              {t("footer.copyright")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
