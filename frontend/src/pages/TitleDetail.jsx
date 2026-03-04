import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, MapPin } from "lucide-react";
import { useData } from "../context/DataContext";
import TypeIcon from "../components/TypeIcon";
import RequestModal from "../components/RequestModal";

export default function TitleDetail() {
  const { titles, typeColors } = useData();
  const { id } = useParams();
  const title = titles.find((t) => t.id === Number(id));
  const [selectedCopy, setSelectedCopy] = useState(null);

  if (!title) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-teal-900 dark:text-cream">
          Title not found
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block text-teal-700 hover:underline dark:text-teal-400"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  const color = typeColors[title.type] || "#0D7377";
  const available = title.copies.filter(
    (c) => c.status === "available"
  ).length;

  return (
    <>
      {/* Header bar */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to Catalog
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          className="flex flex-col gap-8 md:flex-row"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          {/* Cover */}
          <div className="w-full shrink-0 md:w-56">
            <div
              className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl text-white shadow-lg"
              style={{ backgroundColor: title.cover }}
            >
              {title.cover_image ? (
                <img
                  src={title.cover_image}
                  alt={title.title}
                  className="absolute inset-0 size-full object-contain"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <BookOpen
                    className="relative size-16 text-white/50"
                    strokeWidth={1.2}
                  />
                </>
              )}
            </div>
            <div
              className="mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              <TypeIcon type={title.type} className="size-3.5" />
              {title.type}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="font-heading text-3xl leading-tight tracking-tight text-teal-900 dark:text-cream">
              {title.title}
            </h1>
            <p className="mt-1 text-lg text-sand-400 dark:text-night-400">
              {title.author}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-sand-400 dark:text-night-400">
              {title.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                ["Year", title.year],
                ["Language", title.language],
                ["ISBN / ID", title.isbn],
                ["Publisher", title.publisher],
              ].map(([label, value]) => value ? (
                <div key={label}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-400">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-teal-900 dark:text-cream">
                    {value}
                  </dd>
                </div>
              ) : null)}
            </div>
          </div>
        </div>

        {/* Copies */}
        <div
          className="mt-10 border-t border-sand-200/60 pt-8 dark:border-night-700/50"
          style={{ animation: "fade-up 0.5s ease-out 0.15s both" }}
        >
          <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
            Available Copies
            <span className="ml-2 text-sm font-normal text-sand-400 dark:text-night-400">
              ({available} of {title.copies.length} available)
            </span>
          </h2>

          <div className="mt-5 space-y-3">
            {title.copies.map((copy, i) => {
              const isAvail = copy.status === "available";
              return (
                <div
                  key={copy.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-warm p-4 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
                  style={{
                    animation: "fade-up 0.4s ease-out both",
                    animationDelay: `${0.25 + i * 0.06}s`,
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold text-teal-900 dark:text-cream">
                        Condition: {copy.condition}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          isAvail
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {isAvail ? "Available" : "Reserved"}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-sand-400 dark:text-night-400">
                      <MapPin className="size-3.5" /> {copy.location}
                    </div>
                  </div>

                  {isAvail && (
                    <button
                      onClick={() => setSelectedCopy(copy)}
                      className="rounded-xl bg-teal-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                    >
                      Request
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Request modal */}
      {selectedCopy && (
        <RequestModal
          title={title}
          copy={selectedCopy}
          onClose={() => setSelectedCopy(null)}
        />
      )}
    </>
  );
}
