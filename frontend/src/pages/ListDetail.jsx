import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "../context/DataContext";
import { useLocalize } from "../hooks/useLocalize";
import TypeIcon from "../components/TypeIcon";

function EmbeddedTitle({ title }) {
  if (!title) return null;
  const available = title.copies.filter((c) => c.status === "available").length;

  return (
    <Link
      to={`/title/${title.id}`}
      className="group flex items-center gap-3 rounded-xl bg-warm p-3 ring-1 ring-sand-200/50 transition-all duration-200 hover:ring-sand-300 hover:shadow-sm dark:bg-night-800 dark:ring-night-700/50 dark:hover:ring-night-600"
    >
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: title.cover }}
      >
        <TypeIcon type={title.type} className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-teal-900 group-hover:text-teal-700 dark:text-cream dark:group-hover:text-teal-400">
          {title.title}
        </p>
        <p className="truncate text-xs text-sand-500 dark:text-night-400">
          {title.author}
        </p>
      </div>
      {available > 0 && (
        <span className="flex items-center gap-1 text-xs font-medium text-teal-700 dark:text-teal-400">
          <span className="inline-block size-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
          {available}
        </span>
      )}
    </Link>
  );
}

export default function ListDetail() {
  const { titles, curatedLists } = useData();
  const { id } = useParams();
  const { t } = useTranslation();
  const l = useLocalize();
  const list = curatedLists.find((l) => l.id === Number(id));

  if (!list) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-cream">
          {t("listDetail.notFound")}
        </h2>
        <Link
          to="/lists"
          className="mt-4 inline-block text-teal-700 hover:underline dark:text-teal-400"
        >
          {t("listDetail.backToLists")}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header bar */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-3 sm:px-6">
        <Link
          to="/lists"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ArrowLeft className="size-4" /> {t("listDetail.backToLists")}
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Article header */}
        <div
          className="mb-10"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex size-10 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: list.coverColor }}
            >
              <Layers className="size-5" />
            </div>
            <span className="text-xs tabular-nums text-sand-300 dark:text-night-400">
              {list.createdAt}
            </span>
          </div>
          <h1 className="font-heading text-3xl tracking-tight text-teal-900 sm:text-4xl dark:text-cream">
            {l(list, "title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-sand-500 dark:text-night-400">
            {l(list, "description")}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {list.sections.map((section, i) => {
            const sectionTitles = section.titleIds
              .map((tid) => titles.find((t) => t.id === tid))
              .filter(Boolean);

            return (
              <div
                key={section.id}
                style={{
                  animation: "fade-up 0.5s ease-out both",
                  animationDelay: `${0.15 + i * 0.1}s`,
                }}
              >
                <h2 className="mb-3 font-heading text-xl text-teal-900 dark:text-cream">
                  {l(section, "heading")}
                </h2>
                <p className="mb-5 leading-relaxed text-sand-500 dark:text-night-400">
                  {l(section, "body")}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {sectionTitles.map((t) => (
                    <EmbeddedTitle key={t.id} title={t} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
