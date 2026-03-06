"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Plus, Pencil, Trash2, Layers } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageLists() {
  const { t } = useTranslation();
  const l = useLocalize();
  const { curatedLists, deleteList } = useData();
  const [deleting, setDeleting] = useState(null);

  return (
    <div>
      <div
        className="mb-6 flex items-center justify-between"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <div>
          <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
            {t("manageLists.title")}
          </h1>
          <p className="mt-1 text-sm text-sand-500 dark:text-night-400">
            {t("manageLists.subtitle", { count: curatedLists.length })}
          </p>
        </div>
        <Link
          href="/admin/lists/new"
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Plus className="size-4" /> {t("manageLists.newList")}
        </Link>
      </div>

      <div className="space-y-2">
        {curatedLists.map((list, i) => {
          const totalTitles = list.sections.reduce(
            (s, sec) => s + sec.titleIds.length,
            0
          );
          return (
            <div
              key={list.id}
              className="flex items-center justify-between rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              style={{
                animation: "fade-up 0.4s ease-out both",
                animationDelay: `${0.05 + i * 0.04}s`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-9 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: list.coverColor }}
                >
                  <Layers className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-teal-900 dark:text-cream">
                    {l(list, "title")}
                  </p>
                  <p className="text-xs text-sand-300 dark:text-night-400">
                    {t("manageLists.sections", { count: list.sections.length })} &middot; {t("manageLists.titles", { count: totalTitles })} &middot; {list.createdAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/lists/${list.id}/edit`}
                  className="rounded-lg p-2 text-sand-500 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
                >
                  <Pencil className="size-4" />
                </Link>
                <button
                  onClick={() => setDeleting(list)}
                  className="rounded-lg p-2 text-sand-500 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
        {curatedLists.length === 0 && (
          <p className="py-12 text-center text-sand-300 dark:text-night-400">
            {t("manageLists.noLists")}
          </p>
        )}
      </div>

      {deleting && (
        <ConfirmDialog
          title={t("manageLists.deleteList")}
          message={t("manageLists.deleteConfirm", { title: deleting.title })}
          onConfirm={async () => {
            await deleteList(deleting.id);
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
