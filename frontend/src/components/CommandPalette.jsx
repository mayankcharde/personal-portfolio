import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CommandPalette({ open, onClose, commands }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return commands;
    return commands.filter((command) => {
      const haystack = [
        command.label,
        command.description,
        ...(command.keywords || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(value);
    });
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      }
      if (event.key === "Enter" && filtered[activeIndex]) {
        filtered[activeIndex].action();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, filtered, onClose, open]);

  useEffect(() => {
    setActiveIndex((index) =>
      Math.min(index, Math.max(0, filtered.length - 1)),
    );
  }, [filtered.length]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[12000] flex items-start justify-center bg-black/50 px-4 py-20 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#101827]/95 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-[10px] uppercase tracking-[0.3em] text-textSecondary">
          <span>Command Palette</span>
          <button onClick={onClose} className="text-secondary">
            Esc
          </button>
        </div>
        <div className="border-b border-white/10 px-5 py-4">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sections, actions, or shortcuts"
            className="w-full bg-transparent text-lg text-textPrimary outline-none placeholder:text-textSecondary/40"
          />
        </div>
        <div className="max-h-[50vh] overflow-auto p-2">
          {filtered.length ? (
            filtered.map((command, index) => (
              <button
                key={command.label}
                type="button"
                onClick={() => {
                  command.action();
                  onClose();
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors ${index === activeIndex ? "bg-white/10 text-textPrimary" : "text-textSecondary hover:bg-white/5"}`}
              >
                <span>
                  <span className="block text-sm font-medium">
                    {command.label}
                  </span>
                  <span className="block text-[11px] text-textSecondary/70">
                    {command.description}
                  </span>
                </span>
                <FaArrowRight
                  className={
                    index === activeIndex ? "text-secondary" : "text-white/20"
                  }
                  size={11}
                />
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-textSecondary">
              No commands match that search.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
