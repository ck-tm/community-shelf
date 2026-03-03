import { useState } from "react";
import { Plus, Pencil, Trash2, Copy, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import TypeIcon from "../../components/TypeIcon";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageTitles() {
  const { titles, typeColors, deleteTitle } = useData();
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const filtered = titles.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) || t.author.toLowerCase().includes(q)
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
            Titles
          </h1>
          <p className="mt-1 text-sm text-sand-400 dark:text-night-400">
            {titles.length} titles in the collection.
          </p>
        </div>
        <Link
          to="/admin/titles/new"
          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          <Plus className="size-4" /> Add Title
        </Link>
      </div>

      {/* Search */}
      <div
        className="relative mb-5"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sand-400 dark:text-night-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search titles..."
          className="w-full rounded-xl border-0 bg-warm py-2.5 pl-9 pr-4 text-sm ring-1 ring-sand-300/60 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200/60 dark:border-night-700">
                {["Title", "Type", "Copies", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => {
                const color = typeColors[t.type] || "#888";
                return (
                  <tr
                    key={t.id}
                    className="border-b border-sand-200/40 transition hover:bg-sand-100/50 dark:border-night-700/50 dark:hover:bg-night-800/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-8 shrink-0 rounded-lg"
                          style={{ backgroundColor: t.cover }}
                        />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-teal-900 dark:text-cream">
                            {t.title}
                          </p>
                          <p className="truncate text-xs text-sand-400 dark:text-night-400">
                            {t.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: color }}
                      >
                        <TypeIcon type={t.type} className="size-3" />
                        {t.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sand-400 dark:text-night-400">
                      {t.copies.length}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/admin/titles/${t.id}/edit`}
                          className="rounded-lg p-1.5 text-sand-400 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
                        >
                          <Pencil className="size-3.5" />
                        </Link>
                        <Link
                          to={`/admin/titles/${t.id}/copies`}
                          className="rounded-lg p-1.5 text-sand-400 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
                        >
                          <Copy className="size-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleting(t)}
                          className="rounded-lg p-1.5 text-sand-400 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-12 text-center text-sand-300 dark:text-night-400"
                  >
                    No titles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleting && (
        <ConfirmDialog
          title="Delete Title"
          message={`Delete "${deleting.title}" and all its copies? This cannot be undone.`}
          onConfirm={() => {
            deleteTitle(deleting.id);
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
