"use client";

import Link from "next/link";
import { Plus, Layers, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageLists() {
  const { curatedLists, deleteList } = useData();
  const { t } = useTranslation();
  const l = useLocalize();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteList(id);
    } catch {}
    setConfirmDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">{t("manageLists.title")}</h1>
        <Link
          href="/admin/lists/new"
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
        >
          <Plus className="size-4" /> {t("manageLists.newList")}
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {curatedLists.map((list) => (
          <div
            key={list.id}
            className="group relative rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 transition hover:shadow-md dark:bg-night-900 dark:ring-night-700/50"
          >
            <Link href={`/admin/lists/${list.id}/edit`} className="absolute inset-0 z-0 rounded-2xl" />
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: list.coverColor || "#0D7377" }}
                >
                  <Layers className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-teal-900 dark:text-cream">{l(list, "title")}</p>
                  <p className="text-sm text-sand-500 dark:text-night-400">
                    {t("manageLists.sections", { count: list.sections?.length || 0 })} &middot;{" "}
                    {t("manageLists.titles", { count: list.sections?.reduce((sum, s) => sum + (s.titles?.length || 0), 0) || 0 })}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmDelete(list.id); }}
                className="relative z-20 rounded-lg p-2 text-red-500 opacity-0 transition hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-red-900/20"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {curatedLists.length === 0 && (
        <p className="mt-8 text-center text-sm text-sand-400 dark:text-night-500">{t("manageLists.noLists")}</p>
      )}

      {confirmDelete && (
        <ConfirmDialog
          title={t("manageLists.deleteList")}
          message={t("manageLists.deleteConfirm", { title: curatedLists.find(li => li.id === confirmDelete)?.title })}
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
