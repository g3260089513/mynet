import { GlassCard } from "@/components/ui/GlassCard";

interface NavItem {
  title: string;
  description: string;
  href: string;
}

const sections: NavItem[] = [
  {
    title: "关于我",
    description: "了解我的背景、技能和从业经历",
    href: "/about",
  },
  {
    title: "游戏测评",
    description: "深度游戏体验分享与评分",
    href: "/game-reviews",
  },
  {
    title: "作品集",
    description: "技术项目与创意作品展示",
    href: "/portfolio",
  },
  {
    title: "学习笔记",
    description: "各类工具与技术的学习实践记录",
    href: "/learning-journal",
  },
];

export function SectionNav() {
  return (
    <section className="px-6 pb-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section, i) => (
            <GlassCard
              key={section.href}
              href={section.href}
              variant="default"
              hover="glow"
              padding="lg"
              className="group"
            >
              <span className="text-gold-400 font-mono text-xs tracking-widest uppercase mb-3 block">
                0{i + 1}
              </span>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1 group-hover:text-gold-400 transition-colors">
                {section.title}
              </h3>
              <p className="text-text-muted text-sm">
                {section.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
