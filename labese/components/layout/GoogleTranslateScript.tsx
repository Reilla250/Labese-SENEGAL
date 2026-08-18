"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function GoogleTranslateScript() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Ensure language choice persists on route changes across all pages
  useEffect(() => {
    const savedLang = localStorage.getItem("labese_lang");
    if (savedLang) {
      const cookieVal = savedLang === "fr" ? "/en/fr" : "/en/en";
      document.cookie = `googtrans=${cookieVal};path=/;`;
      if (window.location.hostname) {
        document.cookie = `googtrans=${cookieVal};path=/;domain=${window.location.hostname};`;
      }
    }

    if (savedLang === "fr") {
      const applyTranslation = () => {
        const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (selectElem) {
          selectElem.value = "fr";
          selectElem.dispatchEvent(new Event("change"));
        }
      };

      applyTranslation();
      const t1 = setTimeout(applyTranslation, 300);
      const t2 = setTimeout(applyTranslation, 700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [pathname]);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}

