import { cn } from "@/lib/utils/cn";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const tagVariants = {
  default: "bg-surface-elevated text-text-secondary border border-border-subtle",
  gold: "bg-gold-400/10 text-gold-400 border border-gold-400/20",
  outline: "bg-transparent text-text-muted border border-border-subtle",
};

const tagSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export function Tag({
  children,
  variant = "default",
  size = "md",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full font-medium leading-none",
        tagVariants[variant],
        tagSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
