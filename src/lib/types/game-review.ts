export interface GameReviewFrontmatter {
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
}
