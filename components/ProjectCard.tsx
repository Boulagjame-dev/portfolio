import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const hasRepo = !!project.repoUrl;

  // Dynamic wrapper component: <a> if repo exists, <div> if not
  const Wrapper = hasRepo ? 'a' : 'div';
  const wrapperProps = hasRepo ? {
    href: project.repoUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block h-full cursor-none clickable" // clickable class for custom cursor
  } : {
    className: "block h-full"
  };

  return (
    <Wrapper {...wrapperProps}>
      <div className="group relative bg-lumina-card/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-lumina-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(163,255,206,0.2)] h-full flex flex-col">

        {/* Image Container - Increased Height for Impact */}
        <div className="h-72 overflow-hidden relative shrink-0 bg-lumina-bg">
          {project.videoUrl ? (
            <div className="w-full h-full flex items-center justify-center bg-black text-gray-500 font-mono text-xs">
              [Video Preview: {project.title}]
            </div>
          ) : project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110 brightness-110 contrast-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 border-b border-white/5">
              <div className="text-center text-gray-600">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <span className="text-xs font-mono uppercase tracking-widest">No Image</span>
              </div>
            </div>
          )}

          {/* Business Outcome Overlay - High Visibility */}
          {project.businessOutcome && (
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/80 backdrop-blur-md border border-lumina-accent/30 text-lumina-accent px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                🚀 {project.businessOutcome}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-lumina-bg to-transparent opacity-60" />

          <div className="absolute top-4 right-4 flex gap-2 z-20">
            {project.repoUrl && (
              <div
                className="bg-black/50 backdrop-blur px-3 py-2 rounded-full border border-white/20 group-hover:bg-lumina-accent group-hover:text-black group-hover:border-transparent transition-all"
                title="View Source Code"
              >
                <Github className="w-5 h-5" />
              </div>
            )}
            <div className="bg-black/50 backdrop-blur px-3 py-2 rounded-full border border-white/20">
              <ArrowUpRight className="w-5 h-5 text-lumina-accent group-hover:rotate-45 transition-transform" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative flex flex-col flex-grow">
          <h3 className="text-2xl font-display font-bold mb-2 text-white group-hover:text-lumina-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow border-b border-white/5 pb-4">
            {project.description}
          </p>

          {/* Tech Stack - Moved to Bottom & Smaller */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-1 rounded group-hover:border-lumina-accent/30 group-hover:text-lumina-accent transition-colors">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[10px] text-gray-600 px-1 py-1">+{project.tags.length - 4}</span>
            )}
          </div>

        </div>
      </div>
    </Wrapper>
  );
};