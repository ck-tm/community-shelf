"use client";

import { useTranslation } from "react-i18next";
import { BookOpen, Clock, AlertTriangle } from "lucide-react";
import { useData } from "@/context/DataContext";
import StatusBadge from "@/components/StatusBadge";
import TypeIcon from "@/components/TypeIcon";

export default function MyRentals() {
  const { inquiries, cancelInquiry } = useData();
  const { t } = useTranslation();

  const active = inquiries.filter((i) => i.status === "Active").length;
  const pending = inquiries.filter((i) => i.status === "Pending").length;
  const overdue = inquiries.filter((i) => i.status === "Overdue").length;

  const stats = [
    { label: t("rentals.activeLoans"), value: active, icon: BookOpen, color: "text-emerald-600" },
    { label: t("rentals.pendingRequests"), value: pending, icon: Clock, color: "text-amber-600" },
    { label: t("rentals.overdueItems"), value: overdue, icon: AlertTriangle, color: "text-red-600" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">
        {t("rentals.title")}
      </h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50">
            <s.icon className={`size-5 ${s.color}`} />
            <p className="mt-2 text-2xl font-bold text-teal-900 dark:text-cream">{s.value}</p>
            <p className="text-xs text-sand-400 dark:text-night-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Inquiries list */}
      <div className="mt-8 space-y-3">
        {inquiries.length === 0 ? (
          <p className="py-8 text-center text-sand-400 dark:text-night-500">
            {t("rentals.noInquiries")}
          </p>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className="flex items-center justify-between rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: inq.title_cover || "#0D7377" }}
                >
                  <TypeIcon type={inq.title_type || "Books"} className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-teal-900 dark:text-cream">{inq.title_name}</p>
                  <p className="text-xs text-sand-400 dark:text-night-500">
                    {inq.created_at && new Date(inq.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={inq.status} />
                {inq.status === "Pending" && (
                  <button
                    onClick={() => cancelInquiry(inq.id)}
                    className="text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400"
                  >
                    {t("rentals.cancel")}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
