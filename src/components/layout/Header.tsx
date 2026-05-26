"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { navigation } from "@/lib/constants/navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-surface-deepest/80 backdrop-blur-xl border-b border-border-subtle"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-heading text-xl font-bold gold-gradient-text tracking-wide"
        >
          MYhao
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm rounded-lg transition-all duration-300",
                pathname === item.href
                  ? "text-gold-400 bg-gold-400/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
