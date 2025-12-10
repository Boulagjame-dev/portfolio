export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  caseStudy?: string;
  repoUrl?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  linkedInUrl: string;
  avatarUrl: string;
}

export enum AuthStatus {
  LOGGED_OUT,
  LOGGED_IN
}

export interface ContentGeneratorParams {
  prompt: string;
  type: 'project' | 'bio_enhance' | 'linkedin_scrape_sim';
}