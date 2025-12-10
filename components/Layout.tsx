import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Github, Lock, Brain, Eye, Database, HardDrive } from 'lucide-react';
import { CustomCursor } from './CustomCursor';
import { supabase } from '../services/supabase';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/admin';
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    // Check connection health periodically
    const checkConnection = async () => {
      const { error } = await supabase.from('projects').select('id').limit(1);
      if (error && error.message.includes('not find the table')) {
        setIsOfflineMode(true);
      }
    };
    checkConnection();
  }, []);

  // Hidden Admin Access
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
    if (location.pathname !== '/') {
      navigate('/');
      // Short timeout to allow the home page to mount before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative cursor-none">
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

        <div className="flex items-center gap-8 font-display text-sm uppercase tracking-widest hidden md:flex">
          <button onClick={() => handleNavClick('projects')} className="hover:text-lumina-accent transition-colors clickable bg-transparent border-none p-0 cursor-none">Work</button>
          <button onClick={() => handleNavClick('experience')} className="hover:text-lumina-accent transition-colors clickable bg-transparent border-none p-0 cursor-none">Experience</button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-lumina-accent transition-colors clickable bg-transparent border-none p-0 cursor-none">Contact</button>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="clickable w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
      </nav>

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[20vw] h-[20vw] bg-lumina-accent/5 rounded-full blur-[80px] animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      <footer className="py-12 text-center border-t border-white/10 relative z-10 bg-lumina-bg">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">© 2025 Zakaria Boulagjame • Visual Euphoria in Automation</p>
          {isOfflineMode && (
            <div className="text-[10px] text-yellow-600 flex items-center gap-1 opacity-50">
              <HardDrive size={8} /> Local Storage Mode
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};