"use client";

import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle, Send } from "lucide-react";
import { platformApi } from "@/lib/endpoints";

export default function PlatformContact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await platformApi.submitContact(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to send message");
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
            {t("contact.successTitle")}
          </h2>
          <p className="mt-3 text-sand-500 dark:text-night-400">
            {t("contact.successMessage")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          {t("contact.title")}
        </h1>
        <p className="mt-3 text-sand-500 dark:text-night-400">
          {t("contact.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5" style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t("contact.namePlaceholder")}
          required
          className={inputClass}
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={t("contact.emailPlaceholder")}
          required
          className={inputClass}
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t("contact.messagePlaceholder")}
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
          {submitting ? t("contact.submitting") : t("contact.submit")}
        </button>
      </form>
    </div>
  );
}
