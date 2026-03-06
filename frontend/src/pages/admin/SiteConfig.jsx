import { useState, useRef, useEffect } from "react";
import { Check, Library, Upload, X, RotateCcw, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "../../context/DataContext";

const DEFAULT_THEME_COLORS = {
  "teal-600": "#0d9488",
  "teal-700": "#0d7377",
  "teal-800": "#0a5c5f",
  "teal-900": "#074e52",
  cream: "#f8f4ed",
  warm: "#f3ede4",
  "amber-500": "#f5a623",
};

const PRESET_THEMES = [
  {
    key: "Teal",
    colors: {
      "teal-600": "#0d9488",
      "teal-700": "#0d7377",
      "teal-800": "#0a5c5f",
      "teal-900": "#074e52",
      cream: "#f8f4ed",
      warm: "#f3ede4",
      "amber-500": "#f5a623",
    },
  },
  {
    key: "Indigo",
    colors: {
      "teal-600": "#5b6db4",
      "teal-700": "#445299",
      "teal-800": "#2f3d7a",
      "teal-900": "#1e2851",
      cream: "#faf8f5",
      warm: "#f4f0e8",
      "amber-500": "#d4a574",
    },
  },
  {
    key: "Sage",
    colors: {
      "teal-600": "#5b8b6f",
      "teal-700": "#44705a",
      "teal-800": "#2f5a47",
      "teal-900": "#1d3d31",
      cream: "#faf8f5",
      warm: "#f3f0eb",
      "amber-500": "#c9a876",
    },
  },
  {
    key: "Burgundy",
    colors: {
      "teal-600": "#a04857",
      "teal-700": "#843d47",
      "teal-800": "#6a3339",
      "teal-900": "#4d232d",
      cream: "#faf8f6",
      warm: "#f4f0ed",
      "amber-500": "#d4a574",
    },
  },
  {
    key: "Terracotta",
    colors: {
      "teal-600": "#b87654",
      "teal-700": "#9b6341",
      "teal-800": "#7f5133",
      "teal-900": "#5c3a23",
      cream: "#faf8f5",
      warm: "#f4f0eb",
      "amber-500": "#d4a574",
    },
  },
];


const THEME_COLOR_LABELS = [
  { key: "teal-600", tKey: "primary", group: "primary" },
  { key: "teal-700", tKey: "primaryDark", group: "primary" },
  { key: "teal-800", tKey: "primaryDarker", group: "primary" },
  { key: "teal-900", tKey: "primaryDarkest", group: "primary" },
  { key: "cream", tKey: "background", group: "surface" },
  { key: "warm", tKey: "surface", group: "surface" },
  { key: "amber-500", tKey: "accent", group: "accent" },
];

const COLOR_GROUPS = [
  { key: "primary", tKey: "primary" },
  { key: "surface", tKey: "backgrounds" },
  { key: "accent", tKey: "accent" },
];

export default function SiteConfig() {
  const { t } = useTranslation();
  const { siteConfig, updateSiteConfig } = useData();
  const [form, setForm] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  // Sync form from context once it loads (or on first render if already loaded)
  useEffect(() => {
    if (!dirty && siteConfig.title) {
      setForm({ ...siteConfig, themeColors: { ...siteConfig.themeColors } });
    }
  }, [siteConfig, dirty]);
  const fileRef = useRef(null);

  const update = (patch) => { setForm((f) => ({ ...f, ...patch })); setDirty(true); };
  const set = (key) => (e) => update({ [key]: e.target.value });

  const setColor = (key) => (e) =>
    update({ themeColors: { ...form.themeColors, [key]: e.target.value } });

  const resetColors = () =>
    update({ themeColors: { ...DEFAULT_THEME_COLORS } });

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ logo: ev.target.result });
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    update({ logo: "" });
    if (fileRef.current) fileRef.current.value = "";
  };

  if (!form) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSiteConfig(form);
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save site config:", err);
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
          {t("siteConfig.title")}
        </h1>
        <p className="mt-1 text-sand-500 dark:text-night-400">
          {t("siteConfig.subtitle")}
        </p>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        {/* Logo Upload */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("siteConfig.logo")}
          </label>
          <div className="flex items-center gap-4">
            {/* Preview thumbnail */}
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm dark:bg-teal-700">
              {form.logo ? (
                <img
                  src={form.logo}
                  alt="Logo"
                  className="size-8 rounded-lg object-contain"
                />
              ) : (
                <Library className="size-6" />
              )}
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sand-100 px-3 py-2 text-xs font-semibold text-sand-500 transition hover:bg-sand-200 dark:bg-night-800 dark:text-night-400 dark:hover:bg-night-700"
              >
                <Upload className="size-3.5" />
                {t("siteConfig.uploadImage")}
              </button>
              {form.logo && (
                <button
                  type="button"
                  onClick={removeLogo}
                  className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X className="size-3.5" />
                  {t("siteConfig.remove")}
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-sand-300 dark:text-night-500">
            {t("siteConfig.logoHint")}
          </p>
        </div>

        {/* Site Title */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("siteConfig.siteTitle")} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={set("title")}
            required
            className={inputClass}
          />
        </div>

        {/* Site Title (RO) */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("siteConfig.siteTitleRo")}
          </label>
          <input
            type="text"
            value={form.titleRo || ""}
            onChange={set("titleRo")}
            placeholder={t("siteConfig.roPlaceholder")}
            className={inputClass}
          />
        </div>

        {/* Site Description */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("siteConfig.siteDescription")}
          </label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={3}
            placeholder={t("siteConfig.descPlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Site Description (RO) */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
            {t("siteConfig.siteDescriptionRo")}
          </label>
          <textarea
            value={form.descriptionRo || ""}
            onChange={set("descriptionRo")}
            rows={3}
            placeholder={t("siteConfig.roPlaceholder")}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Theme Colors */}
        <div className="border-t border-sand-200/60 pt-5 dark:border-night-700/50">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              {t("siteConfig.themeColors")}
            </label>
            <button
              type="button"
              onClick={resetColors}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
            >
              <RotateCcw className="size-3" />
              {t("siteConfig.reset")}
            </button>
          </div>

          {/* Preset themes */}
          <div className="mb-5">
            <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-500">
              <Palette className="size-3" />
              {t("siteConfig.quickPresets")}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {PRESET_THEMES.map((preset) => {
                const isActive =
                  form.themeColors["teal-900"] === preset.colors["teal-900"] &&
                  form.themeColors["cream"] === preset.colors["cream"];
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => update({ themeColors: { ...preset.colors } })}
                    className={`group relative rounded-xl p-2.5 text-left transition ring-1 ${
                      isActive
                        ? "ring-2 ring-teal-600 bg-cream dark:ring-teal-400 dark:bg-night-800"
                        : "ring-sand-200/60 bg-cream hover:ring-sand-300 dark:ring-night-700 dark:bg-night-800 dark:hover:ring-night-600"
                    }`}
                  >
                    {/* Color dots */}
                    <div className="mb-2 flex gap-1">
                      {["teal-900", "teal-700", "teal-600", "amber-500"].map(
                        (k) => (
                          <div
                            key={k}
                            className="size-5 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: preset.colors[k] }}
                          />
                        )
                      )}
                      <div
                        className="size-5 rounded-full ring-1 ring-black/10"
                        style={{ backgroundColor: preset.colors.cream }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-teal-900 dark:text-cream">
                      {t(`siteConfig.preset${preset.key}`)}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-sand-500 dark:text-night-400">
                      {t(`siteConfig.preset${preset.key}Desc`)}
                    </p>
                    {isActive && (
                      <div className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-teal-600 text-white dark:bg-teal-400 dark:text-night-950">
                        <Check className="size-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {COLOR_GROUPS.map((group) => (
              <div key={group.key}>
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-500">
                  {t(`siteConfig.${group.tKey}`)}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {THEME_COLOR_LABELS.filter((c) => c.group === group.key).map(
                    (color) => (
                      <div key={color.key} className="flex items-center gap-2.5">
                        <label className="relative">
                          <input
                            type="color"
                            value={form.themeColors[color.key]}
                            onChange={setColor(color.key)}
                            className="absolute inset-0 size-full cursor-pointer opacity-0"
                          />
                          <div
                            className="size-9 shrink-0 rounded-lg ring-1 ring-sand-200/70 transition-shadow hover:ring-2 hover:ring-teal-600/30 dark:ring-night-700"
                            style={{ backgroundColor: form.themeColors[color.key] }}
                          />
                        </label>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-teal-900 dark:text-cream">
                            {t(`siteConfig.${color.tKey}`)}
                          </p>
                          <p className="text-[11px] uppercase tracking-wide text-sand-300 dark:text-night-500">
                            {form.themeColors[color.key]}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {t("siteConfig.saveConfig")}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400">
              <Check className="size-4" /> {t("siteConfig.saved")}
            </span>
          )}
        </div>
      </form>

      {/* Preview */}
      <div
        className="mt-6 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}
      >
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
          {t("siteConfig.preview")}
        </h2>
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm dark:bg-teal-700">
            {form.logo ? (
              <img
                src={form.logo}
                alt="Logo"
                className="size-5 object-contain"
              />
            ) : (
              <Library className="size-[18px]" />
            )}
          </div>
          <span className="font-heading text-xl text-teal-900 dark:text-cream">
            {form.title || "CommunityShelf"}
          </span>
        </div>
        {form.description && (
          <p className="mt-3 text-sm italic text-sand-500 dark:text-night-400">
            {form.description}
          </p>
        )}
      </div>
    </div>
  );
}
