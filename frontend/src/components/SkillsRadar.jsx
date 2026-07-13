import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import useMediaQuery from "../hooks/useMediaQuery";
import {
  fadeUp, slideLeft, slideRight, scaleUp,
  staggerContainer, staggerChild,
  viewport, viewportMobile,
} from "../utils/animations";

// ─── Radar helpers ────────────────────────────────────────────────────────────

const CATEGORY_LAYOUT = {
  Frontend:       { start: 140, end: 250, radius: [0.45, 0.68, 0.90] },
  Backend:        { start: 230, end: 335, radius: [0.45, 0.68, 0.90] },
  "AI & Agentic": { start: 295, end: 38,  radius: [0.45, 0.68, 0.90] },
  Tools:          { start: 22,  end: 138, radius: [0.45, 0.68, 0.90] },
};

const CATEGORY_META = {
  Frontend: { label: "UI SYSTEMS", years: "4+ YEARS" },
  Backend: { label: "SERVICE LAYER", years: "3+ YEARS" },
  "AI & Agentic": { label: "MODEL ORCHESTRATION", years: "3+ YEARS" },
  Tools: { label: "DEPLOYMENT TOOLS", years: "5+ YEARS" },
};

function normalizeAngle(a) { return ((a % 360) + 360) % 360; }
function shortestSpan(s, e) { return e >= s ? e - s : 360 - s + e; }
function clamp(v, mn, mx) { return Math.min(mx, Math.max(mn, v)); }

function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildNodes(skills, mobile) {
  const center = 500;
  const maxRadius = mobile ? 430 : 475;
  const nodes = [];

  skills.forEach((group, gi) => {
    const layout = CATEGORY_LAYOUT[group.category] || {
      start: 30 + gi * 90, end: 120 + gi * 90, radius: [0.45, 0.68, 0.90],
    };
    const meta = CATEGORY_META[group.category] || {
      label: group.category.toUpperCase(), years: "3+ YEARS",
    };
    const count = group.items.length;
    const span = shortestSpan(layout.start, layout.end);
    const levels = layout.radius;

    group.items.forEach((skill, si) => {
      const skillName = typeof skill === "string" ? skill : skill.name;
      const skillLevel = typeof skill === "object" ? skill.level : group.proficiency;
      const angle = normalizeAngle(layout.start + span * (si + 1) / (count + 1));
      const radius = maxRadius * levels[si % 3];
      const pos = polarToCartesian(center, center, radius, angle);

      nodes.push({
        id: `${group.category}-${skillName}`,
        label: skillName,
        category: group.category,
        categoryLabel: meta.label,
        categoryYears: meta.years,
        proficiency: skillLevel,
        color: group.color || "#FF7A1A",
        angle,
        x: pos.x,
        y: pos.y,
      });
    });
  });

  return nodes;
}

// ─── Animated progress bar ────────────────────────────────────────────────────

