import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Rating } from "@/components/ui/Rating";
import { getFeaturedReviews } from "@/lib/content/game-reviews";
import { getFeaturedProjects } from "@/lib/content/portfolio";
import { getFeaturedJournals } from "@/lib/content/learning-journal";

export function FeaturedGrid() {
  const reviews = getFeaturedReviews(2);
  const projects = getFeaturedProjects(2);
  const journals = getFeaturedJournals(2);

  return (
    <section className="px-6 pb-section">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-3 h-3 rotate-45 bg-gradient-to-br from-gold-400 to-gold-600" />
          <h2 className="font-heading text-h2 font-bold text-text-primary">
            精选内容
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <GlassCard
              key={review.slug}
              href={`/game-reviews/${review.slug}`}
              variant="default"
              hover="lift"
              padding="none"
              className="overflow-hidden"
            >
              <div className="p-6">
                <span className="text-gold-400 font-mono text-xs tracking-widest uppercase">
                  游戏测评
                </span>
                <h3 className="font-heading text-lg font-bold text-text-primary mt-2 mb-1">
                  {review.gameName}
                </h3>
                <p className="text-text-muted text-sm mb-3 line-clamp-2">
                  {review.summary}
                </p>
                <div className="flex items-center justify-between">
                  <Rating value={review.rating} size="sm" />
                  <div className="flex gap-1">
                    {review.tags.slice(0, 2).map((t) => (
                      <Tag key={t} variant="gold" size="sm">
                        {t}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}

          {projects.map((project) => (
            <GlassCard
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              variant="default"
              hover="lift"
              padding="none"
              className="overflow-hidden"
            >
              <div className="p-6">
                <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
                  作品
                </span>
                <h3 className="font-heading text-lg font-bold text-text-primary mt-2 mb-1">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm mb-3 line-clamp-2">
                  {project.summary}
                </p>
                <div className="flex gap-1">
                  {project.techStack.slice(0, 3).map((t) => (
                    <Tag key={t} size="sm">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}

          {journals.map((journal) => (
            <GlassCard
              key={journal.slug}
              href={`/learning-journal/${journal.slug}`}
              variant="default"
              hover="lift"
              padding="none"
              className="overflow-hidden"
            >
              <div className="p-6">
                <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                  学习笔记
                </span>
                <h3 className="font-heading text-lg font-bold text-text-primary mt-2 mb-1">
                  {journal.title}
                </h3>
                <p className="text-text-muted text-sm mb-3 line-clamp-2">
                  {journal.summary}
                </p>
                <div className="flex gap-1">
                  {journal.tags.slice(0, 2).map((t) => (
                    <Tag key={t} variant="outline" size="sm">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
