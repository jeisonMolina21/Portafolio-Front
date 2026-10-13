export interface Profile {
  id?: number;
  full_name: string;
  title: string;
  bio: string;
  location: string;
  image_url?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  resume_url?: string;
}

export interface Skill {
  id: number;
  name: string;
  category?: string;
  level?: number;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string;
  location?: string;
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  tech_stack: string;
  category?: string;
  video_url?: string;
  challenge?: string;
  action?: string;
  result?: string;
}
