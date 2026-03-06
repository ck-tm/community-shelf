"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Tag, BookOpen, Layers, Copy, ClipboardList, Wrench } from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { stats, fetchStats } = useData();

  useEffect(() => {
    fetchStats().catch(() => {});
  }, [fetchStats]);

  const cards = [
    {
      label: t("adminDashboard.contentTypes"),
      value: stats?.totalTypes ?? "\u2014",
      icon: Tag,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-600/10 dark:bg-amber-400/10",
      to: "/admin/types",
    },
    {
      label: t("adminDashboard.titles"),
      value: stats?.totalTitles ?? "\u2014",
      icon: BookOpen,
      color: "text-teal-700 dark:text-teal-400",
      bg: "bg-teal-700/10 dark:bg-teal-400/10",
      to: "/admin/titles",
    },
    {
      label: t("adminDashboard.totalCopies"),
      value: stats?.totalCopies ?? "\u2014",
      icon: Copy,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-600/10 dark:bg-blue-400/10",
      to: "/admin/titles",
    },
    {
      label: t("adminDashboard.curatedLists"),
      value: stats?.totalLists ?? "\u2014",
      icon: Layers,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-600/10 dark:bg-purple-400/10",
      to: "/admin/lists",
    },
    {
      label: t("adminDashboard.pendingInquiries"),
      value: stats?.pendingInquiries ?? "\u2014",
      icon: ClipboardList,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-600/10 dark:bg-orange-400/10",
      to: "/admin/inquiries",
    },
    {
      label: t("adminDashboard.siteConfig"),
      value: "",
      icon: Wrench,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-600/10 dark:bg-slate-400/10",
      to: "/admin/config",
    },
  ];

  return (
    <div>
      <div
        className="mb-8"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          {t("adminDashboard.title")}
        </h1>
        <p className="mt-1 text-sand-500 dark:text-night-400">
          {t("adminDashboard.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((s, i) => (
          <Link
            key={s.label}
            href={s.to}
            className="group rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 transition-all duration-200 hover:ring-sand-300 hover:shadow-sm dark:bg-night-900 dark:ring-night-700/50 dark:hover:ring-night-600"
            style={{
              animation: "fade-up 0.5s ease-out both",
              animationDelay: `${0.1 + i * 0.06}s`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sand-500 dark:text-night-400">
                  {s.label}
                </p>
                <p className="mt-1 text-3xl font-bold text-teal-900 dark:text-cream">
                  {s.value}
                </p>
              </div>
              <div
                className={`flex size-11 items-center justify-center rounded-xl ${s.bg}`}
              >
                <s.icon className={`size-5 ${s.color}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
