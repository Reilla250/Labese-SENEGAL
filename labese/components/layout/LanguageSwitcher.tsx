"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

type Language = "en" | "fr";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

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

  const changeLanguage = (lang: Language) => {
    if (lang === currentLang && mounted) return;

    setCurrentLang(lang);
    localStorage.setItem("labese_lang", lang);

    const domain = window.location.hostname;
    const cookieVal = lang === "fr" ? "/en/fr" : "/en/en";

    // Set cookie on hostname and default domain path
    document.cookie = `googtrans=${cookieVal};path=/;domain=${domain}`;
    document.cookie = `googtrans=${cookieVal};path=/`;

    // Interact with Google Translate select element if ready
    const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = lang;
      selectElem.dispatchEvent(new Event("change"));
    }

    // Refresh page to guarantee DOM-wide translation state update
    window.location.reload();
  };

  if (!mounted) {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy shadow-xs ${variant === 'mobile' ? 'w-full justify-between p-3' : ''}`}>
        <div className="flex items-center gap-1.5">
          <Globe size={14} className="text-forest" />
          <span>EN / FR</span>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-navy/10 bg-slate-100/90 p-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Globe size={18} className="text-forest" />
          <span>Language / Langue</span>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-white p-1 shadow-sm border border-navy/10">
          <button
            type="button"
            onClick={() => changeLanguage("en")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              currentLang === "en"
                ? "bg-forest text-white shadow-xs"
                : "text-navy/70 hover:text-forest hover:bg-forest-light"
            }`}
          >
            <span role="img" aria-label="English">🇬🇧</span>
            <span>EN</span>
          </button>
          <button
            type="button"
            onClick={() => changeLanguage("fr")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              currentLang === "fr"
                ? "bg-forest text-white shadow-xs"
                : "text-navy/70 hover:text-forest hover:bg-forest-light"
            }`}
          >
            <span role="img" aria-label="Français">🇫🇷</span>
            <span>FR</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-navy/15 bg-white/90 p-1 text-xs font-medium text-navy shadow-xs backdrop-blur">
      <div className="flex items-center pl-1.5 pr-0.5 text-forest">
        <Globe size={14} aria-hidden="true" />
      </div>
      <button
        type="button"
        onClick={() => changeLanguage("en")}
        aria-label="Switch language to English"
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
          currentLang === "en"
            ? "bg-forest text-white shadow-xs"
            : "text-navy/70 hover:text-forest hover:bg-forest-light/60"
        }`}
      >
        <span role="img" aria-label="English">🇬🇧</span>
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => changeLanguage("fr")}
        aria-label="Changer la langue en Français"
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
          currentLang === "fr"
            ? "bg-forest text-white shadow-xs"
            : "text-navy/70 hover:text-forest hover:bg-forest-light/60"
        }`}
      >
        <span role="img" aria-label="Français">🇫🇷</span>
        <span>FR</span>
      </button>
    </div>
  );
}
