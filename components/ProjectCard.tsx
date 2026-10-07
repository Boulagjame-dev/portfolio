import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github, ExternalLink, Image as ImageIcon, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { lang } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const title = lang === 'fr' && project.titleFr ? project.titleFr : lang === 'ru' && project.titleRu ? project.titleRu : project.title;
  const description = lang === 'fr' && project.descriptionFr ? project.descriptionFr : lang === 'ru' && project.descriptionRu ? project.descriptionRu : project.description;
  const businessOutcome = lang === 'fr' && project.businessOutcomeFr ? project.businessOutcomeFr : lang === 'ru' && project.businessOutcomeRu ? project.businessOutcomeRu : project.businessOutcome;
  const category = lang === 'fr' && project.categoryFr ? project.categoryFr : lang === 'ru' && project.categoryRu ? project.categoryRu : project.category;

  const targetUrl = project.liveUrl || project.repoUrl;
  const hasUrl = !!targetUrl;

  const Wrapper = hasUrl ? 'a' : 'div';
  const wrapperProps = hasUrl ? {
    href: targetUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block h-full cursor-none clickable"
  } : {
    className: "block h-full"
  };

  return (
    <Wrapper {...wrapperProps}>
      <div className="group relative bg-lumina-card/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-lumina-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(163,255,206,0.2)] h-full flex flex-col">

        {/* Image Container */}
        <div className="h-72 overflow-hidden relative shrink-0 bg-lumina-bg">
          {/* Category Badge on Top-Left */}
          {category && (
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-black/70 backdrop-blur-md border border-lumina-accent/30 text-lumina-accent text-[11px] font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {category}
              </span>
            </div>
          )}

          {project.videoUrl ? (
            <div className="w-full h-full flex items-center justify-center bg-black text-gray-500 font-mono text-xs">
              [Video Preview: {title}]
            </div>
          ) : project.imageUrl && !imgError ? (
            <img
              src={project.imageUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110 brightness-105 contrast-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 border-b border-white/5">
              <div className="text-center text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <span className="text-xs font-mono uppercase tracking-widest">{title}</span>
              </div>
            </div>
          )}

          {/* Business Outcome Overlay */}
          {businessOutcome && (
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/90 backdrop-blur-md border border-lumina-accent/40 text-lumina-accent px-3.5 py-2 rounded-lg font-mono text-xs font-bold tracking-wider shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 shrink-0 text-lumina-accent" />
                <span>{businessOutcome}</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-lumina-bg via-transparent to-black/30 opacity-70" />

          {/* Action icons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {project.repoUrl && (
              <div
                className="bg-black/60 backdrop-blur px-2.5 py-2 rounded-full border border-white/20 hover:bg-lumina-accent hover:text-black hover:border-transparent transition-all"
                title={lang === 'fr' ? "Voir le Code Source" : lang === 'ru' ? "Исходный код на GitHub" : "View Source Code"}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.repoUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <Github className="w-4 h-4" />
              </div>
            )}

            {project.liveUrl && (
              <div
                className="bg-lumina-accent/20 backdrop-blur px-2.5 py-2 rounded-full border border-lumina-accent/40 hover:bg-lumina-accent hover:text-black transition-all"
                title={lang === 'fr' ? "Aperçu en Direct" : lang === 'ru' ? "Онлайн Демо" : "Live Demo"}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <ExternalLink className="w-4 h-4 text-lumina-accent hover:text-black" />
              </div>
            )}

            {!project.liveUrl && (
              <div className="bg-black/60 backdrop-blur px-2.5 py-2 rounded-full border border-white/20">
                <ArrowUpRight className="w-4 h-4 text-lumina-accent group-hover:rotate-45 transition-transform" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-lumina-accent transition-colors">
              {title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow border-b border-white/5 pb-4 font-light">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-400 border border-white/10 px-2 py-1 rounded bg-white/[0.02] group-hover:border-lumina-accent/30 group-hover:text-lumina-accent transition-colors font-mono">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[10px] text-gray-500 px-1 py-1 font-mono">+{project.tags.length - 4}</span>
            )}
          </div>

        </div>
      </div>
    </Wrapper>
  );
};