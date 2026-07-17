import Link from "next/link";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { siteConfig } from "@/config/site.config";

export default function Portfolio() {
  const items = siteConfig.portfolio;

  return (
    <section id="portfolio" className="bg-surface py-24">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">Work</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {items.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={item.beforeImage}
                      alt={`${item.title} — before`}
                      style={{ objectFit: "cover" }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={item.afterImage}
                      alt={`${item.title} — after`}
                      style={{ objectFit: "cover" }}
                    />
                  }
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <h3 className="mt-4 font-heading text-xl text-ink transition-colors group-hover:text-primary">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
