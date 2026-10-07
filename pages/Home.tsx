import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Ticker } from '../components/Ticker';
import { ProjectCard } from '../components/ProjectCard';
import { Testimonials } from '../components/Testimonials';
import { MOCK_PROJECTS, INITIAL_PROFILE } from '../constants';
import { Project } from '../types';
import { Send, Mail, ArrowRight, Calendar, CheckCircle, FileText, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase, isSupabaseConfigured } from '../services/supabase';

export const Home: React.FC = () => {
    const { lang } = useLanguage();
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const location = useLocation();

    const categories = [
        { id: 'All', labelEn: 'All', labelFr: 'Tous', labelRu: 'Все' },
        { id: 'SaaS & Web Apps', labelEn: 'SaaS & Web Apps', labelFr: 'SaaS & Web Apps', labelRu: 'SaaS и Веб-сервисы' },
        { id: 'Retail & POS', labelEn: 'Retail & POS', labelFr: 'Commerce & POS', labelRu: 'Ритейл и POS' },
        { id: 'AI & Automation', labelEn: 'AI & Automation', labelFr: 'IA & Automatisation', labelRu: 'ИИ и Автоматизация' }
    ];

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // Contact Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Fetch from Supabase if configured with silent fallback
    useEffect(() => {
        if (!isSupabaseConfigured) return;
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data && data.length > 0) {
                    setProjects(data as Project[]);
                }
            } catch (err) {
                // Keep local MOCK_PROJECTS fallback silently
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
        const mailtoLink = `mailto:boulagjame@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setTimeout(() => {
            window.location.href = mailtoLink;
            setIsSubmitting(false);
            setIsSent(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSent(false), 8000);
        }, 400);
    };

    return (
        <div className="pb-0">
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-24">

                <div className="text-center z-10 px-4">
                    <div className="inline-block mb-8 px-4 py-2 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur clickable transition-transform hover:scale-105">
                        <span className="font-mono text-xs text-lumina-accent uppercase tracking-[0.2em] font-bold">
                            {lang === 'fr' ? 'Forward Deployed Engineering • Systèmes Critiques' : lang === 'ru' ? 'Forward Deployed Engineering • Критические Системы' : 'Forward Deployed Engineering • Mission-Critical Systems'}
                        </span>
                    </div>

                    {(() => {
                        const titleWords = lang === 'fr' 
                            ? { w1: 'PRÉCISION', w2: 'AUTOMATISATION', w3: 'ARCHITECTURE' }
                            : lang === 'ru'
                            ? { w1: 'ТОЧНОСТЬ', w2: 'АВТОМАТИЗАЦИЯ', w3: 'АРХИТЕКТУРА' }
                            : { w1: 'PRECISION', w2: 'AUTOMATION', w3: 'ARCHITECTURE' };
                        
                        // Adaptive font size so long words (АВТОМАТИЗАЦИЯ / AUTOMATISATION) never wrap awkwardly
                        const fontSizeClass = (lang === 'ru' || lang === 'fr')
                            ? "text-[clamp(2.2rem,6.2vw,5.6rem)]"
                            : "text-[clamp(2.5rem,7.5vw,6.5rem)]";

                        return (
                            <h1 className={`font-display font-bold ${fontSizeClass} leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 select-none tracking-tight max-w-7xl mx-auto`}>
                                <div className="inline-block whitespace-nowrap">
                                    {titleWords.w1.split('').map((char, i) => (
                                        <span key={i} className="fantasy-char text-white transition-colors" data-char={char}>{char}</span>
                                    ))}
                                </div>
                                <br />
                                <div className="inline-block whitespace-nowrap">
                                    {titleWords.w2.split('').map((char, i) => (
                                        <span key={i} className="fantasy-char text-white transition-colors" data-char={char}>{char}</span>
                                    ))}
                                </div>
                                <br />
                                <div className="inline-block whitespace-nowrap">
                                    {titleWords.w3.split('').map((char, i) => (
                                        <span key={i} className="fantasy-char text-lumina-accent transition-colors" data-char={char}>{char}</span>
                                    ))}
                                </div>
                            </h1>
                        );
                    })()}

                    <p className="max-w-3xl mx-auto mt-12 text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        {lang === 'fr' ? (
                            <span>De la physique aux systèmes critiques : j'ingénie des <span className="text-white font-medium">architectures logicielles durcies</span>, des <span className="text-white font-medium">moteurs transactionnels</span> et des <span className="text-white font-medium">agents IA opérationnels</span> à fort impact financier.</span>
                        ) : lang === 'ru' ? (
                            <span>От прикладной физики к критическим системам: проектирую <span className="text-white font-medium">отказоустойчивые архитектуры</span>, <span className="text-white font-medium">транзакционные ядра</span> и <span className="text-white font-medium">боевых ИИ-агентов</span> с прямым финансовым результатом.</span>
                        ) : (
                            <span>From applied physics to mission-critical systems: engineering <span className="text-white font-medium">fault-tolerant architectures</span>, <span className="text-white font-medium">robust transaction engines</span>, and <span className="text-white font-medium">operational AI swarms</span> built for measurable financial impact.</span>
                        )}
                    </p>

                    {/* CTAs: Strategy Audit + Download Resume */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-lumina-accent text-black font-bold text-base md:text-lg px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(163,255,206,0.35)] flex items-center gap-2 clickable"
                        >
                            {lang === 'fr' ? 'Réserver un Audit Stratégique' : lang === 'ru' ? 'Записаться на Стратегический Аудит' : 'Book a Strategy Audit'} 
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <a
                            href="/cv-zakaria-boulagjame.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/20 bg-white/5 hover:bg-white/10 hover:border-lumina-accent/50 text-white font-mono text-sm px-7 py-4 rounded-full transition-all duration-300 flex items-center gap-2.5 clickable backdrop-blur-sm"
                        >
                            <Download className="w-4 h-4 text-lumina-accent" />
                            <span>{lang === 'fr' ? 'Télécharger CV' : lang === 'ru' ? 'Скачать Резюме (CV)' : 'Download Resume (CV)'}</span>
                        </a>
                    </div>

                    <div className="mt-4">
                        <span className="text-gray-500 text-xs uppercase tracking-widest font-mono">
                            {lang === 'fr' ? 'Disponible pour Projets Q4 2026' : lang === 'ru' ? 'Доступен для Проектов Q4 2026' : 'Available for Q4 2026 Projects'}
                        </span>
                    </div>
                </div>
            </section>

            {/* TICKER SECTION */}
            <section className="py-8 bg-black/50 border-t border-b border-white/5">
                <Ticker text={lang === 'fr'
                    ? `• SAAS DE PRODUCTION • CAISSE CLOUD INTELLIGENTE • WORKFLOWS AUTONOMES • AGENTS IA MULTI-RÔLES • OPÉRATIONS DE REVENU • ARCHITECTURE SUPABASE •`
                    : lang === 'ru'
                    ? `• ПРОИЗВОДСТВЕННЫЙ SAAS • УМНАЯ ОБЛАЧНАЯ КАССА • АВТОНОМНЫЕ WORKFLOWS • МУЛЬТИАГЕНТНЫЙ ИИ • ОПЕРАЦИИ ВЫРУЧКИ • АРХИТЕКТУРА SUPABASE •`
                    : `• PRODUCTION SAAS • SMART CLOUD POS • AUTONOMOUS WORKFLOWS • MULTI-AGENT SWARMS • REVENUE OPERATIONS • SUPABASE ARCHITECTURE •`
                } />
            </section>

            {/* PROJECTS GRID */}
            <section id="projects" className="max-w-7xl mx-auto px-6 py-32 scroll-mt-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <div className="inline-block mb-3 px-3 py-1 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur">
                            <span className="font-mono text-xs text-lumina-accent uppercase tracking-widest font-semibold">
                                {lang === 'fr' ? 'Systèmes en Production' : lang === 'ru' ? 'Работающие Системы' : 'Production Systems'}
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
                            {lang === 'fr' ? 'PROJETS' : lang === 'ru' ? 'ПРОЕКТЫ' : 'WORK'}
                        </h2>
                        <p className="text-xl text-gray-400 font-light">
                            {lang === 'fr'
                                ? 'Architectures déployées, moteurs de caisse intelligents & systèmes IA autonomes.'
                                : lang === 'ru'
                                ? 'Развернутые архитектуры, умные кассовые системы и автономные ИИ-агенты.'
                                : 'Battle-tested software, custom retail POS engines, and autonomous agent swarms.'}
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-3">
                        <a href="https://github.com/Boulagjame-dev" target="_blank" rel="noreferrer" className="text-lumina-accent hover:text-white transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-wider">
                            {lang === 'fr' ? 'Voir Tous les Dépôts' : lang === 'ru' ? 'Все Репозитории на GitHub' : 'View All Repositories'} <ArrowRight className="w-4 h-4" />
                        </a>
                        <span className="text-xs font-mono text-gray-500">
                            {filteredProjects.length} {lang === 'fr' ? 'Projets Chargés' : lang === 'ru' ? 'Проектов Загружено' : 'Projects Loaded'}
                        </span>
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2.5 mb-12">
                    {categories.map((cat) => {
                        const label = lang === 'fr' ? cat.labelFr : lang === 'ru' ? cat.labelRu : cat.labelEn;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 clickable ${
                                    activeCategory === cat.id
                                        ? 'bg-lumina-accent text-black font-bold shadow-[0_0_20px_rgba(163,255,206,0.35)] scale-105'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                                }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
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
                        "{lang === 'fr' ? INITIAL_PROFILE.bioFr : lang === 'ru' ? INITIAL_PROFILE.bioRu : INITIAL_PROFILE.bio}"
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5">
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">
                                {lang === 'fr' ? 'Applications & SaaS' : lang === 'ru' ? 'Веб-приложения и SaaS' : 'Web Apps & SaaS'}
                            </h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium font-mono">
                                <li>React 19 / Next.js 16</li>
                                <li>Turborepo / Vite</li>
                                <li>Tailwind / Glassmorphism</li>
                                <li>Local SEO & Schema.org</li>
                            </ul>
                        </div>
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">
                                {lang === 'fr' ? 'Bases & Opérations' : lang === 'ru' ? 'Базы данных и Ops' : 'Databases & Ops'}
                            </h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium font-mono">
                                <li>PostgreSQL / Supabase</li>
                                <li>Row-Level Security (RLS)</li>
                                <li>Multi-tenant Isolation</li>
                                <li>POS Hardware & Webhooks</li>
                            </ul>
                        </div>
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">
                                {lang === 'fr' ? 'Automatisation & Bots' : lang === 'ru' ? 'Автоматизация и Боты' : 'Automation & Bots'}
                            </h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium font-mono">
                                <li>n8n (Self-hosted)</li>
                                <li>Telegram Bot APIs</li>
                                <li>Headless Edge Studio</li>
                                <li>Printify & Etsy APIs</li>
                            </ul>
                        </div>
                        <div className="p-4 border-l-2 border-lumina-accent/20">
                            <h4 className="text-lumina-accent font-mono text-xs mb-3 font-bold uppercase tracking-wider">
                                {lang === 'fr' ? 'Intelligence Artificielle' : lang === 'ru' ? 'Искусственный Интеллект' : 'AI Intelligence'}
                            </h4>
                            <ul className="text-gray-400 space-y-2 text-sm font-medium font-mono">
                                <li>Gemini Pro & Vision OCR</li>
                                <li>Autonomous Agent Swarms</li>
                                <li>MicroHard CAI/MGI</li>
                                <li>RAG & Lead Scoring</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS & SOCIAL PROOF */}
            <Testimonials />

            {/* CONTACT & STRATEGY AUDIT SECTION */}
            <section id="contact" className="py-32 relative overflow-hidden bg-black/60 border-t border-white/5 scroll-mt-20">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Info Side */}
                        <div>
                            <div className="inline-block mb-4 px-3 py-1 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur">
                                <span className="font-mono text-xs text-lumina-accent uppercase tracking-widest font-semibold">
                                    {lang === 'fr' ? "Audit d'Efficacité" : lang === 'ru' ? "Аудит Эффективности" : "Efficiency Audit"}
                                </span>
                            </div>

                            <h2 className="text-6xl font-display font-bold text-white mb-6 leading-tight">
                                {lang === 'fr' ? (
                                    <>CESSEZ DE PERDRE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-accent to-lumina-secondary">DU REVENU.</span></>
                                ) : lang === 'ru' ? (
                                    <>ПЕРЕСТАНЬТЕ ТЕРЯТЬ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-accent to-lumina-secondary">ВЫРУЧКУ И ВРЕМЯ.</span></>
                                ) : (
                                    <>STOP LOSING <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-accent to-lumina-secondary">REVENUE.</span></>
                                )}
                            </h2>

                            <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md font-light">
                                {lang === 'fr'
                                    ? "La saisie manuelle et les outils déconnectés vous coûtent des heures chaque jour. Je construis l'infrastructure qui vous redonne ce temps."
                                    : lang === 'ru'
                                    ? "Ручной ввод данных и разрозненные инструменты отнимают часы каждый день. Я проектирую инфраструктуру, которая возвращает вам это время."
                                    : "Manual data entry and disconnected tools cost you hours every single day. I build the infrastructure that buys that time back."}
                            </p>

                            <div className="space-y-6">
                                <a
                                    href="https://calendly.com/boulagjame/30min"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-6 rounded-2xl border border-lumina-accent/30 bg-lumina-accent/5 hover:bg-lumina-accent hover:text-black transition-all duration-300 group flex items-center justify-between clickable shadow-[0_0_20px_rgba(163,255,206,0.1)] block"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-lumina-accent/20 group-hover:bg-black/20 flex items-center justify-center text-lumina-accent group-hover:text-black">
                                            <Calendar size={22} />
                                        </div>
                                        <span className="font-bold text-xl">
                                            {lang === 'fr' ? 'Réserver un Audit de 30 Min' : lang === 'ru' ? 'Забронировать Аудит (30 мин)' : 'Book a 30-Min Audit'}
                                        </span>
                                        <ArrowRight className="w-6 h-6 group-hover:-rotate-45 transition-transform duration-300" />
                                    </div>
                                    <div className="text-sm opacity-70 flex items-center gap-2">
                                        <Calendar size={14} /> {lang === 'fr' ? 'Accès Direct Calendrier' : lang === 'ru' ? 'Прямая Запись в Календарь' : 'Direct Calendar Access'}
                                    </div>
                                </a>

                                <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/10 text-lumina-accent shrink-0">
                                            <Mail size={18} />
                                        </div>
                                        <span className="font-mono text-sm truncate">boulagjame@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="relative mt-8 lg:mt-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-lumina-accent/20 to-lumina-secondary/20 rounded-2xl blur-xl -z-10"></div>

                            <form onSubmit={handleContactSubmit} className="bg-black border border-white/10 p-8 rounded-2xl shadow-2xl relative">
                                <h3 className="text-xl font-bold mb-6 text-white font-display">
                                    {lang === 'fr' ? 'Demande de Projet' : lang === 'ru' ? 'Запрос по Проекту' : 'Project Inquiry'}
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                                            {lang === 'fr' ? 'Nom Complet' : lang === 'ru' ? 'Ваше Имя' : 'Full Name'}
                                        </label>
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
                                        <label htmlFor="email" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                                            {lang === 'fr' ? 'Email Professionnel' : lang === 'ru' ? 'Рабочий Email' : 'Work Email'}
                                        </label>
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
                                        <label htmlFor="message" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                                            {lang === 'fr' ? 'Quel est votre goulot d’étranglement ?' : lang === 'ru' ? 'Какая задача или процесс вас тормозит?' : 'What represents your biggest bottleneck?'}
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 text-white focus:border-lumina-accent outline-none transition-all min-h-[150px] clickable resize-none font-light"
                                            placeholder={lang === 'fr'
                                                ? 'Décrivez la tâche répétitive ou le workflow qui ralentit votre entreprise...'
                                                : lang === 'ru'
                                                ? 'Опишите рутинную задачу, неэффективный процесс или систему, которую хотите автоматизировать...'
                                                : 'Describe the repetitive task or workflow that is slowing you down...'}
                                        />
                                    </div>

                                    {isSent && (
                                        <div className="p-3 mb-4 bg-lumina-accent/15 border border-lumina-accent/50 rounded-lg text-lumina-accent text-xs font-mono text-center flex items-center justify-center gap-2">
                                            <CheckCircle className="w-4 h-4 shrink-0 text-lumina-accent" />
                                            <span>
                                                {lang === 'fr'
                                                    ? 'Brouillon d’email ouvert pour boulagjame@gmail.com'
                                                    : lang === 'ru'
                                                    ? 'Черновик письма открыт для boulagjame@gmail.com'
                                                    : 'Email draft opened for boulagjame@gmail.com'}
                                            </span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-lumina-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 group clickable disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span>{lang === 'fr' ? 'Envoi en cours...' : lang === 'ru' ? 'Отправка...' : 'Sending...'}</span>
                                        ) : (
                                            <>
                                                <span>{lang === 'fr' ? 'Envoyer le Message' : lang === 'ru' ? 'Отправить Сообщение' : 'Send Message'}</span>
                                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-center text-gray-500 mt-2 font-mono">
                                        {lang === 'fr' ? '*Ouvre votre client de messagerie par défaut' : lang === 'ru' ? '*Открывает почтовый клиент по умолчанию' : '*Opens your default email client'}
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