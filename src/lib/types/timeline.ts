export interface TimelineItem {
  date: string;
  title: string;
  company?: string;
  type: "work" | "education" | "milestone" | "certification";
  description: string;
  highlight: boolean;
  tags: string[];
}

export interface TimelineFrontmatter {
  items: TimelineItem[];
}
