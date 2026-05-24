import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold";
  href?: string;
  external?: boolean;
  className?: string;
}

const buttonVariants = {
  primary:
    "bg-text-primary text-surface-deepest hover:bg-text-secondary",
  secondary:
    "bg-transparent border border-border-subtle text-text-secondary hover:border-text-muted hover:text-text-primary",
  gold: "bg-gold-400 text-surface-deepest hover:bg-gold-300 font-semibold",
};

export function Button({
  children,
  variant = "primary",
  href,
  external,
  className,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
    buttonVariants[variant],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
