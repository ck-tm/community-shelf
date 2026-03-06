"use client";

import { useState, useEffect } from "react";
import { Check, X, RotateCcw, CalendarPlus, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import TypeIcon from "@/components/TypeIcon";
import StatusBadge from "@/components/StatusBadge";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ManageInquiries() {
  const { t } = useTranslation();
  const { inquiries, fetchAdminInquiries, acceptInquiry, returnInquiry, extendInquiry } =
    useData();
  const [accepting, setAccepting] = useState(null);
  const [extending, setExtending] = useState(null);
  const [returning, setReturning] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdminInquiries().catch(() => {});
  }, [fetchAdminInquiries]);

  const pending = inquiries.filter((i) => i.status === "Pending");
  const rented = inquiries.filter((i) =>
    ["Approved", "Active", "Overdue"].includes(i.status),
  );
  const returned = inquiries
    .filter((i) => i.status === "Returned")
    .sort((a, b) => (b.returnDate || "").localeCompare(a.returnDate || ""));

  const tabs = [
    { key: "pending", label: t("manageInquiries.pending"), count: pending.length },
    { key: "active", label: t("manageInquiries.active"), count: rented.length },
    { key: "history", label: t("manageInquiries.history"), count: returned.length },
  ];

  const handleAccept = async () => {
    if (!accepting) return;
    setLoading(true);
    try {
      await acceptInquiry(accepting.id, { rentalPeriod: accepting.rentalPeriod });
      setAccepting(null);
    } catch (err) {
      console.error("Failed to accept inquiry:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!returning) return;
    setLoading(true);
    try {
      await returnInquiry(returning.id);
      setReturning(null);
    } catch (err) {
      console.error("Failed to mark returned:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExtend = async () => {
    if (!extending) return;
    setLoading(true);
    try {
      await extendInquiry(extending.inq.id, { days: extending.days });
      setExtending(null);
    } catch (err) {
      console.error("Failed to extend inquiry:", err);
    } finally {
      setLoading(false);
    }
  };

  function addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  const inputClass =
    "rounded-lg border-0 bg-cream px-3 py-2 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div>
      {/* Header */}
      <div className="mb-8" style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          {t("manageInquiries.title")}
        </h1>
        <p className="mt-1 text-sand-500 dark:text-night-400">
          {t("manageInquiries.subtitle")}
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
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
              activeTab === tab.key
                ? "bg-white text-teal-800 shadow-sm dark:bg-night-700 dark:text-teal-400"
                : "text-sand-500 hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
            }`}
          >
            {tab.label}
            <span className="ml-1 text-xs font-normal opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Pending Tab */}
      {activeTab === "pending" && (
        <div className="space-y-2" style={{ animation: "fade-up 0.4s ease-out both" }}>
          {pending.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
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
                    <span className="text-sand-200 dark:text-night-600">&middot;</span>
                    <span>{inq.requestDate}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-sand-500 dark:text-night-400">
                    <User className="size-3" />
                    {inq.userName || inq.userEmail}
                    {inq.userName && (
                      <span className="text-sand-300 dark:text-night-500">({inq.userEmail})</span>
                    )}
                  </div>
                </div>
                <StatusBadge status={inq.status} />
              </div>

              {/* Accept form */}
              {accepting?.id === inq.id ? (
                <div
                  className="mt-3 flex flex-wrap items-end gap-3 border-t border-sand-200/60 pt-3 dark:border-night-700/50"
                  style={{ animation: "fade-up 0.3s ease-out both" }}
                >
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                      {t("manageInquiries.periodDays")}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={accepting.rentalPeriod}
                      onChange={(e) =>
                        setAccepting({ ...accepting, rentalPeriod: Number(e.target.value) })
                      }
                      className={`${inputClass} w-24`}
                    />
                  </div>
                  <button
                    onClick={handleAccept}
                    disabled={loading}
                    className="rounded-lg bg-teal-700 p-2 text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
                  >
                    <Check className="size-4" />
                  </button>
                  <button
                    onClick={() => setAccepting(null)}
                    className="rounded-lg bg-sand-100 p-2 text-sand-500 transition hover:bg-sand-200 dark:bg-night-700 dark:text-night-400"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-3 border-t border-sand-200/60 pt-3 dark:border-night-700/50">
                  <button
                    onClick={() => setAccepting({ id: inq.id, rentalPeriod: 14 })}
                    className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                  >
                    {t("manageInquiries.accept")}
                  </button>
                </div>
              )}
            </div>
          ))}
          {pending.length === 0 && (
            <p className="py-12 text-center text-sand-300 dark:text-night-400">
              {t("manageInquiries.noPending")}
            </p>
          )}
        </div>
      )}

      {/* Active Tab */}
      {activeTab === "active" && (
        <div className="space-y-2" style={{ animation: "fade-up 0.4s ease-out both" }}>
          {rented.map((inq) => (
            <div
              key={inq.id}
              className={`rounded-2xl p-4 ring-1 ring-sand-200/50 dark:ring-night-700/50 ${
                inq.status === "Overdue"
                  ? "bg-red-50/60 dark:bg-red-900/10"
                  : "bg-warm dark:bg-night-900"
              }`}
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
                    {inq.dueDate && (
                      <>
                        <span className="text-sand-200 dark:text-night-600">&middot;</span>
                        <span>{t("manageInquiries.due", { date: inq.dueDate })}</span>
                      </>
                    )}
                    {inq.rentalPeriod && (
                      <>
                        <span className="text-sand-200 dark:text-night-600">&middot;</span>
                        <span>{t("manageInquiries.days", { count: inq.rentalPeriod })}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-sand-500 dark:text-night-400">
                    <User className="size-3" />
                    {inq.userName || inq.userEmail}
                    {inq.userName && (
                      <span className="text-sand-300 dark:text-night-500">({inq.userEmail})</span>
                    )}
                  </div>
                </div>
                <StatusBadge status={inq.status} />
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2 border-t border-sand-200/60 pt-3 dark:border-night-700/50">
                <button
                  onClick={() => setReturning(inq)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                >
                  <RotateCcw className="size-3.5" /> {t("manageInquiries.returned")}
                </button>
                <button
                  onClick={() => setExtending({ inq, days: 7 })}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-800"
                >
                  <CalendarPlus className="size-3.5" /> {t("manageInquiries.extend")}
                </button>

                {/* Extend inline form */}
                {extending?.inq.id === inq.id && (
                  <div
                    className="ml-1 flex flex-wrap items-center gap-2"
                    style={{ animation: "fade-up 0.2s ease-out both" }}
                  >
                    <input
                      type="number"
                      min={1}
                      value={extending.days}
                      onChange={(e) =>
                        setExtending({ ...extending, days: Number(e.target.value) })
                      }
                      className={`${inputClass} w-20`}
                    />
                    <span className="text-xs text-sand-500 dark:text-night-400">
                      &rarr; {inq.dueDate ? addDays(inq.dueDate, extending.days) : "\u2014"}
                    </span>
                    <button
                      onClick={handleExtend}
                      disabled={loading}
                      className="rounded-lg bg-teal-700 p-1.5 text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
                    >
                      <Check className="size-3.5" />
                    </button>
                    <button
                      onClick={() => setExtending(null)}
                      className="rounded-lg bg-sand-100 p-1.5 text-sand-500 transition hover:bg-sand-200 dark:bg-night-700 dark:text-night-400"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {rented.length === 0 && (
            <p className="py-12 text-center text-sand-300 dark:text-night-400">
              {t("manageInquiries.noActive")}
            </p>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-2" style={{ animation: "fade-up 0.4s ease-out both" }}>
          {returned.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
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
                    <span className="text-sand-200 dark:text-night-600">&middot;</span>
                    <span>{t("manageInquiries.requested", { date: inq.requestDate })}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-sand-500 dark:text-night-400">
                    <User className="size-3" />
                    {inq.userName || inq.userEmail}
                    {inq.userName && (
                      <span className="text-sand-300 dark:text-night-500">({inq.userEmail})</span>
                    )}
                  </div>
                  {(inq.returnDate || inq.rentalPeriod) && (
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-sand-500 dark:text-night-400">
                      {inq.returnDate && <span>{t("manageInquiries.returnedDate", { date: inq.returnDate })}</span>}
                      {inq.returnDate && inq.rentalPeriod && (
                        <span className="text-sand-200 dark:text-night-600">&middot;</span>
                      )}
                      {inq.rentalPeriod && <span>{t("manageInquiries.days", { count: inq.rentalPeriod })}</span>}
                    </div>
                  )}
                  {inq.notes && (
                    <p className="mt-1.5 text-xs text-sand-500 dark:text-night-400">
                      {inq.notes}
                    </p>
                  )}
                </div>
                <StatusBadge status={inq.status} />
              </div>
            </div>
          ))}
          {returned.length === 0 && (
            <p className="py-12 text-center text-sand-300 dark:text-night-400">
              {t("manageInquiries.noHistory")}
            </p>
          )}
        </div>
      )}

      {/* Return confirmation */}
      {returning && (
        <ConfirmDialog
          title={t("manageInquiries.markReturned")}
          message={t("manageInquiries.markReturnedConfirm", { title: returning.title })}
          onConfirm={handleReturn}
          onCancel={() => setReturning(null)}
        />
      )}
    </div>
  );
}
