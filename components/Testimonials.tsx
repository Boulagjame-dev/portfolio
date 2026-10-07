import React from 'react';
import { ShieldCheck, Cpu, Activity, Terminal, Star, CheckCircle2 } from 'lucide-react';
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
              {lang === 'fr' ? 'Preuve Sociale & Impact ROI' : lang === 'ru' ? 'Отзывы Клиентов & Измеримый ROI' : 'Client Endorsements & Measured ROI'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {lang === 'fr' ? 'Recommandé par Fondateurs & Opérateurs' : lang === 'ru' ? 'Доверие Основателей и Бизнеса' : 'Trusted by Founders & Operators'}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            {lang === 'fr' 
              ? 'Des systèmes et architectures délivrant des résultats financiers mesurables.'
              : lang === 'ru'
              ? 'Архитектуры и системы, приносящие ощутимый финансовый результат.'
              : 'Production systems engineered for tangible bottom-line impact.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {CLIENT_TESTIMONIALS.map((item) => {
            const role = lang === 'fr' && item.roleFr ? item.roleFr : lang === 'ru' && item.roleRu ? item.roleRu : item.role;
            const content = lang === 'fr' && item.contentFr ? item.contentFr : lang === 'ru' && item.contentRu ? item.contentRu : item.content;
            const highlight = lang === 'fr' && item.highlightFr ? item.highlightFr : lang === 'ru' && item.highlightRu ? item.highlightRu : item.highlight;

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
                      {lang === 'ru' ? 'Проверенный Клиент' : lang === 'fr' ? 'Client Vérifié' : 'Verified Client'}
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

        {/* Hardened Architecture & Industrial Primitives Section */}
        <div className="pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 border border-lumina-accent/30 rounded-full bg-lumina-accent/5 backdrop-blur">
              <span className="font-mono text-[11px] text-lumina-accent uppercase tracking-widest font-semibold">
                {lang === 'fr' 
                  ? 'Primitives Systèmes & Fondations Critiques'
                  : lang === 'ru'
                  ? 'Инженерные Примитивы & Боевой Контур'
                  : 'Mission-Critical Primitives & Systems Architecture'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              {lang === 'fr'
                ? 'Architecture Haute Disponibilité & Standards Industriels'
                : lang === 'ru'
                ? 'Архитектура Критических Нагрузок & Промышленный Стандарт'
                : 'Hardened Architecture & Industrial-Grade Infrastructure'}
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              {lang === 'fr'
                ? 'Aucun wrapper fragile ni prototype jetable. Chaque composant repose sur des moteurs durcis, une isolation stricte des données et des algorithmes déterministes.'
                : lang === 'ru'
                ? 'Никаких шаблонных оберток. Каждая система строится на отказоустойчивых ядрах данных, строгой криптографической изоляции и детерминированных алгоритмах.'
                : 'Zero fragile wrappers or toy prototypes. Every deployment is anchored in resilient data primitives, cryptographic tenant isolation, and deterministic compute.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 01 / Kernel-Level Tenant Isolation */}
            <div className="bg-lumina-card/25 backdrop-blur-md border border-white/10 hover:border-lumina-accent/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-lumina-accent/10 border border-lumina-accent/20 flex items-center justify-center text-lumina-accent group-hover:bg-lumina-accent group-hover:text-black transition-all">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-lumina-accent bg-lumina-accent/10 border border-lumina-accent/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  PostgreSQL RLS • Zero-Leak RBAC
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-lumina-accent transition-colors font-display">
                {lang === 'fr'
                  ? '01 / Isolation Multi-Tenant Cryptographique'
                  : lang === 'ru'
                  ? '01 / Строгая Изоляция Данных & RLS'
                  : '01 / Cryptographic Multi-Tenant Isolation'}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {lang === 'fr'
                  ? 'Règles de sécurité Row-Level Security natives au moteur de base de données. Étanchéité absolue entre organisations, protection du secret d’affaires et auditabilité institutionnelle conforme Loi 112-12.'
                  : lang === 'ru'
                  ? 'Политики Row-Level Security на уровне ядра базы данных. Абсолютная изоляция организаций, защита коммерческой тайны и криптографическая аудируемость без утечек данных.'
                  : 'Kernel-level Row-Level Security policies. Absolute data segregation across organizations, commercial confidentiality protection, and strict institutional auditability.'}
              </p>
            </div>

            {/* 02 / Multi-Agent Swarms & Cognitive RAG */}
            <div className="bg-lumina-card/25 backdrop-blur-md border border-white/10 hover:border-purple-400/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-all">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  LangGraph • State Machines • pgvector
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-purple-300 transition-colors font-display">
                {lang === 'fr'
                  ? '02 / Essaims Multi-Agents & RAG Déterministe'
                  : lang === 'ru'
                  ? '02 / Мультиагентные Рои & Детерминированный RAG'
                  : '02 / Multi-Agent Swarms & Deterministic RAG'}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {lang === 'fr'
                  ? 'Orchestration cognitive autonome via graphes d’états orientés. Architectures bi-moteurs (Mentor/Exécuteur), bases vectorielles pgvector et tolérance zéro hallucination pour la décision d’entreprise.'
                  : lang === 'ru'
                  ? 'Оркестрация автономных агентов на базе графов состояний (LangGraph). Двухмоторные архитектуры, векторные хранилища pgvector и нулевая толерантность к галлюцинациям.'
                  : 'Autonomous cognitive swarms governed by directed state graphs. Dual-engine mentor/executor splits, embedded pgvector memory, and zero-hallucination guardrails.'}
              </p>
            </div>

            {/* 03 / Real-Time Event Telemetry */}
            <div className="bg-lumina-card/25 backdrop-blur-md border border-white/10 hover:border-blue-400/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-all">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  Sub-Second Sync • Webhook Mesh
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-blue-300 transition-colors font-display">
                {lang === 'fr'
                  ? '03 / Télémesure Événementielle & Télégraphie Financière'
                  : lang === 'ru'
                  ? '03 / Потоковая Телеметрия & Событийные Конвейеры'
                  : '03 / Event-Driven Telemetry & Low-Latency Fabric'}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {lang === 'fr'
                  ? 'Streaming transactionnel chiffré et webhooks asynchrones. Clôtures de caisse automatiques (Z), alertes de trésorerie critiques et réconciliation financière sub-seconde sans intervention humaine.'
                  : lang === 'ru'
                  ? 'Потоковая передача транзакций через зашифрованные вебхуки и Telegram Bot API. Автоматические Z-отчеты кассы, мгновенные оповещения об остатках и ликвидация кассовых разрывов.'
                  : 'Real-time transactional streaming over encrypted webhooks and telemetry APIs. Automated POS Z-closures, immediate treasury alerts, and sub-second financial reconciliation.'}
              </p>
            </div>

            {/* 04 / Deterministic Vector Compute */}
            <div className="bg-lumina-card/25 backdrop-blur-md border border-white/10 hover:border-amber-400/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  Headless Vector • $0 Recurring API
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-amber-300 transition-colors font-display">
                {lang === 'fr'
                  ? '04 / Calcul Vectoriel Déterministe (0$ Coût API)'
                  : lang === 'ru'
                  ? '04 / Детерминированный Headless-Рендеринг ($0 API)'
                  : '04 / Deterministic Headless Compute ($0 Recurring API)'}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {lang === 'fr'
                  ? 'Élimination des modèles d’images tiers coûteux au profit d’un moteur de rendu headless natif 4500×5400px. Sortie vectorielle de précision industrielle avec coût d’API nul et zéro fuite mémoire.'
                  : lang === 'ru'
                  ? 'Замена дорогостоящих коммерческих генераторов картинок прямым headless векторным движком. Высокоточный рендеринг 4500×5400px для печатных фабрик с $0 переменных затрат на API.'
                  : 'Bypassing costly proprietary image APIs through deterministic headless browser vector rendering. 4500×5400px print-grade precision at true $0 marginal compute cost.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};