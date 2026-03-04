import { useState } from "react";
import { X, Search, Check } from "lucide-react";
import { useData } from "../context/DataContext";
import TypeIcon from "./TypeIcon";

export default function TitlePicker({ selected = [], onDone, onCancel }) {
  const { titles } = useData();
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState(new Set(selected));

  const filtered = titles.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) || t.author.toLowerCase().includes(q)
    );
  });

  const toggle = (id) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl dark:bg-night-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-night-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-cream">
            Select Titles
          </h3>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-night-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative border-b border-gray-200 p-4 dark:border-night-700">
          <Search className="pointer-events-none absolute left-7 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-night-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 dark:border-night-600 dark:bg-night-900 dark:text-cream dark:placeholder:text-night-400"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.map((t) => {
            const isSelected = picked.has(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                  isSelected
                    ? "bg-teal-50 dark:bg-teal-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-night-700"
                }`}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: t.cover }}
                >
                  <TypeIcon type={t.type} className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-cream">
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-night-400">
                    {t.author} &middot; {t.type}
                  </p>
                </div>
                {isSelected && (
                  <Check className="size-5 shrink-0 text-teal-600 dark:text-teal-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 p-4 dark:border-night-700">
          <span className="text-sm text-gray-500 dark:text-night-400">
            {picked.size} selected
          </span>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-night-600 dark:text-sand-300 dark:hover:bg-night-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onDone([...picked])}
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
