export interface Highlight {
  label: string;
  value: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface AboutFrontmatter {
  name: string;
  title: string;
  location: string;
  avatar: string;
  highlights: Highlight[];
  skills: SkillCategory[];
  experience: Experience[];
}
