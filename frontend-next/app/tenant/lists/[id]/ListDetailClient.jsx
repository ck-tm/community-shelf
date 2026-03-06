"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import TitleCard from "@/components/TitleCard";

export default function ListDetailClient({ initialList }) {
  const { curatedLists, titles } = useData();
  const { t } = useTranslation();
  const l = useLocalize();

  const list = useMemo(() => {
    return curatedLists.find((li) => li.id === initialList.id) || initialList;
  }, [curatedLists, initialList]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/lists"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
      >
        <ArrowLeft className="size-4" />
        {t("listDetail.backToLists")}
      </Link>

      <div style={{ animation: "fade-up 0.5s ease-out both" }}>
        <div
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl"
          style={{ backgroundColor: list.coverColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
          <Layers className="relative size-12 text-white/50" />
        </div>

        <h1 className="mt-6 font-heading text-3xl text-teal-900 sm:text-4xl dark:text-cream">
          {l(list, "title")}
        </h1>
        {list.description && (
          <p className="mt-3 text-sand-500 dark:text-night-400">
            {l(list, "description")}
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-12">
        {list.sections?.map((section, si) => {
          const sectionTitles = section.titleIds
            .map((id) => titles.find((t) => t.id === id))
            .filter(Boolean);

          return (
            <section
              key={si}
              style={{
                animation: "fade-up 0.4s ease-out both",
                animationDelay: `${0.1 + si * 0.05}s`,
              }}
            >
              {section.title && (
                <h2 className="mb-4 font-heading text-xl text-teal-900 dark:text-cream">
                  {l(section, "title")}
                </h2>
              )}
              {section.text && (
                <p className="mb-4 text-sand-500 dark:text-night-400">
                  {l(section, "text")}
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sectionTitles.map((title) => (
                  <TitleCard key={title.id} title={title} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
