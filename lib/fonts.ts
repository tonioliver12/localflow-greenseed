// next/font/google exige que las fuentes se importen de forma estática
// (no se puede pasar un string dinámico desde site.config), así que
// definimos aquí un catálogo cerrado de "presets" de pareja tipográfica.
// Para elegir uno, cambia `theme.fontPreset` en config/site.config.ts.
//
// Para AÑADIR un preset nuevo (Claude Code):
// 1. Importa las dos fuentes de next/font/google que quieras combinar.
// 2. Instáncialas con variable: "--font-heading" / "--font-body".
// 3. Añade la entrada al objeto `fontPresets` y al type FontPreset en
//    config/site.config.ts.

import { Playfair_Display, Montserrat, Inter, Manrope, Roboto_Slab, PT_Sans } from "next/font/google";
import type { FontPreset } from "@/config/site.config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

// "elegante"  -> boutique / premium (jardinería, diseño, decoración)
// "moderno"   -> limpio y directo (talleres, electricistas, fontaneros)
// "clasico"   -> sólido y de confianza (negocios más tradicionales)
export const fontPresets: Record<FontPreset, { heading: typeof playfair; body: typeof montserrat }> = {
  elegante: { heading: playfair, body: montserrat },
  moderno: { heading: inter, body: manrope },
  clasico: { heading: robotoSlab, body: ptSans },
};

export function getFontVariables(preset: FontPreset) {
  const { heading, body } = fontPresets[preset];
  return `${heading.variable} ${body.variable}`;
}
