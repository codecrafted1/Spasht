import React from "react";
import { APP_CONFIG } from "../../config/appConfig";
import { ScrambleText } from "../common/ScrambleText";

interface NavbarProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange }) => {
  const navItems = [
    { label: "Problem", href: "#problem" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Trust", href: "#trust" },
    { label: "Limits", href: "#limits" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <a
          href="#"
          data-cursor="link"
          className="group flex items-baseline gap-2 text-ink no-underline focus:outline-none"
        >
          <span className="font-serif text-2xl font-black tracking-tight text-ink group-hover:text-vermilion transition-colors">
            {APP_CONFIG.name}
          </span>
          <span className="hidden font-mono text-[10px] tracking-widest text-ink/60 uppercase sm:inline-block">
            / DECISION SUPPORT • NON-DIAGNOSTIC
          </span>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-ink/80">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="link"
              className="hover:text-vermilion transition-colors"
            >
              <ScrambleText text={item.label} triggerOnHover speed={25} />
            </a>
          ))}
        </nav>

        {/* Action Controls: Language Toggle & Demo Jump */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center rounded border border-rule bg-paper p-0.5 font-mono text-xs">
            <button
              onClick={() => onLanguageChange("en")}
              data-cursor="link"
              aria-label="Switch language to English"
              className={`px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                currentLang === "en"
                  ? "bg-ink text-paper"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange("hi")}
              data-cursor="link"
              aria-label="Switch language to Hindi"
              className={`px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                currentLang === "hi"
                  ? "bg-vermilion text-paper"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Quick Demo CTA */}
          <a
            href="#demo"
            data-cursor="link"
            className="hidden sm:inline-flex items-center border border-vermilion bg-vermilion px-3.5 py-1.5 font-mono text-xs font-bold text-paper transition-all hover:bg-ink hover:border-ink"
          >
            TRY DEMO ↘
          </a>
        </div>
      </div>
    </header>
  );
};
