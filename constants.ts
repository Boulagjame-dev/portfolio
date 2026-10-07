import { UserProfile, Project } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: "Zakaria Boulagjame",
  title: "AI Workflow & Full-Stack Systems Architect",
  tagline: "From Scientific Rigor to Business Scalability",
  bio: "I apply the laws of physics to business logic: Efficiency is mandatory. Friction is eliminated. I engineer high-performance web platforms, smart POS architectures, and autonomous agentic workflows using React, TypeScript, Python, n8n, Supabase, and LLMs.",
  linkedInUrl: "https://www.linkedin.com/in/zakaria-boulagjame/",
  avatarUrl: "https://github.com/Boulagjame-dev.png"
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'cecot-pos',
    title: "CECOT-POS System",
    category: 'Retail & POS',
    description: "Cloud Point of Sale & Inventory engine with live smartphone camera barcode pairing. Features instant Z-closure cash reporting, quote generation, and Supabase real-time synchronization.",
    tags: ["React 18", "Supabase", "Tailwind CSS", "HTML5 QR/Barcode", "Webhooks"],
    imageUrl: "/projects/cecot-pos.jpg",
    repoUrl: "https://github.com/Boulagjame-dev/CECOT-POS",
    businessOutcome: "0 Cash Discrepancy & 12h/week saved in stock auditing",
    caseStudy: "Eliminated dedicated barcode scanner hardware with zero-install smartphone camera pairing and automated stock level alerts."
  },
  {
    id: 'cecot-vitrine',
    title: "CECOT Vitrine & Local GEO",
    category: 'SaaS & Web Apps',
    description: "High-performance web vitrine and lead acquisition engine for Morocco's premier reprography hub. Structured Schema.org JSON-LD for Google AI Overviews (GEO), 76+ live products catalogue, and large-format architectural print calculator.",
    tags: ["Vanilla JS", "Node.js", "SEO / GEO", "Schema.org", "Tailwind CSS"],
    imageUrl: "/projects/cecot-vitrine.jpg",
    repoUrl: "https://github.com/Boulagjame-dev/cecot-vitrine",
    businessOutcome: "+85% Local visibility & Automated architectural quote intake",
    caseStudy: "Deployed optimized semantic structure and localized schema graph to dominate local search rankings and automate B2B print orders."
  },
  {
    id: 'fofinette-pos',
    title: "Fofinette POS & AI Suite",
    category: 'AI & Automation',
    description: "Smart retail & culinary POS connected to an autonomous n8n backend: automated invoice OCR extraction (Gemini Vision), real-time Telegram sales telemetry, and instant stock threshold alerts.",
    tags: ["React", "Supabase", "n8n", "Gemini Vision", "Telegram Bot API"],
    imageUrl: "/projects/fofinette.jpeg",
    repoUrl: "https://github.com/Boulagjame-dev/fofinette-pos",
    businessOutcome: "10x Faster supplier invoice intake & Real-time financial alerts",
    caseStudy: "Eliminated manual accounting overhead with automated multi-modal invoice digitization and real-time Telegram notifications."
  },
  {
    id: 'coop-saas',
    title: "Coop-SaaS Maroc (Loi 112-12)",
    category: 'SaaS & Web Apps',
    description: "Multi-tenant B2B governance and financial compliance system engineered for Moroccan cooperatives under Law 112-12 (ODCO / INDH). Complete RBAC matrix with PostgreSQL Row-Level Security.",
    tags: ["PostgreSQL", "Supabase RLS", "Multi-tenancy", "TypeScript", "Tailwind CSS"],
    imageUrl: "/projects/coop-saas.jpg",
    businessOutcome: "100% Legal ODCO compliance & Full INDH subsidy traceability",
    caseStudy: "Engineered strict tenant isolation and automated generation of mandatory statutory registers and member voting protocols."
  },
  {
    id: 'leslions',
    title: "Les Lions — InsurTech Comparator",
    category: 'SaaS & Web Apps',
    description: "B2C insurance comparison and qualification engine. Guided conversion flow powered by mascots Léo & Léa, dynamic provider rating calculation, and real-time broker partner API routing.",
    tags: ["Next.js 16", "React 19", "Turborepo", "TypeScript", "Zod", "Tailwind CSS"],
    imageUrl: "/projects/leslions.png",
    businessOutcome: "65% Faster funnel completion & High-intent lead generation",
    caseStudy: "Constructed an ultra-fast monorepo architecture with Zod schema verification and interactive insurance quoting workflows."
  },
  {
    id: 'rolland-assurances',
    title: "Rolland Assurances Hub",
    category: 'AI & Automation',
    description: "Digital brokerage portal combined with an autonomous multi-agent marketing machine (MicroHard CAI/MGI framework). Automates Google Ads campaign iteration, compliance checking, and senior health quotes.",
    tags: ["React", "MicroHard AI", "Google Ads API", "Workflow Automation", "Tailwind CSS"],
    imageUrl: "/projects/rolland-assurances.svg",
    repoUrl: "https://github.com/Boulagjame-dev/RA-V2",
    businessOutcome: "Lower customer acquisition cost & Hands-free ad optimization",
    caseStudy: "Deployed autonomous AI agent swarms to continuously craft, test, and optimize acquisition hooks for insurance products."
  },
  {
    id: 'etsy-pod',
    title: "Etsy Merch Factory (Zero API Cost)",
    category: 'AI & Automation',
    description: "Autonomous Print-on-Demand pipeline. Generates 4500x5400px transparent merchandise designs via headless Edge vector rendering, synced directly to Printify API and Etsy store through n8n.",
    tags: ["PowerShell", "Headless Edge", "Printify API", "Etsy API", "n8n"],
    imageUrl: "/projects/etsy-pod.jpg",
    businessOutcome: "$0 Design generation API cost & 100% Hands-off merchandise sync",
    caseStudy: "Engineered headless browser rendering system delivering pixel-perfect typographic apparel without unpredictable AI image API costs."
  },
  {
    id: 'mymentor',
    title: "MyMentor OS",
    category: 'AI & Automation',
    description: "Adaptive AI learning platform automating 100% of user onboarding and dynamic curriculum generation. Scalable architecture for real-time personalized learning paths.",
    tags: ["React", "TypeScript", "Google Gemini API", "Supabase", "Tailwind CSS"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=MyMentor+OS&font=montserrat",
    repoUrl: "https://github.com/Boulagjame-dev/MyMentor",
    businessOutcome: "+40% Student engagement & Fully automated curriculum scaling",
    caseStudy: "Designed dynamic learning paths and automated evaluation mechanisms powered by Gemini API and Supabase real-time data."
  },
  {
    id: 'modjex',
    title: "Modjex Smart Inventory",
    category: 'Retail & POS',
    description: "Real-time margin analysis and inventory intelligence dashboard. Replaced error-prone spreadsheets with automated CSV parsing and LLM catalog sanitization.",
    tags: ["React", "Data Visualization", "CSV Parsing", "Gemini API"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=MODJEX&font=montserrat",
    repoUrl: "https://github.com/Boulagjame-dev/Modjex-Site",
    businessOutcome: "15+ Hours saved weekly & Total elimination of inventory mismatch",
    caseStudy: "Integrated automated catalog ingestion and LLM-driven classification to unify multi-source retail supplies."
  },
  {
    id: 'bizcard',
    title: "BizCard AI",
    category: 'AI & Automation',
    description: "99% Precision batch lead extraction system. Transforms physical business cards into CRM-ready assets in seconds using Gemini Pro Vision.",
    tags: ["React (TypeScript)", "Supabase", "Gemini Vision", "Tailwind CSS"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=BizCard+AI&font=montserrat",
    repoUrl: "https://github.com/Boulagjame-dev/bizcard-batch",
    businessOutcome: "99% Extraction accuracy & Zero manual CRM data entry",
    caseStudy: "Leveraged multi-modal Gemini Vision to extract complex typography, corporate domains, and multilingual card data directly into CRM."
  }
];
