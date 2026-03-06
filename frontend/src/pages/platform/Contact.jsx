import { useEffect, useRef, useState, useCallback } from "react";
import { Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { platformApi } from "../../api/endpoints";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Load Turnstile script and render widget
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (
        window.turnstile &&
        turnstileRef.current &&
        widgetIdRef.current === null
      ) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
        });
      }
    };

    // Try immediately, then poll until script loads
    renderWidget();
    const interval = setInterval(() => {
      if (window.turnstile) {
        renderWidget();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [success]);

  const resetForm = useCallback(() => {
    setForm({
      name: "",
      email: "",
      category: "general",
      subject: "",
      message: "",
    });
    setTurnstileToken("");
    setError(null);
    setFieldErrors({});
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
    widgetIdRef.current = null;
    setSuccess(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError(t("contact.turnstileError"));
      return;
    }

    setSubmitting(true);
    try {
      await platformApi.submitContact({
        ...form,
        turnstile_token: turnstileToken || "dev-bypass",
      });
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
      // Reset turnstile on error
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm text-teal-900 ring-1 ring-sand-200 placeholder:text-sand-300 focus:outline-none focus:ring-2 focus:ring-teal-700/50 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-500 dark:focus:ring-teal-400/50";

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div
          className="mb-10 text-center"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-teal-700/10 dark:bg-teal-400/10">
            <MessageSquare className="size-7 text-teal-700 dark:text-teal-400" />
          </div>
          <h1 className="font-heading text-4xl text-teal-900 dark:text-cream">
            {t("contact.title")}
          </h1>
          <p className="mt-3 text-sand-500 dark:text-night-400">
            {t("contact.subtitle")}
          </p>
        </div>

        {success ? (
          /* ── Success State ── */
          <div
            className="rounded-2xl bg-teal-700/5 p-10 text-center ring-1 ring-teal-700/10 dark:bg-teal-400/5 dark:ring-teal-400/10"
            style={{ animation: "fade-up 0.6s ease-out both" }}
          >
            <CheckCircle2 className="mx-auto mb-4 size-12 text-teal-700 dark:text-teal-400" />
            <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
              {t("contact.successTitle")}
            </h2>
            <p className="mt-2 text-sand-500 dark:text-night-400">
              {t("contact.successMessage")}
            </p>
            <button
              onClick={resetForm}
              className="mt-6 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              {t("contact.sendAnother")}
            </button>
          </div>
        ) : (
          /* ── Form ── */
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
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder={t("contact.namePlaceholder")}
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
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder={t("contact.emailPlaceholder")}
                    className={inputClass}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                  {t("contact.category")}
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="general">
                    {t("contact.categoryGeneral")}
                  </option>
                  <option value="feature">
                    {t("contact.categoryFeature")}
                  </option>
                  <option value="bug">{t("contact.categoryBug")}</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                  {t("contact.subject")}
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder={t("contact.subjectPlaceholder")}
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
                  {t("contact.message")}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder={t("contact.messagePlaceholder")}
                  className={`${inputClass} resize-none`}
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Turnstile widget */}
              {TURNSTILE_SITE_KEY && (
                <div className="flex justify-center">
                  <div ref={turnstileRef} />
                </div>
              )}
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
                  ? t("contact.submitting")
                  : t("contact.submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
