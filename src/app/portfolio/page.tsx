import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { getAllProjects, getAllCategories } from "@/lib/content/portfolio";
import { formatDate } from "@/lib/utils/date";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "作品集",
  description: "技术项目与创意作品展示",
};

const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "移动端",
  game: "游戏",
  cli: "CLI 工具",
  library: "库",
  design: "设计",
};

const statusLabels: Record<string, { label: string; variant: "default" | "gold" | "green" | "amber" }> = {
  completed: { label: "已完成", variant: "green" },
  "in-progress": { label: "开发中", variant: "amber" },
  maintained: { label: "维护中", variant: "gold" },
};

export default function PortfolioPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="作品集"
            subtitle="技术项目与创意作品"
          />
        </ScrollReveal>

        {categories.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <Tag key={cat} variant="gold" size="md">
                  {categoryLabels[cat] ?? cat}
                </Tag>
              ))}
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-section">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <GlassCard
                href={`/portfolio/${project.slug}`}
                variant="default"
                hover="lift"
                padding="none"
                className="overflow-hidden h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {project.title}
                    </h3>
                    {project.status !== "completed" && (
                      <Badge
                        variant={statusLabels[project.status]?.variant ?? "default"}
                      >
                        {statusLabels[project.status]?.label ?? project.status}
                      </Badge>
                    )}
                  </div>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.slice(0, 4).map((t) => (
                      <Tag key={t} size="sm">
                        {t}
                      </Tag>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-xs">
                      {project.role}
                    </span>
                    <span className="text-text-muted text-xs">
                      {formatDate(project.publishedAt)}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-text-muted py-20">
            暂无作品展示
          </div>
        )}
      </div>
    </div>
  );
}
