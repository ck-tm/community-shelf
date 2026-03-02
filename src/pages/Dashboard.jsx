import { useState } from "react";
import { BookOpen, Clock, XCircle } from "lucide-react";
import { MOCK_INQUIRIES } from "../data/mock";
import TypeIcon from "../components/TypeIcon";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);

  const stats = {
    active: inquiries.filter((i) => i.status === "Active").length,
    pending: inquiries.filter((i) => i.status === "Pending").length,
    overdue: inquiries.filter((i) => i.status === "Overdue").length,
  };

  const cancel = (id) =>
    setInquiries((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900">My Dashboard</h1>
      <p className="mt-1 mb-8 text-gray-500">
        Track your requests, active loans, and returns.
      </p>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Active Loans",
            value: stats.active,
            icon: <BookOpen className="size-8 text-teal-700 opacity-20" />,
            accent: "border-l-teal-600",
          },
          {
            label: "Pending Requests",
            value: stats.pending,
            icon: <Clock className="size-8 text-amber-500 opacity-20" />,
            accent: "border-l-amber-500",
          },
          {
            label: "Overdue Items",
            value: stats.overdue,
            icon: <XCircle className="size-8 text-red-500 opacity-20" />,
            accent: "border-l-red-500",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`flex items-center justify-between rounded-xl border-l-4 bg-white p-6 shadow-sm ${s.accent}`}
          >
            <div>
              <p className="text-sm font-medium text-gray-500">{s.label}</p>
              <p className="mt-1 text-3xl font-extrabold text-gray-900">
                {s.value}
              </p>
            </div>
            {s.icon}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Loan History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
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
                    className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400"
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
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-5 py-3.5 font-semibold text-gray-900">
                    {inq.title}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <TypeIcon type={inq.type} className="size-3.5" />
                      {inq.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {inq.organization}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {inq.requestDate}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {inq.dueDate || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    {inq.status === "Pending" && (
                      <button
                        onClick={() => cancel(inq.id)}
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
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
                    className="px-5 py-12 text-center text-gray-400"
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
