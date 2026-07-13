import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { FaMedal } from "react-icons/fa";
import { fadeUp, staggerContainer, staggerChild, slideLeft, viewport, viewportMobile } from "../utils/animations";

function CertCard({ cert, index }) {

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.08}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="relative hud-card rounded-xl overflow-hidden group card-lift holo-card"
    >
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />

      {/* Top accent bar */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: index * 0.08 + 0.15, ease: [0.16, 1, 0.3, 1] }}
        viewport={viewportMobile}
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
      />

      <motion.div
        variants={staggerContainer(0.06, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
        className="p-5"
      >
        {/* Header row */}
        <motion.div variants={staggerChild} className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}35` }}
          >
            <FaMedal size={15} style={{ color: cert.color }} />
          </div>
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 rounded border self-start"
            style={{ color: cert.color, borderColor: `${cert.color}40`, background: `${cert.color}10` }}
          >
            {cert.issuer}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          variants={staggerChild}
          className="font-heading font-bold text-textPrimary text-sm tracking-wide leading-snug mb-2"
        >
          {cert.title}
        </motion.h3>

        {/* Date */}
        <motion.div variants={staggerChild}>
          <span className="font-mono text-[9px] text-textSecondary/50 tracking-widest border border-secondary/15 px-2 py-0.5 rounded bg-secondary/5">
            {cert.date}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px glow-divider" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={slideLeft}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-4 mb-14"
        >
          <span className="font-mono text-secondary text-[10px] tracking-[0.3em]">07</span>
          <div className="w-8 h-[1px] bg-secondary/40" />
          <div>
            <h2
              className="font-heading font-bold text-textPrimary tracking-widest"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
            >
              CERTIFICATIONS
            </h2>
            <p className="font-mono text-[10px] text-textSecondary/40 tracking-widest mt-0.5">
              // CREDENTIALS_LOG · {certifications.length} VERIFIED
            </p>
          </div>
          <div className="flex-1 glow-divider ml-4" />
        </motion.div>

        {/* Cert grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={`${cert.issuer}-${i}`} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
