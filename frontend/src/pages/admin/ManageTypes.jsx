import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { useData } from "../../context/DataContext";
import TypeIcon from "../../components/TypeIcon";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageTypes() {
  const { types, titles, addType, updateType, deleteType } = useData();
  const [editing, setEditing] = useState(null); // { id, name, color, isNew }
  const [deleting, setDeleting] = useState(null); // type object
  const [saving, setSaving] = useState(false);

  const startAdd = () =>
    setEditing({ id: null, name: "", color: "#0D7377", isNew: true });
  const startEdit = (t) =>
    setEditing({ id: t.id, name: t.name, color: t.color, isNew: false });

  const save = async () => {
    if (!editing || !editing.name.trim()) return;
    setSaving(true);
    try {
      if (editing.isNew) {
        await addType(editing.name.trim(), editing.color);
      } else {
        await updateType(editing.id, {
          name: editing.name.trim(),
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
    titles.filter((t) => t.type === name).length;

  return (
    <div>
      <div
        className="mb-6 flex items-center justify-between"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <div>
          <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
            Types
          </h1>
          <p className="mt-1 text-sm text-sand-400 dark:text-night-400">
            Manage content categories.
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Plus className="size-4" /> Add Type
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
            placeholder="Type name..."
            autoFocus
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
        {types.map((t, i) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
            style={{
              animation: "fade-up 0.4s ease-out both",
              animationDelay: `${0.05 + i * 0.04}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: t.color || "#888" }}
              >
                <TypeIcon type={t.name} className="size-4" />
              </div>
              <div>
                <span className="font-medium text-teal-900 dark:text-cream">
                  {t.name}
                </span>
                <span className="ml-2 text-xs text-sand-300 dark:text-night-400">
                  {titlesOfType(t.name)} titles
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(t)}
                className="rounded-lg p-2 text-sand-400 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => setDeleting(t)}
                className="rounded-lg p-2 text-sand-400 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleting && (
        <ConfirmDialog
          title="Delete Type"
          message={
            titlesOfType(deleting.name) > 0
              ? `"${deleting.name}" has ${titlesOfType(deleting.name)} title(s). They will lose their type. Continue?`
              : `Delete "${deleting.name}"? This cannot be undone.`
          }
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
