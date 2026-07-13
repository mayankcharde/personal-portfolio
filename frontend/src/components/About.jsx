import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { personalInfo, stats } = portfolioData;
  const sectionRef = useRef(null);
  const bioRef = useRef(null);
  const imageContainerRef = useRef(null);
  const statElementsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Stagger reveal of bio content
    gsap.fromTo(
      bioRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 85%',
        },
      }
    );

    // Image fade & float
    gsap.fromTo(
      imageContainerRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 80%',
        },
      }
    );

    // Number counting animations
    statElementsRef.current.forEach((el) => {
      if (!el) return;
      const target = parseFloat(el.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;
      const counter = { value: 0 };

      gsap.to(counter, {
        value: target,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.innerText = isFloat 
            ? counter.value.toFixed(1) + '+' 
            : Math.floor(counter.value) + '+';
        },
      });
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Profile Image & Glow (Left Column on large screens) */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={imageContainerRef}
            className="relative group w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-3xl overflow-hidden aspect-square border border-white/10"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 group-hover:scale-105 transition-transform duration-700" />
            
            {/* Portrait Image */}
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              loading="lazy"
              width="350"
              height="350"
              className="w-full h-full object-cover relative z-10 filter grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Shiny Border Overlay */}
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none z-20 group-hover:border-secondary/40 transition-colors" />
          </div>
        </div>

        {/* Biography & Text Details (Right Column on large screens) */}
        <div ref={bioRef} className="lg:col-span-7 flex flex-col gap-6 text-left">
          <span className="font-heading text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
            About Me
          </span>
          <h2 className="font-heading font-bold text-textPrimary tracking-tight">
            Pioneering Intelligent Solutions
          </h2>
          <p className="font-body text-base md:text-lg text-textSecondary leading-relaxed">
            {personalInfo.bio}
          </p>
          <p className="font-body text-sm md:text-base text-textSecondary leading-relaxed">
            I specialize in combining robust full-stack development (using the MERN stack and FastAPI) with agentic artificial intelligence workflows. By integrating tools like LangChain, LangGraph, and large language models (such as Mistral and Gemini), I develop systems that do not just process data, but think, plan, and automate complex tasks.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col items-start gap-1 relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
              >
                {/* Background decorative gradient */}
                <div className="absolute inset-0 bg-indigo-cyan-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <span
                  ref={(el) => (statElementsRef.current[idx] = el)}
                  data-target={stat.value}
                  className="font-heading font-bold text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                >
                  0+
                </span>
                <span className="font-body text-xs text-textSecondary font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
