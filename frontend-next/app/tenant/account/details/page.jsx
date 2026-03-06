"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function MyDetails() {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-warm px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div>
      <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">
        {t("details.title")}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              {t("details.firstName")}
            </label>
            <input
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              {t("details.lastName")}
            </label>
            <input
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("details.email")}
          </label>
          <input
            value={user?.email || ""}
            disabled
            className={`${inputClass} cursor-not-allowed opacity-60`}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("details.phone")}
          </label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("details.address")}
          </label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            {t("details.saveChanges")}
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="size-4" />
              {t("details.saved")}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
