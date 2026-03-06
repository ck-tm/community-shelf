"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Search, Grid3X3, BookOpen, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import { publicApi } from "@/lib/endpoints";
import TitleCard from "@/components/TitleCard";
import ShelfView from "@/components/ShelfView";
import AuthorSelect from "@/components/AuthorSelect";

export default function Browse() {
  const { titles, types, browseTypes, loading: dataLoading } = useData();
  const { t } = useTranslation();
  const l = useLocalize();

  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [author, setAuthor] = useState("");
  const [view, setView] = useState("grid");

  const authors = useMemo(
    () => [...new Set(titles.map((t) => t.author).filter(Boolean))].sort(),
    [titles]
  );

  const filtered = useMemo(() => {
    return titles.filter((t) => {
      if (activeType !== "All" && t.type !== activeType) return false;
      if (author && t.author !== author) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !t.title.toLowerCase().includes(q) &&
          !t.author.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [titles, activeType, author, search]);

  if (dataLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-teal-700" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search & Filters */}
      <div className="space-y-4" style={{ animation: "fade-up 0.5s ease-out both" }}>
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-sand-500 dark:text-night-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("browse.searchPlaceholder")}
            className="w-full rounded-2xl border-0 bg-warm py-4 pl-12 pr-5 text-base ring-1 ring-sand-300/60 outline-none transition focus:bg-white focus:ring-2 focus:ring-teal-700/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:focus:bg-night-800"
          />
        </div>

        {/* Author filter */}
        <AuthorSelect authors={authors} value={author} onChange={setAuthor} />

        {/* Type pills + view toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto">
            {browseTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeType === type
                    ? "bg-teal-700 text-white dark:bg-teal-600"
                    : "bg-warm text-sand-500 ring-1 ring-sand-200/60 hover:bg-sand-100 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:bg-night-700"
                }`}
              >
                {type === "All" ? t("browse.all") : l(types.find((tp) => tp.name === type), "name") || type}
              </button>
            ))}
          </div>

          <div className="flex gap-1 rounded-xl bg-warm p-1 ring-1 ring-sand-200/60 dark:bg-night-800 dark:ring-night-700">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg p-2 transition ${
                view === "grid"
                  ? "bg-teal-700 text-white"
                  : "text-sand-500 hover:text-teal-800 dark:text-night-400"
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="size-4" />
            </button>
            <button
              onClick={() => setView("shelf")}
              className={`rounded-lg p-2 transition ${
                view === "shelf"
                  ? "bg-teal-700 text-white"
                  : "text-sand-500 hover:text-teal-800 dark:text-night-400"
              }`}
              aria-label="Shelf view"
            >
              <BookOpen className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sand-400 dark:text-night-500">{t("browse.nothingFound")}</p>
          </div>
        ) : view === "shelf" ? (
          <ShelfView titles={filtered} hasMore={false} loadingMore={false} onLoadMore={() => {}} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((title, i) => (
              <div
                key={title.id}
                style={{
                  animation: "fade-up 0.4s ease-out both",
                  animationDelay: `${Math.min(i * 0.03, 0.5)}s`,
                }}
              >
                <TitleCard title={title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
