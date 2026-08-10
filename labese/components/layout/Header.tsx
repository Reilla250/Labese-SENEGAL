"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/site";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";

interface HeaderProps {
  site: {
    name: string;
    tagline: string;
  };
}

export default function Header({ site }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_var(--color-line)] shadow-navy/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-display text-2xl font-semibold text-navy group-hover:text-forest transition-colors">
            {site.name}
          </span>
          <span className="hidden sm:block text-[11px] uppercase tracking-[0.14em] text-forest font-mono-stat">
            {site.tagline}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1"
        >
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-forest"
                    : "text-navy/80 hover:text-forest"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/get-involved"
            className="inline-flex items-center rounded-md bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-dark transition-colors"
          >
            Partner with Us
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white/95 text-navy shadow-sm shadow-navy/5 transition hover:bg-forest/10 focus-visible:outline-2 focus-visible:outline-sand"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} site={site} />
    </header>
  );
}
