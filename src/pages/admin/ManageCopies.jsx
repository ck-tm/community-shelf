import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useData } from "../../context/DataContext";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageCopies() {
  const { titles, addCopy, updateCopy, deleteCopy } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const title = titles.find((t) => t.id === Number(id));
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  if (!title) {
    return (
      <div className="py-12 text-center text-sand-400 dark:text-night-400">
        Title not found.
      </div>
    );
  }

  const startAdd = () =>
    setEditing({
      condition: "Good",
      location: "",
      status: "available",
      isNew: true,
      id: null,
    });

  const startEdit = (copy) =>
    setEditing({ ...copy, isNew: false });

  const save = () => {
    if (!editing || !editing.location.trim()) return;
    const data = {
      condition: editing.condition,
      location: editing.location.trim(),
      status: editing.status,
    };
    if (editing.isNew) {
      addCopy(title.id, data);
    } else {
      updateCopy(title.id, editing.id, data);
    }
    setEditing(null);
  };

  const inputClass =
    "rounded-lg border-0 bg-cream px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div>
      <button
        onClick={() => navigate("/admin/titles")}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-sand-400 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
      >
        <ArrowLeft className="size-4" /> Back to Titles
      </button>

      <div
        className="mb-6 flex items-center justify-between"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <div>
          <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
            Copies
          </h1>
          <p className="mt-1 text-sm text-sand-400 dark:text-night-400">
            {title.title} — {title.copies.length} copies
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Plus className="size-4" /> Add Copy
        </button>
      </div>

      {/* Editing form */}
      {editing && (
        <div
          className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl bg-warm p-4 ring-2 ring-teal-600/30 dark:bg-night-900"
          style={{ animation: "fade-up 0.3s ease-out both" }}
        >
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Condition
            </label>
            <select
              value={editing.condition}
              onChange={(e) =>
                setEditing({ ...editing, condition: e.target.value })
              }
              className={inputClass}
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Location
            </label>
            <input
              type="text"
              value={editing.location}
              onChange={(e) =>
                setEditing({ ...editing, location: e.target.value })
              }
              placeholder="e.g. Main Shelf"
              autoFocus
              className={`${inputClass} w-full`}
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Status
            </label>
            <select
              value={editing.status}
              onChange={(e) =>
                setEditing({ ...editing, status: e.target.value })
              }
              className={inputClass}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <button
            onClick={save}
            disabled={!editing.location.trim()}
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

      {/* Copies list */}
      <div className="space-y-2">
        {title.copies.map((copy, i) => {
          const isAvail = copy.status === "available";
          return (
            <div
              key={copy.id}
              className="flex items-center justify-between rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              style={{
                animation: "fade-up 0.4s ease-out both",
                animationDelay: `${0.05 + i * 0.04}s`,
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    isAvail
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {isAvail ? "Available" : "Reserved"}
                </span>
                <span className="text-sm font-medium text-teal-900 dark:text-cream">
                  {copy.condition}
                </span>
                <span className="text-sm text-sand-400 dark:text-night-400">
                  {copy.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => startEdit(copy)}
                  className="rounded-lg p-2 text-sand-400 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  onClick={() => setDeleting(copy.id)}
                  className="rounded-lg p-2 text-sand-400 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        {title.copies.length === 0 && (
          <p className="py-12 text-center text-sand-300 dark:text-night-400">
            No copies yet. Add one above.
          </p>
        )}
      </div>

      {deleting && (
        <ConfirmDialog
          title="Delete Copy"
          message="Delete this copy? This cannot be undone."
          onConfirm={() => {
            deleteCopy(title.id, deleting);
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
