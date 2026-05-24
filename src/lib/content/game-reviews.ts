import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/game-reviews");

export interface GameReview {
  slug: string;
  gameName: string;
  developer: string;
  releaseYear: number;
  platform: string[];
  genre: string[];
  rating: number;
  playTime: string;
  coverImage: string;
  tags: string[];
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  draft: boolean;
  content: string;
}

function readFiles(): GameReview[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      return {
        slug,
        gameName: data.gameName ?? "",
        developer: data.developer ?? "",
        releaseYear: data.releaseYear ?? 0,
        platform: data.platform ?? [],
        genre: data.genre ?? [],
        rating: data.rating ?? 0,
        playTime: data.playTime ?? "",
        coverImage: data.coverImage ?? "",
        tags: data.tags ?? [],
        summary: data.summary ?? "",
        publishedAt: data.publishedAt ?? "",
        updatedAt: data.updatedAt,
        featured: data.featured ?? false,
        draft: data.draft ?? false,
        content,
      };
    })
    .filter((r) => !r.draft);
}

export function getAllReviews(): GameReview[] {
  return readFiles().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getReviewBySlug(slug: string): GameReview | undefined {
  return readFiles().find((r) => r.slug === slug);
}

export function getFeaturedReviews(limit = 3): GameReview[] {
  return readFiles()
    .filter((r) => r.featured)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function getAllGenres(): string[] {
  return [...new Set(readFiles().flatMap((r) => r.genre))].sort();
}
