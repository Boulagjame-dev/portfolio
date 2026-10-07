import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Github, Brain, Eye, Menu, X } from 'lucide-react';
import { CustomCursor } from './CustomCursor';
import { useLanguage } from '../context/LanguageContext';
import Lenis from 'lenis';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hidden Admin Access in Dev Mode
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        sessionStorage.setItem('admin_secret_access', 'true');
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative cursor-none bg-lumina-bg text-lumina-text font-sans">
      <CustomCursor />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" className="flex items-center gap-3 group clickable">
          <div className="relative w-10 h-10 rounded-full border border-lumina-accent flex items-center justify-center group-hover:bg-lumina-accent group-hover:text-black transition-colors overflow-hidden">
            <Brain className="w-6 h-6 relative z-10" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center pt-1">
              <Eye className="w-2.5 h-2.5 text-lumina-secondary group-hover:text-black" strokeWidth={3} />
            </div>
          </div>
          <span className="font-display font-bold tracking-widest text-lg md:text-xl uppercase">ZAKARIA BOULAGJAME</span>
        </Link>

        {/* Desktop Links */}
        <div className="flex items-center gap-8 font-display text-sm uppercase tracking-widest hidden md:flex">
          <button onClick={() => handleNavClick('projects')} className="hover:text-lumina-accent transition-colors clickable bg-transparent border-none p-0 cursor-none">
            {lang === 'fr' ? 'Projets' : lang === 'ru' ? 'Проекты' : 'Work'}
          </button>
          <button onClick={() => handleNavClick('experience')} className="hover:text-lumina-accent transition-colors clickable bg-transparent border-none p-0 cursor-none">
            {lang === 'fr' ? 'Expertise' : lang === 'ru' ? 'Опыт' : 'Experience'}
          </button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-lumina-accent transition-colors clickable bg-transparent border-none p-0 cursor-none">
            {lang === 'ru' ? 'Контакты' : 'Contact'}
          </button>
        </div>

        {/* Controls: 3-Way Language Toggle & Socials */}
        <div className="flex items-center gap-3">
          {/* Segmented [EN | FR | RU] Switcher */}
          <div className="flex items-center rounded-full border border-lumina-accent/30 bg-black/60 backdrop-blur p-0.5 font-mono text-[11px] font-bold shadow-sm">
            {(['ru', 'en', 'fr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 clickable ${
                  lang === l
                    ? 'bg-lumina-accent text-black shadow-[0_0_10px_rgba(163,255,206,0.35)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/Boulagjame-dev"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="clickable w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/zakaria-boulagjame/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="clickable w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <Linkedin size={18} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden clickable w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden">
          <button
            onClick={() => handleNavClick('projects')}
            className="text-2xl font-display uppercase tracking-widest text-white hover:text-lumina-accent transition-colors clickable"
          >
            {lang === 'fr' ? 'Projets' : lang === 'ru' ? 'Проекты' : 'Work'}
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className="text-2xl font-display uppercase tracking-widest text-white hover:text-lumina-accent transition-colors clickable"
          >
            {lang === 'fr' ? 'Expertise' : lang === 'ru' ? 'Опыт' : 'Experience'}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-2xl font-display uppercase tracking-widest text-white hover:text-lumina-accent transition-colors clickable"
          >
            {lang === 'ru' ? 'Контакты' : 'Contact'}
          </button>
          <div className="pt-4 border-t border-white/10 flex items-center gap-2">
            {(['ru', 'en', 'fr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold uppercase transition-all ${
                  lang === l
                    ? 'border-lumina-accent bg-lumina-accent text-black'
                    : 'border-white/20 text-gray-300'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Background Ambient Glow Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[20vw] h-[20vw] bg-lumina-accent/5 rounded-full blur-[80px] animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/10 relative z-10 bg-lumina-bg">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <a
              href="https://github.com/Boulagjame-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lumina-accent transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-wider clickable"
            >
              <Github size={14} /> GitHub
            </a>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a
              href="https://www.linkedin.com/in/zakaria-boulagjame/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lumina-accent transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-wider clickable"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <span className="text-white/20 hidden sm:inline">•</span>
            <a
              href="mailto:boulagjame@gmail.com"
              className="text-gray-400 hover:text-lumina-accent transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-wider clickable"
            >
              boulagjame@gmail.com
            </a>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-2">
            © 2026 Zakaria Boulagjame • {lang === 'fr' ? 'Euphorie Visuelle & Automatisation' : lang === 'ru' ? 'Визуальная Эйфория & Автоматизация' : 'Visual Euphoria in Automation'}
          </p>
        </div>
      </footer>
    </div>
  );
};