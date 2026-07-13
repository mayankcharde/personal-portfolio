import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const badge =
    project.status === "LIVE"
      ? "text-success border-success/30 bg-success/10"
      : project.status === "IN_PROGRESS"
        ? "text-highlight border-highlight/30 bg-highlight/10"
        : "text-textSecondary border-textSecondary/20 bg-textSecondary/10";

  return (
    <div
      className="group relative rounded-3xl overflow-hidden glass-panel border border-white/5 bg-surface/40 flex flex-col h-full hover:border-secondary/30 transition-all duration-500 hover-card"
      data-cursor="View"
    >
      {/* Visual Area / Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* Shiny Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 z-10 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-500 pointer-events-none" />

        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-secondary border border-white/5">
          {project.codename}
        </span>

        <span
          className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${badge}`}
        >
          ● {project.status}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between relative z-20 gap-4">
        <div className="flex flex-col gap-2">
          {/* Card Title */}
          <h3 className="font-heading font-semibold text-xl md:text-2xl text-textPrimary tracking-tight group-hover:text-secondary transition-colors duration-300">
            {project.title}
          </h3>
          {/* Description */}
          <p className="font-body text-sm text-textSecondary leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags - slide up on hover */}
        <div className="overflow-hidden py-1">
          <div className="flex flex-wrap gap-2 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {project.techStack.slice(0, 4).map((techName, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-semibold text-textSecondary tracking-wide"
              >
                {techName}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-semibold text-textSecondary tracking-wide">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
          <div className="flex items-center gap-4">
            {project.repoUrl && project.repoUrl !== "#" && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-textSecondary hover:text-textPrimary transition-colors py-1 px-2 -ml-2 rounded hover:bg-white/5"
                title="View Source Code"
                data-cursor="Code"
              >
                <FaGithub className="text-sm" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:text-highlight transition-colors py-1 px-2 rounded hover:bg-white/5"
                title="View Live Site"
                data-cursor="Open"
              >
                <FaExternalLinkAlt className="text-xs" />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
