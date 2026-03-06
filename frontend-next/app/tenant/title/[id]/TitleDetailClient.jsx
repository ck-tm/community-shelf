"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, User, Globe, Building, Hash, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "@/context/DataContext";
import { useLocalize } from "@/hooks/useLocalize";
import TypeIcon from "@/components/TypeIcon";
import RequestModal from "@/components/RequestModal";

export default function TitleDetailClient({ initialTitle }) {
  const { titles, types, typeColors } = useData();
  const { t } = useTranslation();
  const l = useLocalize();
  const [showRequest, setShowRequest] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);

  // Use live data from context if available, fallback to initial
  const title = useMemo(() => {
    return titles.find((t) => t.id === initialTitle.id) || initialTitle;
  }, [titles, initialTitle]);

  const typeMap = useMemo(
    () => Object.fromEntries(types.map((tp) => [tp.name, tp])),
    [types]
  );

  const color = typeColors[title.type] || "#0D7377";
  const available = title.copies?.filter((c) => c.status === "available") || [];

  const details = [
    { icon: Calendar, label: t("titleDetail.year"), value: title.year },
    { icon: Globe, label: t("titleDetail.language"), value: title.language },
    { icon: Building, label: t("titleDetail.publisher"), value: title.publisher },
    { icon: FileText, label: t("titleDetail.isbn"), value: title.isbn },
  ].filter((d) => d.value);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
      >
        <ArrowLeft className="size-4" />
        {t("titleDetail.backToCatalog")}
      </Link>

      <div className="flex flex-col gap-8 sm:flex-row" style={{ animation: "fade-up 0.5s ease-out both" }}>
        {/* Cover */}
        <div
          className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56"
          style={{ backgroundColor: title.cover }}
        >
          {title.cover_image ? (
            <img src={title.cover_image} alt={title.title} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <TypeIcon type={title.type} className="size-16 text-white/40" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <span
            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            <TypeIcon type={title.type} className="size-3" />
            {l(typeMap[title.type], "name") || title.type}
          </span>

          <h1 className="mt-3 font-heading text-3xl text-teal-900 sm:text-4xl dark:text-cream">
            {title.title}
          </h1>

          <p className="mt-2 text-lg text-sand-500 dark:text-night-400">{title.author}</p>

          {title.description && (
            <p className="mt-4 leading-relaxed text-sand-500 dark:text-night-400">
              {title.description}
            </p>
          )}

          {/* Details grid */}
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {details.map((d) => (
              <div key={d.label} className="rounded-xl bg-warm p-3 dark:bg-night-900">
                <dt className="flex items-center gap-1.5 text-xs text-sand-400 dark:text-night-500">
                  <d.icon className="size-3" />
                  {d.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-teal-900 dark:text-cream">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Copies */}
          {title.copies && title.copies.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-lg text-teal-900 dark:text-cream">
                {t("titleDetail.availableCopies")} ({title.copies.length})
              </h2>
              <p className="mt-1 text-sm text-sand-400 dark:text-night-500">
                {t("titleDetail.availableOf", { available: available.length, total: title.copies.length })}
              </p>
              <div className="mt-3 space-y-2">
                {title.copies.map((copy) => (
                  <div
                    key={copy.id}
                    className="flex items-center justify-between rounded-xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-teal-900 dark:text-cream">
                        {copy.location || title.title}
                      </p>
                      <p className="text-xs text-sand-400 dark:text-night-500">
                        {t("titleDetail.condition", { condition: copy.condition })} &middot;{" "}
                        <span className={copy.status === "available" ? "text-teal-600 dark:text-teal-400" : "text-sand-300"}>
                          {copy.status === "available" ? t("titleDetail.available") : t("titleDetail.reserved")}
                        </span>
                      </p>
                    </div>
                    {copy.status === "available" && (
                      <button
                        onClick={() => {
                          setSelectedCopy(copy);
                          setShowRequest(true);
                        }}
                        className="rounded-xl bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600"
                      >
                        {t("titleDetail.request")}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showRequest && (
        <RequestModal
          title={title}
          copy={selectedCopy}
          onClose={() => {
            setShowRequest(false);
            setSelectedCopy(null);
          }}
        />
      )}
    </div>
  );
}
