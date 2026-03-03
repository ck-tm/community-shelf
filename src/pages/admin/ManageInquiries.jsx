import { useState } from "react";
import { Check, X, RotateCcw, CalendarPlus } from "lucide-react";
import { useData } from "../../context/DataContext";
import TypeIcon from "../../components/TypeIcon";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const today = () => new Date().toISOString().slice(0, 10);

export default function ManageInquiries() {
  const { inquiries, updateInquiry } = useData();
  const [accepting, setAccepting] = useState(null);
  const [extending, setExtending] = useState(null);
  const [returning, setReturning] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  const pending = inquiries.filter((i) => i.status === "Pending");
  const rented = inquiries.filter((i) =>
    ["Approved", "Active", "Overdue"].includes(i.status)
  );
  const returned = inquiries
    .filter((i) => i.status === "Returned")
    .sort((a, b) => (b.returnDate || "").localeCompare(a.returnDate || ""));

  const tabs = [
    { key: "pending", label: "Pending", count: pending.length },
    { key: "active", label: "Active", count: rented.length },
    { key: "history", label: "History", count: returned.length },
  ];

  const handleAccept = () => {
    if (!accepting) return;
    const dueDate = addDays(accepting.rentDate, accepting.rentalPeriod);
    updateInquiry(accepting.id, {
      status: "Active",
      dueDate,
      rentalPeriod: accepting.rentalPeriod,
      notes: accepting.notes || null,
    });
    setAccepting(null);
  };

  const handleReturn = () => {
    if (!returning) return;
    updateInquiry(returning.id, {
      status: "Returned",
      returnDate: today(),
    });
    setReturning(null);
  };

  const handleExtend = () => {
    if (!extending || !extending.inq.dueDate) return;
    const newDue = addDays(extending.inq.dueDate, extending.days);
    updateInquiry(extending.inq.id, { dueDate: newDue });
    setExtending(null);
  };

  const inputClass =
    "rounded-lg border-0 bg-cream px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  const thClass =
    "px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-400";

  const tdClass = "px-5 py-3.5";

  return (
    <div>
      {/* Header */}
      <div
        className="mb-8"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          Inquiries
        </h1>
        <p className="mt-1 text-sand-400 dark:text-night-400">
          Manage loan requests, active rentals, and returns.
        </p>
      </div>

      {/* Tabs */}
      <div
        className="mb-6 flex gap-1 rounded-xl bg-sand-100/80 p-1 dark:bg-night-800"
        style={{ animation: "fade-up 0.5s ease-out 0.08s both" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              activeTab === tab.key
                ? "bg-white text-teal-800 shadow-sm dark:bg-night-700 dark:text-teal-400"
                : "text-sand-400 hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs font-normal">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* ─── Pending Requests Tab ─── */}
      {activeTab === "pending" && (
        <div style={{ animation: "fade-up 0.4s ease-out both" }}>
          <div className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sand-200/60 bg-sand-100/50 dark:border-night-700/50 dark:bg-night-800/50">
                    {["Title", "Type", "Organization", "Requested", "Actions"].map(
                      (h) => (
                        <th key={h} className={thClass}>
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pending.map((inq) => (
                    <tr
                      key={inq.id}
                      className="border-b border-sand-100/80 transition-colors duration-150 hover:bg-sand-100/40 dark:border-night-800/60 dark:hover:bg-night-800/40"
                    >
                      <td
                        className={`${tdClass} font-semibold text-teal-900 dark:text-cream`}
                      >
                        {inq.title}
                      </td>
                      <td className={`${tdClass} text-sand-400 dark:text-night-400`}>
                        <span className="flex items-center gap-1.5">
                          <TypeIcon type={inq.type} className="size-3.5" />
                          {inq.type}
                        </span>
                      </td>
                      <td className={`${tdClass} text-sand-400 dark:text-night-400`}>
                        {inq.organization}
                      </td>
                      <td
                        className={`${tdClass} tabular-nums text-sand-400 dark:text-night-400`}
                      >
                        {inq.requestDate}
                      </td>
                      <td className={tdClass}>
                        {accepting?.id === inq.id ? null : (
                          <button
                            onClick={() =>
                              setAccepting({
                                id: inq.id,
                                rentDate: today(),
                                rentalPeriod: 14,
                                notes: "",
                              })
                            }
                            className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                          >
                            Accept
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {pending.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-12 text-center text-sand-300 dark:text-night-400"
                      >
                        No pending requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Accept inline form */}
            {accepting && (
              <div
                className="border-t border-sand-200/60 p-4 dark:border-night-700/50"
                style={{ animation: "fade-up 0.3s ease-out both" }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                  Accept: {pending.find((i) => i.id === accepting.id)?.title}
                </p>
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                      Rent Date
                    </label>
                    <input
                      type="date"
                      value={accepting.rentDate}
                      onChange={(e) =>
                        setAccepting({ ...accepting, rentDate: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                      Period (days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={accepting.rentalPeriod}
                      onChange={(e) =>
                        setAccepting({
                          ...accepting,
                          rentalPeriod: Number(e.target.value),
                        })
                      }
                      className={`${inputClass} w-24`}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={accepting.notes}
                      onChange={(e) =>
                        setAccepting({ ...accepting, notes: e.target.value })
                      }
                      placeholder="Optional notes..."
                      className={`${inputClass} w-full`}
                    />
                  </div>
                  <button
                    onClick={handleAccept}
                    className="rounded-lg bg-teal-700 p-2 text-white transition hover:bg-teal-800 dark:bg-teal-600"
                  >
                    <Check className="size-4" />
                  </button>
                  <button
                    onClick={() => setAccepting(null)}
                    className="rounded-lg bg-sand-100 p-2 text-sand-400 transition hover:bg-sand-200 dark:bg-night-700 dark:text-night-400"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Active Rentals Tab ─── */}
      {activeTab === "active" && (
        <div style={{ animation: "fade-up 0.4s ease-out both" }}>
          <div className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sand-200/60 bg-sand-100/50 dark:border-night-700/50 dark:bg-night-800/50">
                    {[
                      "Title",
                      "Type",
                      "Organization",
                      "Status",
                      "Due Date",
                      "Period",
                      "Actions",
                    ].map((h) => (
                      <th key={h} className={thClass}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rented.map((inq) => (
                    <tr
                      key={inq.id}
                      className={`border-b border-sand-100/80 transition-colors duration-150 hover:bg-sand-100/40 dark:border-night-800/60 dark:hover:bg-night-800/40 ${
                        inq.status === "Overdue"
                          ? "bg-red-50/40 dark:bg-red-900/10"
                          : ""
                      }`}
                    >
                      <td
                        className={`${tdClass} font-semibold text-teal-900 dark:text-cream`}
                      >
                        {inq.title}
                      </td>
                      <td className={`${tdClass} text-sand-400 dark:text-night-400`}>
                        <span className="flex items-center gap-1.5">
                          <TypeIcon type={inq.type} className="size-3.5" />
                          {inq.type}
                        </span>
                      </td>
                      <td className={`${tdClass} text-sand-400 dark:text-night-400`}>
                        {inq.organization}
                      </td>
                      <td className={tdClass}>
                        <StatusBadge status={inq.status} />
                      </td>
                      <td
                        className={`${tdClass} tabular-nums text-sand-400 dark:text-night-400`}
                      >
                        {inq.dueDate || "—"}
                      </td>
                      <td
                        className={`${tdClass} tabular-nums text-sand-400 dark:text-night-400`}
                      >
                        {inq.rentalPeriod ? `${inq.rentalPeriod}d` : "—"}
                      </td>
                      <td className={tdClass}>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setReturning(inq)}
                            className="rounded-lg p-1.5 text-sand-400 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-night-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                            title="Mark as returned"
                          >
                            <RotateCcw className="size-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setExtending({ inq, days: 7 })
                            }
                            className="rounded-lg p-1.5 text-sand-400 transition hover:bg-sand-100 hover:text-teal-800 dark:text-night-400 dark:hover:bg-night-800 dark:hover:text-teal-400"
                            title="Extend rental"
                          >
                            <CalendarPlus className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {rented.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-sand-300 dark:text-night-400"
                      >
                        No active rentals.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Extend inline form */}
            {extending && (
              <div
                className="border-t border-sand-200/60 p-4 dark:border-night-700/50"
                style={{ animation: "fade-up 0.3s ease-out both" }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                  Extend: {extending.inq.title} (due{" "}
                  {extending.inq.dueDate})
                </p>
                <div className="flex items-end gap-3">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-400 dark:text-night-400">
                      Additional Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={extending.days}
                      onChange={(e) =>
                        setExtending({
                          ...extending,
                          days: Number(e.target.value),
                        })
                      }
                      className={`${inputClass} w-24`}
                    />
                  </div>
                  <span className="pb-2 text-xs text-sand-400 dark:text-night-400">
                    → New due:{" "}
                    {extending.inq.dueDate
                      ? addDays(extending.inq.dueDate, extending.days)
                      : "—"}
                  </span>
                  <button
                    onClick={handleExtend}
                    className="rounded-lg bg-teal-700 p-2 text-white transition hover:bg-teal-800 dark:bg-teal-600"
                  >
                    <Check className="size-4" />
                  </button>
                  <button
                    onClick={() => setExtending(null)}
                    className="rounded-lg bg-sand-100 p-2 text-sand-400 transition hover:bg-sand-200 dark:bg-night-700 dark:text-night-400"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Return History Tab ─── */}
      {activeTab === "history" && (
        <div style={{ animation: "fade-up 0.4s ease-out both" }}>
          <div className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sand-200/60 bg-sand-100/50 dark:border-night-700/50 dark:bg-night-800/50">
                    {[
                      "Title",
                      "Type",
                      "Organization",
                      "Requested",
                      "Returned",
                      "Period",
                      "Notes",
                    ].map((h) => (
                      <th key={h} className={thClass}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {returned.map((inq) => (
                    <tr
                      key={inq.id}
                      className="border-b border-sand-100/80 transition-colors duration-150 hover:bg-sand-100/40 dark:border-night-800/60 dark:hover:bg-night-800/40"
                    >
                      <td
                        className={`${tdClass} font-semibold text-teal-900 dark:text-cream`}
                      >
                        {inq.title}
                      </td>
                      <td className={`${tdClass} text-sand-400 dark:text-night-400`}>
                        <span className="flex items-center gap-1.5">
                          <TypeIcon type={inq.type} className="size-3.5" />
                          {inq.type}
                        </span>
                      </td>
                      <td className={`${tdClass} text-sand-400 dark:text-night-400`}>
                        {inq.organization}
                      </td>
                      <td
                        className={`${tdClass} tabular-nums text-sand-400 dark:text-night-400`}
                      >
                        {inq.requestDate}
                      </td>
                      <td
                        className={`${tdClass} tabular-nums text-sand-400 dark:text-night-400`}
                      >
                        {inq.returnDate || "—"}
                      </td>
                      <td
                        className={`${tdClass} tabular-nums text-sand-400 dark:text-night-400`}
                      >
                        {inq.rentalPeriod ? `${inq.rentalPeriod}d` : "—"}
                      </td>
                      <td
                        className={`${tdClass} max-w-[200px] truncate text-sand-400 dark:text-night-400`}
                      >
                        {inq.notes || "—"}
                      </td>
                    </tr>
                  ))}
                  {returned.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-sand-300 dark:text-night-400"
                      >
                        No returned items yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Return confirmation dialog */}
      {returning && (
        <ConfirmDialog
          title="Mark as Returned"
          message={`Mark "${returning.title}" as returned? This will record today's date as the return date.`}
          onConfirm={handleReturn}
          onCancel={() => setReturning(null)}
        />
      )}
    </div>
  );
}
