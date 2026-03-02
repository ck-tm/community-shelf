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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="mx-auto mb-4 size-14 text-emerald-500" />
            <h3 className="text-xl font-bold text-gray-900">Request Submitted!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your request for <strong>{title.title}</strong> has been submitted.
              You'll be notified when it's approved.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">Request Item</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Item preview */}
            <div className="mb-6 flex gap-3 rounded-xl bg-gray-50 p-3.5">
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: title.cover }}
              >
                <BookOpen className="size-6" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {title.title}
                </p>
                <p className="text-xs text-gray-500">{title.author}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {copy.condition} condition &middot; {copy.location}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Preferred Pick-up Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or notes..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!pickupDate}
                className="flex-1 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
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
