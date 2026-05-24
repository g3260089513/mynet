import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { getAbout } from "@/lib/content/about";
import { MdxWrapper } from "@/components/mdx/MdxWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解我的背景、技能和从业经历",
};

export default function AboutPage() {
  const about = getAbout();

  if (!about) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-text-muted">
        个人简介尚未配置
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="关于我"
            subtitle="了解我的故事、技能和经历"
          />
        </ScrollReveal>

        {/* Bio + Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-section">
          <ScrollReveal className="lg:col-span-2">
            <GlassCard variant="default" padding="lg">
              <h3 className="font-heading text-h3 font-bold text-text-primary mb-4">
                {about.name}
              </h3>
              <p className="text-gold-400 text-sm mb-1">{about.title}</p>
              <p className="text-text-muted text-sm mb-6">{about.location}</p>
              {about.content && (
                <MdxWrapper source={about.content} />
              )}
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard variant="gold" padding="lg">
              <h3 className="font-heading text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">
                数据一览
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {about.highlights.map((h) => (
                  <div key={h.label} className="text-center">
                    <div className="text-2xl font-heading font-bold gold-gradient-text">
                      {h.value}
                    </div>
                    <div className="text-xs text-text-muted mt-1">{h.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Skills */}
        <ScrollReveal>
          <SectionHeading
            title="技能"
            subtitle="持续学习和实践中积累的技术能力"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-section">
          {about.skills.map((cat, i) => (
            <ScrollReveal key={cat.category} delay={i * 0.1}>
              <GlassCard variant="default" padding="lg">
                <h4 className="font-heading text-base font-bold text-text-primary mb-3">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill) => (
                    <Tag key={skill} variant="default" size="sm">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Experience */}
        <ScrollReveal>
          <SectionHeading
            title="经历"
            subtitle="职业生涯中的重要节点"
          />
        </ScrollReveal>
        <div className="space-y-4 mb-section">
          {about.experience.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <GlassCard variant="default" padding="lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-text-primary">
                      {exp.role}
                    </h4>
                    <p className="text-gold-400 text-sm">{exp.company}</p>
                  </div>
                  <Badge variant="gold">{exp.period}</Badge>
                </div>
                <p className="text-text-secondary text-sm">{exp.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
