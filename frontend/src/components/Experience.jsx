import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { FaBriefcase, FaGraduationCap, FaAward, FaCertificate } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { experience, achievements, certifications } = portfolioData;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Header reveal
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

    // Left Column Timeline Items reveal
    const timelineItems = leftColRef.current.querySelectorAll('.timeline-item');
    gsap.fromTo(
      timelineItems,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 80%',
        },
      }
    );

    // Right Column Cards reveal
    const certsAndAwards = rightColRef.current.querySelectorAll('.credentials-group');
    gsap.fromTo(
      certsAndAwards,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-start text-left gap-4 mb-16 max-w-2xl">
        <span className="font-heading text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
          Journey & Background
        </span>
        <h2 className="font-heading font-bold text-textPrimary tracking-tight">
          Timeline & Credentials
        </h2>
        <p className="font-body text-base text-textSecondary leading-relaxed">
          My professional milestones, academic background, certified skillsets, and competition achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Work & Education Timeline */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col gap-8 text-left">
          <h3 className="font-heading font-bold text-xl md:text-2xl text-textPrimary flex items-center gap-2 mb-2">
            <FaBriefcase className="text-primary text-lg" /> Experience & Education
          </h3>
          
          <div className="relative border-l border-white/10 pl-6 md:pl-8 ml-3 flex flex-col gap-10">
            {experience.map((item, idx) => (
              <div key={idx} className="timeline-item relative">
                
                {/* Timeline node icon */}
                <span className="absolute -left-[38px] md:-left-[46px] top-1.5 flex h-7 w-7 rounded-full bg-background border border-white/10 items-center justify-center text-xs text-textSecondary group-hover:border-primary transition-all duration-300">
                  {item.type === 'work' ? (
                    <FaBriefcase className="text-secondary text-[10px]" />
                  ) : (
                    <FaGraduationCap className="text-primary text-xs" />
                  )}
                </span>

                {/* Content Panel */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-surface/20 flex flex-col gap-3 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 text-xs font-semibold text-textSecondary bg-white/[0.02] border-b border-l border-white/5 rounded-bl-xl uppercase tracking-wider">
                    {item.duration}
                  </div>
                  
                  <div className="flex flex-col gap-1 pr-24">
                    <h4 className="font-heading font-bold text-base md:text-lg text-textPrimary leading-tight">
                      {item.role}
                    </h4>
                    <span className="font-body text-xs md:text-sm font-semibold text-secondary">
                      {item.company} &bull; <span className="font-normal text-textSecondary">{item.location}</span>
                    </span>
                  </div>

                  <p className="font-body text-xs md:text-sm text-textSecondary leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet points mapping */}
                  {item.points && (
                    <ul className="list-disc pl-4 flex flex-col gap-1.5 text-xs text-textSecondary font-body">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  )}

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-white/5">
                    {item.tech.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-bold uppercase tracking-wider text-textPrimary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications & Achievements */}
        <div ref={rightColRef} className="lg:col-span-5 flex flex-col gap-10 text-left">
          
          {/* Achievements Sub-section */}
          <div className="credentials-group flex flex-col gap-4">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-textPrimary flex items-center gap-2 mb-2">
              <FaAward className="text-secondary text-lg" /> Key Achievements
            </h3>

            <div className="flex flex-col gap-4">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-surface/20 flex gap-4 items-start relative group hover:border-secondary/20 transition-all duration-300"
                >
                  <span className="text-2xl pt-0.5">{ach.icon}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-secondary">{ach.issuer} &bull; {ach.date}</span>
                    <h4 className="font-heading font-semibold text-sm md:text-base text-textPrimary leading-snug">
                      {ach.title}
                    </h4>
                    <p className="font-body text-xs text-textSecondary leading-relaxed mt-1">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Sub-section */}
          <div className="credentials-group flex flex-col gap-4">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-textPrimary flex items-center gap-2 mb-2">
              <FaCertificate className="text-primary text-lg" /> Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-surface/20 flex justify-between items-center relative group hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-textSecondary">{cert.issuer} &bull; {cert.date}</span>
                    <h4 className="font-heading font-semibold text-sm md:text-base text-textPrimary leading-snug">
                      {cert.title}
                    </h4>
                    {cert.credentialId && (
                      <span className="text-[8px] font-mono text-textSecondary tracking-wider mt-1">ID: {cert.credentialId}</span>
                    )}
                  </div>
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cert.color || '#635BFF' }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
