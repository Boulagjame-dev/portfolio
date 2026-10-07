export interface Project {
  id: string;
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  caseStudy?: string;
  caseStudyFr?: string;
  repoUrl?: string;
  liveUrl?: string;
  businessOutcome?: string;
  businessOutcomeFr?: string;
  category?: 'All' | 'SaaS & Web Apps' | 'AI & Automation' | 'Retail & POS';
}

export interface UserProfile {
  name: string;
  title: string;
  titleFr?: string;
  tagline: string;
  taglineFr?: string;
  bio: string;
  bioFr?: string;
  linkedInUrl: string;
  avatarUrl: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  roleFr?: string;
  company: string;
  content: string;
  contentFr?: string;
  rating: number;
  highlight: string;
  highlightFr?: string;
}

export enum AuthStatus {
  LOGGED_OUT,
  LOGGED_IN
}

export interface ContentGeneratorParams {
  prompt: string;
  type: 'project' | 'bio_enhance' | 'linkedin_scrape_sim';
}
