import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { MdxWrapper } from "@/components/mdx/MdxWrapper";
import { TocMobile, TocDesktop } from "@/components/ui/TableOfContents";
import { extractTocItems } from "@/lib/utils/toc";
import { getJournalBySlug, getAllJournals } from "@/lib/content/learning-journal";
import { formatDate } from "@/lib/utils/date";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJournals().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journal = getJournalBySlug(slug);
  if (!journal) return { title: "未找到" };
  return {
    title: journal.title,
    description: journal.summary,
  };
}

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

export default async function LearningJournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const journal = getJournalBySlug(slug);
  if (!journal) notFound();

  const tocItems = extractTocItems(journal.content);

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
                    学习笔记
                  </span>
                  <Badge
                    variant={difficultyLabels[journal.difficulty]?.variant ?? "default"}
                  >
                    {difficultyLabels[journal.difficulty]?.label ?? journal.difficulty}
                  </Badge>
                </div>

                <h1 className="font-heading text-display font-bold text-text-primary mb-4">
                  {journal.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-text-muted mb-4">
                  <span className="text-gold-400">{journal.tool}</span>
                  <span>·</span>
                  <span>{categoryLabels[journal.category] ?? journal.category}</span>
                  <span>·</span>
                  <span>{journal.timeSpent}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {journal.tags.map((t) => (
                    <Tag key={t} variant="gold" size="md">
                      {t}
                    </Tag>
                  ))}
                </div>

                <p className="text-text-secondary text-lg leading-relaxed mb-3">
                  {journal.summary}
                </p>

                <div className="flex items-center gap-4 text-text-muted text-sm">
                  <span>{formatDate(journal.publishedAt)}</span>
                  {journal.outcome && (
                    <>
                      <span>·</span>
                      <span className="text-amber-400">成果：{journal.outcome}</span>
                    </>
                  )}
                </div>
              </header>
            </ScrollReveal>

            <TocMobile items={tocItems} />

            <ScrollReveal delay={0.2}>
              <GlassCard variant="default" padding="lg" className="mb-section">
                <MdxWrapper source={journal.content} />
              </GlassCard>
            </ScrollReveal>
          </article>

          <TocDesktop items={tocItems} />
        </div>
      </div>
    </div>
  );
}
