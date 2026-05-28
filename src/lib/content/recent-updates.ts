import { getAllReviews, type GameReview } from "./game-reviews";
import { getAllProjects, type Project } from "./portfolio";
import { getAllJournals, type Journal } from "./learning-journal";

export type ContentType = "review" | "project" | "journal";

export interface RecentItem {
  type: ContentType;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  /** 测评专用 */
  rating?: number;
  /** 作品专用 */
  techStack?: string[];
  /** 笔记专用 */
  tool?: string;
}

const ITEMS_PER_PAGE = 6;

function toRecentItem(review: GameReview): RecentItem {
  return {
    type: "review",
    slug: review.slug,
    title: review.gameName,
    summary: review.summary,
    publishedAt: review.publishedAt,
    tags: review.tags,
    rating: review.rating,
  };
}

function toRecentItemFromProject(project: Project): RecentItem {
  return {
    type: "project",
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    publishedAt: project.publishedAt,
    tags: project.techStack.slice(0, 3),
    techStack: project.techStack.slice(0, 4),
  };
}

function toRecentItemFromJournal(journal: Journal): RecentItem {
  return {
    type: "journal",
    slug: journal.slug,
    title: journal.title,
    summary: journal.summary,
    publishedAt: journal.publishedAt,
    tags: journal.tags,
    tool: journal.tool,
  };
}

function getAllItems(): RecentItem[] {
  const reviews = getAllReviews().map(toRecentItem);
  const projects = getAllProjects().map(toRecentItemFromProject);
  const journals = getAllJournals().map(toRecentItemFromJournal);

  return [...reviews, ...projects, ...journals].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRecentPage(page: number): {
  items: RecentItem[];
  totalPages: number;
} {
  const all = getAllItems();
  const totalPages = Math.max(1, Math.ceil(all.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  return {
    items: all.slice(start, start + ITEMS_PER_PAGE),
    totalPages,
  };
}
