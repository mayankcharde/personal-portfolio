import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import {
  fadeUp, slideLeft, slideRight, scaleUp,
  staggerContainer, staggerChild,
  viewport, viewportMobile,
} from "../utils/animations";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
};

export default function Transmission() {
  const { personal, socials } = portfolioData;
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${personal.email}?subject=Contact from ${formState.name}&body=${formState.message}`;
    setSubmitted(true);
  };

  return (
    <section id="transmission" className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      {/* Top glow divider */}
      <div className="absolute top-0 left-0 right-0 h-px glow-divider" />

      {/* Radar rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ opacity: 0.06 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-secondary"
            style={{
              width: `${i * 18}%`,
              height: `${i * 18}%`,
              animationDelay: `${i * 0.5}s`,
              animation: "pulse 5s ease-out infinite",
              boxShadow: `0 0 ${i * 4}px rgba(240,176,160,0.1)`,
            }}
          />
        ))}
      </div>

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(240,176,160,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={slideLeft}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center space-x-4 mb-14"
        >
          <span className="font-mono text-secondary text-[10px] tracking-[0.3em]">07</span>
          <div className="w-8 h-[1px] bg-secondary/40" />
          <h2
            className="font-heading font-bold text-textPrimary tracking-widest"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            TRANSMISSION
          </h2>
          <div className="flex-1 glow-divider ml-4" />
          <span className="font-mono text-[9px] text-textSecondary/30 tracking-widest hidden md:block">
            // OPEN_CHANNEL
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col space-y-8"
          >
            {/* Signal Broadcast */}
            <motion.div
              variants={slideLeft}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMobile}
              className="relative hud-card rounded p-6 card-lift scan-hover"
            >
              <div className="hud-bracket hud-bracket-tl" />
              <div className="hud-bracket hud-bracket-br" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

              <div className="font-mono text-[9px] text-secondary/40 tracking-[0.2em] mb-4">// SIGNAL_BROADCAST</div>
              <p className="font-body text-sm text-textSecondary leading-relaxed">
                Available for full-time roles, freelance projects, and AI collaboration. Ping to establish a secure link.
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 font-mono text-xs text-secondary/70 hover:text-secondary transition-colors group"
                >
                  <FaEnvelope size={12} />
                  <span className="group-hover:underline">{personal.email}</span>
                </a>
                <div className="font-mono text-xs text-textSecondary/40">
                  LOC: {personal.location}
                </div>
              </div>
            </motion.div>

            {/* Social modules */}
            <motion.div
              variants={slideLeft}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMobile}
              className="relative hud-card rounded p-6 card-lift scan-hover"
            >
              <div className="hud-bracket hud-bracket-tl" />
              <div className="hud-bracket hud-bracket-br" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

              <div className="font-mono text-[9px] text-secondary/40 tracking-[0.2em] mb-4">// CHANNEL_LINKS</div>
              <motion.div
                variants={staggerContainer(0.08, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportMobile}
                className="grid grid-cols-2 gap-3"
              >
                {Object.entries(socials).map(([platform, url]) => {
                  const Icon = SOCIAL_ICONS[platform];
                  if (!Icon || !url) return null;
                  return (
                    <motion.a
                      key={platform}
                      variants={staggerChild}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="magnetic-btn flex items-center gap-2 p-3 border border-secondary/10 rounded bg-secondary/5 hover:border-secondary/40 hover:bg-secondary/12 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(240,176,160,0.1)]"
                    >
                      <Icon size={13} className="text-secondary/60 group-hover:text-secondary transition-colors" />
                      <span className="font-mono text-[10px] text-textSecondary/60 group-hover:text-textPrimary transition-colors tracking-wider uppercase">
                        {platform}
                      </span>
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Transmission Form */}
          <motion.div
            variants={slideRight}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-3"
          >
            <div className="relative hud-card rounded p-8 scan-hover">
              <div className="hud-bracket hud-bracket-tl" />
              <div className="hud-bracket hud-bracket-tr" />
              <div className="hud-bracket hud-bracket-bl" />
              <div className="hud-bracket hud-bracket-br" />
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <div className="font-mono text-[9px] text-secondary/40 tracking-[0.2em] mb-6">
                // COMPOSE_TRANSMISSION &gt;&gt; {personal.email}
              </div>

              {!submitted ? (
                <motion.form
                  variants={staggerContainer(0.1, 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportMobile}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <motion.div variants={staggerChild}>
                    <label className="font-mono text-[10px] text-textSecondary/50 tracking-widest block mb-1.5">SENDER_ID</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-black/40 border border-secondary/15 rounded px-4 py-3 font-mono text-sm text-textPrimary placeholder:text-textSecondary/30 focus:outline-none focus:border-secondary/60 focus:shadow-[0_0_15px_rgba(240,176,160,0.12)] transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div variants={staggerChild}>
                    <label className="font-mono text-[10px] text-textSecondary/50 tracking-widest block mb-1.5">REPLY_ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-black/40 border border-secondary/15 rounded px-4 py-3 font-mono text-sm text-textPrimary placeholder:text-textSecondary/30 focus:outline-none focus:border-secondary/60 focus:shadow-[0_0_15px_rgba(240,176,160,0.12)] transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div variants={staggerChild}>
                    <label className="font-mono text-[10px] text-textSecondary/50 tracking-widest block mb-1.5">TRANSMISSION_PAYLOAD</label>
                    <textarea
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Describe your mission..."
                      rows={5}
                      className="w-full bg-black/40 border border-secondary/15 rounded px-4 py-3 font-mono text-sm text-textPrimary placeholder:text-textSecondary/30 focus:outline-none focus:border-secondary/60 focus:shadow-[0_0_15px_rgba(240,176,160,0.12)] transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  <motion.button
                    variants={staggerChild}
                    type="submit"
                    className="w-full group magnetic-btn flex items-center justify-center gap-3 px-7 py-4 bg-secondary text-background font-mono text-sm font-bold tracking-widest uppercase rounded hover:bg-secondary/90 transition-all duration-300 relative overflow-hidden hover:shadow-[0_0_30px_rgba(240,176,160,0.4)]"
                  >
                    <FaPaperPlane size={12} className="group-hover:translate-x-1 transition-transform" />
                    SEND_TRANSMISSION
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 space-y-4"
                >
                  <div
                    className="text-highlight text-4xl glow-gold"
                    style={{ borderRadius: "50%", padding: "0.5rem" }}
                  >
                    ✓
                  </div>
                  <div className="font-mono text-sm text-secondary tracking-widest text-center">
                    TRANSMISSION_SENT
                  </div>
                  <div className="font-mono text-xs text-textSecondary/50 text-center">
                    Signal received. Response incoming on comms.
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer HUD strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-textSecondary/30 tracking-widest"
          style={{ borderTop: "1px solid rgba(240,176,160,0.1)" }}
        >
          <span>&lt;{personal.callsign}&gt; // COMMAND_DECK_V1.0</span>
          <span className="text-center">ALL_RIGHTS_RESERVED // {new Date().getFullYear()}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
            SYS_MODE: ACTIVE
          </span>
        </motion.div>
      </div>
    </section>
  );
}
