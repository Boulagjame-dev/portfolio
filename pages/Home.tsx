import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Ticker } from '../components/Ticker';
import { ProjectCard } from '../components/ProjectCard';
import { MOCK_PROJECTS, INITIAL_PROFILE } from '../constants';
import { Project } from '../types';
import { Send, Mail, User, MessageSquare, ArrowRight } from 'lucide-react';
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
                        videoUrl: item.video_url
                    }));
                    setProjects(mappedProjects);
                } else {
                    throw new Error("No data found or empty array");
                }
            } catch (err) {
                console.error("Supabase fetch failed:", err);
                // No fallback
            }
        };
        fetchProjects();
    }, []);

    // Handle hash scroll if user arrives via link or refresh
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

        // Construct mailto link
        const subject = `Portfolio Inquiry from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        const mailtoLink = `mailto:boulfaf2013@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Simulate a small delay for the UI effect, then open mail client
        setTimeout(() => {
            window.location.href = mailtoLink;
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            alert("Opening your email client to send the message...");
        }, 800);
    };

    return (
        <div className="pb-0">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">

                <div className="text-center z-10 px-4">
                    <div className="inline-block mb-4 px-3 py-1 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur clickable transition-transform hover:scale-105">
                        <span className="font-mono text-xs text-lumina-accent uppercase tracking-widest">Available for Projects</span>
                    </div>

                    <h1 className="font-display font-bold text-[15vw] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 select-none hover:scale-[1.02] transition-transform duration-700">
                        IMPACT
                    </h1>
                    <h1 className="font-display font-bold text-[15vw] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-lumina-accent via-lumina-secondary to-lumina-accent select-none opacity-90 animate-pulse-slow hover:scale-[1.02] transition-transform duration-700">
                        AT SCALE
                    </h1>

                    <p className="max-w-xl mx-auto mt-12 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                        {INITIAL_PROFILE.tagline}. Specializing in <span className="text-white font-medium">n8n, Make, & Zapier</span> to automate the impossible.
                    </p>
                </div>

                <div className="absolute bottom-12 w-full">
                    <div className="text-center mb-4 text-xs font-mono text-gray-500 animate-bounce">SCROLL TO EXPLORE</div>
                </div>
            </section>

            {/* TICKER SECTION */}
            <section className="py-8">
                <Ticker text={`• ${INITIAL_PROFILE.title} • AUTOMATION • AI AGENTS • WORKFLOWS •`} />
            </section>

            {/* PROJECTS GRID */}
            <section id="projects" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-2">WORK</h2>
                        <p className="text-xl text-gray-400">Selected Automations & Architectures</p>
                    </div>
                    <div className="hidden md:block w-32 h-[1px] bg-lumina-accent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>

            {/* ABOUT / EXPERIENCE SECTION */}
            <section id="experience" className="bg-lumina-card/20 py-32 relative overflow-hidden scroll-mt-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lumina-accent/50 to-transparent"></div>

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="relative inline-block group">
                        <img
                            src={INITIAL_PROFILE.avatarUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-2 border-lumina-accent mx-auto mb-8 object-cover shadow-[0_0_40px_rgba(163,255,206,0.3)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(163,255,206,0.6)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 rounded-full bg-lumina-accent/20 blur-xl -z-10 animate-pulse-slow"></div>
                    </div>

                    <h2 className="text-4xl font-display font-bold mb-6">{INITIAL_PROFILE.name}</h2>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10">
                        "{INITIAL_PROFILE.bio}"
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left mt-12 border-t border-white/10 pt-12">
                        <div className="p-4 border border-white/5 rounded hover:bg-white/5 transition-colors duration-300">
                            <h4 className="text-lumina-accent font-mono text-xs mb-2 font-bold">CORE STACK</h4>
                            <ul className="text-gray-400 space-y-1 text-sm">
                                <li>n8n</li>
                                <li>Make.com</li>
                                <li>Zapier</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-white/5 rounded hover:bg-white/5 transition-colors duration-300">
                            <h4 className="text-lumina-accent font-mono text-xs mb-2 font-bold">DEVELOPMENT</h4>
                            <ul className="text-gray-400 space-y-1 text-sm">
                                <li>Python</li>
                                <li>JavaScript</li>
                                <li>React</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-white/5 rounded hover:bg-white/5 transition-colors duration-300">
                            <h4 className="text-lumina-accent font-mono text-xs mb-2 font-bold">AI MODELS</h4>
                            <ul className="text-gray-400 space-y-1 text-sm">
                                <li>Gemini 3.0</li>
                                <li>GPT-5</li>
                                <li>Claude 4.5</li>
                            </ul>
                        </div>
                        <div className="p-4 border border-white/5 rounded hover:bg-white/5 transition-colors duration-300">
                            <h4 className="text-lumina-accent font-mono text-xs mb-2 font-bold">BUSINESS</h4>
                            <ul className="text-gray-400 space-y-1 text-sm">
                                <li>B2B Sales</li>
                                <li>E-commerce</li>
                                <li>CRM Ops</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-32 relative px-6 scroll-mt-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Text Side */}
                        <div>
                            <h2 className="text-6xl font-display font-bold text-white mb-6">
                                LET'S <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-accent to-lumina-secondary">COLLABORATE</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Have a complex workflow that needs taming? Looking to integrate AI into your business operations? Let's build the future of your business together.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-lumina-accent">
                                        <Mail size={18} />
                                    </div>
                                    <span>zakaria.boulagjame@arkx.academy</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-lumina-accent">
                                        <ArrowRight size={18} />
                                    </div>
                                    <span>Available for Freelance & Consulting</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="relative">
                            {/* Glow effect behind form */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-lumina-accent/20 to-lumina-secondary/20 rounded-3xl blur-2xl -z-10"></div>

                            <form onSubmit={handleContactSubmit} className="bg-lumina-card/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Your Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:border-lumina-accent outline-none transition-all clickable focus:bg-black/60"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:border-lumina-accent outline-none transition-all clickable focus:bg-black/60"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Project Details</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-6 text-gray-500 w-4 h-4" />
                                            <textarea
                                                id="message"
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:border-lumina-accent outline-none transition-all min-h-[150px] clickable focus:bg-black/60 resize-none"
                                                placeholder="Tell me about your automation needs..."
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-lumina-accent transition-all flex items-center justify-center gap-2 group clickable disabled:opacity-50 disabled:cursor-not-allowed"
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