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
        
        {/* Image Container */}
        <div className="h-64 overflow-hidden relative shrink-0 bg-lumina-bg">
          {project.videoUrl ? (
               <div className="w-full h-full flex items-center justify-center bg-black text-gray-500 font-mono text-xs">
                  [Video Preview: {project.title}]
               </div>
          ) : project.imageUrl ? (
              <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
              />
          ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5 border-b border-white/5">
                 <div className="text-center text-gray-600">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <span className="text-xs font-mono uppercase tracking-widest">No Image</span>
                 </div>
              </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-lumina-bg to-transparent opacity-90" />
          
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
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-lumina-accent border border-lumina-accent/30 px-2 py-1 rounded uppercase">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-display font-bold mb-2 text-white group-hover:text-lumina-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>
          
          {project.caseStudy && (
              <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 font-mono line-clamp-3">
                      {project.caseStudy}
                  </p>
              </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};