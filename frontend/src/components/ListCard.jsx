import { Link } from "react-router-dom";
import { BookOpen, Layers } from "lucide-react";

export default function ListCard({ list }) {
  const totalTitles = list.sections.reduce(
    (sum, s) => sum + s.titleIds.length,
    0
  );

  return (
    <Link
      to={`/lists/${list.id}`}
      className="group block overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-sand-300/40 hover:-translate-y-1 hover:ring-sand-200 dark:bg-night-900 dark:ring-night-700/50 dark:hover:shadow-black/30 dark:hover:ring-night-600"
    >
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden"
        style={{ backgroundColor: list.coverColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <Layers className="relative size-10 text-white/50 transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-teal-900 transition-colors duration-200 group-hover:text-teal-700 dark:text-cream dark:group-hover:text-teal-400">
          {list.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-sand-500 dark:text-night-400">
          {list.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-sand-300 dark:text-night-400">
            <BookOpen className="size-3" />
            {totalTitles} {totalTitles === 1 ? "title" : "titles"} &middot;{" "}
            {list.sections.length}{" "}
            {list.sections.length === 1 ? "section" : "sections"}
          </span>
          <span className="text-xs tabular-nums text-sand-300 dark:text-night-500">
            {list.createdAt}
          </span>
        </div>
      </div>
    </Link>
  );
}
