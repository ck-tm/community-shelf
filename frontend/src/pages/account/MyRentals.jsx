import { BookOpen, Clock, XCircle } from "lucide-react";
import { useData } from "../../context/DataContext";
import TypeIcon from "../../components/TypeIcon";
import StatusBadge from "../../components/StatusBadge";

export default function MyRentals() {
  const { inquiries, cancelInquiry } = useData();

  const stats = {
    active: inquiries.filter((i) => i.status === "Active").length,
    pending: inquiries.filter((i) => i.status === "Pending").length,
    overdue: inquiries.filter((i) => i.status === "Overdue").length,
  };

  const cancel = async (id) => {
    try {
      await cancelInquiry(id);
    } catch (err) {
      console.error("Failed to cancel inquiry:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8" style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          My Rentals
        </h1>
        <p className="mt-1 text-sand-500 dark:text-night-400">
          Track your active loans and request history.
        </p>
      </div>

      {/* Stats */}
      <div
        className="mb-8 grid gap-5 sm:grid-cols-3"
        style={{ animation: "fade-up 0.5s ease-out 0.08s both" }}
      >
        {[
          {
            label: "Active Loans",
            value: stats.active,
            icon: BookOpen,
            iconColor: "text-teal-700/20 dark:text-teal-400/20",
            accent: "border-l-teal-700 dark:border-l-teal-500",
          },
          {
            label: "Pending Requests",
            value: stats.pending,
            icon: Clock,
            iconColor: "text-amber-500/20 dark:text-amber-400/20",
            accent: "border-l-amber-500 dark:border-l-amber-400",
          },
          {
            label: "Overdue Items",
            value: stats.overdue,
            icon: XCircle,
            iconColor: "text-red-500/20 dark:text-red-400/20",
            accent: "border-l-red-500 dark:border-l-red-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`flex items-center justify-between rounded-2xl border-l-4 bg-warm p-6 ring-1 ring-sand-200/50 transition-colors duration-300 dark:bg-night-900 dark:ring-night-700/50 ${s.accent}`}
          >
            <div>
              <p className="text-sm font-medium text-sand-500 dark:text-night-400">
                {s.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-teal-900 dark:text-cream">
                {s.value}
              </p>
            </div>
            <s.icon className={`size-8 ${s.iconColor}`} />
          </div>
        ))}
      </div>

      {/* Loan History */}
      <div
        className="space-y-2"
        style={{ animation: "fade-up 0.5s ease-out 0.14s both" }}
      >
        <h2 className="mb-4 font-heading text-lg text-teal-900 dark:text-cream">
          Loan History
        </h2>

        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 transition-colors duration-300 dark:bg-night-900 dark:ring-night-700/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-teal-900 dark:text-cream">
                  {inq.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-sand-500 dark:text-night-400">
                  <span className="flex items-center gap-1">
                    <TypeIcon type={inq.type} className="size-3.5" />
                    {inq.type}
                  </span>
                  <span className="text-sand-200 dark:text-night-600">·</span>
                  <span>{inq.requestDate}</span>
                  {inq.dueDate && (
                    <>
                      <span className="text-sand-200 dark:text-night-600">·</span>
                      <span>Due: {inq.dueDate}</span>
                    </>
                  )}
                </div>
              </div>
              <StatusBadge status={inq.status} />
            </div>

            {inq.status === "Pending" && (
              <div className="mt-3 border-t border-sand-200/60 pt-3 dark:border-night-700/50">
                <button
                  onClick={() => cancel(inq.id)}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 dark:border-red-800/50 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}

        {inquiries.length === 0 && (
          <p className="py-12 text-center text-sand-300 dark:text-night-500">
            No inquiries yet. Start browsing to request items!
          </p>
        )}
      </div>
    </div>
  );
}
