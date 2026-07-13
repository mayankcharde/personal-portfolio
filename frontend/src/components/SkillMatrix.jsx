import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";

export default function SkillMatrix() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="relative w-full py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center space-x-4 mb-14"
        >
          <span className="font-mono text-secondary text-[10px] tracking-[0.3em]">04</span>
          <div className="w-8 h-[1px] bg-secondary/40" />
          <h2
            className="font-heading font-bold text-textPrimary tracking-widest"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            SKILL_MATRIX
          </h2>
          <div className="flex-1 h-[1px] bg-secondary/10 ml-4" />
          <span className="font-mono text-[9px] text-textSecondary/30 tracking-widest hidden md:block">
            // CAPABILITY_REGISTRY
          </span>
        </motion.div>

        {/* Skills Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative hud-card rounded p-6"
            >
              {/* Corner Brackets */}
              <div className="hud-bracket hud-bracket-tl" />
              <div className="hud-bracket hud-bracket-tr" />
              <div className="hud-bracket hud-bracket-bl" />
              <div className="hud-bracket hud-bracket-br" />

              {/* Category Header */}
              <div className="mb-5">
                <div className="font-mono text-[9px] text-secondary/40 tracking-[0.2em] mb-1">
                  MODULE_CLUSTER
                </div>
                <h3
                  className="font-heading font-bold text-textPrimary tracking-wider"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                >
                  {skillGroup.category.toUpperCase()}
                </h3>
              </div>

              {/* Skill items list */}
              <ul className="mt-2 space-y-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2 font-mono text-xs text-textSecondary/70"
                  >
                    <span className="text-secondary/40 text-[8px]">▸</span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
