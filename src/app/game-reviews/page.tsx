import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Rating } from "@/components/ui/Rating";
import { getAllReviews, getAllGenres } from "@/lib/content/game-reviews";
import { formatDate } from "@/lib/utils/date";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "游戏测评",
  description: "深度游戏体验分享与评分",
};

export default function GameReviewsPage() {
  const reviews = getAllReviews();
  const genres = getAllGenres();

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="游戏测评"
            subtitle="记录每一款值得深入体验的游戏"
          />
        </ScrollReveal>

        {/* Genre filters */}
        {genres.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {genres.map((genre) => (
                <Tag key={genre} variant="gold" size="md">
                  {genre}
                </Tag>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-section">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.slug} delay={i * 0.1}>
              <GlassCard
                href={`/game-reviews/${review.slug}`}
                variant="default"
                hover="lift"
                padding="none"
                className="overflow-hidden h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-text-primary">
                        {review.gameName}
                      </h3>
                      <p className="text-text-muted text-sm">
                        {review.developer} · {review.releaseYear}
                      </p>
                    </div>
                    <Rating value={review.rating} size="sm" />
                  </div>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                    {review.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {review.tags.slice(0, 3).map((t) => (
                        <Tag key={t} variant="default" size="sm">
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <span className="text-text-muted text-xs">
                      {formatDate(review.publishedAt)}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center text-text-muted py-20">
            暂无测评内容
          </div>
        )}
      </div>
    </div>
  );
}
