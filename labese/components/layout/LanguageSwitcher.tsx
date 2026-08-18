"use client";

import { useEffect, useState, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

type Language = "en" | "fr";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const getLangFromCookie = (): Language => {
      if (typeof document === "undefined") return "en";
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name, val] = cookie.trim().split("=");
        if (name === "googtrans" && val) {
          if (val.includes("/fr")) return "fr";
        }
      }
      const saved = localStorage.getItem("labese_lang");
      if (saved === "fr" || saved === "en") return saved as Language;
      return "en";
    };

    setCurrentLang(getLangFromCookie());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: Language) => {
    setOpen(false);
    if (lang === currentLang && mounted) return;

    setCurrentLang(lang);
    localStorage.setItem("labese_lang", lang);

    const domain = window.location.hostname;
    const cookieVal = lang === "fr" ? "/en/fr" : "/en/en";

    document.cookie = `googtrans=${cookieVal};path=/;domain=${domain}`;
    document.cookie = `googtrans=${cookieVal};path=/`;

    const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = lang;
      selectElem.dispatchEvent(new Event("change"));
    }

    window.location.reload();
  };

  if (!mounted) {
    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 bg-white/90 text-navy shadow-xs"
          aria-label="Select Language"
        >
          <Globe size={18} className="text-forest" />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-navy/15 bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy shadow-xs transition hover:border-forest/40 hover:bg-forest-light/50 focus-visible:outline-2 focus-visible:outline-sand"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Select website language"
      >
        <Globe size={16} className="text-forest" />
        <span className="uppercase text-[11px] font-mono-stat font-bold tracking-wider">
          {currentLang}
        </span>
        <ChevronDown size={12} className={`text-navy/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 w-36 origin-top-right rounded-xl border border-navy/10 bg-white p-1.5 shadow-lg shadow-navy/10 ring-1 ring-black/5 z-50 animate-fade-in"
        >
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Language / Langue
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => changeLanguage("en")}
            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
              currentLang === "en"
                ? "bg-forest-light text-forest font-bold"
                : "text-navy hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span role="img" aria-label="English">🇬🇧</span>
              <span>English</span>
            </span>
            {currentLang === "en" && <Check size={14} className="text-forest" />}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => changeLanguage("fr")}
            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
              currentLang === "fr"
                ? "bg-forest-light text-forest font-bold"
                : "text-navy hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span role="img" aria-label="Français">🇫🇷</span>
              <span>Français</span>
            </span>
            {currentLang === "fr" && <Check size={14} className="text-forest" />}
          </button>
        </div>
      )}
    </div>
  );
}
