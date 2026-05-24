import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/learning-journal");

export interface Journal {
  slug: string;
  title: string;
  tool: string;
  category: string;
  difficulty: string;
  timeSpent: string;
  coverImage: string;
  tags: string[];
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  draft: boolean;
  outcome: string;
  content: string;
}

function readFiles(): Journal[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        tool: data.tool ?? "",
        category: data.category ?? "other",
        difficulty: data.difficulty ?? "intermediate",
        timeSpent: data.timeSpent ?? "",
        coverImage: data.coverImage ?? "",
        tags: data.tags ?? [],
        summary: data.summary ?? "",
        publishedAt: data.publishedAt ?? "",
        updatedAt: data.updatedAt,
        featured: data.featured ?? false,
        draft: data.draft ?? false,
        outcome: data.outcome ?? "",
        content,
      };
    })
    .filter((j) => !j.draft);
}

export function getAllJournals(): Journal[] {
  return readFiles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getJournalBySlug(slug: string): Journal | undefined {
  return readFiles().find((j) => j.slug === slug);
}

export function getFeaturedJournals(limit = 3): Journal[] {
  return readFiles()
    .filter((j) => j.featured)
    .slice(0, limit);
}
