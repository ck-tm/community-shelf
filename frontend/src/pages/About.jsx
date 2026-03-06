import { BookOpen, ArrowRight, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useData } from "../context/DataContext";
import { useLocalize } from "../hooks/useLocalize";

export default function About() {
  const { siteConfig, descriptionPage } = useData();
  const { t } = useTranslation();
  const l = useLocalize();

  // Use descriptionPage from admin if available, else fall back to i18n strings
  const dp = descriptionPage;

  const steps = [
    { icon: BookOpen, title: t("aboutPage.step1Title"), text: t("aboutPage.step1Text") },
    { icon: ArrowRight, title: t("aboutPage.step2Title"), text: t("aboutPage.step2Text") },
    { icon: Heart, title: t("aboutPage.step3Title"), text: t("aboutPage.step3Text") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <div
        className="mb-14 max-w-2xl"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          {l(dp, "title") || t("aboutPage.aboutTitle", { name: l(siteConfig, "title") })}
        </h1>
        {l(dp, "body") ? (
          <p className="mt-3 font-heading text-lg italic text-sand-500 dark:text-night-400">
            {l(dp, "body")}
          </p>
        ) : (
          <p className="mt-3 font-heading text-lg italic text-sand-500 dark:text-night-400">
            {l(siteConfig, "description")}
          </p>
        )}
      </div>

      {/* Mission */}
      <div
        className="mb-14 rounded-2xl bg-warm p-8 ring-1 ring-sand-200/50 sm:p-10 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <div className="flex items-start gap-4">
          <Users className="mt-1 size-6 shrink-0 text-teal-700 dark:text-teal-400" />
          <div>
            <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
              {l(dp, "missionTitle") || t("aboutPage.mission")}
            </h2>
            <p className="mt-3 leading-relaxed text-sand-500 dark:text-night-400">
              {l(dp, "missionText") || t("aboutPage.missionText", { name: l(siteConfig, "title") })}
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}>
        <h2 className="mb-8 font-heading text-2xl text-teal-900 dark:text-cream">
          {t("aboutPage.howItWorks")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              style={{
                animation: "fade-up 0.5s ease-out both",
                animationDelay: `${0.3 + i * 0.08}s`,
              }}
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-teal-700/10 dark:bg-teal-400/10">
                <step.icon className="size-5 text-teal-700 dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-teal-900 dark:text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-500 dark:text-night-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-14 text-center"
        style={{ animation: "fade-up 0.6s ease-out 0.5s both" }}
      >
        <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
          {t("aboutPage.readyToExplore")}
        </h2>
        <p className="mt-2 text-sand-500 dark:text-night-400">
          {t("aboutPage.browseOffer")}
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-800 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600"
        >
          {t("aboutPage.browseCollection")}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
