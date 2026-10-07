import React from 'react';
import { Database, CreditCard, Cpu, Server, Star, Quote, CheckCircle2 } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export const Testimonials: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-28 border-t border-white/5 bg-black/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-lumina-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur">
            <span className="font-mono text-xs text-lumina-accent uppercase tracking-widest font-semibold">
              {lang === 'fr' ? 'Preuve Sociale & Impact ROI' : 'Client Endorsements & Measured ROI'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {lang === 'fr' ? 'Recommandé par Fondateurs & Opérateurs' : 'Trusted by Founders & Operators'}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            {lang === 'fr' 
              ? 'Des systèmes et architectures délivrant des résultats financiers mesurables.'
              : 'Production systems engineered for tangible bottom-line impact.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {CLIENT_TESTIMONIALS.map((item) => {
            const role = lang === 'fr' && item.roleFr ? item.roleFr : item.role;
            const content = lang === 'fr' && item.contentFr ? item.contentFr : item.content;
            const highlight = lang === 'fr' && item.highlightFr ? item.highlightFr : item.highlight;

            return (
              <div
                key={item.id}
                className="bg-lumina-card/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-lumina-accent/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  {/* Rating Stars & Highlight */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-lumina-accent bg-lumina-accent/10 border border-lumina-accent/20 px-2 py-0.5 rounded">
                      Verified Client
                    </span>
                  </div>

                  {/* Impact Highlight */}
                  <div className="flex items-center gap-2 mb-4 text-xs font-mono font-semibold text-white group-hover:text-lumina-accent transition-colors">
                    <CheckCircle2 size={14} className="text-lumina-accent shrink-0" />
                    <span>{highlight}</span>
                  </div>

                  {/* Quote Content */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 italic font-light">
                    "{content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.author}</h4>
                    <p className="text-xs text-gray-400 font-mono">{role}</p>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                    {item.company}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ecosystem Infrastructure Banner */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="font-mono text-xs text-gray-400 uppercase tracking-[0.2em] mb-8">
            {lang === 'fr' ? 'Propulsé par les Meilleures Technologies' : 'Powered by Best-in-Class Infrastructure'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
            {/* Supabase */}
            <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 hover:border-lumina-accent/30 transition-all group">
              <Database className="w-5 h-5 text-lumina-accent" />
              <span className="font-mono text-sm font-semibold text-white group-hover:text-lumina-accent">Supabase</span>
            </div>
            {/* Stripe */}
            <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 hover:border-blue-400/30 transition-all group">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <span className="font-mono text-sm font-semibold text-white group-hover:text-blue-400">Stripe</span>
            </div>
            {/* Pinecone */}
            <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 hover:border-purple-400/30 transition-all group">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span className="font-mono text-sm font-semibold text-white group-hover:text-purple-400">Pinecone</span>
            </div>
            {/* FastAPI */}
            <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 hover:border-yellow-400/30 transition-all group">
              <Server className="w-5 h-5 text-yellow-400" />
              <span className="font-mono text-sm font-semibold text-white group-hover:text-yellow-400">FastAPI</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
