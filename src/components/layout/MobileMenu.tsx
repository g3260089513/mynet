"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { navigation } from "@/lib/constants/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        <span
          className={cn(
            "block w-5 h-px bg-text-primary transition-all duration-300",
            open && "rotate-45 translate-y-1"
          )}
        />
        <span
          className={cn(
            "block w-5 h-px bg-text-primary transition-all duration-300",
            open && "-rotate-45 -translate-y-0.5"
          )}
        />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-surface-deepest/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navigation.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-2xl font-heading transition-all duration-300",
              "animate-fade-in",
              pathname === item.href
                ? "text-gold-400"
                : "text-text-secondary hover:text-text-primary"
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
