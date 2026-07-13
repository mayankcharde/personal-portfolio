import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
  const container = useRef(null);

  useEffect(() => {
    // If the user has prefers-reduced-motion, disable the effect
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = container.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      
      // Calculate distance from center of the button
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move the button by 35% of the distance from the center
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      // Return to original position
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={container} className="inline-block transition-transform duration-100">
      {children}
    </div>
  );
}
