import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import Magnetic from '../utils/magnetic';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { personalInfo, socialLinks } = portfolioData;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Animate contact elements on scroll
    gsap.fromTo(
      containerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-4 md:px-8 bg-surface/10 border-t border-white/5 w-full overflow-hidden select-none z-10"
    >
      {/* Decorative gradient glow background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-indigo-cyan-glow opacity-30 rounded-full filter blur-[100px] pointer-events-none" />

      <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        
        {/* Sub-label */}
        <span className="font-heading text-xs md:text-sm font-bold uppercase tracking-widest text-secondary">
          Get in Touch
        </span>

        {/* Large Heading CTA */}
        <h2 className="font-heading font-bold text-textPrimary tracking-tighter leading-none select-none max-w-2xl" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
          Let's Build Something Great Together
        </h2>

        {/* Short Text */}
        <p className="font-body text-base md:text-lg text-textSecondary max-w-xl leading-relaxed">
          I am currently open to new software developer roles, AI research internships, or freelance full-stack projects. Drop an email, and let's coordinate!
        </p>

        {/* Huge Email CTA */}
        <div className="my-6">
          <Magnetic>
            <a
              href={`mailto:${personalInfo.email}`}
              data-cursor="Write"
              className="relative inline-flex items-center gap-3 font-heading font-semibold text-xl md:text-4xl text-textPrimary hover:text-secondary transition-colors duration-300 py-3 px-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-secondary/30"
            >
              <FaEnvelope className="text-secondary text-lg md:text-2xl group-hover:scale-110 transition-transform" />
              <span>{personalInfo.email}</span>
            </a>
          </Magnetic>
        </div>

        {/* Location Info */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-textSecondary uppercase tracking-widest font-heading mb-4">
          <FaMapMarkerAlt className="text-primary" />
          <span>Nagpur, Maharashtra, India</span>
        </div>

        {/* Social Icons Links */}
        <div className="flex items-center gap-6 mt-4">
          {socialLinks.github && (
            <Magnetic>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Github"
                className="h-12 w-12 rounded-full border border-white/10 hover:border-secondary/40 bg-white/5 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all duration-300"
                title="GitHub Profile"
              >
                <FaGithub className="text-lg" />
              </a>
            </Magnetic>
          )}

          {socialLinks.linkedin && (
            <Magnetic>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LinkedIn"
                className="h-12 w-12 rounded-full border border-white/10 hover:border-secondary/40 bg-white/5 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all duration-300"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </Magnetic>
          )}

          {socialLinks.twitter && (
            <Magnetic>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Twitter"
                className="h-12 w-12 rounded-full border border-white/10 hover:border-secondary/40 bg-white/5 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all duration-300"
                title="Twitter Profile"
              >
                <FaTwitter className="text-lg" />
              </a>
            </Magnetic>
          )}
        </div>

        {/* Footer legalities */}
        <div className="mt-12 text-[10px] text-textSecondary uppercase tracking-widest font-heading border-t border-white/5 pt-8 w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Mayank Charde. All Rights Reserved.</span>
          <span>Designed & Built with React + R3F + GSAP</span>
        </div>

      </div>
    </section>
  );
}
