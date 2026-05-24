import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Badge } from "@/components/ui/Badge";
import { getTimeline } from "@/lib/content/timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "职业历程",
  description: "职业生涯中的重要里程碑",
};

const typeLabels: Record<string, { label: string; variant: "default" | "gold" | "green" | "amber" }> = {
  work: { label: "工作", variant: "gold" },
  education: { label: "教育", variant: "green" },
  milestone: { label: "里程碑", variant: "amber" },
  certification: { label: "认证", variant: "default" },
};

export default function TimelinePage() {
  const items = getTimeline();

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="职业历程"
            subtitle="一路走来的重要节点"
          />
        </ScrollReveal>

        {items.length > 0 ? (
          <div className="relative mb-section">
            {/* Central line - desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/30 via-gold-400/10 to-transparent -translate-x-1/2" />

            <div className="space-y-8">
              {items.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div
                    className={`relative flex flex-col md:flex-row gap-4 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot connector */}
                    <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-gold-400 ring-4 ring-surface-deepest z-10" />

                    {/* Date */}
                    <div
                      className={`md:w-1/2 flex ${
                        i % 2 === 0 ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"
                      }`}
                    >
                      <div className="md:text-right">
                        <span className="text-gold-400 font-mono text-sm tracking-wider">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className="md:w-1/2">
                      <GlassCard
                        variant={item.highlight ? "gold" : "default"}
                        padding="lg"
                        hover={item.highlight ? "glow" : "none"}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading text-lg font-bold text-text-primary">
                            {item.title}
                          </h3>
                          {item.company && (
                            <span className="text-gold-400 text-sm">
                              @ {item.company}
                            </span>
                          )}
                          <Badge
                            variant={typeLabels[item.type]?.variant ?? "default"}
                          >
                            {typeLabels[item.type]?.label ?? item.type}
                          </Badge>
                        </div>
                        <p className="text-text-secondary text-sm mb-3">
                          {item.description}
                        </p>
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((t) => (
                              <Tag key={t} size="sm">
                                {t}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </GlassCard>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-text-muted py-20">
            暂无时间线数据
          </div>
        )}
      </div>
    </div>
  );
}
