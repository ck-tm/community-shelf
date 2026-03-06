import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Copyright() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          {t("copyright.title")}
        </h1>
        <p className="mt-3 text-sm text-sand-500 dark:text-night-400">
          {t("copyright.lastUpdated", { date: "March 6, 2026" })}
        </p>
        <p className="mt-6 leading-relaxed text-sand-500 dark:text-night-400">
          {t("copyright.intro")}
        </p>
      </div>

      <div className="mt-10 space-y-10">
        <section style={{ animation: "fade-up 0.5s ease-out 0.1s both" }}>
          <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
            {t("copyright.section1Title")}
          </h2>
          <p className="mt-3 leading-relaxed text-sand-500 dark:text-night-400">
            {t("copyright.section1p1")}
          </p>
        </section>

        <section style={{ animation: "fade-up 0.5s ease-out 0.14s both" }}>
          <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
            {t("copyright.section2Title")}
          </h2>
          <p className="mt-3 leading-relaxed text-sand-500 dark:text-night-400">
            {t("copyright.section2p1")}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sand-500 dark:text-night-400">
            {t("copyright.reportList", { returnObjects: true }).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-sand-500 dark:text-night-400">
            {t("copyright.sendTo")}{" "}
            <a href="mailto:contact@costico.eu" className="font-medium text-teal-700 hover:text-teal-900 dark:text-teal-400">
              contact@costico.eu
            </a>
          </p>
        </section>

        <section style={{ animation: "fade-up 0.5s ease-out 0.18s both" }}>
          <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
            {t("copyright.section3Title")}
          </h2>
          <p className="mt-3 leading-relaxed text-sand-500 dark:text-night-400">
            {t("copyright.section3p1")}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sand-500 dark:text-night-400">
            {t("copyright.responseList", { returnObjects: true }).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div
        className="mt-14 border-t border-sand-200/60 pt-8 dark:border-night-800"
        style={{ animation: "fade-up 0.5s ease-out 0.3s both" }}
      >
        <Link
          to="/"
          className="text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
        >
          &larr; {t("copyright.backHome")}
        </Link>
      </div>
    </div>
  );
}
