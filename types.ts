export interface Project {
  id: string;
  title: string;
  titleFr?: string;
  titleRu?: string;
  description: string;
  descriptionFr?: string;
  descriptionRu?: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  caseStudy?: string;
  caseStudyFr?: string;
  caseStudyRu?: string;
  repoUrl?: string;
  liveUrl?: string;
  businessOutcome?: string;
  businessOutcomeFr?: string;
  businessOutcomeRu?: string;
  category?: 'All' | 'SaaS & Web Apps' | 'AI & Automation' | 'Retail & POS';
  categoryFr?: string;
  categoryRu?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  titleFr?: string;
  titleRu?: string;
  tagline: string;
  taglineFr?: string;
  taglineRu?: string;
  bio: string;
  bioFr?: string;
  bioRu?: string;
  linkedInUrl: string;
  avatarUrl: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  roleFr?: string;
  roleRu?: string;
  company: string;
  content: string;
  contentFr?: string;
  contentRu?: string;
  rating: number;
  highlight: string;
  highlightFr?: string;
  highlightRu?: string;
}

export enum AuthStatus {
  LOGGED_OUT,
  LOGGED_IN
}

export interface ContentGeneratorParams {
  prompt: string;
  type: 'project' | 'bio_enhance' | 'linkedin_scrape_sim';
}