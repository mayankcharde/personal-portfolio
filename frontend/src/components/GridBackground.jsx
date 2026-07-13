import React, { useMemo } from "react";

export default function GridBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: `${Math.random() * 10 + 8}s`,
      delay: `${Math.random() * 8}s`,
      drift: `${(Math.random() - 0.5) * 60}px`,
      opacity: Math.random() * 0.4 + 0.1,
    })), []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="aurora-blob"
        style={{
          width: "55vw", height: "55vw",
          top: "-15%", left: "-10%",
          background: "radial-gradient(circle, rgba(42,48,64,0.35) 0%, transparent 70%)",
          "--duration": "14s", "--delay": "0s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: "45vw", height: "45vw",
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(255,209,102,0.08) 0%, transparent 70%)",
          "--duration": "18s", "--delay": "-6s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: "35vw", height: "35vw",
          top: "40%", right: "20%",
          background: "radial-gradient(circle, rgba(240,176,160,0.07) 0%, transparent 70%)",
          "--duration": "22s", "--delay": "-3s",
        }}
      />

      {/* Drifting grid */}
      <div className="absolute inset-0 grid-bg opacity-35" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(42,48,64,0.3)_100%)]" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.id % 3 === 0
              ? `rgba(255,209,102,${p.opacity})`
              : p.id % 3 === 1
              ? `rgba(240,176,160,${p.opacity})`
              : `rgba(249,245,242,${p.opacity * 0.5})`,
            "--duration": p.duration,
            "--delay": p.delay,
            "--drift": p.drift,
            boxShadow: p.id % 3 === 0
              ? `0 0 ${p.size * 3}px rgba(255,209,102,0.6)`
              : `0 0 ${p.size * 3}px rgba(240,176,160,0.5)`,
          }}
        />
      ))}
    </div>
  );
}
