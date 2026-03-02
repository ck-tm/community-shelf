import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Building2, MapPin } from "lucide-react";
import { TITLES, TYPE_COLORS } from "../data/mock";
import TypeIcon from "../components/TypeIcon";
import RequestModal from "../components/RequestModal";

export default function TitleDetail() {
  const { id } = useParams();
  const title = TITLES.find((t) => t.id === Number(id));
  const [selectedCopy, setSelectedCopy] = useState(null);

  if (!title) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">Title not found</h2>
        <Link to="/" className="mt-4 inline-block text-teal-700 hover:underline">
          Back to catalog
        </Link>
      </div>
    );
  }

  const color = TYPE_COLORS[title.type] || "#0D7377";
  const available = title.copies.filter((c) => c.status === "available").length;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to Catalog
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Cover */}
          <div className="w-full shrink-0 md:w-56">
            <div
              className="flex aspect-[3/4] w-full items-center justify-center rounded-xl text-white shadow-lg"
              style={{ backgroundColor: title.cover }}
            >
              <BookOpen className="size-16" strokeWidth={1.2} />
            </div>
            <div
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              <TypeIcon type={title.type} className="size-3.5" />
              {title.type}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {title.title}
            </h1>
            <p className="mt-1 text-lg text-gray-500">{title.author}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
              {title.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                ["Year", title.year],
                ["Language", title.language],
                ["ISBN / ID", title.isbn],
                ["Organization", title.organization],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {label}
                  </dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-700">
                    {label === "Organization" && <Building2 className="size-3.5 text-gray-400" />}
                    {value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copies */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">
            Available Copies
            <span className="ml-2 text-sm font-medium text-gray-400">
              ({available} of {title.copies.length} available)
            </span>
          </h2>

          <div className="mt-5 space-y-3">
            {title.copies.map((copy) => {
              const isAvail = copy.status === "available";
              return (
                <div
                  key={copy.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold text-gray-900">
                        Condition: {copy.condition}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          isAvail
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {isAvail ? "Available" : "Reserved"}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="size-3.5" /> {copy.location}
                    </div>
                  </div>

                  {isAvail && (
                    <button
                      onClick={() => setSelectedCopy(copy)}
                      className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
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
          onSubmit={() => setSelectedCopy(null)}
        />
      )}
    </>
  );
}
