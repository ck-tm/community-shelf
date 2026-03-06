import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Library } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password1 || !password2) return;
    setSubmitting(true);
    const ok = await register(email, password1, password2);
    setSubmitting(false);
    if (ok) navigate("/", { replace: true });
  };

  // DRF returns field-level errors as { email: [...], password1: [...], ... }
  const fieldErrors = typeof error === "object" && error !== null ? error : {};
  const generalError =
    typeof error === "string"
      ? error
      : fieldErrors.non_field_errors?.[0] || null;

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div
        className="w-full max-w-sm"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-teal-800 text-white shadow-sm">
            <Library className="size-6" />
          </div>
          <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">
            {t("auth.createAccount")}
          </h1>
          <p className="mt-1 text-sm text-sand-500 dark:text-night-400">
            {t("auth.joinSubtitle")}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
        >
          {generalError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {generalError}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              {t("auth.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
              className={inputClass}
              placeholder="you@example.com"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              {t("auth.password")}
            </label>
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              autoComplete="new-password"
              className={inputClass}
              placeholder="••••••••"
            />
            {fieldErrors.password1 && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.password1[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              {t("auth.confirmPassword")}
            </label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              autoComplete="new-password"
              className={inputClass}
              placeholder="••••••••"
            />
            {fieldErrors.password2 && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.password2[0]}
              </p>
            )}
          </div>

          <p className="text-center text-xs leading-relaxed text-sand-500 dark:text-night-400">
            {t("auth.agreeTerms")}{" "}
            <Link
              to="/terms"
              className="font-medium text-teal-700 underline decoration-teal-700/30 hover:text-teal-800 dark:text-teal-400 dark:decoration-teal-400/30"
            >
              {t("auth.termsLink")}
            </Link>
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {submitting ? t("auth.creatingAccount") : t("auth.createAccountBtn")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-sand-500 dark:text-night-400">
          {t("auth.hasAccount")}{" "}
          <Link
            to="/login"
            className="font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400"
          >
            {t("auth.signInLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
