"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";

export default function DescriptionPageAdmin() {
  const { t } = useTranslation();
  const { descriptionPage, updateDescriptionPage } = useData();
  const [form, setForm] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!dirty && descriptionPage) {
      setForm({ ...descriptionPage });
    }
  }, [descriptionPage, dirty]);

  const update = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
  };
  const set = (key) => (e) => update({ [key]: e.target.value });

  if (!form) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDescriptionPage(form);
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save description page:", err);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-500";

  return (
    <div>
      {/* Header */}
      <div
        className="mb-8"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          {t("descriptionPage.title")}
        </h1>
        <p className="mt-1 text-sand-500 dark:text-night-400">
          {t("descriptionPage.subtitle")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        {/* Page Title */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.pageTitle")}
          </label>
          <input
            type="text"
            value={form.title}
            onChange={set("title")}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.pageTitleRo")}
          </label>
          <input
            type="text"
            value={form.titleRo || ""}
            onChange={set("titleRo")}
            placeholder={t("descriptionPage.roPlaceholder")}
            className={inputClass}
          />
        </div>

        {/* Body */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.body")}
          </label>
          <textarea
            value={form.body || ""}
            onChange={set("body")}
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.bodyRo")}
          </label>
          <textarea
            value={form.bodyRo || ""}
            onChange={set("bodyRo")}
            rows={5}
            placeholder={t("descriptionPage.roPlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Mission Title */}
        <div className="border-t border-sand-200/60 pt-5 dark:border-night-700/50">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.missionTitle")}
          </label>
          <input
            type="text"
            value={form.missionTitle || ""}
            onChange={set("missionTitle")}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.missionTitleRo")}
          </label>
          <input
            type="text"
            value={form.missionTitleRo || ""}
            onChange={set("missionTitleRo")}
            placeholder={t("descriptionPage.roPlaceholder")}
            className={inputClass}
          />
        </div>

        {/* Mission Text */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.missionText")}
          </label>
          <textarea
            value={form.missionText || ""}
            onChange={set("missionText")}
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("descriptionPage.missionTextRo")}
          </label>
          <textarea
            value={form.missionTextRo || ""}
            onChange={set("missionTextRo")}
            rows={5}
            placeholder={t("descriptionPage.roPlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Save */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {t("descriptionPage.save")}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400">
              <Check className="size-4" /> {t("descriptionPage.saved")}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
