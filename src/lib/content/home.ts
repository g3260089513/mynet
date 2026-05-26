import fs from "fs";
import path from "path";
import matter from "gray-matter";

const filePath = path.join(process.cwd(), "content/home/hero.mdx");

export interface HomeHero {
  greeting: string;
  name: string;
  roles: string[];
  tagline: string;
  maskImage: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  content: string;
}

export function getHomeHero(): HomeHero | null {
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    greeting: data.greeting ?? "",
    name: data.name ?? "",
    roles: data.roles ?? [],
    tagline: data.tagline ?? "",
    maskImage: data.maskImage ?? "",
    ctaPrimary: data.ctaPrimary ?? { label: "", href: "" },
    ctaSecondary: data.ctaSecondary ?? { label: "", href: "" },
    content,
  };
}
