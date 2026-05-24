"use client";

import { useRef, useEffect, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils/cn";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: ElementType;
  className?: string;
}

const directionClasses = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all",
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : cn("opacity-0", directionClasses[direction]),
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </Tag>
  );
}
