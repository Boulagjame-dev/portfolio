import { UserProfile, Project } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: "Zakaria Boulagjame",
  title: "AI Workflow & Automation Specialist",
  tagline: "From Scientific Rigor to Business Scalability",
  bio: "I apply the laws of physics to business logic: Efficiency is mandatory. Friction is eliminated. I build systems that work while you sleep. I engineer self-driving businesses using n8n, Python, and Large Language Models.",
  linkedInUrl: "https://www.linkedin.com/in/zakaria-boulagjame/",
  avatarUrl: "https://ui-avatars.com/api/?name=Zakaria+Boulagjame&background=a3ffce&color=120b2e&size=256" // Placeholder for now
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: "MyMentor",
    description: "An intelligent educational platform that provides personalized mentorship and generates custom learning paths based on user goals.",
    tags: ["React", "TypeScript", "Google Gemini API", "Supabase", "Tailwind CSS"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=MyMentor&font=montserrat",
    caseStudy: "Designed a scalable architecture using Supabase for real-time data and Gemini API for generating dynamic learning content. Implemented RAG to ground AI responses in verified educational resources, resulting in a 40% increase in user engagement."
  },
  {
    id: '2',
    title: "Modjex Smart Inventory",
    description: "A custom ERP and financial dashboard for a Smart Home solutions provider, designed to track inventory value, potential margins, and stock alerts in real-time.",
    tags: ["React", "Data Visualization", "CSV Parsing", "Gemini"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=MODJEX&font=montserrat",
    caseStudy: "Solved data fragmentation issues by building a unified dashboard. Integrated CSV parsing for legacy data import and used Gemini to categorize messy inventory data automatically, saving the client 15+ hours of manual work per week."
  },
  {
    id: '3',
    title: "BizCard AI",
    description: "An AI-powered SaaS platform that transforms physical business cards into structured digital assets, streamlining the lead entry process for sales teams.",
    tags: ["React (TypeScript)", "Supabase", "Gemini Vision", "Tailwind CSS"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=BizCard+AI&font=montserrat",
    caseStudy: "Leveraged Gemini Pro Vision to extract text from complex card layouts with 99% accuracy. Built a mobile-first React interface for sales agents to scan and sync contacts in seconds, directly integrating with their CRM."
  }
];
