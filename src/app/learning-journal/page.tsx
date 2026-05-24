import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { getAllJournals } from "@/lib/content/learning-journal";
import { formatDate } from "@/lib/utils/date";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学习笔记",
  description: "各类工具与技术的学习实践记录",
};

const difficultyLabels: Record<string, { label: string; variant: "default" | "gold" | "green" | "amber" }> = {
  beginner: { label: "入门", variant: "green" },
  intermediate: { label: "进阶", variant: "gold" },
  advanced: { label: "高级", variant: "amber" },
};

const categoryLabels: Record<string, string> = {
  language: "编程语言",
  framework: "框架",
  tool: "工具",
  concept: "概念",
  engine: "游戏引擎",
};

export default function LearningJournalPage() {
  const journals = getAllJournals();

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="学习笔记"
            subtitle="记录学习新工具和技术的历程与心得"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-section">
          {journals.map((journal, i) => (
            <ScrollReveal key={journal.slug} delay={i * 0.1}>
              <GlassCard
                href={`/learning-journal/${journal.slug}`}
                variant="default"
                hover="lift"
                padding="none"
                className="overflow-hidden h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {journal.title}
                    </h3>
                    <Badge
                      variant={difficultyLabels[journal.difficulty]?.variant ?? "default"}
                    >
                      {difficultyLabels[journal.difficulty]?.label ?? journal.difficulty}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-gold-400 text-sm">{journal.tool}</span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-muted text-sm">
                      {categoryLabels[journal.category] ?? journal.category}
                    </span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-muted text-sm">{journal.timeSpent}</span>
                  </div>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                    {journal.summary}
                  </p>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {journal.tags.map((t) => (
                        <Tag key={t} variant="default" size="sm">
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <p className="text-text-muted text-xs">
                      {formatDate(journal.publishedAt)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {journals.length === 0 && (
          <div className="text-center text-text-muted py-20">
            暂无学习笔记
          </div>
        )}
      </div>
    </div>
  );
}
