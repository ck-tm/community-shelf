import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  function switchTo(lng) {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  }

  return (
    <div className="flex items-center overflow-hidden rounded-full bg-sand-100 text-xs font-semibold dark:bg-night-800">
      <button
        onClick={() => switchTo("ro")}
        className={`px-2.5 py-1.5 transition ${
          current === "ro"
            ? "bg-teal-700 text-white dark:bg-teal-600"
            : "text-sand-500 hover:text-teal-800 dark:text-night-400 dark:hover:text-cream"
        }`}
      >
        RO
      </button>
      <button
        onClick={() => switchTo("en")}
        className={`px-2.5 py-1.5 transition ${
          current === "en"
            ? "bg-teal-700 text-white dark:bg-teal-600"
            : "text-sand-500 hover:text-teal-800 dark:text-night-400 dark:hover:text-cream"
        }`}
      >
        EN
      </button>
    </div>
  );
}
