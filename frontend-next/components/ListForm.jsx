"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, GripVertical, ArrowLeft, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import TitlePicker from "@/components/TitlePicker";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ListForm({ initialList = null }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { titles, addList, updateList, deleteList } = useData();

  const isEditing = !!initialList;

  const [form, setForm] = useState(() => ({
    title: initialList?.title || "",
    titleRo: initialList?.titleRo || "",
    description: initialList?.description || "",
    descriptionRo: initialList?.descriptionRo || "",
    coverColor: initialList?.coverColor || "#0D7377",
  }));

  const [sections, setSections] = useState(() => {
    if (initialList?.sections?.length) {
      return initialList.sections.map((s, idx) => ({
        id: s.id || `section-${idx}`,
        heading: s.heading || "",
        headingRo: s.headingRo || "",
        titleIds: s.titles?.map((ti) => (typeof ti === "object" ? ti.id : ti)) || [],
      }));
    }
    return [];
  });

  const [saving, setSaving] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(null); // section index
  const [confirmDeleteList, setConfirmDeleteList] = useState(false);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // Section management
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: `section-${Date.now()}`, heading: "", headingRo: "", titleIds: [] },
    ]);
  };

  const removeSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSection = (index, key, value) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const moveSection = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    setSections((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  // Title picker
  const openPicker = (sectionIndex) => setPickerOpen(sectionIndex);

  const handlePickerDone = (selectedIds) => {
    if (pickerOpen !== null) {
      updateSection(pickerOpen, "titleIds", selectedIds);
    }
    setPickerOpen(null);
  };

  const removeTitleFromSection = (sectionIndex, titleId) => {
    updateSection(
      sectionIndex,
      "titleIds",
      sections[sectionIndex].titleIds.filter((id) => id !== titleId)
    );
  };

  const getTitleById = (id) => titles.find((t) => t.id === id);

  // Save
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        sections: sections.map((s, i) => ({
          heading: s.heading,
          headingRo: s.headingRo,
          order: i,
          titles: s.titleIds,
        })),
      };

      if (isEditing) {
        await updateList(initialList.id, payload);
      } else {
        await addList(payload);
      }
      router.push("/admin/lists");
    } catch {
      // error handled by context
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteList = async () => {
    try {
      await deleteList(initialList.id);
      router.push("/admin/lists");
    } catch {}
    setConfirmDeleteList(false);
  };

  const inputClass = "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";
  const labelClass = "block text-sm font-medium text-teal-900 dark:text-cream mb-1.5";

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/lists" className="rounded-lg p-2 text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">
            {isEditing ? t("listForm.editList") : t("listForm.newList")}
          </h1>
        </div>
        {isEditing && (
          <button
            onClick={() => setConfirmDeleteList(true)}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 className="size-4" /> {t("confirm.delete")}
          </button>
        )}
      </div>

      {/* List Details */}
      <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t("listForm.title")}</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("listForm.titleRo")}</label>
            <input value={form.titleRo} onChange={(e) => set("titleRo", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("listForm.description")}</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("listForm.descriptionRo")}</label>
            <textarea value={form.descriptionRo} onChange={(e) => set("descriptionRo", e.target.value)} rows={3} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t("listForm.coverColor")}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.coverColor}
                onChange={(e) => set("coverColor", e.target.value)}
                className="size-10 cursor-pointer rounded-lg border-0"
              />
              <span className="text-sm text-sand-500 dark:text-night-400">{form.coverColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-teal-900 dark:text-cream">{t("listForm.sections")}</h2>
          <button
            onClick={addSection}
            className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
          >
            <Plus className="size-4" /> {t("listForm.addSection")}
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className="rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <input
                    value={section.heading}
                    onChange={(e) => updateSection(idx, "heading", e.target.value)}
                    placeholder={t("listForm.sectionHeading")}
                    className={inputClass}
                  />
                  <input
                    value={section.headingRo}
                    onChange={(e) => updateSection(idx, "headingRo", e.target.value)}
                    placeholder={t("listForm.sectionHeadingRo")}
                    className={inputClass}
                  />
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => moveSection(idx, -1)}
                    disabled={idx === 0}
                    className="rounded-lg p-1.5 text-sand-500 transition hover:bg-sand-100 disabled:opacity-30 dark:text-night-400 dark:hover:bg-night-800"
                  >
                    <ChevronUp className="size-4" />
                  </button>
                  <button
                    onClick={() => moveSection(idx, 1)}
                    disabled={idx === sections.length - 1}
                    className="rounded-lg p-1.5 text-sand-500 transition hover:bg-sand-100 disabled:opacity-30 dark:text-night-400 dark:hover:bg-night-800"
                  >
                    <ChevronDown className="size-4" />
                  </button>
                  <button
                    onClick={() => removeSection(idx)}
                    className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Titles in section */}
              <div className="space-y-1.5">
                {section.titleIds.map((titleId) => {
                  const ti = getTitleById(titleId);
                  if (!ti) return null;
                  return (
                    <div
                      key={titleId}
                      className="flex items-center gap-3 rounded-xl bg-cream p-2.5 dark:bg-night-800"
                    >
                      <GripVertical className="size-4 shrink-0 text-sand-300 dark:text-night-600" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-teal-900 dark:text-cream">{ti.title}</p>
                        <p className="truncate text-xs text-sand-500 dark:text-night-400">{ti.author}</p>
                      </div>
                      <button
                        onClick={() => removeTitleFromSection(idx, titleId)}
                        className="shrink-0 rounded-lg p-1.5 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => openPicker(idx)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand-200 py-3 text-sm font-medium text-sand-400 transition hover:border-teal-600 hover:text-teal-700 dark:border-night-700 dark:text-night-500 dark:hover:border-teal-500 dark:hover:text-teal-400"
              >
                <Plus className="size-4" /> {t("listForm.pickTitles")}
              </button>
            </div>
          ))}

          {sections.length === 0 && (
            <p className="rounded-2xl bg-warm py-8 text-center text-sm text-sand-400 ring-1 ring-sand-200/50 dark:bg-night-900 dark:text-night-500 dark:ring-night-700/50">
              {t("listForm.noSections")}
            </p>
          )}
        </div>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href="/admin/lists"
          className="rounded-xl border border-sand-200 px-6 py-3 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-800"
        >
          {t("listForm.cancel")}
        </Link>
        <button
          onClick={handleSave}
          disabled={saving || !form.title}
          className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {isEditing ? t("listForm.saveChanges") : t("listForm.createList")}
        </button>
      </div>

      {/* Title Picker Modal */}
      {pickerOpen !== null && (
        <TitlePicker
          selected={sections[pickerOpen]?.titleIds || []}
          onDone={handlePickerDone}
          onCancel={() => setPickerOpen(null)}
        />
      )}

      {/* Delete Confirm */}
      {confirmDeleteList && (
        <ConfirmDialog
          title={t("confirm.delete")}
          message={"Remove this section?"}
          onConfirm={handleDeleteList}
          onCancel={() => setConfirmDeleteList(false)}
        />
      )}
    </div>
  );
}
