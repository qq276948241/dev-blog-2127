export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  content: string;
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: number;
  author: string;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'other';

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  avatar: string;
  title: string;
  location: string;
  bio: string;
  signature: string;
  email: string;
  github: string;
  social: SocialLink[];
  skills: Skill[];
  experiences: WorkExperience[];
  projects: Project[];
}

export type SortOrder = 'latest' | 'popular';

export interface BlogFilter {
  category: string | null;
  tags: string[];
  sort: SortOrder;
  keyword: string;
}
