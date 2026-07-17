import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site.config";

// Permite envolver una palabra entre asteriscos (*así*) en el headline del
// config para renderizarla en cursiva y darle énfasis.
function renderHeadline(headline: string) {
  return headline.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="font-heading italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Hero() {
  const { eyebrow, headline, subheadline, ctaLabel, image } = siteConfig.hero;

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
        {/* Velo oscuro para que el texto sea legible sobre cualquier foto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
            {renderHeadline(headline)}
          </h1>
          <p className="mt-6 font-body text-lg text-white/85 md:text-xl">{subheadline}</p>
          <a
            href="#contacto"
            className="mt-10 inline-block bg-accent px-8 py-4 font-body text-sm font-semibold uppercase tracking-widest text-ink transition-transform hover:scale-105"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70">
        <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
