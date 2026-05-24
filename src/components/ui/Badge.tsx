import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "green" | "amber";
  className?: string;
}

const badgeVariants = {
  default: "bg-surface-elevated text-text-secondary border-border-subtle",
  gold: "bg-gold-400/15 text-gold-400 border-gold-400/20",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium border",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
