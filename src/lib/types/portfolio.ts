export interface PortfolioFrontmatter {
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
}
