import { useState, useCallback } from "react";
import { Send, CheckCircle2, Loader2, MessageSquare, MapPin, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { publicApi } from "../api/endpoints";
import { useData } from "../context/DataContext";

export default function TenantContact() {
  const { t } = useTranslation();
  const { siteConfig } = useData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const hasLocation = siteConfig.address || siteConfig.city;

  const resetForm = useCallback(() => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setError(null);
    setFieldErrors({});
    setSuccess(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      await publicApi.submitTenantContact(form);
      setSuccess(true);
    } catch (err) {
      const body = err.body || {};
      if (typeof body === "object" && !Array.isArray(body)) {
        const fe = {};
        let hasField = false;
        for (const [key, val] of Object.entries(body)) {
          if (key !== "non_field_errors" && key !== "detail") {
            fe[key] = Array.isArray(val) ? val[0] : val;
            hasField = true;
          }
        }
        if (hasField) setFieldErrors(fe);
        if (body.non_field_errors) {
          setError(
            Array.isArray(body.non_field_errors)
              ? body.non_field_errors[0]
              : body.non_field_errors,
          );
        } else if (body.detail) {
          setError(body.detail);
        } else if (!hasField) {
          setError(err.message || "Failed to send message");
        }
      } else {
        setError(err.message || "Failed to send message");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm text-teal-900 ring-1 ring-sand-200 placeholder:text-sand-300 focus:outline-none focus:ring-2 focus:ring-teal-700/50 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-500 dark:focus:ring-teal-400/50";

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div
          className="mb-10 text-center"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-teal-700/10 dark:bg-teal-400/10">
            <MessageSquare className="size-7 text-teal-700 dark:text-teal-400" />
          </div>
          <h1 className="font-heading text-4xl text-teal-900 dark:text-cream">
            {t("tenantContact.title")}
          </h1>
          <p className="mt-3 text-sand-500 dark:text-night-400">
            {t("tenantContact.subtitle")}
          </p>
        </div>

        <div className={hasLocation ? "grid gap-8 lg:grid-cols-3" : ""}>
          {/* Form */}
          <div className={hasLocation ? "lg:col-span-2" : "mx-auto max-w-2xl"}>
            {success ? (
              <div
                className="rounded-2xl bg-teal-700/5 p-10 text-center ring-1 ring-teal-700/10 dark:bg-teal-400/5 dark:ring-teal-400/10"
                style={{ animation: "fade-up 0.6s ease-out both" }}
              >
                <CheckCircle2 className="mx-auto mb-4 size-12 text-teal-700 dark:text-teal-400" />
                <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
                  {t("tenantContact.successTitle")}
                </h2>
                <p className="mt-2 text-sand-500 dark:text-night-400">
                  {t("tenantContact.successMessage")}
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                >
                  {t("tenantContact.sendAnother")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50 sm:p-8"
                style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
              >
                {error && (
                  <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="space-y-5">
                  {/* Name & Email row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("tenantContact.name")}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder={t("tenantContact.namePlaceholder")}
                        className={inputClass}
                      />
                      {fieldErrors.name && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("tenantContact.email")}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder={t("tenantContact.emailPlaceholder")}
                        className={inputClass}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                      {t("tenantContact.subject")}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, subject: e.target.value }))
                      }
                      placeholder={t("tenantContact.subjectPlaceholder")}
                      className={inputClass}
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                      {t("tenantContact.message")}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder={t("tenantContact.messagePlaceholder")}
                      className={`${inputClass} resize-none`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700 sm:w-auto"
                  >
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    {submitting
                      ? t("tenantContact.submitting")
                      : t("tenantContact.submit")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar — Location */}
          {hasLocation && (
            <div
              className="lg:col-span-1"
              style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}
            >
              <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-teal-700/10 dark:bg-teal-400/10">
                  <MapPin className="size-5 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="font-heading text-lg text-teal-900 dark:text-cream">
                  {t("tenantContact.findUs")}
                </h3>
                <div className="mt-3 space-y-1 text-sm leading-relaxed text-sand-500 dark:text-night-400">
                  {siteConfig.address && <p>{siteConfig.address}</p>}
                  {(siteConfig.city || siteConfig.country) && (
                    <p>
                      {[siteConfig.city, siteConfig.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                </div>
                {siteConfig.googleMapsUrl && (
                  <a
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    {t("tenantContact.viewOnMap")}
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
