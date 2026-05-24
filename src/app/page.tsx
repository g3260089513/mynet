import { HeroSection } from "@/components/home/HeroSection";
import { SectionNav } from "@/components/home/SectionNav";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { getHomeHero } from "@/lib/content/home";

export default function HomePage() {
  const hero = getHomeHero();

  if (!hero) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-text-muted">
        首页内容尚未配置
      </div>
    );
  }

  return (
    <>
      <HeroSection hero={hero} />
      <SectionNav />
      <FeaturedGrid />
    </>
  );
}
