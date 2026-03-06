"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, X, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AuthorSelect({ authors, value, onChange }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = query
    ? authors.filter((a) => a.toLowerCase().includes(query.toLowerCase()))
    : authors;

  const openDropdown = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownStyle({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    setOpen(true);
  };

  const closeDropdown = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setDropdownStyle({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  const select = (author) => {
    onChange(author);
    closeDropdown();
  };

  const clear = (e) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="relative">
      <div className="relative" ref={buttonRef}>
        <User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-sand-500 dark:text-night-400" />
        <button
          type="button"
          onClick={() => (open ? closeDropdown() : openDropdown())}
          className={`flex w-full items-center justify-between rounded-2xl border-0 bg-warm py-4 pl-12 pr-5 text-base ring-1 outline-none transition focus:bg-white focus:ring-2 focus:ring-teal-700/30 dark:bg-night-800 dark:ring-night-700 dark:focus:bg-night-800 ${
            open ? "bg-white ring-2 ring-teal-700/30 dark:bg-night-800" : "ring-sand-300/60"
          }`}
        >
          <span className={`truncate ${value ? "text-teal-900 dark:text-cream" : "text-sand-500 dark:text-night-400"}`}>
            {value || t("authorSelect.placeholder")}
          </span>
          {value ? (
            <X
              className="ml-2 size-4 shrink-0 text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
              onClick={clear}
            />
          ) : (
            <ChevronDown className={`ml-2 size-4 shrink-0 text-sand-500 transition-transform dark:text-night-400 ${open ? "rotate-180" : ""}`} />
          )}
        </button>
      </div>

      {open && createPortal(
        <div
          ref={dropdownRef}
          style={{ position: "absolute", zIndex: 9999, ...dropdownStyle }}
          className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-sand-200/80 dark:bg-night-800 dark:ring-night-700"
        >
          <div className="border-b border-sand-100/80 p-2 dark:border-night-700">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sand-500 dark:text-night-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("authorSelect.search")}
                className="w-full rounded-xl border-0 bg-sand-50 py-2 pl-9 pr-3 text-sm outline-none ring-1 ring-sand-200/60 focus:ring-teal-700/30 dark:bg-night-900 dark:text-cream dark:placeholder:text-night-400 dark:ring-night-700"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="py-6 text-center text-sm text-sand-300 dark:text-night-500">
                {t("authorSelect.noResults")}
              </p>
            ) : (
              filtered.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => select(a)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-sand-50 dark:hover:bg-night-700 ${
                    a === value
                      ? "font-semibold text-teal-800 dark:text-teal-400"
                      : "text-teal-900 dark:text-cream"
                  }`}
                >
                  {a}
                </button>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
