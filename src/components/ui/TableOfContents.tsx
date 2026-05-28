"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import type { TocItem } from "@/lib/utils/toc";

/** 移动端折叠目录，放在文章顶部 */
export function TocMobile({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="lg:hidden mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors w-full px-4 py-2 rounded-lg border border-border-subtle bg-surface-base/50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        目录 ({items.length})
      </button>
      {open && (
        <nav className="mt-2 p-4 rounded-xl border border-border-subtle bg-surface-base/50 backdrop-blur">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block py-1.5 text-sm text-text-secondary hover:text-gold-400 transition-colors"
            >
              {item.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

/** 桌面端 sticky 侧边栏目录 */
export function TocDesktop({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          目录
        </h4>
        <nav className="border-l border-border-subtle">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "block py-1.5 pl-4 text-sm border-l-2 -ml-px transition-colors",
                activeId === item.id
                  ? "border-gold-400 text-gold-400"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle"
              )}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
