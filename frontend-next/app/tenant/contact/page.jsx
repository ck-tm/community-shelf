"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle, Loader2, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import { publicApi } from "@/lib/endpoints";
import { pinFriendlyUrl } from "@/utils/maps";

export default function TenantContact() {
  const { siteConfig } = useData();
  const { t } = useTranslation();
  const l = useLocalize();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const hasLocation = siteConfig.address || siteConfig.city;
  const locationParts = [siteConfig.address, siteConfig.city, siteConfig.country].filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await publicApi.submitTenantContact(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-warm px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="text-center" style={{ animation: "fade-up 0.6s ease-out both" }}>
          <CheckCircle className="mx-auto mb-4 size-16 text-emerald-500" />
          <h2 className="font-heading text-3xl text-teal-900 dark:text-cream">
            {t("tenantContact.successTitle")}
          </h2>
          <p className="mt-3 text-sand-500 dark:text-night-400">
            {t("tenantContact.successMessage")}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", subject: "", message: "" });
            }}
            className="mt-6 inline-block text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400"
          >
            {t("tenantContact.sendAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          {t("tenantContact.title")}
        </h1>
        <p className="mt-3 text-sand-500 dark:text-night-400">
          {t("tenantContact.subtitle")}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 lg:col-span-3"
          style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("tenantContact.namePlaceholder")}
              required
              className={inputClass}
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t("tenantContact.emailPlaceholder")}
              required
              className={inputClass}
            />
          </div>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder={t("tenantContact.subjectPlaceholder")}
            className={inputClass}
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t("tenantContact.messagePlaceholder")}
            rows={5}
            required
            className={`${inputClass} resize-none`}
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {submitting ? t("tenantContact.submitting") : t("tenantContact.submit")}
          </button>
        </form>

        {/* Sidebar */}
        <div
          className="space-y-6 lg:col-span-2"
          style={{ animation: "fade-up 0.6s ease-out 0.15s both" }}
        >
          {hasLocation && (
            <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
              <div className="mb-3 flex items-center gap-2 text-teal-800 dark:text-teal-400">
                <MapPin className="size-5" />
                <h3 className="font-heading text-base">{t("tenantContact.findUs")}</h3>
              </div>
              <p className="text-sm text-sand-500 dark:text-night-400">
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
                  {t("tenantContact.viewOnMap")}
                </a>
              )}
            </div>
          )}

          {siteConfig.email && (
            <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
              <div className="mb-3 flex items-center gap-2 text-teal-800 dark:text-teal-400">
                <Mail className="size-5" />
                <h3 className="font-heading text-base">{t("tenantContact.email")}</h3>
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
                <h3 className="font-heading text-base">{siteConfig.phone}</h3>
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
      </div>
    </div>
  );
}
