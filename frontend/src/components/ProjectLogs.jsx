import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import {
  fadeUp, slideLeft, flipIn, scaleUp,
  staggerContainer, staggerChild,
  viewport, viewportMobile,
} from "../utils/animations";

const STATUS_COLORS = {
  LIVE: { bg: "bg-success/10", border: "border-success/30", text: "text-success" },
  IN_PROGRESS: { bg: "bg-highlight/10", border: "border-highlight/30", text: "text-highlight" },
  ARCHIVED: { bg: "bg-textSecondary/10", border: "border-textSecondary/20", text: "text-textSecondary" },
};

function ProjectLogCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_COLORS[project.status] || STATUS_COLORS.ARCHIVED;

  return (
    <motion.article
      variants={flipIn}
      custom={index * 0.08}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="relative hud-card rounded overflow-hidden group cursor-pointer card-lift holo-card scan-hover"
      style={{ perspective: 800 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />

      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060A]/90" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-secondary/15 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "linear-gradient(135deg, transparent 30%, rgba(240,176,160,0.08) 50%, transparent 70%)" }}
        />
        <div className="absolute top-3 left-3 font-mono text-[9px] text-secondary/40 tracking-[0.25em] uppercase">
          {project.codename}
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 border rounded font-mono text-[9px] tracking-widest ${status.bg} ${status.border} ${status.text}`}>
          ● {project.status}
        </div>
      </div>

      {/* Content — stagger children on card enter */}
      <motion.div
        variants={staggerContainer(0.07, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="p-5 space-y-4"
      >
        <motion.div variants={staggerChild} className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-bold text-textPrimary tracking-wide leading-snug">
            {project.title}
          </h3>
          <button
            className={`flex-shrink-0 text-secondary/50 hover:text-secondary transition-all duration-300 mt-0.5 ${expanded ? "rotate-180" : ""}`}
            aria-label="Expand project"
          >
            <FaChevronDown size={12} />
          </button>
        </motion.div>

        <motion.div variants={staggerChild} className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] tracking-wider px-2 py-0.5 border border-secondary/15 text-secondary/60 rounded bg-secondary/5"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="font-body text-sm text-textSecondary leading-relaxed pt-2 border-t border-secondary/10">
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={staggerChild} className="flex items-center justify-between pt-2 border-t border-secondary/10">
          <div className="font-mono text-[9px] text-textSecondary/30 tracking-widest">
            LOG_ID: #{String(portfolioData.projects.indexOf(project) + 1).padStart(3, "0")}
          </div>
          <div className="flex gap-4">
            {project.repoUrl && project.repoUrl !== "#" && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[10px] text-textSecondary/60 hover:text-secondary flex items-center gap-1.5 transition-colors"
              >
                <FaGithub size={11} /> REPO
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[10px] text-secondary/70 hover:text-secondary flex items-center gap-1.5 transition-colors"
              >
                <FaExternalLinkAlt size={10} /> DEPLOY
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function ProjectLogs() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const displayed = showAll ? projects : featured;

  return (
    <section id="projects" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px glow-divider" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={slideLeft}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center space-x-4 mb-14"
        >
          <span className="font-mono text-secondary text-[10px] tracking-[0.3em]">03</span>
          <div className="w-8 h-[1px] bg-secondary/40" />
          <h2
            className="font-heading font-bold text-textPrimary tracking-widest"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            PROJECT_LOGS
          </h2>
          <div className="flex-1 glow-divider ml-4" />
          <motion.span
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-mono text-[9px] text-textSecondary/30 tracking-widest hidden md:block"
          >
            {displayed.length} / {projects.length} RECORDS
          </motion.span>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <ProjectLogCard key={project.codename} project={project} index={i} />
          ))}
        </div>

        {/* Toggle button */}
        {projects.length > featured.length && (
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewportMobile}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="magnetic-btn font-mono text-xs tracking-widest uppercase text-secondary border border-secondary/30 px-7 py-3.5 rounded hover:bg-secondary/10 hover:border-secondary/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(240,176,160,0.15)]"
            >
              {showAll
                ? "[ COLLAPSE_LOGS ]"
                : `[ LOAD_ALL_LOGS // ${projects.length} ENTRIES ]`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
