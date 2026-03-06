"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageTypes() {
  const { types, addType, updateType, deleteType } = useData();
  const { t } = useTranslation();
  const l = useLocalize();
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", nameRo: "", color: "#0D7377" });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleAdd = async () => {
    setSaving(true);
    try {
      await addType(form);
      setAdding(false);
      setForm({ name: "", nameRo: "", color: "#0D7377" });
    } catch {} finally { setSaving(false); }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateType(editing, form);
      setEditing(null);
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteType(id);
    } catch {}
    setConfirmDelete(null);
  };

  const startEdit = (type) => {
    setEditing(type.id);
    setForm({ name: type.name, nameRo: type.nameRo || "", color: type.color });
  };

  const inputClass = "rounded-lg border-0 bg-cream px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">{t("manageTypes.title")}</h1>
        <button
          onClick={() => { setAdding(true); setForm({ name: "", nameRo: "", color: "#0D7377" }); }}
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
        >
          <Plus className="size-4" /> {t("manageTypes.addType")}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {adding && (
          <div className="flex items-center gap-3 rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Name (EN)" className={inputClass} />
            <input value={form.nameRo} onChange={(e) => setForm({...form, nameRo: e.target.value})} placeholder="Name (RO)" className={inputClass} />
            <input type="color" value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="size-9 cursor-pointer rounded-lg border-0" />
            <button onClick={handleAdd} disabled={saving} className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800"><Check className="size-4" /></button>
            <button onClick={() => setAdding(false)} className="rounded-lg p-2 text-sand-500 hover:bg-sand-100 dark:text-night-400"><X className="size-4" /></button>
          </div>
        )}

        {types.map((type) => (
          <div key={type.id} className="flex items-center justify-between rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            {editing === type.id ? (
              <div className="flex items-center gap-3">
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className={inputClass} />
                <input value={form.nameRo} onChange={(e) => setForm({...form, nameRo: e.target.value})} className={inputClass} />
                <input type="color" value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="size-9 cursor-pointer rounded-lg border-0" />
                <button onClick={handleUpdate} disabled={saving} className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800"><Check className="size-4" /></button>
                <button onClick={() => setEditing(null)} className="rounded-lg p-2 text-sand-500 hover:bg-sand-100 dark:text-night-400"><X className="size-4" /></button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="size-4 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="font-medium text-teal-900 dark:text-cream">{l(type, "name")}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(type)} className="rounded-lg p-2 text-sand-500 hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"><Pencil className="size-4" /></button>
                  <button onClick={() => setConfirmDelete(type.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="size-4" /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title={t("manageTypes.deleteTitle")}
          message={t("manageTypes.deleteConfirm", { name: types.find(ty => ty.id === confirmDelete)?.name })}
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
