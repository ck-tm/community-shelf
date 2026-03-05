import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import TitlePicker from "../../components/TitlePicker";
import TypeIcon from "../../components/TypeIcon";

export default function ListForm() {
  const { titles, curatedLists, addList, updateList } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? curatedLists.find((l) => l.id === Number(id)) : null;

  const [form, setForm] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    coverColor: existing?.coverColor || "#0D7377",
    sections: existing?.sections || [],
  });
  const [pickerFor, setPickerFor] = useState(null); // section index

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { id: `temp-${Date.now()}`, heading: "", body: "", titleIds: [] },
      ],
    });
  };

  const updateSection = (idx, updates) => {
    const next = [...form.sections];
    next[idx] = { ...next[idx], ...updates };
    setForm({ ...form, sections: next });
  };

  const removeSection = (idx) => {
    setForm({ ...form, sections: form.sections.filter((_, i) => i !== idx) });
  };

  const moveSection = (idx, dir) => {
    const next = [...form.sections];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setForm({ ...form, sections: next });
  };

  const handlePickerDone = (titleIds) => {
    if (pickerFor !== null) {
      updateSection(pickerFor, { titleIds });
    }
    setPickerFor(null);
  };

  const removeTitleFromSection = (sectionIdx, titleId) => {
    const section = form.sections[sectionIdx];
    updateSection(sectionIdx, {
      titleIds: section.titleIds.filter((id) => id !== titleId),
    });
  };

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || saving) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        sections: form.sections.map((s, idx) => ({
          heading: s.heading,
          body: s.body,
          titleIds: s.titleIds,
          order: idx,
        })),
      };
      if (existing) {
        await updateList(existing.id, payload);
      } else {
        await addList(payload);
      }
      navigate("/admin/lists");
    } catch (err) {
      console.error("Failed to save list:", err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400";

  return (
    <div>
      <button
        onClick={() => navigate("/admin/lists")}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
      >
        <ArrowLeft className="size-4" /> Back to Lists
      </button>

      <h1
        className="mb-8 font-heading text-3xl text-teal-900 dark:text-cream"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        {existing ? "Edit List" : "New Curated List"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta */}
        <div
          className="space-y-5 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
          style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
        >
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={set("title")}
              required
              placeholder="e.g. Summer Reading Picks"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              Cover Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.coverColor}
                onChange={set("coverColor")}
                className="size-10 cursor-pointer rounded-lg border-0 bg-transparent"
              />
              <span className="text-sm text-sand-500 dark:text-night-400">
                {form.coverColor}
              </span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
              Sections
            </h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
            >
              <Plus className="size-3.5" /> Add Section
            </button>
          </div>

          <div className="space-y-4">
            {form.sections.map((section, idx) => (
              <div
                key={section.id}
                className="rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sand-300 dark:text-night-400">
                    Section {idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveSection(idx, -1)}
                      disabled={idx === 0}
                      className="rounded-lg p-1 text-sand-500 transition hover:bg-sand-100 disabled:opacity-30 dark:text-night-400 dark:hover:bg-night-800"
                    >
                      <ChevronUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(idx, 1)}
                      disabled={idx === form.sections.length - 1}
                      className="rounded-lg p-1 text-sand-500 transition hover:bg-sand-100 disabled:opacity-30 dark:text-night-400 dark:hover:bg-night-800"
                    >
                      <ChevronDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="rounded-lg p-1 text-sand-500 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      updateSection(idx, { heading: e.target.value })
                    }
                    placeholder="Section heading"
                    className={inputClass}
                  />
                  <textarea
                    value={section.body}
                    onChange={(e) =>
                      updateSection(idx, { body: e.target.value })
                    }
                    placeholder="Section text..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />

                  {/* Linked titles */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sand-300 dark:text-night-400">
                        Linked Titles ({section.titleIds.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setPickerFor(idx)}
                        className="text-xs font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
                      >
                        + Pick titles
                      </button>
                    </div>
                    {section.titleIds.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {section.titleIds.map((tid) => {
                          const t = titles.find((tt) => tt.id === tid);
                          if (!t) return null;
                          return (
                            <span
                              key={tid}
                              className="flex items-center gap-1.5 rounded-lg bg-cream px-2.5 py-1 text-xs font-medium text-teal-900 ring-1 ring-sand-200/60 dark:bg-night-800 dark:text-cream dark:ring-night-700"
                            >
                              <TypeIcon type={t.type} className="size-3" />
                              {t.title}
                              <button
                                type="button"
                                onClick={() =>
                                  removeTitleFromSection(idx, tid)
                                }
                                className="ml-0.5 text-sand-300 transition hover:text-red-500 dark:text-night-400"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-sand-300 dark:text-night-500">
                        No titles linked yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {form.sections.length === 0 && (
              <p className="py-8 text-center text-sm text-sand-300 dark:text-night-400">
                No sections yet. Click "Add Section" to get started.
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/lists")}
            className="rounded-xl border border-sand-200 px-5 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {existing ? "Save Changes" : "Create List"}
          </button>
        </div>
      </form>

      {pickerFor !== null && (
        <TitlePicker
          selected={form.sections[pickerFor]?.titleIds || []}
          onDone={handlePickerDone}
          onCancel={() => setPickerFor(null)}
        />
      )}
    </div>
  );
}
