import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="block w-3 h-3 rotate-45 bg-gradient-to-br from-gold-400 to-gold-600" />
        <span className="h-px w-12 bg-gradient-to-r from-gold-400/50 to-transparent" />
      </div>
      <h2 className="font-heading text-display font-bold text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-body max-w-2xl text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
