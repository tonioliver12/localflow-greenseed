"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";

const NAV_LINKS = [
  { href: "#servicios", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#sobre-nosotros", label: "About" },
  { href: "#testimonios", label: "Reviews" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-md shadow-sm h-16" : "bg-transparent h-20"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-container items-center justify-between px-6 md:px-10">
        <a href="#" className="font-heading text-xl font-semibold text-ink">
          {siteConfig.business.name}
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-widest text-ink-soft transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-background transition-transform hover:scale-105"
          >
            {siteConfig.hero.ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
