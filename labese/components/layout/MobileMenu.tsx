"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { mainNav } from "@/data/site";
import { useEffect, useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  open: boolean;
  onClose: () => void;
  site: {
    name: string;
  };
};

export default function MobileMenu({ open, onClose, site }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-menu"
      className="lg:hidden fixed inset-0 z-50 min-h-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 min-h-screen bg-navy/50 opacity-95"
      />
      <div className="fixed top-0 right-0 bottom-0 h-screen w-full max-w-[92vw] sm:w-[92%] md:w-[86%] max-w-sm bg-white/95 border-l border-navy/10 shadow-2xl shadow-navy/20 transition-transform duration-300 ease-out flex flex-col overflow-hidden translate-x-0">
        <div className="flex items-start justify-between gap-4 bg-navy px-6 py-6">
          <div>
            <span className="font-display text-lg font-semibold uppercase tracking-[0.32em] text-forest/70">
              Menu
            </span>
            <div className="mt-3">
              <span className="font-display text-xl font-semibold text-white">
                {site.name}
              </span>
              <p className="mt-2 max-w-[16rem] text-sm uppercase tracking-[0.24em] text-slate-300">
                Health. Rights. Community.
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg shadow-navy/20 transition hover:bg-white/20"
            aria-label="Close menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 pt-4 pb-2">
          <LanguageSwitcher variant="mobile" />
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-[24px] border border-navy/10 bg-white px-5 py-4 text-lg font-semibold text-navy transition hover:border-forest/40 hover:bg-forest-light hover:text-forest"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[24px] border border-navy/10 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
            <p className="font-semibold text-navy">Quick links</p>
            <div className="mt-3 space-y-2">
              <Link
                href="/privacy"
                onClick={onClose}
                className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-forest-light hover:text-forest"
              >
                Privacy
              </Link>
              <Link
                href="/safeguarding"
                onClick={onClose}
                className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-forest-light hover:text-forest"
              >
                Safeguarding
              </Link>
            </div>
          </div>
        </nav>

        <div className="px-6 pb-6 pt-2">
          <Link
            href="/get-involved"
            onClick={onClose}
            className="block w-full rounded-[24px] bg-forest px-5 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-forest/20 transition hover:bg-forest-dark"
          >
            Partner with Us
          </Link>
        </div>
      </div>
    </div>
  );
}
