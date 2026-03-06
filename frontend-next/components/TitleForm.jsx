"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ScanBarcode, Loader2, Plus, Trash2, Check, X, Pencil, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import ConfirmDialog from "@/components/ConfirmDialog";

const ISBNScanner = dynamic(() => import("./ISBNScanner"), { ssr: false });

const EMPTY_FORM = {
  title: "",
  author: "",
  year: "",
  language: "",
  isbn: "",
  publisher: "",
  pages: "",
  description: "",
  cover: "#0D7377",
  cover_image: "",
  type: "",
};

export default function TitleForm({ initialTitle = null }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { types, addTitle, updateTitle, deleteTitle, addCopy, updateCopy, deleteCopy } = useData();

  const isEditing = !!initialTitle;

  const [form, setForm] = useState(() => {
    if (initialTitle) {
      return {
        title: initialTitle.title || "",
        author: initialTitle.author || "",
        year: initialTitle.year || "",
        language: initialTitle.language || "",
        isbn: initialTitle.isbn || "",
        publisher: initialTitle.publisher || "",
        pages: initialTitle.pages || "",
        description: initialTitle.description || "",
        cover: initialTitle.cover || "#0D7377",
        cover_image: initialTitle.cover_image || "",
        type: initialTitle.type || "",
      };
    }
    return { ...EMPTY_FORM };
  });

  const [copies, setCopies] = useState(initialTitle?.copies || []);
  const [editingCopy, setEditingCopy] = useState(null);
  const [copyForm, setCopyForm] = useState({ code: "", condition: "good", notes: "" });
  const [addingCopy, setAddingCopy] = useState(false);

  const [saving, setSaving] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [confirmDeleteTitle, setConfirmDeleteTitle] = useState(false);
  const [confirmDeleteCopy, setConfirmDeleteCopy] = useState(null);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // ISBN lookup from OpenLibrary
  const lookupISBN = useCallback(async (isbn) => {
    setLookingUp(true);
    try {
      const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      if (!res.ok) return;
      const data = await res.json();

      // Get author info
      let authorName = "";
      if (data.authors?.length) {
        const authorKey = data.authors[0].key;
        try {
          const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
          const authorData = await authorRes.json();
          authorName = authorData.name || "";
        } catch {}
      }

      // Get cover image
      let coverImage = "";
      if (data.covers?.length) {
        coverImage = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`;
      }

      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        author: authorName || prev.author,
        year: data.publish_date ? data.publish_date.match(/\d{4}/)?.[0] || prev.year : prev.year,
        publisher: data.publishers?.[0] || prev.publisher,
        pages: data.number_of_pages?.toString() || prev.pages,
        isbn: isbn,
        cover_image: coverImage || prev.cover_image,
        description: typeof data.description === "string"
          ? data.description
          : data.description?.value || prev.description,
      }));
    } catch {
      // silently fail
    } finally {
      setLookingUp(false);
    }
  }, []);

  const handleScan = useCallback((isbn) => {
    setScanning(false);
    set("isbn", isbn);
    lookupISBN(isbn);
  }, [lookupISBN]);

  const handleISBNBlur = () => {
    const isbn = form.isbn.trim();
    if (isbn.length === 10 || isbn.length === 13) {
      lookupISBN(isbn);
    }
  };

  // Save title
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        year: form.year ? parseInt(form.year, 10) : null,
        pages: form.pages ? parseInt(form.pages, 10) : null,
      };

      if (isEditing) {
        await updateTitle(initialTitle.id, payload);
      } else {
        await addTitle(payload);
      }
      router.push("/admin/titles");
    } catch {
      // error handled by context
    } finally {
      setSaving(false);
    }
  };

  // Delete title
  const handleDeleteTitle = async () => {
    try {
      await deleteTitle(initialTitle.id);
      router.push("/admin/titles");
    } catch {}
    setConfirmDeleteTitle(false);
  };

  // Copies management
  const handleAddCopy = async () => {
    if (!isEditing) return;
    setSaving(true);
    try {
      await addCopy(initialTitle.id, copyForm);
      setCopies((prev) => [...prev, { ...copyForm, id: Date.now() }]);
      setAddingCopy(false);
      setCopyForm({ code: "", condition: "good", notes: "" });
    } catch {} finally { setSaving(false); }
  };

  const handleUpdateCopy = async () => {
    if (!isEditing) return;
    setSaving(true);
    try {
      await updateCopy(initialTitle.id, editingCopy, copyForm);
      setCopies((prev) => prev.map((c) => (c.id === editingCopy ? { ...c, ...copyForm } : c)));
      setEditingCopy(null);
    } catch {} finally { setSaving(false); }
  };

  const handleDeleteCopy = async (copyId) => {
    if (!isEditing) return;
    try {
      await deleteCopy(initialTitle.id, copyId);
      setCopies((prev) => prev.filter((c) => c.id !== copyId));
    } catch {}
    setConfirmDeleteCopy(null);
  };

  const startEditCopy = (copy) => {
    setEditingCopy(copy.id);
    setCopyForm({ code: copy.code || "", condition: copy.condition || "good", notes: copy.notes || "" });
  };

  const inputClass = "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";
  const labelClass = "block text-sm font-medium text-teal-900 dark:text-cream mb-1.5";

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/titles" className="rounded-lg p-2 text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">
            {isEditing ? t("titleForm.editTitle") : t("titleForm.addTitle")}
          </h1>
        </div>
        {isEditing && (
          <button
            onClick={() => setConfirmDeleteTitle(true)}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 className="size-4" /> {t("confirm.delete")}
          </button>
        )}
      </div>

      {/* ISBN Section */}
      <div className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className={labelClass}>{t("titleForm.isbn")}</label>
            <input
              value={form.isbn}
              onChange={(e) => set("isbn", e.target.value)}
              onBlur={handleISBNBlur}
              placeholder="978-..."
              className={inputClass}
            />
          </div>
          <button
            onClick={() => setScanning(true)}
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
          >
            <ScanBarcode className="size-4" />
            {t("titleForm.scan")}
          </button>
          {lookingUp && (
            <div className="flex items-center gap-2 text-sm text-sand-500 dark:text-night-400">
              <Loader2 className="size-4 animate-spin" />
              {t("scanner.lookingUp")}
            </div>
          )}
        </div>
      </div>

      {/* Main Fields */}
      <div className="mt-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>{t("titleForm.title")}</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>{t("titleForm.author")}</label>
            <input value={form.author} onChange={(e) => set("author", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>{t("titleForm.type")}</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputClass}>
              <option value="">{t("titleForm.type")}</option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>{t("titleForm.year")}</label>
            <input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>{t("titleForm.language")}</label>
            <input value={form.language} onChange={(e) => set("language", e.target.value)} placeholder="en" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>{t("titleForm.publisher")}</label>
            <input value={form.publisher} onChange={(e) => set("publisher", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>{t("titleForm.pages")}</label>
            <input type="number" value={form.pages} onChange={(e) => set("pages", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>{t("titleForm.fallbackColor")}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.cover}
                onChange={(e) => set("cover", e.target.value)}
                className="size-10 cursor-pointer rounded-lg border-0"
              />
              <span className="text-sm text-sand-500 dark:text-night-400">{form.cover}</span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>{t("titleForm.cover")}</label>
            <input value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://..." className={inputClass} />
            {form.cover_image && (
              <img src={form.cover_image} alt="Cover preview" className="mt-2 h-32 rounded-lg object-cover" />
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>{t("titleForm.description")}</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Copies Section (only for editing) */}
      {isEditing && (
        <div className="mt-4 rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-teal-900 dark:text-cream">{t("titleForm.copies")}</h2>
            <button
              onClick={() => { setAddingCopy(true); setCopyForm({ code: "", condition: "good", notes: "" }); }}
              className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600"
            >
              <Plus className="size-4" /> {t("titleForm.add")}
            </button>
          </div>

          <div className="space-y-2">
            {addingCopy && (
              <div className="flex items-center gap-3 rounded-xl bg-cream p-3 ring-1 ring-sand-200/50 dark:bg-night-800 dark:ring-night-700/50">
                <input
                  value={copyForm.code}
                  onChange={(e) => setCopyForm({ ...copyForm, code: e.target.value })}
                  placeholder={t("titleForm.locationPlaceholderShort")}
                  className="flex-1 rounded-lg border-0 bg-white px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700"
                />
                <select
                  value={copyForm.condition}
                  onChange={(e) => setCopyForm({ ...copyForm, condition: e.target.value })}
                  className="rounded-lg border-0 bg-white px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700"
                >
                  <option value="excellent">{t("titleForm.excellent")}</option>
                  <option value="good">{t("titleForm.good")}</option>
                  <option value="fair">{t("titleForm.fair")}</option>
                </select>
                <input
                  value={copyForm.notes}
                  onChange={(e) => setCopyForm({ ...copyForm, notes: e.target.value })}
                  placeholder={t("titleForm.description")}
                  className="flex-1 rounded-lg border-0 bg-white px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700"
                />
                <button onClick={handleAddCopy} disabled={saving} className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800">
                  <Check className="size-4" />
                </button>
                <button onClick={() => setAddingCopy(false)} className="rounded-lg p-2 text-sand-500 hover:bg-sand-100 dark:text-night-400">
                  <X className="size-4" />
                </button>
              </div>
            )}

            {copies.map((copy) => (
              <div key={copy.id} className="flex items-center justify-between rounded-xl bg-cream p-3 ring-1 ring-sand-200/50 dark:bg-night-800 dark:ring-night-700/50">
                {editingCopy === copy.id ? (
                  <div className="flex flex-1 items-center gap-3">
                    <input
                      value={copyForm.code}
                      onChange={(e) => setCopyForm({ ...copyForm, code: e.target.value })}
                      className="flex-1 rounded-lg border-0 bg-white px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700"
                    />
                    <select
                      value={copyForm.condition}
                      onChange={(e) => setCopyForm({ ...copyForm, condition: e.target.value })}
                      className="rounded-lg border-0 bg-white px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700"
                    >
                      <option value="excellent">{t("titleForm.excellent")}</option>
                      <option value="good">{t("titleForm.good")}</option>
                      <option value="fair">{t("titleForm.fair")}</option>
                    </select>
                    <input
                      value={copyForm.notes}
                      onChange={(e) => setCopyForm({ ...copyForm, notes: e.target.value })}
                      className="flex-1 rounded-lg border-0 bg-white px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700"
                    />
                    <button onClick={handleUpdateCopy} disabled={saving} className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800">
                      <Check className="size-4" />
                    </button>
                    <button onClick={() => setEditingCopy(null)} className="rounded-lg p-2 text-sand-500 hover:bg-sand-100 dark:text-night-400">
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="rounded-md bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                        {copy.code || "—"}
                      </span>
                      <span className="text-sm capitalize text-sand-500 dark:text-night-400">{copy.condition}</span>
                      {copy.notes && <span className="text-xs text-sand-300 dark:text-night-500">{copy.notes}</span>}
                      {copy.status && (
                        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                          copy.status === "available" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                          {copy.status}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => startEditCopy(copy)} className="rounded-lg p-2 text-sand-500 hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => setConfirmDeleteCopy(copy.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {copies.length === 0 && !addingCopy && (
              <p className="py-4 text-center text-sm text-sand-400 dark:text-night-500">{t("titleForm.noCopiesYet")}</p>
            )}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href="/admin/titles"
          className="rounded-xl border border-sand-200 px-6 py-3 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-800"
        >
          {t("titleForm.cancel")}
        </Link>
        <button
          onClick={handleSave}
          disabled={saving || !form.title}
          className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {isEditing ? t("titleForm.saveChanges") : t("titleForm.createTitle")}
        </button>
      </div>

      {/* Scanner Modal */}
      {scanning && <ISBNScanner onScan={handleScan} onClose={() => setScanning(false)} />}

      {/* Delete Title Confirm */}
      {confirmDeleteTitle && (
        <ConfirmDialog
          title={t("titleForm.deleteCopy")}
          message={t("titleForm.deleteCopyConfirm")}
          onConfirm={handleDeleteTitle}
          onCancel={() => setConfirmDeleteTitle(false)}
        />
      )}

      {/* Delete Copy Confirm */}
      {confirmDeleteCopy && (
        <ConfirmDialog
          title={t("titleForm.deleteCopy")}
          message={t("titleForm.deleteCopyConfirm")}
          onConfirm={() => handleDeleteCopy(confirmDeleteCopy)}
          onCancel={() => setConfirmDeleteCopy(null)}
        />
      )}
    </div>
  );
}
