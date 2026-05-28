import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Pagination } from "@/components/ui/Pagination";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getRecentPage, type RecentItem } from "@/lib/content/recent-updates";
import { formatDate } from "@/lib/utils/date";

const typeMeta: Record<string, { label: string; color: string; tagVariant: "default" | "gold" | "outline" }> = {
  review: { label: "游戏测评", color: "text-gold-400", tagVariant: "gold" },
  project: { label: "作品", color: "text-emerald-400", tagVariant: "outline" },
  journal: { label: "学习笔记", color: "text-amber-400", tagVariant: "default" },
};

function UpdateCard({ item, index }: { item: RecentItem; index: number }) {
  const meta = typeMeta[item.type];
  const href = `/${item.type === "review" ? "game-reviews" : item.type === "project" ? "portfolio" : "learning-journal"}/${item.slug}`;

  return (
    <ScrollReveal delay={index * 0.08}>
      <GlassCard
        href={href}
        variant="default"
        hover="lift"
        padding="none"
        className="overflow-hidden h-full"
      >
        <div className="p-6 flex flex-col h-full">
          <span className={`${meta.color} font-mono text-xs tracking-widest uppercase mb-2`}>
            {meta.label}
          </span>
          <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
            {item.title}
          </h3>
          <p className="text-text-muted text-sm mb-3 line-clamp-2 flex-1">
            {item.summary}
          </p>

          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
              {item.tags.slice(0, 3).map((t) => (
                <Tag key={t} size="sm" variant={meta.tagVariant}>{t}</Tag>
              ))}
              {item.tags.length > 3 && (
                <span className="text-text-muted text-xs shrink-0">+{item.tags.length - 3}</span>
              )}
            </div>
            <span className="text-text-muted text-xs shrink-0 ml-auto">
              {formatDate(item.publishedAt)}
            </span>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

interface RecentUpdatesProps {
  page: number;
}

export function RecentUpdates({ page }: RecentUpdatesProps) {
  const { items, totalPages } = getRecentPage(page);

  if (items.length === 0) {
    return (
      <section className="px-6 pb-section">
        <div className="mx-auto max-w-7xl text-center text-text-muted py-20">
          暂无内容
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-section">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-3 h-3 rotate-45 bg-gradient-to-br from-gold-400 to-gold-600" />
            <h2 className="font-heading text-h2 font-bold text-text-primary">
              最近更新内容
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item, i) => (
            <UpdateCard key={`${item.type}-${item.slug}`} item={item} index={i} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} baseHref="/" />
      </div>
    </section>
  );
}
