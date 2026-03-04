import { useState, useEffect } from "react";
import { Search, BookOpen, ChevronDown, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { publicApi } from "../api/endpoints";
import TitleCard from "../components/TitleCard";
import TypeIcon from "../components/TypeIcon";
import AuthorSelect from "../components/AuthorSelect";

const PAGE_SIZE = 12;

const SORT_MAP = {
  newest: "-year",
  "title-asc": "title",
  available: "-available_copies",
};

export default function Browse() {
  const { browseTypes, typeColors, siteConfig } = useData();

  const [search, setSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  // Authors list for the select dropdown
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    publicApi.getAuthors().then((res) => setAuthors(res)).catch(() => {});
  }, []);

  // Debounce only the free-text search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to page 1 on filter changes
  useEffect(() => { setPage(1); }, [debouncedSearch, authorSearch, type, sort]);

  // Server fetch
  const [titles, setTitles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = { page, page_size: PAGE_SIZE, ordering: SORT_MAP[sort] || "-year" };
    if (debouncedSearch) params.search = debouncedSearch;
    if (authorSearch) params.author = authorSearch;
    if (type !== "All") params.type = type;

    publicApi
      .getTitles(params)
      .then((res) => {
        setTitles(res.results ?? res);
        setTotalCount(res.count ?? (res.results ?? res).length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, authorSearch, type, sort]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <div
        className="mb-12 max-w-2xl"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          Browse the Collection
        </h1>
        <p className="mt-3 font-heading text-lg italic text-sand-400 dark:text-night-400">
          {siteConfig.description}
        </p>
      </div>

      {/* Search row */}
      <div
        className="mb-5 grid gap-3 sm:grid-cols-2"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-sand-400 dark:text-night-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full rounded-2xl border-0 bg-warm py-4 pl-12 pr-5 text-base ring-1 ring-sand-300/60 outline-none transition placeholder:text-sand-400 focus:bg-white focus:ring-2 focus:ring-teal-700/30 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400 dark:focus:bg-night-800"
          />
        </div>
        <AuthorSelect
          authors={authors}
          value={authorSearch}
          onChange={setAuthorSearch}
        />
      </div>

      {/* Filters toolbar */}
      <div
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}
      >
        {/* Type chips */}
        <div className="flex flex-wrap gap-2">
          {browseTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                type === t
                  ? "bg-teal-800 text-white shadow-sm shadow-teal-900/20 dark:bg-teal-700"
                  : "bg-warm text-sand-400 ring-1 ring-sand-200/60 hover:text-teal-800 hover:ring-sand-300 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400"
              }`}
            >
              {t !== "All" && <TypeIcon type={t} className="size-3.5" />}
              {t}
            </button>
          ))}
        </div>

        {/* Sort + count + view toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm tabular-nums text-sand-300 dark:text-night-400">
            {loading ? "…" : `${totalCount} ${totalCount === 1 ? "title" : "titles"}`}
          </span>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none cursor-pointer rounded-xl border-0 bg-warm py-2 pl-3 pr-9 text-sm font-medium text-sand-400 ring-1 ring-sand-200/60 outline-none transition hover:text-teal-800 focus:ring-2 focus:ring-teal-700/30 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400"
            >
              <option value="newest">Newest</option>
              <option value="title-asc">A–Z</option>
              <option value="available">Available</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-sand-300 dark:text-night-400" />
          </div>

          {/* View toggle */}
          <div className="flex rounded-xl bg-warm ring-1 ring-sand-200/60 dark:bg-night-800 dark:ring-night-700">
            <button
              onClick={() => setView("grid")}
              className={`flex size-9 items-center justify-center rounded-xl transition ${
                view === "grid"
                  ? "bg-teal-800 text-white dark:bg-teal-700"
                  : "text-sand-400 hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex size-9 items-center justify-center rounded-xl transition ${
                view === "table"
                  ? "bg-teal-800 text-white dark:bg-teal-700"
                  : "text-sand-400 hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
              }`}
              aria-label="Table view"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-sand-100 dark:bg-night-800"
            />
          ))}
        </div>
      )}

      {!loading && titles.length === 0 && (
        <div
          className="py-28 text-center"
          style={{ animation: "fade-in 0.4s ease-out both" }}
        >
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-warm dark:bg-night-800">
            <BookOpen className="size-7 text-sand-300 dark:text-night-400" />
          </div>
          <h3 className="font-heading text-xl text-teal-900 dark:text-cream">
            Nothing found
          </h3>
          <p className="mt-2 text-sm text-sand-400 dark:text-night-400">
            Try a different search term or filter.
          </p>
        </div>
      )}

      {!loading && titles.length > 0 && (
        <>
          {/* ── Grid view ── */}
          {view === "grid" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {titles.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    animation: "fade-up 0.5s ease-out both",
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  <TitleCard title={t} />
                </div>
              ))}
            </div>
          )}

          {/* ── Table view ── */}
          {view === "table" && (
            <div
              className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              style={{ animation: "fade-up 0.4s ease-out both" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sand-200/60 bg-sand-100/50 dark:border-night-700/50 dark:bg-night-800/50">
                      {["", "Title", "Author", "Type", "Year", "Copies"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-sand-300 dark:text-night-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {titles.map((t) => {
                      const available = t.copies.filter((c) => c.status === "available").length;
                      const color = typeColors[t.type] || "#0D7377";
                      return (
                        <tr
                          key={t.id}
                          className="border-b border-sand-100/80 transition-colors hover:bg-sand-100/40 dark:border-night-800/60 dark:hover:bg-night-800/40"
                        >
                          <td className="w-10 px-3 py-2">
                            <Link to={`/title/${t.id}`}>
                              <div
                                className="size-10 overflow-hidden rounded-lg"
                                style={{ backgroundColor: t.cover }}
                              >
                                {t.cover_image ? (
                                  <img
                                    src={t.cover_image}
                                    alt=""
                                    className="size-full object-cover"
                                  />
                                ) : (
                                  <div className="flex size-full items-center justify-center">
                                    <TypeIcon type={t.type} className="size-4 text-white/50" />
                                  </div>
                                )}
                              </div>
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              to={`/title/${t.id}`}
                              className="font-semibold text-teal-900 hover:text-teal-700 dark:text-cream dark:hover:text-teal-400"
                            >
                              {t.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sand-400 dark:text-night-400">
                            {t.author || "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold text-white"
                              style={{ backgroundColor: color }}
                            >
                              <TypeIcon type={t.type} className="size-3" />
                              {t.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 tabular-nums text-sand-400 dark:text-night-400">
                            {t.year ?? "—"}
                          </td>
                          <td className="px-4 py-3">
                            {available > 0 ? (
                              <span className="flex items-center gap-1.5 font-medium text-teal-700 dark:text-teal-400">
                                <span className="size-1.5 rounded-full bg-teal-500" />
                                {available}/{t.copies.length}
                              </span>
                            ) : (
                              <span className="text-sand-300 dark:text-night-500">
                                {t.copies.length === 0 ? "No copies" : "Unavailable"}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex size-9 items-center justify-center rounded-xl bg-warm text-sand-400 ring-1 ring-sand-200/60 transition hover:text-teal-800 disabled:opacity-30 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400"
              >
                <ChevronLeft className="size-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "…" ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-sand-300 dark:text-night-500">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex size-9 items-center justify-center rounded-xl text-sm font-medium transition ${
                        p === currentPage
                          ? "bg-teal-800 text-white shadow-sm dark:bg-teal-700"
                          : "bg-warm text-sand-400 ring-1 ring-sand-200/60 hover:text-teal-800 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex size-9 items-center justify-center rounded-xl bg-warm text-sand-400 ring-1 ring-sand-200/60 transition hover:text-teal-800 disabled:opacity-30 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400"
              >
                <ChevronRight className="size-4" />
              </button>

              <span className="ml-2 text-xs text-sand-300 dark:text-night-500">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
