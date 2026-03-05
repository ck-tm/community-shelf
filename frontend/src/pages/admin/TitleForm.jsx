import { useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Camera,
  Loader2,
  CheckCircle,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import ISBNScanner from "../../components/ISBNScanner";
import ConfirmDialog from "../../components/ConfirmDialog";

/* ── OpenLibrary ISBN lookup ────────────────────────────────────── */

const LANG_MAP = {
  eng: "English",
  fre: "French",
  ger: "German",
  spa: "Spanish",
  ita: "Italian",
  por: "Portuguese",
  rum: "Romanian",
  dut: "Dutch",
  rus: "Russian",
  jpn: "Japanese",
  chi: "Chinese",
  kor: "Korean",
  ara: "Arabic",
};

async function lookupISBN(isbn) {
  const cleaned = isbn.replace(/[^0-9Xx]/g, "");
  if (cleaned.length !== 10 && cleaned.length !== 13) {
    throw new Error("ISBN must be 10 or 13 digits");
  }

  const res = await fetch(
    `https://openlibrary.org/search.json?isbn=${cleaned}&fields=title,author_name,first_publish_year,publisher,number_of_pages_median,language,cover_i&limit=1`,
  );
  if (!res.ok) throw new Error("Failed to reach OpenLibrary");

  const data = await res.json();
  if (!data.docs || data.docs.length === 0) {
    throw new Error("No results found for this ISBN");
  }

  const doc = data.docs[0];
  const langCode = doc.language?.[0] || "";
  const coverId = doc.cover_i;

  return {
    title: doc.title || "",
    author: (doc.author_name || []).join(", "),
    year: doc.first_publish_year || "",
    publisher: (doc.publisher || [])[0] || "",
    pages: doc.number_of_pages_median || "",
    language: LANG_MAP[langCode] || langCode || "",
    isbn: cleaned,
    cover_image: coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "",
  };
}

/* ── Also fetch description from the edition endpoint ───────────── */

async function fetchDescription(isbn) {
  try {
    const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    if (!res.ok) return "";
    const data = await res.json();
    if (!data.description) return "";
    return typeof data.description === "string"
      ? data.description
      : data.description.value || "";
  } catch {
    return "";
  }
}

/* ── Component ──────────────────────────────────────────────────── */

export default function TitleForm() {
  const {
    titles,
    types,
    addTitle,
    updateTitle,
    addCopy,
    updateCopy,
    deleteCopy,
  } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? titles.find((t) => t.id === Number(id)) : null;

  const [form, setForm] = useState({
    title: existing?.title || "",
    author: existing?.author || "",
    type: existing?.type || types[0]?.name || "",
    description: existing?.description || "",
    isbn: existing?.isbn || "",
    year: existing?.year || new Date().getFullYear(),
    language: existing?.language || "English",
    cover: existing?.cover || "#0D7377",
    cover_image: existing?.cover_image || "",
    publisher: existing?.publisher || "",
    pages: existing?.pages || "",
  });
  const [copyForm, setCopyForm] = useState({
    condition: "Good",
    location: "",
  });
  const [saving, setSaving] = useState(false);
  const [looking, setLooking] = useState(false);
  const [lookupMsg, setLookupMsg] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [duplicateTitle, setDuplicateTitle] = useState(null);

  // Inline copies editing (edit mode only)
  const [editingCopy, setEditingCopy] = useState(null);
  const [deletingCopy, setDeletingCopy] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const setCopyField = (key) => (e) =>
    setCopyForm({ ...copyForm, [key]: e.target.value });

  /* ── ISBN lookup ──────────────────────────────────────────────── */

  const handleLookup = useCallback(
    async (isbn) => {
      const target = isbn || form.isbn;
      if (!target.trim()) return;
      const cleaned = target.replace(/[^0-9Xx]/g, "");

      // Check for existing title with this ISBN
      const dup = titles.find(
        (t) => t.isbn === cleaned && t.id !== existing?.id,
      );
      if (dup) {
        setDuplicateTitle(dup);
        return;
      }
      setDuplicateTitle(null);

      setLooking(true);
      setLookupMsg(null);
      try {
        const [result, description] = await Promise.all([
          lookupISBN(target),
          fetchDescription(cleaned),
        ]);
        setForm((prev) => ({
          ...prev,
          ...result,
          description: description || prev.description,
          type: prev.type,
          cover: prev.cover,
        }));
        setLookupMsg({ type: "success", text: "Book info loaded" });
        setTimeout(() => setLookupMsg(null), 3000);
      } catch (err) {
        setLookupMsg({ type: "error", text: err.message });
      } finally {
        setLooking(false);
      }
    },
    [form.isbn, titles, existing?.id],
  );

  const handleScan = useCallback(
    (isbn) => {
      setShowScanner(false);
      setForm((prev) => ({ ...prev, isbn }));
      handleLookup(isbn);
    },
    [handleLookup],
  );

  const handleISBNKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLookup();
    }
  };

  /* ── Save title ───────────────────────────────────────────────── */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const data = {
        ...form,
        year: Number(form.year) || null,
        pages: form.pages ? Number(form.pages) : null,
      };
      if (existing) {
        await updateTitle(existing.id, data);
      } else {
        const newTitleId = await addTitle(data);
        if (copyForm.location.trim()) {
          await addCopy(newTitleId, {
            condition: copyForm.condition,
            location: copyForm.location,
            status: "available",
          });
        }
      }
      navigate("/admin/titles");
    } catch (err) {
      console.error("Failed to save title:", err);
    } finally {
      setSaving(false);
    }
  };

  /* ── Inline copy management (edit mode) ───────────────────────── */

  const startAddCopy = () =>
    setEditingCopy({
      condition: "Good",
      location: "",
      status: "available",
      isNew: true,
      id: null,
    });

  const startEditCopy = (copy) => setEditingCopy({ ...copy, isNew: false });

  const saveCopy = async () => {
    if (!editingCopy || !editingCopy.location.trim() || !existing) return;
    const data = {
      condition: editingCopy.condition,
      location: editingCopy.location.trim(),
      status: editingCopy.status,
    };
    try {
      if (editingCopy.isNew) {
        await addCopy(existing.id, data);
      } else {
        await updateCopy(existing.id, editingCopy.id, data);
      }
      setEditingCopy(null);
    } catch (err) {
      console.error("Failed to save copy:", err);
    }
  };

  /* ── Styles ───────────────────────────────────────────────────── */

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400";

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400";

  return (
    <div>
      <button
        onClick={() => navigate("/admin/titles")}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
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
        className="space-y-5 rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 sm:p-6 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        {/* ISBN Lookup Row */}
        <div>
          <label className={labelClass}>ISBN Lookup</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={form.isbn}
              onChange={set("isbn")}
              onKeyDown={handleISBNKeyDown}
              placeholder="Enter ISBN or scan barcode..."
              className={inputClass}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLookup()}
                disabled={looking || !form.isbn.trim()}
                className="flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-40 sm:flex-initial dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                {looking ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
                Lookup
              </button>
              <button
                type="button"
                onClick={() => setShowScanner(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-sand-200 px-4 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-300 dark:hover:bg-night-800"
              >
                <Camera className="size-4" />
                <span className="hidden sm:inline">Scan</span>
              </button>
            </div>
          </div>

          {/* Lookup messages */}
          {lookupMsg && (
            <p
              className={`mt-2 flex items-center gap-1.5 text-sm ${
                lookupMsg.type === "success"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {lookupMsg.type === "success" && (
                <CheckCircle className="size-3.5" />
              )}
              {lookupMsg.text}
            </p>
          )}

          {/* Duplicate ISBN warning */}
          {duplicateTitle && (
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
              <AlertTriangle className="size-4 shrink-0" />
              <span>
                This ISBN already exists:{" "}
                <strong>{duplicateTitle.title}</strong>
              </span>
              <Link
                to={`/admin/titles/${duplicateTitle.id}/edit`}
                className="ml-auto rounded-lg bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900 transition hover:bg-amber-300 dark:bg-amber-800 dark:text-amber-200"
              >
                Open &amp; Add Copy
              </Link>
            </div>
          )}
        </div>

        <hr className="border-sand-200/60 dark:border-night-700/50" />

        {/* Title & Author */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={set("title")}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Author</label>
            <input
              type="text"
              value={form.author}
              onChange={set("author")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Type / Year / Language */}
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Type</label>
            <select
              value={form.type}
              onChange={set("type")}
              className={inputClass}
            >
              {types.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <input
              type="number"
              value={form.year}
              onChange={set("year")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Language</label>
            <input
              type="text"
              value={form.language}
              onChange={set("language")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Publisher / Pages */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Publisher</label>
            <input
              type="text"
              value={form.publisher}
              onChange={set("publisher")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Pages</label>
            <input
              type="number"
              value={form.pages}
              onChange={set("pages")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Cover */}
        <div>
          <label className={labelClass}>Cover</label>
          <div className="flex items-center gap-4">
            <div
              className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm ring-1 ring-sand-200/70 dark:ring-night-700"
              style={{ backgroundColor: form.cover }}
            >
              {form.cover_image ? (
                <img
                  src={form.cover_image}
                  alt="Cover"
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-[10px] font-medium text-white/60">
                  No image
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.cover}
                  onChange={set("cover")}
                  className="size-8 cursor-pointer rounded border-0 bg-transparent"
                />
                <span className="text-xs text-sand-500 dark:text-night-400">
                  Fallback color
                </span>
              </div>
              {form.cover_image && (
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, cover_image: "" }))
                  }
                  className="text-xs text-red-500 transition hover:text-red-700 dark:text-red-400"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── First Copy (new titles only) ──────────────────────── */}
        {!existing && (
          <>
            <hr className="border-sand-200/60 dark:border-night-700/50" />
            <p className="text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              First Copy
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={copyForm.location}
                  onChange={setCopyField("location")}
                  placeholder="e.g. Shelf A3, Room 2"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Condition</label>
                <select
                  value={copyForm.condition}
                  onChange={setCopyField("condition")}
                  className={inputClass}
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Submit buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/titles")}
            className="rounded-xl border border-sand-200 px-5 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            {saving
              ? "Saving..."
              : existing
                ? "Save Changes"
                : "Create Title"}
          </button>
        </div>
      </form>

      {/* ── Copies section (edit mode only) ──────────────────────── */}
      {existing && (
        <div
          className="mt-6 rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 sm:p-6 dark:bg-night-900 dark:ring-night-700/50"
          style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
              Copies
              <span className="ml-2 text-sm font-normal text-sand-500 dark:text-night-400">
                ({existing.copies.length})
              </span>
            </h2>
            <button
              type="button"
              onClick={startAddCopy}
              className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              <Plus className="size-3.5" /> Add
            </button>
          </div>

          {/* Inline edit form */}
          {editingCopy && (
            <div className="mb-4 flex flex-col gap-3 rounded-xl bg-cream p-3 ring-2 ring-teal-600/30 sm:flex-row sm:flex-wrap sm:items-end dark:bg-night-800">
              <div className="sm:w-28">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                  Condition
                </label>
                <select
                  value={editingCopy.condition}
                  onChange={(e) =>
                    setEditingCopy({
                      ...editingCopy,
                      condition: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                  Location
                </label>
                <input
                  type="text"
                  value={editingCopy.location}
                  onChange={(e) =>
                    setEditingCopy({
                      ...editingCopy,
                      location: e.target.value,
                    })
                  }
                  placeholder="e.g. Main Shelf"
                  autoFocus
                  className={inputClass}
                />
              </div>
              <div className="sm:w-32">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                  Status
                </label>
                <select
                  value={editingCopy.status}
                  onChange={(e) =>
                    setEditingCopy({
                      ...editingCopy,
                      status: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveCopy}
                  disabled={!editingCopy.location.trim()}
                  className="rounded-lg bg-teal-700 p-2 text-white transition hover:bg-teal-800 disabled:opacity-40 dark:bg-teal-600"
                >
                  <Check className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCopy(null)}
                  className="rounded-lg bg-gray-200 p-2 text-gray-600 transition hover:bg-gray-300 dark:bg-night-700 dark:text-night-400"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* Copies list */}
          <div className="space-y-2">
            {existing.copies.map((copy) => {
              const isAvail = copy.status === "available";
              return (
                <div
                  key={copy.id}
                  className="flex flex-col gap-2 rounded-xl bg-cream p-3 ring-1 ring-sand-200/50 sm:flex-row sm:items-center sm:justify-between dark:bg-night-800 dark:ring-night-700/50"
                >
                  <div className="flex flex-wrap items-center gap-2">
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
                    <span className="flex items-center gap-1 text-sm text-sand-500 dark:text-night-400">
                      <MapPin className="size-3" />
                      {copy.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEditCopy(copy)}
                      className="rounded-lg p-1.5 text-sand-500 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-700 dark:hover:text-teal-400"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingCopy(copy.id)}
                      className="rounded-lg p-1.5 text-sand-500 transition hover:bg-red-50 hover:text-red-600 dark:text-night-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {existing.copies.length === 0 && !editingCopy && (
              <p className="py-8 text-center text-sm text-sand-300 dark:text-night-400">
                No copies yet. Add one above.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Scanner modal */}
      {showScanner && (
        <ISBNScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Delete copy confirm */}
      {deletingCopy && existing && (
        <ConfirmDialog
          title="Delete Copy"
          message="Delete this copy? This cannot be undone."
          onConfirm={async () => {
            await deleteCopy(existing.id, deletingCopy);
            setDeletingCopy(null);
          }}
          onCancel={() => setDeletingCopy(null)}
        />
      )}
    </div>
  );
}
