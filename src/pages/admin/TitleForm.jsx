import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function TitleForm() {
  const { titles, types, typeColors, organizations, addTitle, updateTitle } =
    useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? titles.find((t) => t.id === Number(id)) : null;

  const [form, setForm] = useState({
    title: existing?.title || "",
    author: existing?.author || "",
    type: existing?.type || types[0] || "",
    description: existing?.description || "",
    isbn: existing?.isbn || "",
    year: existing?.year || new Date().getFullYear(),
    language: existing?.language || "English",
    organization: existing?.organization || organizations[0] || "",
    cover: existing?.cover || "#0D7377",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const data = { ...form, year: Number(form.year) };
    if (existing) {
      updateTitle(existing.id, data);
    } else {
      addTitle(data);
    }
    navigate("/admin/titles");
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400";

  return (
    <div>
      <button
        onClick={() => navigate("/admin/titles")}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-sand-400 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
      >
        <ArrowLeft className="size-4" /> Back to Titles
      </button>

      <h1
        className="mb-8 font-heading text-3xl text-teal-900 dark:text-cream"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        {existing ? "Edit Title" : "Add Title"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={set("title")}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={set("author")}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Type
            </label>
            <select value={form.type} onChange={set("type")} className={inputClass}>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Year
            </label>
            <input
              type="number"
              value={form.year}
              onChange={set("year")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Language
            </label>
            <input
              type="text"
              value={form.language}
              onChange={set("language")}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              ISBN / ID
            </label>
            <input
              type="text"
              value={form.isbn}
              onChange={set("isbn")}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
              Organization
            </label>
            <select
              value={form.organization}
              onChange={set("organization")}
              className={inputClass}
            >
              {organizations.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
            Cover Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.cover}
              onChange={set("cover")}
              className="size-10 cursor-pointer rounded-lg border-0 bg-transparent"
            />
            <span className="text-sm text-sand-400 dark:text-night-400">
              {form.cover}
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/titles")}
            className="rounded-xl border border-sand-200 px-5 py-2.5 text-sm font-medium text-sand-400 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {existing ? "Save Changes" : "Create Title"}
          </button>
        </div>
      </form>
    </div>
  );
}
