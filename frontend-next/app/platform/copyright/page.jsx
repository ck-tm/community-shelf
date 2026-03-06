"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PlatformCopyright() {
  const { t } = useTranslation();

  const SECTIONS = [
    { key: "section1", paragraphs: ["p1"] },
    { key: "section2", paragraphs: ["p1"], list: "reportList" },
    { key: "section3", paragraphs: ["p1"], list: "responseList" },
  ];

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
        {SECTIONS.map((s, i) => (
          <section
            key={s.key}
            style={{
              animation: "fade-up 0.5s ease-out both",
              animationDelay: `${0.1 + i * 0.04}s`,
            }}
          >
            <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
              {t(`copyright.${s.key}Title`)}
            </h2>
            {s.paragraphs?.map((p) => (
              <p
                key={p}
                className="mt-3 leading-relaxed text-sand-500 dark:text-night-400"
              >
                {t(`copyright.${s.key}${p}`)}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sand-500 dark:text-night-400">
                {(t(`copyright.${s.key}${s.list}`, { returnObjects: true }) || []).map(
                  (item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  )
                )}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div
        className="mt-14 border-t border-sand-200/60 pt-8 dark:border-night-800"
        style={{ animation: "fade-up 0.5s ease-out 0.4s both" }}
      >
        <Link
          href="/"
          className="text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
        >
          &larr; {t("copyright.backHome")}
        </Link>
      </div>
    </div>
  );
}
