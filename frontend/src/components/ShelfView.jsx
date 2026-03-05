import { useRef, useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import ShelfBook from "./ShelfBook";

export default function ShelfView({ titles, hasMore, loadingMore, onLoadMore }) {
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const bookRefs = useRef(new Map());

  /* ── Infinite scroll: observe sentinel at the end ─────────── */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { root: scrollRef.current, rootMargin: "0px 300px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, onLoadMore]);

  /* ── Mobile: detect centred book via IntersectionObserver ── */
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (!isTouchDevice) return;

    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry;
          }
        }
        if (best && bestRatio > 0.8) {
          setActiveId(Number(best.target.dataset.titleId));
        }
      },
      {
        root: container,
        rootMargin: "0px -35% 0px -35%",
        threshold: [0, 0.5, 0.8, 1],
      },
    );

    bookRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [titles]);

  /* ── Desktop hover handlers ────────────────────────────────── */
  const handleHover = useCallback((id) => setActiveId(id), []);

  const handleShelfLeave = useCallback(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (!isTouchDevice) setActiveId(null);
  }, []);

  return (
    <div
      className="relative"
      style={{ animation: "fade-up 0.4s ease-out both" }}
      onMouseLeave={handleShelfLeave}
    >
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex items-end gap-[3px] overflow-x-auto overflow-y-visible pb-3 pt-2 scroll-smooth snap-x snap-mandatory sm:snap-none sm:gap-1.5"
      >
        {/* Books */}
        {titles.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => {
              if (el) bookRefs.current.set(t.id, el);
              else bookRefs.current.delete(t.id);
            }}
            data-title-id={t.id}
            className="snap-center"
            style={{
              animation: "shelf-slide-in 0.4s ease-out both",
              animationDelay: `${Math.min(i * 0.03, 0.6)}s`,
            }}
          >
            <ShelfBook
              title={t}
              isActive={activeId === t.id}
              onActivate={() => handleHover(t.id)}
            />
          </div>
        ))}

        {/* Sentinel for infinite scroll */}
        <div
          ref={sentinelRef}
          className="flex h-[220px] w-16 shrink-0 items-center justify-center"
        >
          {loadingMore && (
            <Loader2 className="size-5 animate-spin text-sand-300 dark:text-night-500" />
          )}
        </div>
      </div>

      {/* ── Shelf surface ──────────────────────────────────── */}
      <div className="relative h-3 rounded-b-lg bg-gradient-to-b from-amber-600 to-amber-700 shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:from-night-700 dark:to-night-800 dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
        {/* Shelf edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-amber-400/30 dark:bg-night-600/50" />
      </div>

      {/* Shelf shadow underneath */}
      <div className="h-2 bg-gradient-to-b from-amber-900/8 to-transparent dark:from-black/15" />
    </div>
  );
}
