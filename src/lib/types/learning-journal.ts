export interface LearningJournalFrontmatter {
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
}
