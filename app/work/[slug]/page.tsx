import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { siteConfig } from "@/config/site.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";

interface ProjectPageProps {
  params: { slug: string };
}

function getProject(slug: string) {
  return siteConfig.portfolio.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return siteConfig.portfolio.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${siteConfig.business.name}`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main>
      <Header />
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-container px-6 md:px-10">
          <Link
            href="/#portfolio"
            className="font-body text-sm uppercase tracking-widest text-ink-soft transition-colors hover:text-primary"
          >
            ← All work
          </Link>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={project.beforeImage}
                  alt={`${project.title} — before`}
                  style={{ objectFit: "cover" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={project.afterImage}
                  alt={`${project.title} — after`}
                  style={{ objectFit: "cover" }}
                />
              }
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          <h1 className="mt-10 font-heading text-3xl font-semibold text-ink md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <ProjectGallery images={project.gallery} title={project.title} />

          <div className="mt-20 border-t border-border pt-12 text-center">
            <p className="font-heading text-2xl text-ink md:text-3xl">Ready to start your own project?</p>
            <a
              href="/#contacto"
              className="mt-6 inline-block bg-primary px-8 py-4 font-body text-sm font-semibold uppercase tracking-widest text-background transition-transform hover:scale-105"
            >
              Get in touch
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
