import { useState } from "react";
import { X, BookOpen, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function RequestModal({ title, copy, onClose }) {
  const { isAuthenticated } = useAuth();
  const { createInquiry } = useData();
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await createInquiry({
        title_id: title.id,
        copy_id: copy?.id || null,
        notes,
      });
      setSubmitted(true);
      setTimeout(() => onClose(), 2200);
    } catch (err) {
      setError(err.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl dark:bg-night-800">
        {!isAuthenticated ? (
          <div className="py-6 text-center">
            <AlertCircle className="mx-auto mb-4 size-14 text-amber-500 dark:text-amber-400" />
            <h3 className="text-xl font-bold text-teal-900 dark:text-cream">
              Login Required
            </h3>
            <p className="mt-2 text-sm text-sand-500 dark:text-night-400">
              Please log in to request items.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-sand-200 px-4 py-2 text-sm font-semibold text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-700"
              >
                Close
              </button>
              <a
                href="/login"
                className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                Log In
              </a>
            </div>
          </div>
        ) : submitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="mx-auto mb-4 size-14 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-xl font-bold text-teal-900 dark:text-cream">
              Request Submitted!
            </h3>
            <p className="mt-2 text-sm text-sand-500 dark:text-night-400">
              Your request for <strong>{title.title}</strong> has been
              submitted. You'll be notified when it's approved.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <h2 className="text-xl font-bold text-teal-900 dark:text-cream">
                Request Item
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-700"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Item preview */}
            <div className="mb-6 flex gap-3 rounded-xl bg-warm p-3.5 dark:bg-night-900">
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: title.cover }}
              >
                <BookOpen className="size-6" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-teal-900 dark:text-cream">
                  {title.title}
                </p>
                <p className="text-xs text-sand-500 dark:text-night-400">
                  {title.author}
                </p>
                {copy && (
                  <p className="mt-1 text-xs text-sand-300 dark:text-night-400">
                    {copy.condition} condition &middot; {copy.location}
                  </p>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or notes..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-sand-200 px-4 py-2.5 text-sm font-semibold text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                {submitting && <Loader2 className="size-4 animate-spin" />}
                Confirm Request
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
