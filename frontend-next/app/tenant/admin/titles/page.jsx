"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import TypeIcon from "@/components/TypeIcon";

export default function ManageTitles() {
  const { titles, typeColors } = useData();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return titles;
    const q = search.toLowerCase();
    return titles.filter((ti) => ti.title.toLowerCase().includes(q) || ti.author.toLowerCase().includes(q));
  }, [titles, search]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">{t("manageTitles.title")}</h1>
        <Link
          href="/admin/titles/new"
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
        >
          <Plus className="size-4" /> {t("manageTitles.addTitle")}
        </Link>
      </div>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sand-500 dark:text-night-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("manageTitles.searchPlaceholder")}
          className="w-full rounded-xl border-0 bg-warm py-3 pl-10 pr-4 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700"
        />
      </div>

      <div className="mt-4 space-y-2">
        {filtered.map((title) => (
          <Link
            key={title.id}
            href={`/admin/titles/${title.id}/edit`}
            className="flex items-center gap-3 rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 transition hover:shadow-md dark:bg-night-900 dark:ring-night-700/50"
          >
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: title.cover }}
            >
              {title.cover_image ? (
                <img src={title.cover_image} alt="" className="size-full rounded-lg object-cover" />
              ) : (
                <TypeIcon type={title.type} className="size-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-teal-900 dark:text-cream">{title.title}</p>
              <p className="truncate text-sm text-sand-500 dark:text-night-400">{title.author}</p>
            </div>
            <span
              className="shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold text-white"
              style={{ backgroundColor: typeColors[title.type] || "#0D7377" }}
            >
              {title.type}
            </span>
            <span className="shrink-0 text-xs text-sand-300 dark:text-night-500">
              {title.copies?.length || 0} copies
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
