"use client";

import { Button } from "@/components/ui/Button";
import type { HomeHero } from "@/lib/content/home";

interface HeroSectionProps {
  hero: HomeHero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      <div className="relative z-10 max-w-4xl">
        <p className="text-gold-400 font-mono text-sm tracking-widest uppercase mb-6 animate-fade-in">
          {hero.greeting}
        </p>

        {/* Hover reveal name */}
        <div className="group relative inline-block mb-8 cursor-default">
          {/* Gold gradient text (always underneath) */}
          <h1 className="font-heading text-hero font-bold gold-gradient-text leading-tight">
            {hero.name}
          </h1>

          {/* Mask image overlay — fades on hover
              调整方法：
              - w-[数值px] / h-[数值px]  控制遮罩宽度/高度
              - -top-[数值px] / -left-[数值px]  负值让遮罩向该方向延伸超出文字区域
              - bg-cover 改为 bg-contain  让图片完整显示不裁剪
              - bg-bottom  控制图片对齐位置 (center/top/bottom/left/right) */}
          <div
            className="absolute -inset-x-8 -inset-y-6 bg-cover bg-center transition-all duration-700 ease-out group-hover:opacity-0 rounded-lg"
            style={{ backgroundImage: `url(${hero.maskImage})` }}
            aria-hidden="true"
          />
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          {hero.roles.map((role, i) => (
            <span
              key={role}
              className="text-lg text-text-secondary font-light"
            >
              {i > 0 && (
                <span className="mx-2 text-gold-400/40">&middot;</span>
              )}
              {role}
            </span>
          ))}
        </div>

        <p
          className="text-xl text-text-muted max-w-xl mx-auto mb-12 animate-fade-in text-balance"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          {hero.tagline}
        </p>

        <div
          className="flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          <Button variant="gold" href={hero.ctaPrimary.href}>
            {hero.ctaPrimary.label}
          </Button>
          <Button variant="secondary" href={hero.ctaSecondary.href}>
            {hero.ctaSecondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
