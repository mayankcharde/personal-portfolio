import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Filter projects to only show featured ones (3 to 6 projects)
  const featuredProjects = portfolioData.projects.filter(p => p.featured);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Header animate in
    gsap.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );

    // Cards staggered animations on scroll
    const cards = gridRef.current.querySelectorAll('.hover-card');
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-start text-left gap-4 mb-16 max-w-2xl">
        <span className="font-heading text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
          Selected Works
        </span>
        <h2 className="font-heading font-bold text-textPrimary tracking-tight">
          Crafting Intelligent Applications
        </h2>
        <p className="font-body text-base text-textSecondary leading-relaxed">
          A selection of featured projects spanning MERN stack web applications, AI research agents, LLM integrations, and QR Lost & Found platforms.
        </p>
      </div>

      {/* Projects Grid
          Mobile: single column stack
          Tablet: 2 columns
          Desktop: 3 columns (grid)
      */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {featuredProjects.map((project) => (
          <div key={project.id} className="hover-card">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
