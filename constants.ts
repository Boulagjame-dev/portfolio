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
    title: "MyMentor OS",
    description: "Automated 100% of User Onboarding & Curriculum Generation. Scalable architecture for real-time personalized learning paths.",
    tags: ["React", "TypeScript", "Google Gemini API", "Supabase", "Tailwind CSS"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=MyMentor+OS&font=montserrat",
    caseStudy: "Designed a scalable architecture using Supabase for real-time data or generating dynamic learning content. 40% increased engagement."
  },
  {
    id: '2',
    title: "Modjex Smart Inventory",
    description: "Real-Time Profit Tracking that Eliminated Spreadsheets. A unified dashboard for inventory value and margin analysis.",
    tags: ["React", "Data Visualization", "CSV Parsing", "Gemini"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=MODJEX&font=montserrat",
    caseStudy: "Integrated CSV parsing for legacy data import and used Gemini to categorize messy inventory data automatically, saving 15+ hours/week."
  },
  {
    id: '3',
    title: "BizCard AI",
    description: "99% Accuracy Lead Extraction (Zero Manual Entry). Transforms physical cards into CRM-ready assets in seconds.",
    tags: ["React (TypeScript)", "Supabase", "Gemini Vision", "Tailwind CSS"],
    imageUrl: "https://placehold.co/800x600/120b2e/a3ffce?text=BizCard+AI&font=montserrat",
    caseStudy: "Leveraged Gemini Pro Vision to extract text from complex card layouts with 99% accuracy. Syncs contacts directly to CRM."
  }
];
