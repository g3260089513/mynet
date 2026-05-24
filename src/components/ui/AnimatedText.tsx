"use client";

import { cn } from "@/lib/utils/cn";
import { type ElementType } from "react";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animation?: "reveal" | "fadeIn";
  delay?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
}

export function AnimatedText({
  text,
  as: Tag = "h1",
  animation = "reveal",
  delay = 0,
  stagger = 0.03,
  className,
}: AnimatedTextProps) {
  const chars = text.split("");

  return (
    <Tag className={cn(className)} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={cn(
            "inline-block opacity-0",
            animation === "reveal" && "animate-char-reveal"
          )}
          style={{
            animationDelay: `${delay + i * stagger}s`,
            animationFillMode: "forwards",
          }}
          aria-hidden={char === " " ? "true" : undefined}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </Tag>
  );
}
