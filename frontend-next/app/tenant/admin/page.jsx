"use client";

import { useEffect } from "react";
import { Tags, BookOpen, Copy, Layers, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";

export default function AdminDashboard() {
  const { stats, fetchStats, types, titles, curatedLists } = useData();
  const { t } = useTranslation();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = [
    { label: t("adminDashboard.contentTypes"), value: stats?.types_count ?? types.length, icon: Tags, color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" },
    { label: t("adminDashboard.titles"), value: stats?.titles_count ?? titles.length, icon: BookOpen, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    { label: t("adminDashboard.totalCopies"), value: stats?.copies_count ?? 0, icon: Copy, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    { label: t("adminDashboard.curatedLists"), value: stats?.lists_count ?? curatedLists.length, icon: Layers, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
    { label: t("adminDashboard.pendingInquiries"), value: stats?.inquiries_count ?? 0, icon: MessageSquare, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-teal-900 dark:text-cream">
        {t("adminDashboard.title")}
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
          >
            <div className={`inline-flex rounded-xl p-2.5 ${card.color}`}>
              <card.icon className="size-5" />
            </div>
            <p className="mt-3 text-3xl font-bold text-teal-900 dark:text-cream">
              {card.value}
            </p>
            <p className="mt-1 text-sm text-sand-400 dark:text-night-500">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
