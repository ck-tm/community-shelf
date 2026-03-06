"use client";

import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import TypeIcon from "@/components/TypeIcon";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageTitles() {
  const { t } = useTranslation();
  const l = useLocalize();
  const { titles, types, typeColors, deleteTitle } = useData();
  const typeMap = useMemo(
    () => Object.fromEntries(types.map((tp) => [tp.name, tp])),
    [types],
  );
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const filtered = titles.filter((ti) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      ti.title.toLowerCase().includes(q) || ti.author.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <div>
          <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
            {t("manageTitles.title")}
          </h1>
          <p className="mt-1 text-sm text-sand-500 dark:text-night-400">
            {t("manageTitles.subtitle", { count: titles.length })}
          </p>
        </div>
        <Link
          href="/admin/titles/new"
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Plus className="size-4" /> {t("manageTitles.addTitle")}
        </Link>
      </div>

      {/* Search */}
      <div
        className="relative mb-5"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sand-500 dark:text-night-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("manageTitles.searchPlaceholder")}
          className="w-full rounded-xl border-0 bg-warm py-2.5 pl-9 pr-4 text-sm ring-1 ring-sand-300/60 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400"
        />
      </div>

      {/* Title list */}
      <div className="space-y-2">
        {filtered.map((ti) => {
          const color = typeColors[ti.type] || "#888";
          return (
            <div
              key={ti.id}
              className="flex items-center gap-3 rounded-xl bg-warm p-3 ring-1 ring-sand-200/50 transition hover:ring-sand-300 dark:bg-night-900 dark:ring-night-700/50 dark:hover:ring-night-600"
            >
              {/* Cover thumbnail — clicking it goes to edit */}
              <Link
                href={`/admin/titles/${ti.id}/edit`}
                className="size-12 shrink-0 overflow-hidden rounded-lg"
                style={{ backgroundColor: ti.cover }}
                tabIndex={-1}
                aria-hidden="true"
              >
                {ti.cover_image && (
                  <img src={ti.cover_image} alt="" className="size-full object-contain" />
                )}
              </Link>

              {/* Info — clicking goes to edit */}
              <Link
                href={`/admin/titles/${ti.id}/edit`}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium text-teal-900 dark:text-cream">
                  {ti.title}
                </p>
                <p className="truncate text-xs text-sand-500 dark:text-night-400">
                  {ti.author}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {/* Type badge */}
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    <TypeIcon type={ti.type} className="size-2.5" />
                    {l(typeMap[ti.type], "name") || ti.type}
                  </span>
                  {/* Copy chips */}
                  {ti.copies.length === 0 ? (
                    <span className="text-[11px] text-sand-300 dark:text-night-500">
                      {t("manageTitles.noCopies")}
                    </span>
                  ) : (
                    ti.copies.map((copy) => {
                      const avail = copy.status === "available";
                      return (
                        <span
                          key={copy.id}
                          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                            avail
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              avail ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {copy.condition}
                        </span>
                      );
                    })
                  )}
                </div>
              </Link>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-0.5">
                <Link
                  href={`/admin/titles/${ti.id}/edit`}
                  className="rounded-lg p-2 text-sand-500 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
                >
                  <Pencil className="size-4" />
                </Link>
                <button
                  onClick={() => setDeleting(ti)}
                  className="rounded-lg p-2 text-sand-500 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sand-300 dark:text-night-400">
            {t("manageTitles.noTitles")}
          </p>
        )}
      </div>

      {deleting && (
        <ConfirmDialog
          title={t("manageTitles.deleteTitle")}
          message={t("manageTitles.deleteConfirm", { title: deleting.title })}
          onConfirm={async () => {
            await deleteTitle(deleting.id);
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
