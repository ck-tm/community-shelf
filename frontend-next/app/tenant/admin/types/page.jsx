"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import TypeIcon from "@/components/TypeIcon";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageTypes() {
  const { t } = useTranslation();
  const { types, titles, addType, updateType, deleteType } = useData();
  const [editing, setEditing] = useState(null); // { id, name, nameRo, color, isNew }
  const [deleting, setDeleting] = useState(null); // type object
  const [saving, setSaving] = useState(false);

  const startAdd = () =>
    setEditing({ id: null, name: "", nameRo: "", color: "#0D7377", isNew: true });
  const startEdit = (tp) =>
    setEditing({ id: tp.id, name: tp.name, nameRo: tp.nameRo || "", color: tp.color, isNew: false });

  const save = async () => {
    if (!editing || !editing.name.trim()) return;
    setSaving(true);
    try {
      if (editing.isNew) {
        await addType({
          name: editing.name.trim(),
          nameRo: editing.nameRo.trim(),
          color: editing.color,
        });
      } else {
        await updateType(editing.id, {
          name: editing.name.trim(),
          nameRo: editing.nameRo.trim(),
          color: editing.color,
        });
      }
      setEditing(null);
    } catch (err) {
      console.error("Failed to save type:", err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteType(deleting.id);
      setDeleting(null);
    } catch (err) {
      console.error("Failed to delete type:", err);
    }
  };

  const titlesOfType = (name) =>
    titles.filter((ti) => ti.type === name).length;

  return (
    <div>
      <div
        className="mb-6 flex items-center justify-between"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <div>
          <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
            {t("manageTypes.title")}
          </h1>
          <p className="mt-1 text-sm text-sand-500 dark:text-night-400">
            {t("manageTypes.subtitle")}
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Plus className="size-4" /> {t("manageTypes.addType")}
        </button>
      </div>

      {/* Editing row */}
      {editing && (
        <div
          className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-warm p-4 ring-2 ring-teal-600/30 dark:bg-night-900"
          style={{ animation: "fade-up 0.3s ease-out both" }}
        >
          <input
            type="color"
            value={editing.color}
            onChange={(e) => setEditing({ ...editing, color: e.target.value })}
            className="size-9 cursor-pointer rounded-lg border-0 bg-transparent"
          />
          <input
            type="text"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            placeholder={t("manageTypes.namePlaceholder")}
            autoFocus
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 dark:border-night-600 dark:bg-night-800 dark:text-cream"
          />
          <input
            type="text"
            value={editing.nameRo}
            onChange={(e) => setEditing({ ...editing, nameRo: e.target.value })}
            placeholder={t("manageTypes.nameRoPlaceholder")}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 dark:border-night-600 dark:bg-night-800 dark:text-cream"
          />
          <button
            onClick={save}
            disabled={!editing.name.trim() || saving}
            className="rounded-lg bg-teal-700 p-2 text-white transition hover:bg-teal-800 disabled:opacity-40 dark:bg-teal-600"
          >
            <Check className="size-4" />
          </button>
          <button
            onClick={() => setEditing(null)}
            className="rounded-lg bg-gray-200 p-2 text-gray-600 transition hover:bg-gray-300 dark:bg-night-700 dark:text-night-400"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {types.map((tp, i) => (
          <div
            key={tp.id}
            className="flex items-center justify-between rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
            style={{
              animation: "fade-up 0.4s ease-out both",
              animationDelay: `${0.05 + i * 0.04}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: tp.color || "#888" }}
              >
                <TypeIcon type={tp.name} className="size-4" />
              </div>
              <div>
                <span className="font-medium text-teal-900 dark:text-cream">
                  {tp.name}
                </span>
                {tp.nameRo && (
                  <span className="ml-2 text-sm text-sand-400 dark:text-night-500">
                    ({tp.nameRo})
                  </span>
                )}
                <span className="ml-2 text-xs text-sand-300 dark:text-night-400">
                  {t("manageTypes.titleCount", { count: titlesOfType(tp.name) })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(tp)}
                className="rounded-lg p-2 text-sand-500 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => setDeleting(tp)}
                className="rounded-lg p-2 text-sand-500 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleting && (
        <ConfirmDialog
          title={t("manageTypes.deleteTitle")}
          message={
            titlesOfType(deleting.name) > 0
              ? t("manageTypes.deleteHasTitles", {
                  name: deleting.name,
                  count: titlesOfType(deleting.name),
                })
              : t("manageTypes.deleteConfirm", { name: deleting.name })
          }
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
