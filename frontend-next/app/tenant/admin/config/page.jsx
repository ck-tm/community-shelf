"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, Save, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";

export default function SiteConfig() {
  const { siteConfig, updateSiteConfig } = useData();
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() => ({
    logo: siteConfig.logo || "",
    title: siteConfig.title || "",
    titleRo: siteConfig.titleRo || "",
    description: siteConfig.description || "",
    descriptionRo: siteConfig.descriptionRo || "",
    primaryColor: siteConfig.themeColors?.primary || "#0D7377",
    accentColor: siteConfig.themeColors?.accent || "#D97706",
    latitude: siteConfig.latitude || "",
    longitude: siteConfig.longitude || "",
    address: siteConfig.address || "",
    addressRo: siteConfig.addressRo || "",
    city: siteConfig.city || "",
    country: siteConfig.country || "",
  }));

  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(siteConfig.logo || "");

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      setLogoPreview(dataUrl);
      set("logo", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteConfig({
        logo: form.logo,
        title: form.title,
        titleRo: form.titleRo,
        description: form.description,
        descriptionRo: form.descriptionRo,
        themeColors: {
          primary: form.primaryColor,
          accent: form.accentColor,
        },
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        address: form.address,
        addressRo: form.addressRo,
        city: form.city,
        country: form.country,
      });
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
      <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">{t("siteConfig.title")}</h1>

      {/* Logo */}
      <div className="mt-6 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <h2 className="mb-4 text-lg font-semibold text-teal-900 dark:text-cream">{t("siteConfig.logo")}</h2>
        <div className="flex items-center gap-6">
          {logoPreview ? (
            <img src={logoPreview} alt="Logo" className="size-20 rounded-xl object-contain" />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-xl bg-sand-100 text-sand-300 dark:bg-night-800 dark:text-night-600">
              <Upload className="size-8" />
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
            >
              {t("siteConfig.uploadImage")}
            </button>
            <p className="mt-1 text-xs text-sand-400 dark:text-night-500">{t("siteConfig.logoHint")}</p>
          </div>
        </div>
      </div>

      {/* Bilingual Title & Description */}
      <div className="mt-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <h2 className="mb-4 text-lg font-semibold text-teal-900 dark:text-cream">{t("siteConfig.siteTitle")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("siteConfig.siteTitle")}</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.siteTitleRo")}</label>
            <input value={form.titleRo} onChange={(e) => set("titleRo", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.siteDescription")}</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.siteDescriptionRo")}</label>
            <textarea value={form.descriptionRo} onChange={(e) => set("descriptionRo", e.target.value)} rows={3} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Theme Colors */}
      <div className="mt-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <h2 className="mb-4 text-lg font-semibold text-teal-900 dark:text-cream">{t("siteConfig.themeColors")}</h2>
        <div className="flex flex-wrap gap-6">
          <div>
            <label className={labelClass}>{t("siteConfig.primary")}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => set("primaryColor", e.target.value)}
                className="size-10 cursor-pointer rounded-lg border-0"
              />
              <span className="text-sm text-sand-500 dark:text-night-400">{form.primaryColor}</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.accent")}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.accentColor}
                onChange={(e) => set("accentColor", e.target.value)}
                className="size-10 cursor-pointer rounded-lg border-0"
              />
              <span className="text-sm text-sand-500 dark:text-night-400">{form.accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-teal-900 dark:text-cream">
          <MapPin className="size-5" /> {t("siteConfig.location")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("siteConfig.address")}</label>
            <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.addressPlaceholder")}</label>
            <input value={form.addressRo} onChange={(e) => set("addressRo", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.city")}</label>
            <input value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.country")}</label>
            <input value={form.country} onChange={(e) => set("country", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.googleMapsUrl")}</label>
            <input type="number" step="any" value={form.latitude} onChange={(e) => set("latitude", e.target.value)} placeholder="46.7712" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("siteConfig.viewOnMap")}</label>
            <input type="number" step="any" value={form.longitude} onChange={(e) => set("longitude", e.target.value)} placeholder="23.6236" className={inputClass} />
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
          {t("siteConfig.saveConfig")}
        </button>
      </div>
    </div>
  );
}
