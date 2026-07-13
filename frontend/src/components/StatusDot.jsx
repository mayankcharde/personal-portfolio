import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";

export default function StatusDot() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const f = (n) => String(n).padStart(2, "0");
      setTimestamp(`${f(d.getHours())}:${f(d.getMinutes())}:${f(d.getSeconds())}`);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider select-none">
      <div className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-highlight pulse-dot" />
      </div>
      <span className="text-highlight font-semibold tracking-[0.15em]">ONLINE</span>
      <span className="text-secondary/30">//</span>
      <span className="text-secondary tabular-nums">{timestamp}</span>
      <span className="text-secondary/30 hidden lg:inline">//</span>
      <span className="text-textSecondary hidden lg:inline">
        UP: {portfolioData.stats.find(s => s.label === "UPTIME")?.value || "99.9%"}
      </span>
    </div>
  );
}
