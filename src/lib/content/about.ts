import fs from "fs";
import path from "path";
import matter from "gray-matter";

const filePath = path.join(process.cwd(), "content/about/index.mdx");

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

export interface About {
  name: string;
  title: string;
  location: string;
  avatar: string;
  highlights: Highlight[];
  skills: SkillCategory[];
  experience: Experience[];
  content: string;
}

export function getAbout(): About | null {
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    name: data.name ?? "",
    title: data.title ?? "",
    location: data.location ?? "",
    avatar: data.avatar ?? "",
    highlights: data.highlights ?? [],
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    content,
  };
}
