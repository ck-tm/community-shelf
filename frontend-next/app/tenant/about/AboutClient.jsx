"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Clock, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import { pinFriendlyUrl } from "@/utils/maps";

export default function About() {
  const { descriptionPage, siteConfig } = useData();
  const { t } = useTranslation();
  const l = useLocalize();

  const page = descriptionPage || {};
  const libraryName = l(siteConfig, "title") || siteConfig.title || "Library";

  const hasLocation = siteConfig.address || siteConfig.city;
  const locationParts = [siteConfig.address, siteConfig.city, siteConfig.country].filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          {l(page, "title") || t("aboutPage.aboutTitle", { name: libraryName })}
        </h1>
        {(l(page, "subtitle") || siteConfig.description) && (
          <p className="mt-4 text-lg leading-relaxed text-sand-500 dark:text-night-400">
            {l(page, "subtitle") || l(siteConfig, "description")}
          </p>
        )}
      </div>

      {/* Mission / Description */}
      {l(page, "mission") && (
        <div
          className="mt-10 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 sm:p-8 dark:bg-night-900 dark:ring-night-700/50"
          style={{ animation: "fade-up 0.5s ease-out 0.1s both" }}
        >
          <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
            {t("aboutPage.mission")}
          </h2>
          <p className="mt-3 leading-relaxed text-sand-500 dark:text-night-400">
            {l(page, "mission")}
          </p>
        </div>
      )}

      {/* Body content */}
      {l(page, "body") && (
        <div
          className="prose prose-sand dark:prose-invert mt-10 max-w-none"
          style={{ animation: "fade-up 0.5s ease-out 0.15s both" }}
          dangerouslySetInnerHTML={{ __html: l(page, "body") }}
        />
      )}

      {/* Info cards: Hours & Location */}
      <div
        className="mt-12 grid gap-6 sm:grid-cols-2"
        style={{ animation: "fade-up 0.5s ease-out 0.2s both" }}
      >
        {/* Hours */}
        {l(page, "hours") && (
          <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <div className="mb-4 flex items-center gap-2 text-teal-800 dark:text-teal-400">
              <Clock className="size-5" />
              <h2 className="font-heading text-lg">{t("aboutPage.howItWorks")}</h2>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-sand-500 dark:text-night-400">
              {l(page, "hours")}
            </p>
          </div>
        )}

        {/* Location */}
        {hasLocation && (
          <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <div className="mb-4 flex items-center gap-2 text-teal-800 dark:text-teal-400">
              <MapPin className="size-5" />
              <h2 className="font-heading text-lg">{t("aboutPage.visitUs")}</h2>
            </div>
            <p className="text-sm leading-relaxed text-sand-500 dark:text-night-400">
              {locationParts.join(", ")}
            </p>
            {siteConfig.googleMapsUrl && (
              <a
                href={pinFriendlyUrl(siteConfig.googleMapsUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
              >
                <ExternalLink className="size-3.5" />
                {t("aboutPage.viewOnMap")}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Contact info */}
      {(siteConfig.email || siteConfig.phone) && (
        <div
          className="mt-8 grid gap-6 sm:grid-cols-2"
          style={{ animation: "fade-up 0.5s ease-out 0.25s both" }}
        >
          {siteConfig.email && (
            <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
              <div className="mb-3 flex items-center gap-2 text-teal-800 dark:text-teal-400">
                <Mail className="size-5" />
                <h2 className="font-heading text-lg">{t("tenantContact.email")}</h2>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-sand-500 transition hover:text-teal-700 dark:text-night-400 dark:hover:text-teal-400"
              >
                {siteConfig.email}
              </a>
            </div>
          )}
          {siteConfig.phone && (
            <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
              <div className="mb-3 flex items-center gap-2 text-teal-800 dark:text-teal-400">
                <Phone className="size-5" />
                <h2 className="font-heading text-lg">{siteConfig.phone}</h2>
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-sm text-sand-500 transition hover:text-teal-700 dark:text-night-400 dark:hover:text-teal-400"
              >
                {siteConfig.phone}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Visit Us CTA */}
      {hasLocation && (
        <div
          className="mt-14 text-center"
          style={{ animation: "fade-up 0.5s ease-out 0.3s both" }}
        >
          <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
            {t("aboutPage.visitUs")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sand-500 dark:text-night-400">
            {t("aboutPage.browseOffer")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {siteConfig.googleMapsUrl && (
              <a
                href={pinFriendlyUrl(siteConfig.googleMapsUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                <MapPin className="size-4" />
                {t("aboutPage.viewOnMap")}
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-sand-200 px-6 py-3 text-sm font-semibold text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-700"
            >
              <Mail className="size-4" />
              {t("tenantContact.title")}
            </Link>
          </div>
        </div>
      )}

      {/* Back link */}
      <div
        className="mt-14 border-t border-sand-200/60 pt-8 dark:border-night-800"
        style={{ animation: "fade-up 0.5s ease-out 0.35s both" }}
      >
        <Link
          href="/"
          className="text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
        >
          &larr; {t("aboutPage.browseCollection")}
        </Link>
      </div>
    </div>
  );
}
