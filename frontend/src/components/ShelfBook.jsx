import { useCallback } from "react";
import { Link } from "react-router-dom";
import TypeIcon from "./TypeIcon";
import { useData } from "../context/DataContext";

/* Deterministic spine width based on title length — gives visual variety */
function spineWidth(title) {
  const len = title.length;
  if (len < 15) return 40;
  if (len < 30) return 48;
  if (len < 60) return 56;
  return 64;
}

/* Darken a hex colour by a fixed amount for the spine edge shadow */
function darken(hex, amount = 30) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

export default function ShelfBook({ title, isActive, onActivate }) {
  const { typeColors } = useData();
  const color = typeColors[title.type] || "#0D7377";
  const width = spineWidth(title.title);
  const coverW = 150;

  /* On touch: first tap flips the book, second tap navigates */
  const handleClick = useCallback(
    (e) => {
      if (!isActive) {
        e.preventDefault();
        onActivate();
      }
      // If already active, the <Link> navigates normally
    },
    [isActive, onActivate],
  );

  return (
    <div
      className="perspective-shelf shrink-0 cursor-pointer transition-[width] duration-500 ease-in-out"
      style={{ width: isActive ? coverW : width, height: 220 }}
      onMouseEnter={onActivate}
    >
      <Link
        to={`/title/${title.id}`}
        className="block size-full"
        draggable={false}
        onClick={handleClick}
      >
        <div
          className={`book-3d relative size-full ${isActive ? "is-flipped" : ""}`}
        >
          {/* ── FRONT: Spine ────────────────────────────────── */}
          <div
            className="book-face absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-sm shadow-sm"
            style={{ backgroundColor: title.cover }}
          >
            {/* Top band */}
            <div className="mt-2 h-px w-3/4 bg-white/20" />

            {/* Title — vertical */}
            <div
              className="flex flex-1 items-center px-1 py-2"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <p className="line-clamp-4 text-center text-[10px] font-bold leading-tight text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                {title.title}
              </p>
            </div>

            {/* Author — small at bottom */}
            <div
              className="mb-1 px-0.5"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <p className="max-h-16 truncate text-center text-[7px] text-white/50">
                {title.author}
              </p>
            </div>

            {/* Bottom band */}
            <div className="mb-2 h-px w-3/4 bg-white/20" />

            {/* Spine edge highlights */}
            <div
              className="absolute inset-y-0 right-0 w-[2px]"
              style={{ backgroundColor: darken(title.cover, 40) }}
            />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10" />
          </div>

          {/* ── BACK: Cover (revealed on flip) ─────────────── */}
          <div
            className="book-face-back absolute inset-0 overflow-hidden rounded-lg shadow-lg"
            style={{ backgroundColor: title.cover }}
          >
            {title.cover_image ? (
              <img
                src={title.cover_image}
                alt={title.title}
                className="size-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-2 p-3">
                {/* Gradients — matches TitleCard fallback */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                <TypeIcon
                  type={title.type}
                  className="relative size-8 text-white/50"
                />
                <p className="relative text-center text-xs font-semibold leading-tight text-white/80 line-clamp-3">
                  {title.title}
                </p>
                <p className="relative text-[10px] text-white/50">
                  {title.author}
                </p>

                {/* Type badge */}
                <span
                  className="relative mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold text-white"
                  style={{ backgroundColor: color }}
                >
                  <TypeIcon type={title.type} className="size-2.5" />
                  {title.type}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
