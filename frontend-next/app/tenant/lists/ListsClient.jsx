"use client";

import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { Loader2 } from "lucide-react";
import ListCard from "@/components/ListCard";

export default function ListsPage() {
  const { curatedLists, loading } = useData();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-teal-700" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-4xl text-teal-900 sm:text-5xl dark:text-cream">
          {t("listsPage.title")}
        </h1>
        <p className="mt-3 text-sand-500 dark:text-night-400">
          {t("listsPage.subtitle")}
        </p>
      </div>

      {curatedLists.length === 0 ? (
        <p className="mt-12 text-center text-sand-400 dark:text-night-500">
          {t("listsPage.noLists")}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curatedLists.map((list, i) => (
            <div
              key={list.id}
              style={{
                animation: "fade-up 0.4s ease-out both",
                animationDelay: `${0.05 + i * 0.04}s`,
              }}
            >
              <ListCard list={list} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
