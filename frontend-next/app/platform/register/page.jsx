"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Library, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function PlatformRegister() {
  const { register, error, clearError } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(email, password1, password2);
    setLoading(false);
    if (success) router.push("/dashboard");
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-warm px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm" style={{ animation: "fade-up 0.6s ease-out both" }}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-teal-800 text-white dark:bg-teal-700">
            <Library className="size-7" />
          </div>
          <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
            {t("auth.createAccount")}
          </h1>
          <p className="mt-2 text-sm text-sand-500 dark:text-night-400">
            {t("auth.joinSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError(); }}
            placeholder={t("auth.email")}
            required
            className={inputClass}
          />
          <input
            type="password"
            value={password1}
            onChange={(e) => { setPassword1(e.target.value); clearError(); }}
            placeholder={t("auth.password")}
            required
            className={inputClass}
          />
          <input
            type="password"
            value={password2}
            onChange={(e) => { setPassword2(e.target.value); clearError(); }}
            placeholder={t("auth.confirmPassword")}
            required
            className={inputClass}
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? t("auth.creatingAccount") : t("auth.createAccountBtn")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-sand-500 dark:text-night-400">
          {t("auth.hasAccount")}{" "}
          <Link href="/login" className="font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400">
            {t("auth.signInLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
