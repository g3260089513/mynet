import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我",
  description: "与我取得联系",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="联系我"
            subtitle="欢迎通过以下方式与我交流"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-section">
          <ScrollReveal delay={0.1}>
            <GlassCard variant="gold" padding="lg" className="text-center">
              <div className="text-4xl mb-4">&#9993;</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                电子邮件
              </h3>
              <p className="text-text-muted text-sm mb-4">
                我会尽快回复您的邮件
              </p>
              <Button variant="secondary" href="mailto:lara@example.com" external>
                lara@example.com
              </Button>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard variant="default" padding="lg" className="text-center">
              <div className="text-4xl mb-4">&#9906;</div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                GitHub
              </h3>
              <p className="text-text-muted text-sm mb-4">
                查看我的开源项目和代码
              </p>
              <Button variant="secondary" href="https://github.com/lara" external>
                @lara
              </Button>
            </GlassCard>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <GlassCard variant="default" padding="lg" className="text-center mb-section">
            <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
              合作方向
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { title: "游戏测评", desc: "游戏评测合作与约稿" },
                { title: "前端开发", desc: "Web 应用与工具开发" },
                { title: "技术写作", desc: "教程与技术文章创作" },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-surface-elevated">
                  <h4 className="font-heading text-base font-bold text-gold-400 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  );
}