function SkillBar({ name, level, color, index }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(level); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="group py-1">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[12px] tracking-wider text-white/80 group-hover:text-white transition-colors">
          {name}
        </span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            transitionDelay: `${index * 60}ms`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Domain card ──────────────────────────────────────────────────────────────

const DOMAIN_ICONS = {
  Frontend: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3M13 14h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Backend: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  "AI & Agentic": (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
    </svg>
  ),
  Tools: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function DomainCard({ group, index }) {
  const icon = DOMAIN_ICONS[group.category];

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="relative rounded-2xl border border-white/8 bg-[#0D0D0D] p-7 flex flex-col gap-6 card-lift"
      style={{ boxShadow: `0 0 0 1px ${group.color}18, 0 16px 40px rgba(0,0,0,0.4)` }}
    >
      {/* Header — stagger icon + text */}
      <motion.div
        variants={staggerContainer(0.08, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="flex items-center gap-4"
      >
        <motion.div
          variants={scaleUp}
          custom={0}
          className="flex items-center justify-center w-11 h-11 rounded-xl border flex-shrink-0"
          style={{ color: group.color, borderColor: `${group.color}40`, background: `${group.color}12` }}
        >
          {icon}
        </motion.div>
        <motion.div variants={staggerChild}>
          <div className="font-mono text-[9px] tracking-[0.28em] text-white/30 uppercase mb-1">
            {CATEGORY_META[group.category]?.label || group.category.toUpperCase()}
          </div>
          <div className="font-mono text-base font-bold text-white tracking-wide">
            {group.category}
          </div>
        </motion.div>
      </motion.div>

      {/* Skill bars — stagger each bar */}
      <motion.div
        variants={staggerContainer(0.07, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="flex flex-col gap-4"
      >
        {group.items.map((skill, si) => {
          const name = typeof skill === "string" ? skill : skill.name;
          const level = typeof skill === "object" ? skill.level : group.proficiency;
          return (
            <motion.div key={name} variants={staggerChild}>
              <SkillBar name={name} level={level} color={group.color} index={si} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer — glowing segment bar */}
      <motion.div
        variants={fadeUp}
        custom={0.3}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="mt-auto pt-4 border-t border-white/5"
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: group.items.length }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[3px] rounded-full"
              style={{ background: `${group.color}${i % 2 === 0 ? "cc" : "44"}` }}
            />
          ))}
        </div>
        <div className="mt-2.5 font-mono text-[9px] text-white/20 tracking-widest">
          {group.items.length} TECHNOLOGIES
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SkillsRadar() {
  const { skills } = portfolioData;
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const nodes = useMemo(() => buildNodes(skills, isMobile), [isMobile, skills]);

  const resolvedActiveId = activeId || nodes[0]?.id;
  const activeNode = nodes.find((n) => n.id === (hoveredId || resolvedActiveId)) || nodes[0];
  const displayNode = activeNode || nodes[0];
  const lineLength = activeNode ? Math.hypot(activeNode.x - 500, activeNode.y - 500) : 0;

  const ringCount = isMobile ? 4 : 5;
  const ringRadii = Array.from({ length: ringCount }, (_, i) => {
    const f = (i + 1) / ringCount;
    return (isMobile ? 100 : 110) + f * (isMobile ? 330 : 370);
  });

  const labelSide = (node) => {
    if (node.x < 350) return "right";
    if (node.x > 650) return "left";
    return "below";
  };

  return (
    <section id="skills" className="relative w-full bg-black px-4 py-24 text-radar-text md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section header — slides left */}
        <motion.div
          variants={slideLeft}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-10 flex items-start gap-4"
        >
          <span className="mt-3 h-12 w-1 rounded-full bg-radar-accent" />
          <div className="max-w-4xl">
            <motion.div
              variants={fadeUp}
              custom={0.05}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-radar-text-muted"
            >
              04 // CAPABILITY MATRIX
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-2 font-mono text-4xl font-black uppercase tracking-[0.02em] text-white md:text-6xl"
            >
              Tactical Cognition Radar
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.18}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-4 font-mono text-sm leading-relaxed text-radar-text-muted md:text-base"
            >
              &gt; Hover radar nodes to lock targeting array · Scroll down for full skill breakdown.
            </motion.p>
          </div>
        </motion.div>

        {/* Radar panel — scale in */}
        <motion.div
          variants={scaleUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative overflow-hidden rounded-[24px] border border-radar-border bg-radar-bg p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-8"
        >
          <div className="radar-status-pulse absolute left-4 top-4 h-3 w-3 rounded-full bg-radar-accent shadow-[0_0_18px_rgba(255,122,26,0.7)]" />
          <div className="radar-status-pulse absolute bottom-4 right-4 h-3 w-3 rounded-full bg-radar-accent shadow-[0_0_18px_rgba(255,122,26,0.7)]" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* SVG radar */}
            <div className="relative aspect-square min-h-[min(85vw,860px)] w-full max-w-[860px] justify-self-center lg:max-w-none">
              <div className="absolute inset-0 rounded-[20px] border border-white/5 bg-[radial-gradient(circle_at_center,rgba(255,122,26,0.05),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />

              <svg
                viewBox="0 0 1000 1000"
                className="absolute inset-0 h-full w-full overflow-visible"
                role="img"
                aria-label="Skills radar scanner"
              >
                <defs>
                  <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,122,26,0)" />
                    <stop offset="50%" stopColor="rgba(255,122,26,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,122,26,0.95)" />
                  </linearGradient>
                </defs>

                {ringRadii.map((r, i) => (
                  <circle
                    key={r}
                    cx="500" cy="500" r={r}
                    fill="none"
                    stroke="var(--radar-grid, #3A2A1A)"
                    strokeOpacity={i === ringRadii.length - 1 ? 0.75 : 0.45}
                    strokeWidth={i === ringRadii.length - 1 ? 2 : 1.25}
                    className="radar-ring"
                  />
                ))}

                <line x1="80" y1="500" x2="920" y2="500" stroke="var(--radar-grid,#3A2A1A)" strokeOpacity="0.55" strokeWidth="1.5" />
                <line x1="500" y1="80" x2="500" y2="920" stroke="var(--radar-grid,#3A2A1A)" strokeOpacity="0.55" strokeWidth="1.5" />

                {!prefersReducedMotion && (
                  <g className="radar-sweep-spin">
                    <line
                      x1="500" y1="500" x2="500" y2={isMobile ? 160 : 120}
                      stroke="url(#radarSweepGradient)"
                      strokeLinecap="round" strokeWidth="4"
                      filter="drop-shadow(0 0 10px rgba(255,122,26,0.5))"
                    />
                  </g>
                )}

                <circle cx="500" cy="500" r={isMobile ? 28 : 34} fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="2" />
                <text
                  x="500" y="508" textAnchor="middle"
                  fontFamily="JetBrains Mono, IBM Plex Mono, monospace"
                  fontSize={isMobile ? "24" : "28"} fontWeight="700" fill="#FFFFFF"
                >
                </text>

                {activeNode && (
                  <motion.line
                    key={activeNode.id}
                    x1="500" y1="500" x2={activeNode.x} y2={activeNode.y}
                    stroke={activeNode.color || "#FF7A1A"}
                    strokeLinecap="round" strokeWidth={2.5}
                    initial={prefersReducedMotion ? false : { strokeDasharray: lineLength, strokeDashoffset: lineLength, opacity: 0.8 }}
                    animate={prefersReducedMotion ? { opacity: 0.9 } : { strokeDashoffset: 0, opacity: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
                    style={prefersReducedMotion ? undefined : { strokeDasharray: lineLength }}
                  />
                )}
              </svg>

              {nodes.map((node) => {
                const isActive = node.id === (hoveredId || resolvedActiveId);
                const isLocked = node.id === resolvedActiveId && !hoveredId;
                const side = isMobile ? "below" : labelSide(node);
                const dotSize = isMobile ? 20 : isLocked ? 16 : 12;
                const hitSize = isMobile ? 36 : isLocked ? 28 : 24;
                const badgeColor = isActive ? "text-radar-accent" : "text-radar-text-muted";
                const badgeWeight = isActive ? "font-bold" : "font-normal";

                return (
                  <div
                    key={node.id}
                    className="absolute"
                    style={{ left: `${(node.x / 1000) * 100}%`, top: `${(node.y / 1000) * 100}%` }}
                  >
                    <motion.button
                      type="button"
                      onMouseEnter={() => !isMobile && setHoveredId(node.id)}
                      onMouseLeave={() => !isMobile && setHoveredId(null)}
                      onFocus={() => setHoveredId(node.id)}
                      onBlur={() => setHoveredId(null)}
                      onClick={() => setActiveId(node.id)}
                      className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center focus:outline-none"
                      style={{ minWidth: hitSize, minHeight: hitSize }}
                      aria-label={`${node.label}, ${node.category}`}
                    >
                      {side === "left" && (
                        <span className={`mr-4 max-w-[11rem] text-right font-mono text-[11px] uppercase tracking-[0.16em] ${badgeColor} ${badgeWeight}`}>
                          {node.label}
                        </span>
                      )}

                      <motion.span
                        className="flex items-center justify-center rounded-full border border-radar-text bg-[#0A0A0A] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                        style={{ width: dotSize, height: dotSize, minWidth: dotSize, minHeight: dotSize, originX: 0.5, originY: 0.5 }}
                        animate={{
                          scale: isActive ? 1.3 : isLocked ? 1.1 : 1,
                          backgroundColor: isActive ? (node.color || "#FF7A1A") : "#0A0A0A",
                          borderColor: isActive ? (node.color || "#FF7A1A") : "#E8E8E8",
                        }}
                        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 22 }}
                      />

                      {side === "right" && (
                        <span className={`ml-4 max-w-[11rem] text-left font-mono text-[11px] uppercase tracking-[0.16em] ${badgeColor} ${badgeWeight}`}>
                          {node.label}
                        </span>
                      )}

                      {side === "below" && (
                        <span className={`absolute left-1/2 top-full mt-6 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] ${badgeColor} ${badgeWeight}`}>
                          {node.label}
                        </span>
                      )}
                    </motion.button>

                    {isActive && (
                      <div
                        className="pointer-events-none absolute z-20 rounded-xl border bg-[#101010]/95 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-radar-text shadow-[0_18px_30px_rgba(0,0,0,0.4)]"
                        style={{
                          borderColor: `${node.color || "#FF7A1A"}80`,
                          left: `${clamp(node.x / 10 + 8, 8, 88)}%`,
                          top: `${clamp(node.y / 10 - 4, 6, 90)}%`,
                          transform: node.x > 650 ? "translate(-100%,-120%)" : "translate(16px,-120%)",
                        }}
                      >
                        <div className="font-bold" style={{ color: node.color || "#FF7A1A" }}>{node.label}</div>
                        <div className="mt-2 text-radar-text-muted">{node.categoryLabel}</div>
                        <div className="mt-2 text-radar-text-muted">
                          STATUS: {node.id === resolvedActiveId && !hoveredId ? "LOCKED" : "TARGET ACQUIRED"}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sidebar readout — slides from right */}
            <motion.aside
              variants={slideRight}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col justify-between rounded-[20px] border border-radar-border bg-black/40 p-6 font-mono text-radar-text gap-6"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-radar-text-muted">Target Readout</div>
                <div className="mt-5 text-2xl font-black uppercase tracking-[0.02em] text-white">{displayNode.label}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em]" style={{ color: displayNode.color || "#FF7A1A" }}>
                  {displayNode.category}
                </div>

                <div className="mt-6 space-y-4 text-sm text-radar-text-muted">
                  {[
                    ["STATUS", displayNode.id === resolvedActiveId && !hoveredId ? "LOCKED" : "ACQUIRED"],
                    ["SECTOR", `${Math.round(displayNode.angle)}°`],
                    ["CATEGORY", displayNode.categoryLabel],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <span>{k}</span>
                      <span className="text-radar-text">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot matrix */}
              <div className="rounded-2xl border border-radar-border bg-[#0a0a0a] p-5 overflow-hidden relative">
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: i % 7 === 0 ? (displayNode.color || "#FF7A1A") : i % 3 === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
                        boxShadow: i % 7 === 0 ? `0 0 6px ${displayNode.color || "#FF7A1A"}` : "none",
                        transition: "all 0.4s ease",
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-radar-text-muted">
                  ◈ Hover nodes to retarget array
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>

        {/* Skill Matrix section */}
        <div className="mt-20">
          {/* Header — slides left */}
          <motion.div
            variants={slideLeft}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex items-center gap-4 mb-12"
          >
            <span className="h-8 w-1 rounded-full bg-radar-accent" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-radar-text-muted">
                SKILL_MATRIX // FULL_BREAKDOWN
              </div>
              <h3 className="font-mono text-2xl font-black uppercase tracking-wide text-white mt-1">
                Domain Proficiency Index
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((group, i) => (
              <DomainCard key={group.category} group={group} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
