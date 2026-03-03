import { useState } from "react";
import { X, BookOpen, CheckCircle } from "lucide-react";

export default function RequestModal({ title, copy, onClose, onSubmit }) {
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!pickupDate) return;
    setSubmitted(true);
    setTimeout(() => onSubmit(), 2200);
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-900 dark:text-cream dark:ring-night-700";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl dark:bg-night-800">
        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="mx-auto mb-4 size-14 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-xl font-bold text-teal-900 dark:text-cream">
              Request Submitted!
            </h3>
            <p className="mt-2 text-sm text-sand-400 dark:text-night-400">
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
                className="rounded-lg p-1 text-sand-400 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-700"
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
                <p className="text-xs text-sand-400 dark:text-night-400">
                  {title.author}
                </p>
                <p className="mt-1 text-xs text-sand-300 dark:text-night-400">
                  {copy.condition} condition &middot; {copy.location}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                  Preferred Pick-up Date{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
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

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-sand-200 px-4 py-2.5 text-sm font-semibold text-sand-400 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!pickupDate}
                className="flex-1 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                Confirm Request
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
