import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onOver = (e) => {
      const t = e.target;
      setIsHovered(
        !!(
          t.tagName === "A" ||
          t.tagName === "BUTTON" ||
          t.closest("button") ||
          t.closest("a") ||
          t.closest("[role='button']")
        ),
      );
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer reticle ring — peach on dark, gold on hover */}
      <div
        className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
          isHovered
            ? "w-10 h-10 border-highlight border-dashed animate-spin"
            : "w-7 h-7 border-secondary opacity-80"
        }`}
        style={{ animationDuration: "8s" }}
      >
        {/* Crosshair lines */}
        <div className="absolute w-[2px] h-[6px] bg-secondary top-0" />
        <div className="absolute w-[2px] h-[6px] bg-secondary bottom-0" />
        <div className="absolute w-[6px] h-[2px] bg-secondary left-0" />
        <div className="absolute w-[6px] h-[2px] bg-secondary right-0" />
        {/* Center dot */}
        <div
          className={`w-1 h-1 rounded-full transition-all duration-300 ${
            isHovered ? "bg-highlight scale-150" : "bg-secondary"
          }`}
        />
      </div>
    </div>
  );
}
