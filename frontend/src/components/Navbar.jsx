import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import StatusDot from "./StatusDot";
import {
  FaCog,
  FaSearch,
  FaVolumeMute,
  FaVolumeUp,
  FaCloudDownloadAlt,
} from "react-icons/fa";

export default function Navbar({
  onOpenPalette,
  onOpenSettings,
  onDownloadResume,
  onToggleSound,
  soundEnabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { personal } = portfolioData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "STATUS", href: "#status" },
    { name: "PROJECTS", href: "#projects" },
    { name: "SKILLS", href: "#skills" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "EDUCATION", href: "#education" },
    { name: "CERTS", href: "#certifications" },
    { name: "TRANSMISSION", href: "#transmission" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) window.lenis.scrollTo(target);
      else target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 pt-3 md:px-6 select-none"
      >
        {/* ── MAIN BAR ── */}
        <div
          className="max-w-screen-xl mx-auto flex items-center gap-4 px-4 py-2.5 rounded-t hud-card relative transition-all duration-300"
          style={scrolled ? { boxShadow: "0 4px 30px rgba(0,0,0,0.4), 0 0 20px rgba(240,176,160,0.08)" } : {}}
        >
          <div className="hud-bracket hud-bracket-tl" />
          <div className="hud-bracket hud-bracket-tr" />

          {/* LEFT — Callsign + status inline */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => handleScroll(e, "#hero")}
              className="font-mono text-sm tracking-widest font-bold uppercase flex items-center gap-2 group"
            >
              <span className="text-secondary group-hover:brightness-125 transition">
                &lt;{personal.callsign}&gt;
              </span>
              <span className="text-textSecondary text-[10px] font-normal hidden xl:inline opacity-50">
                // CTRL_DECK_V1
              </span>
            </a>
            <span className="text-secondary/20 hidden sm:inline">|</span>
            <div className="hidden sm:block">
              <StatusDot />
            </div>
          </div>

          {/* CENTER — Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5 mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="relative font-mono text-[11px] tracking-[0.15em] text-textSecondary hover:text-secondary transition-colors px-3 py-1.5 group"
              >
                <span className="opacity-40 group-hover:opacity-100 transition-opacity">[</span>
                {link.name}
                <span className="opacity-40 group-hover:opacity-100 transition-opacity">]</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-secondary group-hover:w-4/5 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* RIGHT — Utility icons only */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0 ml-auto lg:ml-0">
            <button
              type="button"
              onClick={onToggleSound}
              className="nav-action-btn w-9 justify-center"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <FaVolumeUp size={10} /> : <FaVolumeMute size={10} />}
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="nav-action-btn w-9 justify-center"
              aria-label="Settings"
            >
              <FaCog size={10} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center gap-1.5 md:hidden w-8 h-8 border border-secondary/25 rounded ml-auto"
            aria-label="Toggle Menu"
          >
            <span className={`h-px w-4 bg-secondary transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`h-px w-4 bg-secondary transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-secondary transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>

        {/* ── PALETTE SUB-BAR ── */}
        <div className="max-w-screen-xl mx-auto hidden md:block">
          <button
            type="button"
            onClick={onOpenPalette}
            className="w-full flex items-center gap-3 px-5 py-2 rounded-b border-x border-b border-secondary/15 bg-surface/60 backdrop-blur-sm hover:bg-surface/80 hover:border-secondary/30 transition-all duration-200 group scan-hover"
          >
            <FaSearch size={9} className="text-secondary/40 group-hover:text-secondary/70 transition-colors shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-textSecondary/50 group-hover:text-textSecondary/80 transition-colors flex-1 text-left">
              SEARCH COMMANDS, SECTIONS, ACTIONS...
            </span>
            <span className="font-mono text-[9px] tracking-widest text-secondary/30 group-hover:text-secondary/60 transition-colors border border-secondary/15 group-hover:border-secondary/30 rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex md:hidden"
            style={{
              background: "rgba(216, 90, 72, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="ml-auto w-4/5 max-w-sm h-full border-l border-secondary/20 p-6 flex flex-col justify-between font-mono relative"
              style={{ background: "#2A3040" }}
            >
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

              <div className="space-y-8 relative z-10">
                <div className="border-b border-secondary/15 pb-4">
                  <span className="text-[10px] text-secondary/40 block">
                    OPERATING SYSTEM
                  </span>
                  <span className="text-sm font-bold text-secondary uppercase">
                    &gt; MENU_SELECTION
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenPalette}
                  className="w-full rounded border border-secondary/15 bg-secondary/5 px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.2em] text-textSecondary"
                >
                  &gt; Open Command Palette
                </button>
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-sm font-semibold text-textSecondary hover:text-secondary py-2 border-b border-secondary/8 block"
                    >
                      &gt; {link.name}
                    </motion.a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onDownloadResume}
                  className="w-full rounded border border-secondary/15 bg-secondary/5 px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.2em] text-textSecondary"
                >
                  &gt; Download Resume Package
                </button>
              </div>

              <div className="border-t border-secondary/15 pt-4 text-[10px] text-textSecondary relative z-10">
                <span>USER: ADMIN</span>
                <br />
                <span>REF_SYS: nagpur_sector_in</span>
                <br />
                <span className="text-highlight">STATUS: ONLINE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
