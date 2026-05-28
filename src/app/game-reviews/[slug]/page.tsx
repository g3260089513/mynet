import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { MdxWrapper } from "@/components/mdx/MdxWrapper";
import { TocMobile, TocDesktop } from "@/components/ui/TableOfContents";
import { extractTocItems } from "@/lib/utils/toc";
import { getReviewBySlug, getAllReviews } from "@/lib/content/game-reviews";
import { formatDate } from "@/lib/utils/date";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllReviews().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return { title: "未找到" };
  return {
    title: review.gameName,
    description: review.summary,
  };
}

export default async function GameReviewDetailPage({ params }: Props) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const tocItems = extractTocItems(review.content);

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="lg:flex lg:gap-10">
          <article className="min-w-0 flex-1 max-w-3xl">
            <ScrollReveal>
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-3 h-3 rotate-45 bg-gradient-to-br from-gold-400 to-gold-600" />
                  <span className="text-gold-400 font-mono text-xs tracking-widest uppercase">
                    游戏测评
                  </span>
                  {review.status === "maintained" && (
                    <Badge variant="gold">持续更新</Badge>
                  )}
                  {review.status === "ongoing" && (
                    <Badge variant="green">游玩中</Badge>
                  )}
                </div>

                <h1 className="font-heading text-display font-bold text-text-primary mb-4">
                  {review.gameName}
                </h1>
                <p className="text-text-muted mb-4">
                  {review.developer} · {review.releaseYear} · {review.playTime}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Rating value={review.rating} size="lg" />
                  <div className="flex flex-wrap gap-1.5">
                    {review.platform.map((p) => (
                      <Tag key={p} variant="outline" size="md">
                        {p}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {review.tags.map((t) => (
                    <Tag key={t} variant="gold" size="md">
                      {t}
                    </Tag>
                  ))}
                </div>

                <p className="text-text-secondary text-lg leading-relaxed mb-4">
                  {review.summary}
                </p>

                <time className="text-text-muted text-sm">
                  {formatDate(review.publishedAt)}
                </time>
              </header>
            </ScrollReveal>

            <TocMobile items={tocItems} />

            <ScrollReveal delay={0.2}>
              <GlassCard variant="default" padding="lg" className="mb-section">
                <MdxWrapper source={review.content} />
              </GlassCard>
            </ScrollReveal>
          </article>

          <TocDesktop items={tocItems} />
        </div>
      </div>
    </div>
  );
}
