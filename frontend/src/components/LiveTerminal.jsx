import React, { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";

const COMMANDS = {
  help: () => [
    "help - list commands",
    "about - profile summary",
    "projects - jump to project logs",
    "skills - open skill matrix",
    "contact - open transmission",
    "sudo hire-me - reveal contact override",
    "clear - clear the terminal",
    "matrix - hidden easter egg",
  ],
  about: () => [portfolioData.about.bio],
  projects: () => ["Project logs opened. Scroll to the project section."],
  skills: () => ["Skill matrix opened. Scrolling to capability registry."],
  contact: () => [`Contact route established: ${portfolioData.personal.email}`],
  "sudo hire-me": () => [
    "Access granted. Priority channel: hiring managers only.",
    portfolioData.personal.email,
  ],
  matrix: () => ["Wake up, architect. The shell is listening."],
};

function navigateToSection(href) {
  const target = document.querySelector(href);
  if (target) {
    if (window.lenis) window.lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: "smooth" });
  }
}

export default function LiveTerminal({ onEasterEgg }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    { type: "system", text: "Terminal initialized. Type help for commands." },
  ]);
  const endRef = useRef(null);
  const prompt = useMemo(
    () => `${portfolioData.personal.callsign.toLowerCase()}@deck:~$`,
    [],
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  const clearTerminal = () => {
    setLines([{ type: "system", text: "Terminal cleared." }]);
  };

  const handleCommand = (raw) => {
    const value = raw.trim();
    if (!value) return;

    setLines((current) => [
      ...current,
      { type: "input", text: `${prompt} ${value}` },
    ]);
    setInput("");

    if (value === "clear") {
      clearTerminal();
      return;
    }

    if (value === "projects") navigateToSection("#projects");
    if (value === "skills") navigateToSection("#skills");
    if (value === "contact") navigateToSection("#transmission");
    if (value === "matrix") onEasterEgg?.();

    const response = COMMANDS[value]?.();
    if (response) {
      setLines((current) => [
        ...current,
        ...response.map((text) => ({
          type: value === "matrix" ? "easter" : "output",
          text,
        })),
      ]);
      return;
    }

    setLines((current) => [
      ...current,
      { type: "error", text: `Command not found: ${value}` },
      { type: "hint", text: "Type help to see supported commands." },
    ]);
  };

  return (
    <div className="flex h-full min-h-[26rem] flex-col rounded-2xl border border-white/10 bg-[#0b1220]/95 p-4 font-mono text-sm text-textPrimary shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.3em] text-textSecondary">
        <span>Interactive Terminal</span>
        <span className="text-secondary">Online</span>
      </div>

      <div className="flex-1 space-y-2 overflow-auto pr-1 text-[13px] leading-relaxed">
        {lines.map((line, index) => (
          <div
            key={`${line.type}-${index}`}
            className={
              line.type === "error"
                ? "text-error"
                : line.type === "hint"
                  ? "text-textSecondary"
                  : line.type === "easter"
                    ? "text-highlight"
                    : line.type === "input"
                      ? "text-secondary"
                      : "text-textPrimary"
            }
          >
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        onSubmit={(event) => {
          event.preventDefault();
          handleCommand(input);
        }}
      >
        <span className="text-secondary">{prompt}</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 bg-transparent text-textPrimary outline-none placeholder:text-textSecondary/40"
          placeholder="Type a command"
          aria-label="Terminal command input"
        />
        <button
          type="submit"
          className="rounded-lg border border-secondary/20 bg-secondary/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-secondary transition-colors hover:bg-secondary/20"
        >
          Run
        </button>
      </form>
    </div>
  );
}
