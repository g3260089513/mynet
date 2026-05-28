import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MdxWrapper } from "@/components/mdx/MdxWrapper";
import { TocMobile, TocDesktop } from "@/components/ui/TableOfContents";
import { extractTocItems } from "@/lib/utils/toc";
import { getProjectBySlug, getAllProjects } from "@/lib/content/portfolio";
import { formatDate } from "@/lib/utils/date";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "未找到" };
  return {
    title: project.title,
    description: project.summary,
  };
}

const statusLabels: Record<string, { label: string; variant: "default" | "gold" | "green" | "amber" }> = {
  completed: { label: "已完成", variant: "green" },
  "in-progress": { label: "开发中", variant: "amber" },
  maintained: { label: "维护中", variant: "gold" },
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const tocItems = extractTocItems(project.content);

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
                    作品
                  </span>
                  {project.status !== "completed" && (
                    <Badge
                      variant={statusLabels[project.status]?.variant ?? "default"}
                    >
                      {statusLabels[project.status]?.label ?? project.status}
                    </Badge>
                  )}
                </div>

                <h1 className="font-heading text-display font-bold text-text-primary mb-4">
                  {project.title}
                </h1>

                <p className="text-text-muted mb-4">
                  {project.role} · {formatDate(project.publishedAt)}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((t) => (
                    <Tag key={t} variant="gold" size="md">
                      {t}
                    </Tag>
                  ))}
                </div>

                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  {project.summary}
                </p>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button variant="gold" href={project.liveUrl} external>
                      在线体验
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button variant="secondary" href={project.repoUrl} external>
                      源代码
                    </Button>
                  )}
                </div>
              </header>
            </ScrollReveal>

            {/* Image gallery */}
            {project.images.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div
                  className={`grid gap-4 mb-10 ${
                    project.images.length === 1
                      ? "grid-cols-1"
                      : project.images.length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {project.images.map((src, i) => (
                    <div
                      key={src}
                      className={`overflow-hidden rounded-xl border border-border-subtle ${
                        i === 0 && project.images.length >= 3
                          ? "md:col-span-2 md:row-span-2"
                          : ""
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${project.title} 截图 ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            <TocMobile items={tocItems} />

            <ScrollReveal delay={0.2}>
              <GlassCard variant="default" padding="lg" className="mb-section">
                <MdxWrapper source={project.content} />
              </GlassCard>
            </ScrollReveal>
          </article>

          <TocDesktop items={tocItems} />
        </div>
      </div>
    </div>
  );
}
