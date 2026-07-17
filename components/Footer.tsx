import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-white/70">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-6 font-body text-sm md:flex-row md:px-10">
        <p>
          © {new Date().getFullYear()} {siteConfig.business.name}. All rights reserved.
        </p>
        <p>{siteConfig.business.serviceAreas.join(" · ")}</p>
      </div>
    </footer>
  );
}
