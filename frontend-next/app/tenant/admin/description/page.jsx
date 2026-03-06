"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";

export default function DescriptionPageAdmin() {
  const { descriptionPage, updateDescriptionPage } = useData();
  const { t } = useTranslation();

  const [form, setForm] = useState(() => ({
    pageTitle: descriptionPage?.pageTitle || "",
    pageTitleRo: descriptionPage?.pageTitleRo || "",
    body: descriptionPage?.body || "",
    bodyRo: descriptionPage?.bodyRo || "",
    missionTitle: descriptionPage?.missionTitle || "",
    missionTitleRo: descriptionPage?.missionTitleRo || "",
    missionBody: descriptionPage?.missionBody || "",
    missionBodyRo: descriptionPage?.missionBodyRo || "",
  }));

  const [saving, setSaving] = useState(false);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDescriptionPage(form);
    } catch {
      // error handled by context
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";
  const labelClass = "block text-sm font-medium text-teal-900 dark:text-cream mb-1.5";

  return (
    <div>
      <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">{t("descriptionPage.title")}</h1>

      {/* Page Title & Body */}
      <div className="mt-6 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <h2 className="mb-4 text-lg font-semibold text-teal-900 dark:text-cream">{t("descriptionPage.subtitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("descriptionPage.pageTitle")}</label>
            <input value={form.pageTitle} onChange={(e) => set("pageTitle", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("descriptionPage.pageTitleRo")}</label>
            <input value={form.pageTitleRo} onChange={(e) => set("pageTitleRo", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("descriptionPage.body")}</label>
            <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={6} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("descriptionPage.bodyRo")}</label>
            <textarea value={form.bodyRo} onChange={(e) => set("bodyRo", e.target.value)} rows={6} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <h2 className="mb-4 text-lg font-semibold text-teal-900 dark:text-cream">{t("descriptionPage.missionTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("descriptionPage.missionTitle")}</label>
            <input value={form.missionTitle} onChange={(e) => set("missionTitle", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("descriptionPage.missionTitleRo")}</label>
            <input value={form.missionTitleRo} onChange={(e) => set("missionTitleRo", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("descriptionPage.missionText")}</label>
            <textarea value={form.missionBody} onChange={(e) => set("missionBody", e.target.value)} rows={6} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("descriptionPage.missionTextRo")}</label>
            <textarea value={form.missionBodyRo} onChange={(e) => set("missionBodyRo", e.target.value)} rows={6} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {t("descriptionPage.save")}
        </button>
      </div>
    </div>
  );
}
