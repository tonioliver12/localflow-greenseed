import type { Config } from "tailwindcss";
import { siteConfig } from "./config/site.config";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: siteConfig.theme.colors.background,
        surface: siteConfig.theme.colors.surface,
        ink: siteConfig.theme.colors.ink,
        "ink-soft": siteConfig.theme.colors.inkSoft,
        primary: siteConfig.theme.colors.primary,
        accent: siteConfig.theme.colors.accent,
        border: siteConfig.theme.colors.border,
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
