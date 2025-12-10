import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Ticker } from '../components/Ticker';
import { ProjectCard } from '../components/ProjectCard';
import { Testimonials } from '../components/Testimonials';
import { MOCK_PROJECTS, INITIAL_PROFILE } from '../constants';
import { Project } from '../types';
import { Send, Mail, User, MessageSquare, ArrowRight, Calendar } from 'lucide-react';
import { supabase } from '../services/supabase';

export const Home: React.FC = () => {
    // Start with mock projects, then replace with real data
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const location = useLocation();

    // Contact Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch from Supabase with LocalStorage Fallback
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data && data.length > 0) {
                    const mappedProjects: Project[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        tags: item.tags || [],
                        imageUrl: item.image_url,
                        repoUrl: item.repo_url,
                        caseStudy: item.case_study,
                        videoUrl: item.video_url,
                        businessOutcome: item.business_outcome // New Field
                    }));
                    setProjects(mappedProjects);
                } else {
                    // Keep MOCK_PROJECTS if Supabase is empty
                }
            } catch (err) {
                console.error("Supabase fetch failed:", err);
            }
        };
        fetchProjects();
    }, []);

    // Handle hash scroll
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `Strategy Audit Request from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nBottleneck/Challenge:\n${formData.message}`;
        const mailtoLink = `mailto:boulfaf2013@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setTimeout(() => {
            window.location.href = mailtoLink;
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            alert("Opening your email client to send request...");
        }, 800);
    };

    return (
        <div className="pb-0">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">

                <div className="text-center z-10 px-4">
                    <div className="inline-block mb-8 px-4 py-2 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur clickable transition-transform hover:scale-105">
                        <span className="font-mono text-xs text-lumina-accent uppercase tracking-[0.2em] font-bold">Systematize Your Growth</span>
                    </div>

                    <h1 className="font-display font-bold text-[8vw] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 select-none tracking-tighter max-w-6xl mx-auto">
                        PRECISION<br />
                        AUTOMATION<br />
                        <span className="text-lumina-accent">ARCHITECTURE</span>
                    </h1>

                    <p className="max-w-2xl mx-auto mt-12 text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        {INITIAL_PROFILE.tagline}. Specializing in <span className="text-white font-medium">n8n, Make, & LLMs</span> to engineer self-driving businesses.
                    </p>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-lumina-accent text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(163,255,206,0.3)] flex items-center gap-2 clickable"
                        >
                            Book a Strategy Audit <ArrowRight className="w-5 h-5" />
                        </button>
                        <span className="text-gray-500 text-xs uppercase tracking-widest">Limited Availability for Q1 2025</span>
                    </div>
                </div>
            </section>

            {/* TICKER SECTION */}
            <section className="py-8 bg-black/50 border-t border-b border-white/5">
                <Ticker text={`• ENGINEERING EFFICIENCY • SCALABLE SYSTEMS • AI AGENTS • REVENUE OPERATIONS •`} />
            </section>

            {/* PROJECTS GRID */}
            <section id="projects" className="max-w-7xl mx-auto px-6 py-32 scroll-mt-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">WORK</h2>
                        <p className="text-xl text-gray-400">Systems deployed for high-growth companies.</p>
                    </div>
                    <div className="hidden md:block">
                        <a href="https://github.com/Boulagjame-dev" target="_blank" rel="noreferrer" className="text-lumina-accent hover:text-white transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-wider">
                            View All Code <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>

            {/* ABOUT / EXPERIENCE SECTION */}
            <section id="experience" className="bg-lumina-card/20 py-32 relative overflow-hidden scroll-mt-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="relative inline-block group">
                        <img
                            src={INITIAL_PROFILE.avatarUrl}
                            alt="Profile"
                            className="w-40 h-40 rounded-full border-2 border-lumina-accent mx-auto mb-8 object-cover shadow-[0_0_40px_rgba(163,255,206,0.2)] grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <h2 className="text-4xl font-display font-bold mb-6">{INITIAL_PROFILE.name}</h2>
                    <p className="text-xl md:text-3xl text-white font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                        "{INITIAL_PROFILE.bio}"
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5">
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">Orchestration</h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium">
                                <li>n8n (Self-hosted)</li>
                                <li>Make.com</li>
                                <li>LangChain</li>
                            </ul>
                        </div>
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">Development</h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium">
                                <li>Python / FastAPI</li>
                                <li>TypeScript / React</li>
                                <li>PostgreSQL / Supabase</li>
                            </ul>
                        </div>
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">Intelligence</h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium">
                                <li>Gemini 2.0 Flash</li>
                                <li>GPT-4o</li>
                                <li>RAG Pipelines</li>
                            </ul>
                        </div>
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">Impact</h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium">
                                <li>Lead Gen Automation</li>
                                <li>CRM Synchronization</li>
                                <li>Inventory Intelligence</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <Testimonials />

            {/* CONTACT SECTION */}
            <section id="contact" className="py-32 relative px-6 scroll-mt-20 bg-gradient-to-b from-black to-lumina-bg">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Text Side */}
                        <div>
                            <div className="inline-block mb-6 px-3 py-1 border border-white/20 rounded-full">
                                <span className="font-mono text-xs text-white uppercase tracking-widest">Efficiency Audit</span>
                            </div>
                            <h2 className="text-6xl font-display font-bold text-white mb-6 leading-tight">
                                STOP LEAKING <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-accent to-lumina-secondary">REVENUE.</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
                                Manual data entry and disconnected systems are costing you hours every day. I build the infrastructure that gives you that time back.
                            </p>

                            <div className="space-y-6">
                                <a
                                    href="https://calendly.com/boulagjame/30min"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block group bg-white text-black p-6 rounded-2xl hover:bg-lumina-accent transition-all duration-300 shadow-xl border border-transparent hover:border-white/50 clickable"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-xl">Book a 30-Min Audit</span>
                                        <ArrowRight className="w-6 h-6 group-hover:-rotate-45 transition-transform duration-300" />
                                    </div>
                                    <div className="text-sm opacity-70 flex items-center gap-2">
                                        <Calendar size={14} /> Direct Calendar Access
                                    </div>
                                </a>

                                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/10 text-lumina-accent shrink-0">
                                            <Mail size={18} />
                                        </div>
                                        <span className="font-mono text-sm truncate">zakaria.boulagjame@arkx.academy</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="relative mt-8 lg:mt-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-lumina-accent/20 to-lumina-secondary/20 rounded-2xl blur-xl -z-10"></div>

                            <form onSubmit={handleContactSubmit} className="bg-black border border-white/10 p-8 rounded-2xl shadow-2xl relative">
                                <h3 className="text-xl font-bold mb-6 text-white">Project Inquiry</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white focus:border-lumina-accent outline-none transition-all clickable"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Work Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white focus:border-lumina-accent outline-none transition-all clickable"
                                            placeholder="john@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">What represents your biggest bottleneck?</label>
                                        <textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white focus:border-lumina-accent outline-none transition-all min-h-[150px] clickable resize-none"
                                            placeholder="Describe the repetitive task or workflow that is slowing you down..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-lumina-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 group clickable disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span>Sending...</span>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-center text-gray-500 mt-2">
                                        *Opens your default email client
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};