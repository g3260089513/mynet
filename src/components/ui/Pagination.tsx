"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref: string;
}

export function Pagination({ currentPage, totalPages, baseHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="分页导航" className="flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? baseHref : `${baseHref}?page=${currentPage - 1}`}
          scroll={false}
          className="px-3 py-2 text-sm rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          上一页
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm rounded-lg text-text-muted/40 cursor-not-allowed select-none">
          上一页
        </span>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-text-muted">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={p === 1 ? baseHref : `${baseHref}?page=${p}`}
            scroll={false}
            className={cn(
              "w-9 h-9 rounded-lg text-sm flex items-center justify-center transition-colors",
              p === currentPage
                ? "bg-gold-400 text-surface-deepest font-semibold"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
            )}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={`${baseHref}?page=${currentPage + 1}`}
          scroll={false}
          className="px-3 py-2 text-sm rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          下一页
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm rounded-lg text-text-muted/40 cursor-not-allowed select-none">
          下一页
        </span>
      )}
    </nav>
  );
}
