import React, { useEffect, useMemo, useState } from "react";

const BOOT_STEPS = [
  "Initializing modules...",
  "Loading profile: Maverick...",
  "Mounting interface windows...",
  "Syncing diagnostics and live readouts...",
  "System ready.",
];

export default function Loader({ onComplete, onSkip }) {
  const [percent, setPercent] = useState(4);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [closing, setClosing] = useState(false);

  const prefersReduced = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const finish = () => {
    if (closing) return;
    setClosing(true);
    window.sessionStorage.setItem("os_boot_seen", "1");
    window.setTimeout(() => onComplete?.(), 150);
  };

  useEffect(() => {
    const keyHandler = () => finish();
    window.addEventListener("keydown", keyHandler, { once: true });

    const stepDelay = prefersReduced ? 120 : 220;
    const stepTimers = BOOT_STEPS.map((_, index) =>
      window.setTimeout(() => setVisibleSteps(index + 1), index * stepDelay),
    );

    const progressInterval = window.setInterval(
      () => {
        setPercent((current) => {
          if (current >= 100) {
            window.clearInterval(progressInterval);
            finish();
            return 100;
          }
          const increment = prefersReduced ? 18 : 7 + Math.floor(Math.random() * 9);
          return Math.min(current + increment, 100);
        });
      },
      prefersReduced ? 120 : 80,
    );

    const totalDuration = prefersReduced ? 1100 : 2500;
    const autoFinish = window.setTimeout(() => finish(), totalDuration);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      stepTimers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(progressInterval);
      window.clearTimeout(autoFinish);
    };
  }, [prefersReduced]);

  return (
    <div
      className={`fixed inset-0 z-[10000] font-mono text-textPrimary transition-opacity duration-200 ${closing ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d1117]" />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Aurora blobs */}
      <div
        className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,176,160,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-shift 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,209,102,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aurora-shift 16s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-30 grain-overlay" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 md:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/8 pb-3 text-[10px] uppercase tracking-[0.35em] text-white/50">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" style={{ boxShadow: "0 0 8px rgba(240,176,160,0.8)" }} />
            <span>Command Deck Boot</span>
          </div>
          <button
            type="button"
            onClick={() => { onSkip?.(); finish(); }}
            className="rounded border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.25em] text-white/70 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white/90"
          >
            Skip Intro
          </button>
        </div>

        {/* Center content */}
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-3 py-10">
          {/* Boot steps */}
          {BOOT_STEPS.map((step, index) => (
            <div
              key={step}
              className={`overflow-hidden text-sm md:text-base transition-all duration-400 ${
                index < visibleSteps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <span className="mr-2" style={{ color: "#F0B0A0" }}>&gt;</span>
              <span className={index === visibleSteps - 1 ? "text-white/90" : "text-white/50"}>{step}</span>
              {index === visibleSteps - 1 && index < BOOT_STEPS.length - 1 && (
                <span className="inline-block w-[2px] h-4 bg-secondary ml-1 cursor-blink align-middle" />
              )}
            </div>
          ))}

          {/* Progress card */}
          <div
            className="mt-8 rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm"
            style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span>System boot sequence</span>
              <span style={{ color: "#FFD166" }}>{Math.round(percent)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-white/8 bg-black/30">
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out progress-glow"
                style={{
                  width: `${Math.max(4, percent)}%`,
                  background: "linear-gradient(90deg, #F0B0A0, #FFD166, #F9F5F2)",
                }}
              />
            </div>

            {/* Segment markers */}
            <div className="mt-2 flex justify-between">
              {[25, 50, 75, 100].map((mark) => (
                <span
                  key={mark}
                  className="font-mono text-[8px] tracking-widest transition-colors duration-300"
                  style={{ color: percent >= mark ? "rgba(240,176,160,0.7)" : "rgba(255,255,255,0.15)" }}
                >
                  {mark}%
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 text-[10px] text-white/30 tracking-widest">
            Press any key to skip.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-3 text-[10px] uppercase tracking-[0.3em] text-white/30 flex items-center justify-between">
          <span>Session protected boot flag active</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-highlight/60 animate-pulse" />
            SECURE
          </span>
        </div>
      </div>
    </div>
  );
}
