"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import type { HomeFrontmatter } from "@/lib/types/home";

interface HeroSectionProps {
  hero: HomeFrontmatter;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      <div className="relative z-10 max-w-4xl">
        <p className="text-gold-400 font-mono text-sm tracking-widest uppercase mb-6 animate-fade-in">
          {hero.greeting}
        </p>

        <AnimatedText
          text={hero.name}
          as="h1"
          animation="reveal"
          className="font-heading text-hero font-bold gold-gradient-text mb-8"
        />

        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          {hero.roles.map((role, i) => (
            <span
              key={role}
              className="text-lg text-text-secondary font-light"
            >
              {i > 0 && (
                <span className="mx-2 text-gold-400/40">·</span>
              )}
              {role}
            </span>
          ))}
        </div>

        <p
          className="text-xl text-text-muted max-w-xl mx-auto mb-12 animate-fade-in text-balance"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          {hero.tagline}
        </p>

        <div
          className="flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
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
