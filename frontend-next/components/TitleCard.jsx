"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import TypeIcon from "./TypeIcon";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";

export default function TitleCard({ title }) {
  const { types, typeColors } = useData();
  const { t } = useTranslation();
  const l = useLocalize();
  const typeMap = useMemo(
    () => Object.fromEntries(types.map((tp) => [tp.name, tp])),
    [types],
  );
  const available = title.copies.filter((c) => c.status === "available").length;
  const color = typeColors[title.type] || "#0D7377";

  return (
    <Link
      href={`/title/${title.id}`}
      className="group flex overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 transition-all duration-300 hover:shadow-lg hover:shadow-sand-300/40 hover:-translate-y-0.5 hover:ring-sand-200 dark:bg-night-900 dark:ring-night-700/50 dark:hover:shadow-black/30 dark:hover:ring-night-600"
    >
      {/* Cover */}
      <div
        className="relative w-24 shrink-0 overflow-hidden rounded-l-2xl"
        style={{ backgroundColor: title.cover }}
      >
        {title.cover_image ? (
          <img
            src={title.cover_image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <TypeIcon
                type={title.type}
                className="size-8 text-white/50 transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div>
          <span
            className="mb-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            <TypeIcon type={title.type} className="size-3" />
            {l(typeMap[title.type], "name") || title.type}
          </span>

          <h3 className="line-clamp-2 font-semibold leading-snug text-teal-900 transition-colors duration-200 group-hover:text-teal-700 dark:text-cream dark:group-hover:text-teal-400">
            {title.title}
          </h3>
          <p className="mt-1 truncate text-sm text-sand-500 dark:text-night-400">
            {title.author}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          {available > 0 ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400">
              <span className="inline-block size-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
              {t("titleCard.available", { count: available })}
            </span>
          ) : (
            <span className="text-sm font-medium text-sand-300 dark:text-night-400">
              {t("titleCard.unavailable")}
            </span>
          )}
          <span className="text-xs tabular-nums text-sand-300 dark:text-night-500">
            {title.year}
          </span>
        </div>
      </div>
    </Link>
  );
}
