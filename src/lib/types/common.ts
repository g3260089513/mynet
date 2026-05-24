export interface ContentMeta {
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  draft: boolean;
}

export interface SEO {
  title: string;
  description: string;
  ogImage?: string;
}
