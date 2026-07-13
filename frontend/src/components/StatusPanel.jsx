import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import {
  fadeUp, fadeDown, slideLeft, slideRight,
  scaleUp, staggerContainer, staggerChild,
  viewport, viewportMobile,
} from "../utils/animations";

function StatCounter({ value, label, index }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const target = parseFloat(value);
          if (isNaN(target) || String(value) !== String(target)) {
            setCount(value);
            return;
          }
          const duration = 1800;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = eased * target;
            setCount(
              Number.isInteger(target)
                ? Math.floor(current)
                : parseFloat(current.toFixed(1)),
            );
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      variants={scaleUp}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="relative hud-card p-5 rounded text-center card-lift scan-hover group"
    >
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />
      <div
        className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(240,176,160,0.06) 0%, transparent 70%)" }}
      />
      <div className="font-mono text-3xl md:text-4xl font-bold text-secondary mb-1 shimmer-text">
        {typeof count === "string" ? count : count}
        {typeof value === "number" && Number.isInteger(value) ? "+" : ""}
      </div>
      <div className="font-mono text-[9px] text-textSecondary/60 tracking-[0.2em] uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatusPanel() {
  const { about, personal, stats } = portfolioData;
  const [clock, setClock] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const careerStart = useRef(new Date(personal.careerStartDate || "2024-01-01"));

  useEffect(() => {
    const tick = () => setClock(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateUptime = () => {
      const diff = Date.now() - careerStart.current.getTime();
      setUptime(Math.max(0, Math.floor(diff / 86400000)));
    };
    updateUptime();
    const timer = setInterval(updateUptime, 60000);
    return () => clearInterval(timer);
  }, []);

  const diagnostics = [
    { key: "BUILD_ENV", val: "Vite + React 18 (JS)" },
    { key: "BACKEND", val: "Node.js / FastAPI" },
    { key: "AI_STACK", val: "LangGraph / LangChain / Gemini" },
    { key: "DEPLOY", val: "Vercel / Render" },
    { key: "CONNECT", val: personal.email },
    {
      key: "CLOCK",
      val: clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    },
    {
      key: "TIMEZONE",
      val: Intl.DateTimeFormat().resolvedOptions().timeZone || "Local",
    },
    { key: "ORBIT", val: `${uptime.toLocaleString()} days in orbit` },
  ];

  return (
    <section id="status" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(42,48,64,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — wipes in from left */}
        <motion.div
          variants={slideLeft}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center space-x-4 mb-14"
        >
          <motion.span
            variants={fadeDown}
            custom={0.05}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-mono text-surface/60 text-[10px] tracking-[0.3em]"
          >
            02
          </motion.span>
          <div className="w-8 h-[1px] bg-surface/40" />
          <h2
            className="font-heading font-bold text-surface tracking-widest"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            SYSTEM.STATUS
          </h2>
          <div className="flex-1 glow-divider ml-4" />
          <span className="font-mono text-[9px] text-surface/30 tracking-widest hidden md:block">
            // OPERATOR_DOSSIER
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Bio ID card — slides from left */}
          <motion.div
            variants={slideLeft}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative hud-card p-8 rounded group card-lift holo-card"
          >
            <div className="hud-bracket hud-bracket-tl" />
            <div className="hud-bracket hud-bracket-tr" />
            <div className="hud-bracket hud-bracket-bl" />
            <div className="hud-bracket hud-bracket-br" />

            {/* Photo + name — scale in */}
            <motion.div
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMobile}
              className="flex items-start gap-6 mb-6"
            >
              <motion.div variants={scaleUp} custom={0} className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                <div className="absolute inset-0 rounded border border-secondary/30 overflow-hidden">
                  <img
                    src={about.photoUrl}
                    alt={personal.name}
                    className="w-full h-full object-cover opacity-90 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-secondary" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-secondary" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-secondary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-secondary" />
              </motion.div>

              <motion.div variants={staggerChild}>
                <div className="font-mono text-[9px] text-secondary/50 tracking-[0.2em] mb-1">// OPERATIVE_CARD</div>
                <div className="font-heading text-xl font-bold text-textPrimary tracking-wide">{personal.name}</div>
                <div className="font-mono text-xs text-secondary mt-1">{personal.title}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                  <span className="font-mono text-[9px] text-highlight/80 tracking-widest">
                    ONLINE // {personal.location}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Bio text — fade up */}
            <motion.p
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMobile}
              className="font-body text-sm text-textSecondary leading-relaxed border-t border-secondary/10 pt-6"
            >
              {about.bio}
            </motion.p>

            {/* Info grid — stagger each cell */}
            <motion.div
              variants={staggerContainer(0.07, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMobile}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              {[
                { label: "EXPERIENCE", val: `${about.yearsExperience} YRS` },
                { label: "STATUS", val: personal.availableForWork ? "AVAILABLE" : "ENGAGED" },
                { label: "LOCATION", val: personal.location.toUpperCase() },
                { label: "SPECIALITY", val: "AI/FULLSTACK" },
              ].map(({ label, val }) => (
                <motion.div
                  key={label}
                  variants={staggerChild}
                  className="bg-secondary/8 border border-secondary/12 rounded p-2.5"
                >
                  <div className="font-mono text-[9px] text-textSecondary/50 tracking-widest mb-0.5">{label}</div>
                  <div className="font-mono text-xs text-secondary font-semibold">{val}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Stats + diagnostics — slides from right */}
          <motion.div
            variants={slideRight}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col space-y-6"
          >
            {/* Stat counters — each scales in with stagger */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <StatCounter key={s.label} value={s.value} label={s.label} index={i} />
              ))}
            </div>

            {/* Diagnostics panel — rows stagger in */}
            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMobile}
              className="relative hud-card p-6 rounded font-mono text-xs scan-hover"
            >
              <div className="hud-bracket hud-bracket-tl" />
              <div className="hud-bracket hud-bracket-tr" />
              <div className="hud-bracket hud-bracket-bl" />
              <div className="hud-bracket hud-bracket-br" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

              <motion.div
                variants={fadeDown}
                custom={0.25}
                initial="hidden"
                whileInView="visible"
                viewport={viewportMobile}
                className="font-semibold text-secondary text-[10px] tracking-[0.2em] mb-4"
              >
                // SYSTEM_DIAGNOSTICS
              </motion.div>

              <motion.div
                variants={staggerContainer(0.06, 0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportMobile}
                className="space-y-3"
              >
                {diagnostics.map(({ key, val }) => (
                  <motion.div
                    key={key}
                    variants={staggerChild}
                    className="flex justify-between items-center border-b border-secondary/8 pb-2"
                  >
                    <span className="text-textSecondary/50 tracking-widest">{key}</span>
                    <span className="text-textPrimary/80">{val}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
