import { HeroSection } from "@/components/home/HeroSection";
import { SectionNav } from "@/components/home/SectionNav";
import { RecentUpdates } from "@/components/home/RecentUpdates";
import { getHomeHero } from "@/lib/content/home";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const hero = getHomeHero();
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? "1", 10) || 1);

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
      <RecentUpdates page={pageNum} />
    </>
  );
}
