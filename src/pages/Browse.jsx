import { useState, useMemo } from "react";
import { Search, BookOpen, ChevronDown } from "lucide-react";
import { useData } from "../context/DataContext";
import TitleCard from "../components/TitleCard";
import TypeIcon from "../components/TypeIcon";

export default function Browse() {
  const { titles, browseTypes } = useData();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let r = titles;
    if (type !== "All") r = r.filter((t) => t.type === type);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.author.toLowerCase().includes(q)
      );
    }
    const s = [...r];
    if (sort === "title-asc") s.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "newest") s.sort((a, b) => b.year - a.year);
    else if (sort === "available")
      s.sort(
        (a, b) =>
          b.copies.filter((c) => c.status === "available").length -
          a.copies.filter((c) => c.status === "available").length
      );
    return s;
  }, [titles, search, type, sort]);

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
          Discover books, movies, music and more — shared by your community.
        </p>
      </div>

      {/* Search */}
      <div
        className="relative mb-8"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-sand-400 dark:text-night-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full rounded-2xl border-0 bg-warm py-4 pl-12 pr-5 text-base shadow-none ring-1 ring-sand-300/60 outline-none transition-all duration-300 placeholder:text-sand-400 focus:bg-white focus:ring-2 focus:ring-teal-700/30 focus:shadow-lg focus:shadow-teal-900/[0.04] dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-400 dark:focus:bg-night-800 dark:focus:ring-teal-600/40"
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
                  : "bg-warm text-sand-400 ring-1 ring-sand-200/60 hover:text-teal-800 hover:ring-sand-300 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400 dark:hover:ring-night-600"
              }`}
            >
              {t !== "All" && <TypeIcon type={t} className="size-3.5" />}
              {t}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex items-center gap-4">
          <span className="text-sm tabular-nums text-sand-300 dark:text-night-400">
            {filtered.length} {filtered.length === 1 ? "title" : "titles"}
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none cursor-pointer rounded-xl border-0 bg-warm py-2 pl-3 pr-9 text-sm font-medium text-sand-400 ring-1 ring-sand-200/60 outline-none transition-all duration-200 hover:text-teal-800 focus:ring-2 focus:ring-teal-700/30 dark:bg-night-800 dark:text-night-400 dark:ring-night-700 dark:hover:text-teal-400 dark:focus:ring-teal-600/40"
            >
              <option value="newest">Newest</option>
              <option value="title-asc">A–Z</option>
              <option value="available">Available</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-sand-300 dark:text-night-400" />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t, i) => (
            <div
              key={t.id}
              style={{
                animation: `fade-up 0.5s ease-out both`,
                animationDelay: `${0.25 + i * 0.06}s`,
              }}
            >
              <TitleCard title={t} />
            </div>
          ))}
        </div>
      ) : (
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
    </div>
  );
}
