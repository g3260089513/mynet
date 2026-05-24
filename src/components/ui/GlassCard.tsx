import { cn } from "@/lib/utils/cn";
import { type ElementType, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  variant?: "default" | "gold" | "elevated";
  hover?: "lift" | "glow" | "none";
  padding?: "sm" | "md" | "lg" | "none";
  as?: ElementType;
  href?: string;
  className?: string;
}

const variants = {
  default:
    "bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]",
  gold: "bg-white/[0.03] backdrop-blur-xl border border-gold-400/15 shadow-[0_0_30px_rgba(212,168,83,0.05),inset_0_0_30px_rgba(212,168,83,0.02)]",
  elevated:
    "bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/30",
};

const hovers = {
  lift: "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 ease-out",
  glow: "hover:border-gold-400/30 hover:shadow-[0_0_40px_rgba(212,168,83,0.1)] transition-all duration-500",
  none: "",
};

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  none: "",
};

export function GlassCard({
  children,
  variant = "default",
  hover = "lift",
  padding = "md",
  as: Tag = "div",
  href,
  className,
}: GlassCardProps) {
  const classes = cn(
    "rounded-2xl",
    variants[variant],
    hovers[hover],
    paddings[padding],
    href && "cursor-pointer",
    className
  );

  if (href) {
    const NextLink = require("next/link").default;
    return (
      <NextLink href={href} className={cn(classes, "block")}>
        {children}
      </NextLink>
    );
  }

  return <Tag className={classes}>{children}</Tag>;
}
