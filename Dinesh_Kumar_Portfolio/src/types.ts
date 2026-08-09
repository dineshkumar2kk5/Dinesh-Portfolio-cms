export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  techTags: string[];
  mockupBg: string; // Tailwind class or color
  mockupType: "phone" | "tablet" | "laptop" | "dual-phone";
  details?: {
    challenge: string;
    solution: string;
    results: string[];
    role: string;
    timeline: string;
  };
  githubUrl?: string;
  liveUrl?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  aboutParagraphs: string[];
  avatarUrl: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  education?: {
    college: string;
    branch: string;
    cgpa: string;
    year: string;
  };
  certifications?: {
    name: string;
    issuer: string;
    year: string;
    credentialId?: string;
    issueDate?: string;
    verificationUrl?: string;
    certificateImage?: string;
  }[];
  skills: {
    category: string;
    tags: string[];
  }[];
  experiences1: ExperienceItem[];
  experiences2: ExperienceItem[];
  contacts: {
    platform: string;
    icon: string; // Lucide icon or text label
    value: string;
    url: string;
  }[];
  softwares: {
    name: string;
    color: string;
    abbreviation: string;
  }[];
  projects: ProjectItem[];
}
