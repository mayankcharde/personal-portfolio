import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device or prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    setIsVisible(true);

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    // Center coordinates
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2.out" });
    
    const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseEnterLink = (e) => {
      const target = e.currentTarget;
      const label = target.getAttribute('data-cursor');
      
      if (label) {
        setCursorText(label);
        gsap.to(ring, { 
          width: 56, 
          height: 56, 
          backgroundColor: '#635BFF', 
          borderColor: '#635BFF', 
          duration: 0.2,
          mixBlendMode: 'normal'
        });
        gsap.to(cursor, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { 
          width: 40, 
          height: 40, 
          backgroundColor: 'rgba(99, 91, 255, 0.15)', 
          borderColor: '#635BFF', 
          duration: 0.2 
        });
        gsap.to(cursor, { scale: 1.5, backgroundColor: '#D4FF3F', duration: 0.2 });
      }
    };

    const handleMouseLeaveLink = () => {
      setCursorText("");
      gsap.to(ring, { 
        width: 24, 
        height: 24, 
        backgroundColor: 'transparent', 
        borderColor: '#22D3EE', 
        duration: 0.2,
        mixBlendMode: 'difference'
      });
      gsap.to(cursor, { scale: 1, backgroundColor: '#22D3EE', duration: 0.2 });
    };

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor], .hover-card');
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-secondary rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border border-secondary rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center text-center overflow-hidden"
      >
        {cursorText && (
          <span className="text-[10px] uppercase font-bold tracking-wider text-background font-heading select-none pointer-events-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
