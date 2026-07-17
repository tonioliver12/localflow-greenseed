import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function Services() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">Services</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {siteConfig.services.map((service) => (
            <div key={service.title} className="group relative h-[420px] overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-ink/95 via-ink/40 to-transparent p-6 transition-all duration-500 group-hover:from-ink/95 group-hover:pb-10">
                <h3 className="font-heading text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden font-body text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
