import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import useTypewriter from "../hooks/useTypewriter";
import { FaCloudDownloadAlt, FaArrowRight } from "react-icons/fa";

function createResumePackage() {
  const { personal } = portfolioData;
  const a = document.createElement("a");
  a.href = personal.resumeUrl;
  a.download = `${personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.click();
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { personal } = portfolioData;
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const roles = [
    "AI & FULL STACK DEVELOPER",
    "MERN STACK ENGINEER",
    "AGENTIC SYSTEMS BUILDER",
    "GENERATIVE AI DEVELOPER",
  ];
  const typedRole = useTypewriter(roles, 45, 2000, true);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) window.lenis.scrollTo(target);
      else target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 md:px-8"
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[300, 500, 700, 900].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-secondary/5"
            style={{
              width: size, height: size,
              animation: `pulse ${4 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Top-right glow orb */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,209,102,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aurora-shift 16s ease-in-out infinite",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT: Content Panel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-6 z-10"
        >
          {/* System Header */}
          <motion.div variants={itemVariants} className="font-mono text-[10px] text-surface/60 tracking-[0.2em] uppercase flex items-center space-x-2">
            <span className="inline-block w-8 h-[1px] bg-surface/40" />
            <span className="relative">
              COMMAND_DECK // OPERATOR_PROFILE
              <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-highlight animate-ping" />
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1
              className="font-heading font-bold text-surface tracking-wider leading-none glitch-text"
              data-text={personal.name}
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              {personal.name}
            </h1>
            <div className="mt-2 font-mono text-[11px] text-surface/50 tracking-widest">
              // CALLSIGN:{" "}
              <span className="text-surface font-bold shimmer-text">{personal.callsign}</span>
            </div>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            variants={itemVariants}
            className="relative bg-surface/90 rounded-lg px-4 py-3 min-h-[3rem] flex items-center border-l-2 border-secondary overflow-hidden scan-hover"
            style={{ boxShadow: "0 0 20px rgba(42,48,64,0.3), inset 0 0 20px rgba(240,176,160,0.03)" }}
          >
            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-secondary/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-secondary/20 rounded-bl-lg" />
            <p className="font-mono text-sm md:text-base text-secondary tracking-widest font-medium">
              &gt;_ {typedRole}
              <span className="inline-block w-[2px] h-4 bg-secondary ml-1 cursor-blink align-middle" />
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="font-body text-sm md:text-base text-surface/80 max-w-md leading-relaxed font-medium">
            {personal.tagline.toLowerCase()}
          </motion.p>

          {/* Status pill */}
          {personal.availableForWork && (
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-3 py-1.5 border border-surface/30 bg-surface/15 rounded font-mono text-[11px] text-surface tracking-widest w-fit backdrop-blur"
              style={{ boxShadow: "0 0 12px rgba(255,209,102,0.15)" }}
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight" />
              </span>
              <span>STATUS: AVAILABLE_FOR_WORK</span>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              className="group magnetic-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-xs font-bold tracking-widest uppercase text-textPrimary bg-surface border border-surface rounded transition-all duration-300 hover:bg-surface/80 hover:border-secondary hover:shadow-[0_0_20px_rgba(240,176,160,0.2)]"
            >
              VIEW_PROJECT_LOGS
              <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#transmission"
              onClick={(e) => handleScroll(e, "#transmission")}
              className="magnetic-btn inline-flex items-center justify-center px-7 py-3.5 font-mono text-xs font-bold tracking-widest uppercase text-surface border-2 border-surface rounded bg-transparent hover:bg-surface hover:text-textPrimary transition-all duration-300 hover:shadow-[0_0_20px_rgba(42,48,64,0.3)]"
            >
              OPEN_TRANSMISSION
            </a>
            <button
              type="button"
              onClick={createResumePackage}
              className="magnetic-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-xs font-bold tracking-widest uppercase text-surface border border-surface/50 rounded bg-surface/10 hover:bg-surface/20 hover:border-surface transition-all duration-300"
            >
              <FaCloudDownloadAlt size={13} />
              RESUME
            </button>
          </motion.div>

          {/* Quick readout */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 font-mono text-[10px] text-surface/50 tracking-wider border-t border-surface/20 pt-4"
          >
            <span>LOC: {personal.location}</span>
            <span className="hidden sm:block opacity-30">|</span>
            <span>
              COMMS:{" "}
              <a href={`mailto:${personal.email}`} className="text-surface/70 hover:text-surface transition-colors hover:underline">
                {personal.email}
              </a>
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT: Photo card with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotateY: 8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y }}
          className="relative w-full flex items-center justify-center"
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(240,176,160,0.12) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          />

          <div className="relative w-full aspect-[3/4] hud-card rounded-xl overflow-hidden card-lift holo-card">
            <div className="hud-bracket hud-bracket-tl" />
            <div className="hud-bracket hud-bracket-tr" />
            <div className="hud-bracket hud-bracket-bl" />
            <div className="hud-bracket hud-bracket-br" />

            {/* Scan line on image */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
                style={{ animation: "scanline-sweep 6s linear infinite" }}
              />
            </div>

            <img
              src="/mayank.jpeg"
              alt="Mayank Charde"
              className="w-full h-full object-cover object-center md:object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />

            {/* Bottom info strip */}
            <div className="absolute bottom-0 left-0 right-0 p-4 font-mono">
              <div className="text-[9px] text-secondary/60 tracking-[0.2em] mb-0.5">// OPERATOR_VISUAL</div>
              <div className="text-xs text-textPrimary/80 font-semibold tracking-wider">{personal.name}</div>
            </div>
          </div>

          {/* Floating stat badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -right-4 top-1/4 hud-card rounded-lg px-3 py-2 hidden lg:block"
            style={{ boxShadow: "0 0 20px rgba(255,209,102,0.15)" }}
          >
            <div className="font-mono text-[9px] text-secondary/50 tracking-widest mb-0.5">PROJECTS</div>
            <div className="font-mono text-lg font-bold text-highlight">10+</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -left-4 bottom-1/4 hud-card rounded-lg px-3 py-2 hidden lg:block"
            style={{ boxShadow: "0 0 20px rgba(240,176,160,0.15)" }}
          >
            <div className="font-mono text-[9px] text-secondary/50 tracking-widest mb-0.5">STATUS</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
              <span className="font-mono text-xs text-highlight font-bold">ONLINE</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 pointer-events-none"
      >
        <span className="font-mono text-[9px] text-surface/40 tracking-[0.3em] uppercase">SCROLL_DOWN</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-surface/40 to-transparent animate-pulse" />
        <div
          className="w-4 h-4 border border-surface/30 rounded-full flex items-center justify-center"
          style={{ animation: "float-drift 2s ease-in-out infinite" }}
        >
          <div className="w-1 h-1 rounded-full bg-surface/40" />
        </div>
      </motion.div>
    </section>
  );
}
