import fs from "fs";
import path from "path";
import matter from "gray-matter";

const filePath = path.join(process.cwd(), "content/timeline/milestones.mdx");

export interface TimelineItem {
  date: string;
  title: string;
  company?: string;
  type: string;
  description: string;
  highlight: boolean;
  tags: string[];
}

export function getTimeline(): TimelineItem[] {
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return (data.items ?? []) as TimelineItem[];
}
