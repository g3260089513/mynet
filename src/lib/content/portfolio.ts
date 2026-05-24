import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/portfolio");

export interface Project {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  draft: boolean;
  status: string;
  role: string;
  content: string;
}

function readFiles(): Project[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        category: data.category ?? "other",
        thumbnail: data.thumbnail ?? "",
        images: data.images ?? [],
        techStack: data.techStack ?? [],
        liveUrl: data.liveUrl,
        repoUrl: data.repoUrl,
        summary: data.summary ?? "",
        publishedAt: data.publishedAt ?? "",
        updatedAt: data.updatedAt,
        featured: data.featured ?? false,
        draft: data.draft ?? false,
        status: data.status ?? "completed",
        role: data.role ?? "Solo Developer",
        content,
      };
    })
    .filter((p) => !p.draft);
}

export function getAllProjects(): Project[] {
  return readFiles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return readFiles().find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return readFiles()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return [...new Set(readFiles().map((p) => p.category))].sort();
}
