import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { getFontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.business.name} | ${siteConfig.business.tagline}`,
  description: siteConfig.business.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVariables = getFontVariables(siteConfig.theme.fontPreset);

  return (
    <html lang="en" className={fontVariables}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
