import { Link } from "react-router-dom";
import TypeIcon from "./TypeIcon";
import { TYPE_COLORS } from "../data/mock";

export default function TitleCard({ title }) {
  const available = title.copies.filter((c) => c.status === "available").length;
  const color = TYPE_COLORS[title.type] || "#0D7377";

  return (
    <Link
      to={`/title/${title.id}`}
      className="group block overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-sand-300/40 hover:-translate-y-1 hover:ring-sand-200 dark:bg-night-900 dark:ring-night-700/50 dark:hover:shadow-black/30 dark:hover:ring-night-600"
    >
      {/* Cover */}
      <div
        className="relative flex h-48 items-center justify-center overflow-hidden"
        style={{ backgroundColor: title.cover }}
      >
        {/* Warm depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        {/* Icon */}
        <TypeIcon
          type={title.type}
          className="relative size-10 text-white/50 transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Type badge */}
        <span
          className="absolute top-3 right-3 flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold backdrop-blur-md"
          style={{ backgroundColor: "rgba(255,255,255,0.82)", color }}
        >
          <TypeIcon type={title.type} className="size-3" />
          {title.type}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="truncate font-semibold text-teal-900 transition-colors duration-200 group-hover:text-teal-700 dark:text-cream dark:group-hover:text-teal-400">
          {title.title}
        </h3>
        <p className="mt-1 truncate text-sm text-sand-400 dark:text-night-600">
          {title.author}
        </p>

        <div className="mt-3 flex items-center justify-between">
          {available > 0 ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400">
              <span className="inline-block size-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
              {available} available
            </span>
          ) : (
            <span className="text-sm font-medium text-sand-300 dark:text-night-600">
              Unavailable
            </span>
          )}
          <span className="text-xs tabular-nums text-sand-300 dark:text-night-700">
            {title.year}
          </span>
        </div>
      </div>
    </Link>
  );
}
