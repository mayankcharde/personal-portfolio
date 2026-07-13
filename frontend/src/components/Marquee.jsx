import React from "react";
import { motion } from "framer-motion";

const modules = [
  "React.js", "Node.js", "FastAPI", "LangGraph", "LangChain",
  "Gemini_API", "MongoDB", "Mistral_AI", "Tailwind_CSS",
  "Express.js", "Socket.IO", "Docker", "Python", "Puppeteer",
  "Razorpay", "JWT", "ChromaDB", "React_Three_Fiber", "GSAP",
];

export default function Marquee() {
  const doubled = [...modules, ...modules];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-20px" }}
      className="w-full overflow-hidden relative py-4"
      style={{
        background: "linear-gradient(90deg, #B84030 0%, #C24A38 30%, #C24A38 70%, #B84030 100%)",
        borderTop: "1px solid rgba(240,176,160,0.15)",
        borderBottom: "1px solid rgba(240,176,160,0.15)",
        boxShadow: "0 0 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Glow line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      {/* Edge fades */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-[#C24A38] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-[#C24A38] to-transparent pointer-events-none" />

      <div className="animate-marquee">
        {doubled.map((mod, i) => (
          <div key={i} className="inline-flex items-center space-x-5 mx-5 shrink-0 group">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
              style={{
                background: i % 3 === 0 ? "#FFD166" : i % 3 === 1 ? "#F0B0A0" : "rgba(249,245,242,0.4)",
                boxShadow: i % 3 === 0 ? "0 0 6px rgba(255,209,102,0.8)" : "0 0 6px rgba(240,176,160,0.6)",
              }}
            />
            <span className="font-mono text-[11px] md:text-xs tracking-[0.15em] text-textPrimary/40 uppercase whitespace-nowrap select-none transition-colors duration-300 group-hover:text-textPrimary/70">
              MODULE:{" "}
              <span className="text-textPrimary/70 font-semibold group-hover:text-secondary transition-colors">{mod}</span>
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
