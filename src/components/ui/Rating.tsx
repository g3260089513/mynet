import { cn } from "@/lib/utils/cn";

interface RatingProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

function ratingColor(value: number): string {
  if (value >= 8.5) return "text-gold-400";
  if (value >= 7) return "text-amber-400";
  if (value >= 5) return "text-amber-200";
  return "text-text-muted";
}

const sizes = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

const labelSizes = {
  sm: "text-[10px]",
  md: "text-sm",
  lg: "text-lg",
};

export function Rating({
  value,
  size = "md",
  showLabel = true,
  className,
}: RatingProps) {
  return (
    <div className={cn("inline-flex items-baseline gap-0.5", className)}>
      <span
        className={cn(
          "font-heading font-bold leading-none tracking-tight",
          ratingColor(value),
          sizes[size]
        )}
      >
        {value.toFixed(1)}
      </span>
      {showLabel && (
        <span className={cn("text-text-muted font-medium", labelSizes[size])}>
          /10
        </span>
      )}
    </div>
  );
}
