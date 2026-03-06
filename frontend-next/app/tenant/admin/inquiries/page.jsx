"use client";

import { useState, useEffect, useMemo } from "react";
import { Clock, CheckCircle, RotateCcw, CalendarPlus, Loader2, Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import StatusBadge from "@/components/StatusBadge";

const TABS = ["pending", "active", "history"];

export default function ManageInquiries() {
  const { inquiries, fetchAdminInquiries, acceptInquiry, returnInquiry, extendInquiry } = useData();
  const { t } = useTranslation();
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [extendDays, setExtendDays] = useState({});

  useEffect(() => {
    fetchAdminInquiries().finally(() => setLoading(false));
  }, [fetchAdminInquiries]);

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      if (tab === "pending") return inq.status === "pending";
      if (tab === "active") return inq.status === "accepted" || inq.status === "active";
      return inq.status === "returned" || inq.status === "cancelled" || inq.status === "expired";
    });
  }, [inquiries, tab]);

  const handleAccept = async (id) => {
    setActionLoading(id);
    try {
      await acceptInquiry(id, { days: 14 });
    } catch {}
    setActionLoading(null);
  };

  const handleReturn = async (id) => {
    setActionLoading(id);
    try {
      await returnInquiry(id);
    } catch {}
    setActionLoading(null);
  };

  const handleExtend = async (id) => {
    setActionLoading(id);
    try {
      await extendInquiry(id, { days: parseInt(extendDays[id], 10) || 7 });
      setExtendDays((prev) => ({ ...prev, [id]: "" }));
    } catch {}
    setActionLoading(null);
  };

  const tabIcons = { pending: Clock, active: CheckCircle, history: RotateCcw };

  return (
    <div>
      <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">{t("manageInquiries.title")}</h1>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-xl bg-sand-100 p-1 dark:bg-night-800">
        {TABS.map((tabKey) => {
          const Icon = tabIcons[tabKey];
          const isActive = tab === tabKey;
          const count = inquiries.filter((inq) => {
            if (tabKey === "pending") return inq.status === "pending";
            if (tabKey === "active") return inq.status === "accepted" || inq.status === "active";
            return inq.status === "returned" || inq.status === "cancelled" || inq.status === "expired";
          }).length;

          return (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-teal-800 shadow-sm dark:bg-night-700 dark:text-teal-300"
                  : "text-sand-500 hover:text-teal-700 dark:text-night-400 dark:hover:text-teal-400"
              }`}
            >
              <Icon className="size-4" />
              {t(`manageInquiries.${tabKey}`)}
              {count > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${
                  isActive
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                    : "bg-sand-200 text-sand-600 dark:bg-night-600 dark:text-night-300"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Inquiry List */}
      <div className="mt-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-teal-700 dark:text-teal-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-sand-400 dark:text-night-500">
            <Inbox className="size-8" />
            <p className="text-sm">{t("manageInquiries.noPending")}</p>
          </div>
        ) : (
          filtered.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-teal-900 dark:text-cream">{inq.title_name || inq.title?.title}</p>
                  <p className="mt-0.5 text-sm text-sand-500 dark:text-night-400">
                    {inq.user_email || inq.user?.email}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-sand-400 dark:text-night-500">
                    {inq.copy_code && <span>Copy: {inq.copy_code}</span>}
                    {inq.created_at && <span>{new Date(inq.created_at).toLocaleDateString()}</span>}
                    {inq.due_date && <span>Due: {new Date(inq.due_date).toLocaleDateString()}</span>}
                  </div>
                  {inq.message && (
                    <p className="mt-2 text-sm italic text-sand-400 dark:text-night-500">&ldquo;{inq.message}&rdquo;</p>
                  )}
                </div>
                <StatusBadge status={inq.status} />
              </div>

              {/* Actions */}
              {tab === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAccept(inq.id)}
                    disabled={actionLoading === inq.id}
                    className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600"
                  >
                    {actionLoading === inq.id ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle className="size-4" />}
                    {t("manageInquiries.accept")}
                  </button>
                </div>
              )}

              {tab === "active" && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleReturn(inq.id)}
                    disabled={actionLoading === inq.id}
                    className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
                  >
                    {actionLoading === inq.id ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
                    {t("manageInquiries.markReturned")}
                  </button>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={extendDays[inq.id] || ""}
                      onChange={(e) => setExtendDays((prev) => ({ ...prev, [inq.id]: e.target.value }))}
                      placeholder="7"
                      className="w-16 rounded-lg border-0 bg-cream px-3 py-2 text-center text-sm ring-1 ring-sand-200/70 outline-none focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700"
                    />
                    <button
                      onClick={() => handleExtend(inq.id)}
                      disabled={actionLoading === inq.id}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                      <CalendarPlus className="size-4" />
                      {t("manageInquiries.extend")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
