import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { FaGithub, FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";
import {
  fadeUp, slideLeft, slideRight, scaleUp,
  staggerContainer, staggerChild, drawLine,
  viewport, viewportMobile,
} from "../utils/animations";

function WorkCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const isPresent = entry.duration.toLowerCase().includes("present");
  const accentColor = isPresent ? "#F0B0A0" : "#6BCB8B";

  return (
    <motion.div
      variants={slideLeft}
      custom={index * 0.12}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="relative pl-10 md:pl-14"
    >
      {/* Timeline dot — scales in */}
      <motion.div
        variants={scaleUp}
        custom={index * 0.12 + 0.05}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="absolute left-0 top-6 flex flex-col items-center"
      >
        <div
          className="w-4 h-4 rounded-full border-2 border-background flex items-center justify-center"
          style={{ background: accentColor, boxShadow: `0 0 14px ${accentColor}90` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-background" />
        </div>
        {index < 1 && (
          <div
            className="w-[1px] mt-1 bg-gradient-to-b from-secondary/40 to-transparent"
            style={{ minHeight: 40 }}
          />
        )}
      </motion.div>

      {/* Connector line */}
      <div className="absolute left-4 top-[1.6rem] w-6 h-[1px] bg-secondary/30 hidden md:block" />

      <div
        className="relative hud-card rounded-xl overflow-hidden group cursor-pointer card-lift holo-card"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="hud-bracket hud-bracket-tl" />
        <div className="hud-bracket hud-bracket-tr" />
        <div className="hud-bracket hud-bracket-bl" />
        <div className="hud-bracket hud-bracket-br" />

        {/* Top accent bar — clip-reveals */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={viewportMobile}
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />

        <motion.div
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMobile}
          className="p-6"
        >
          <motion.div variants={staggerChild} className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="font-mono text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded border"
                  style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}10` }}
                >
                  {isPresent ? "● ACTIVE" : "● COMPLETED"}
                </span>
                <span className="font-mono text-[9px] text-textSecondary/40 tracking-widest uppercase">
                  // WORK_EXPERIENCE
                </span>
              </div>
              <h3 className="font-heading font-bold text-textPrimary text-lg tracking-wide leading-tight">
                {entry.role}
              </h3>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="font-mono text-sm text-secondary font-semibold">{entry.company}</span>
                {entry.location && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-textSecondary/50">
                    <FaMapMarkerAlt size={9} />
                    {entry.location}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="font-mono text-[10px] text-textSecondary/60 tracking-widest border border-secondary/15 px-3 py-1.5 rounded bg-secondary/5 whitespace-nowrap">
                {entry.duration}
              </div>
              <button
                className={`text-secondary/40 hover:text-secondary transition-all duration-300 ${expanded ? "rotate-180" : ""}`}
                aria-label="Toggle details"
              >
                <FaChevronDown size={11} />
              </button>
            </div>
          </motion.div>

          {entry.techStack && (
            <motion.div variants={staggerChild} className="flex flex-wrap gap-1.5 mb-4">
              {entry.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded border border-secondary/15 text-secondary/60 bg-secondary/5"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-secondary/10 pt-4 space-y-2">
                  {(entry.points || [entry.description]).map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-secondary/60 flex-shrink-0" />
                      <p className="font-body text-sm text-textSecondary leading-relaxed">{pt}</p>
                    </motion.div>
                  ))}
                </div>
                {entry.repoUrl && (
                  <a
                    href={entry.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 mt-4 font-mono text-[10px] text-secondary/60 hover:text-secondary transition-colors border border-secondary/15 px-3 py-1.5 rounded hover:border-secondary/40"
                  >
                    <FaGithub size={11} /> VIEW_REPOSITORY
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function EduCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const DEGREE_COLORS = { "B.Tech": "#61DAFB", "12th": "#FFD166", "10th": "#F0B0A0" };
  const color = Object.entries(DEGREE_COLORS).find(([k]) => entry.role.includes(k))?.[1] || "#F0B0A0";

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="relative hud-card rounded-xl overflow-hidden group cursor-pointer card-lift holo-card"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />

      {/* Left accent bar — draws down */}
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
        viewport={viewportMobile}
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{ background: `linear-gradient(180deg, ${color}, ${color}30)` }}
      />

      <motion.div
        variants={staggerContainer(0.07, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="pl-6 pr-5 py-5"
      >
        <motion.div variants={staggerChild} className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded border"
                style={{ color, borderColor: `${color}40`, background: `${color}10` }}
              >
                // EDUCATION
              </span>
              <span className="font-mono text-[9px] text-textSecondary/30 tracking-widest">{entry.duration}</span>
            </div>
            <h3 className="font-heading font-bold text-textPrimary text-base tracking-wide leading-snug">
              {entry.role}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="font-mono text-xs font-semibold" style={{ color }}>{entry.company}</span>
              {entry.location && (
                <span className="flex items-center gap-1 font-mono text-[10px] text-textSecondary/40">
                  <FaMapMarkerAlt size={9} />
                  {entry.location}
                </span>
              )}
              {entry.cgpa && (
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded border"
                  style={{ color, borderColor: `${color}40`, background: `${color}10` }}
                >
                  CGPA: {entry.cgpa}
                </span>
              )}
            </div>
          </div>
          <button
            className={`text-textSecondary/30 hover:text-secondary transition-all duration-300 flex-shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}
            aria-label="Toggle details"
          >
            <FaChevronDown size={11} />
          </button>
        </motion.div>

        {entry.techStack && (
          <motion.div variants={staggerChild} className="flex flex-wrap gap-1.5 mt-3">
            {entry.techStack.map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded border text-textSecondary/50 bg-white/3"
                style={{ borderColor: `${color}25` }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/8 mt-4 pt-4 space-y-2">
                {(entry.points || [entry.description]).map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                    <p className="font-body text-sm text-textSecondary leading-relaxed">{pt}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const { experience } = portfolioData;
  const workEntries = experience.filter((e) => e.type === "work");
  const eduEntries = experience.filter((e) => e.type === "education");

  return (
    <>
      {/* Work Experience */}
      <section id="experience" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px glow-divider" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={slideLeft}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex items-center gap-4 mb-14"
          >
            <span className="font-mono text-secondary text-[10px] tracking-[0.3em]">05</span>
            <div className="w-8 h-[1px] bg-secondary/40" />
            <div>
              <h2
                className="font-heading font-bold text-textPrimary tracking-widest"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
              >
                WORK_EXPERIENCE
              </h2>
              <p className="font-mono text-[10px] text-textSecondary/40 tracking-widest mt-0.5">
                // DEPLOYMENT_LOG · {workEntries.length} ACTIVE MISSIONS
              </p>
            </div>
            <div className="flex-1 glow-divider ml-4" />
          </motion.div>

          <div className="relative">
            {/* Animated vertical timeline line */}
            <motion.div
              variants={drawLine}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-secondary/50 via-secondary/20 to-transparent"
            />
            <div className="space-y-8">
              {workEntries.map((entry, i) => (
                <WorkCard key={`${entry.company}-${i}`} entry={entry} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={slideLeft}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex items-center gap-4 mb-14"
          >
            <span className="font-mono text-highlight text-[10px] tracking-[0.3em]">06</span>
            <div className="w-8 h-[1px] bg-highlight/40" />
            <div>
              <h2
                className="font-heading font-bold text-textPrimary tracking-widest"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
              >
                EDUCATION
              </h2>
              <p className="font-mono text-[10px] text-textSecondary/40 tracking-widest mt-0.5">
                // TRAINING_PROTOCOL · {eduEntries.length} RECORDS
              </p>
            </div>
            <div className="flex-1 h-[1px] bg-highlight/10 ml-4" />
          </motion.div>

          <div className="space-y-5">
            {eduEntries.slice(0, 1).map((entry, i) => (
              <EduCard key={`edu-${i}`} entry={entry} index={i} />
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {eduEntries.slice(1).map((entry, i) => (
                <EduCard key={`edu-${i + 1}`} entry={entry} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
