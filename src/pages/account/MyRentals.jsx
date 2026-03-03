import { BookOpen, Clock, XCircle } from "lucide-react";
import { useData } from "../../context/DataContext";
import TypeIcon from "../../components/TypeIcon";
import StatusBadge from "../../components/StatusBadge";

export default function MyRentals() {
  const { inquiries, deleteInquiry } = useData();

  const stats = {
    active: inquiries.filter((i) => i.status === "Active").length,
    pending: inquiries.filter((i) => i.status === "Pending").length,
    overdue: inquiries.filter((i) => i.status === "Overdue").length,
  };

  const cancel = (id) => deleteInquiry(id);

  return (
    <div>
      {/* Header */}
      <div
        className="mb-8"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          My Rentals
        </h1>
        <p className="mt-1 text-sand-400 dark:text-night-400">
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
              <p className="text-sm font-medium text-sand-400 dark:text-night-400">
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

      {/* Loan History Table */}
      <div
        className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 transition-colors duration-300 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.5s ease-out 0.14s both" }}
      >
        <div className="border-b border-sand-200/60 px-6 py-4 dark:border-night-700/50">
          <h2 className="font-heading text-lg text-teal-900 dark:text-cream">
            Loan History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-200/60 bg-sand-100/50 dark:border-night-700/50 dark:bg-night-800/50">
                {[
                  "Title",
                  "Type",
                  "Organization",
                  "Status",
                  "Requested",
                  "Due",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr
                  key={inq.id}
                  className="border-b border-sand-100/80 transition-colors duration-150 hover:bg-sand-100/40 dark:border-night-800/60 dark:hover:bg-night-800/40"
                >
                  <td className="px-5 py-3.5 font-semibold text-teal-900 dark:text-cream">
                    {inq.title}
                  </td>
                  <td className="px-5 py-3.5 text-sand-400 dark:text-night-400">
                    <span className="flex items-center gap-1.5">
                      <TypeIcon type={inq.type} className="size-3.5" />
                      {inq.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sand-400 dark:text-night-400">
                    {inq.organization}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-5 py-3.5 tabular-nums text-sand-400 dark:text-night-400">
                    {inq.requestDate}
                  </td>
                  <td className="px-5 py-3.5 tabular-nums text-sand-400 dark:text-night-400">
                    {inq.dueDate || "\u2014"}
                  </td>
                  <td className="px-5 py-3.5">
                    {inq.status === "Pending" && (
                      <button
                        onClick={() => cancel(inq.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 dark:border-red-800/50 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sand-300 dark:text-night-400"
                  >
                    No inquiries yet. Start browsing to request items!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
