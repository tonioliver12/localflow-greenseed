import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function About() {
  const { heading, body, image } = siteConfig.about;

  return (
    <section id="sobre-nosotros" className="py-24">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={image} alt={heading} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">{heading}</h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">{body}</p>
        </div>
      </div>
    </section>
  );
}
