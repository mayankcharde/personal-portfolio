import React from "react";
import { createPortal } from "react-dom";

const THEMES = [
  { id: "warm", label: "Warm Console" },
  { id: "midnight", label: "Midnight Glass" },
];

const ACCENTS = [
  { id: "peach", label: "Peach" },
  { id: "cyan", label: "Cyan" },
];

export default function SettingsPanel({
  open,
  onClose,
  theme,
  accent,
  onThemeChange,
  onAccentChange,
  soundEnabled,
  onToggleSound,
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[11900] flex items-start justify-end bg-black/20 px-4 py-20 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#101827]/95 p-5 text-textPrimary shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.3em] text-textSecondary">
          <span>Display Settings</span>
          <button onClick={onClose} className="text-secondary">
            Close
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-textSecondary">
              Variant
            </div>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onThemeChange(option.id)}
                  className={`rounded-2xl border px-3 py-3 text-left text-sm transition-colors ${theme === option.id ? "border-secondary bg-secondary/10 text-secondary" : "border-white/10 bg-white/5 text-textSecondary"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-textSecondary">
              Accent
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ACCENTS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onAccentChange(option.id)}
                  className={`rounded-2xl border px-3 py-3 text-left text-sm transition-colors ${accent === option.id ? "border-secondary bg-secondary/10 text-secondary" : "border-white/10 bg-white/5 text-textSecondary"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-textSecondary transition-colors hover:bg-white/10"
          >
            Sound effects: {soundEnabled ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
