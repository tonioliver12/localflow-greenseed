// ============================================================================
// SITE CONFIG — el único archivo que debería cambiar entre proyectos.
// Claude Code: para adaptar la plantilla a un nuevo cliente, edita este
// archivo y sustituye las imágenes en /public/images. No deberías necesitar
// tocar los componentes en /components salvo que el cliente pida algo
// realmente distinto a lo que ya soporta la plantilla.
// ============================================================================

export type FontPreset = "elegante" | "moderno" | "clasico";

export interface SiteConfig {
  business: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    whatsapp?: string;
    address: string;
    serviceAreas: string[];
  };
  google: {
    // Place ID del negocio en Google Maps. Se usa para traer reseñas y el
    // rating medio automáticamente vía la Places API.
    // Cómo obtenerlo: https://developers.google.com/maps/documentation/places/web-service/place-id
    placeId: string;
  };
  theme: {
    colors: {
      background: string;
      surface: string;
      ink: string;
      inkSoft: string;
      primary: string;
      accent: string;
      border: string;
    };
    // Elige una de las parejas tipográficas predefinidas en lib/fonts.ts.
    // (next/font/google exige imports estáticos, así que las fuentes reales
    // viven ahí como "presets" en vez de strings libres aquí).
    fontPreset: FontPreset;
  };
  hero: {
    // Texto corto arriba del titular (localización o categoría del negocio).
    eyebrow: string;
    // Puedes envolver una palabra entre asteriscos (*así*) para que se
    // renderice en cursiva y así darle énfasis dentro del titular.
    headline: string;
    subheadline: string;
    ctaLabel: string;
    image: string;
  };
  trustBar: {
    rotatingWords: string[];
    // Si stats está vacío, el rating y el nº de reseñas se rellenan solos
    // desde Google Places; el resto de stats se define a mano por cliente.
    stats: { label: string; value: string }[];
  };
  services: {
    title: string;
    description: string;
    image: string;
  }[];
  portfolio: {
    // Identificador único usado en la URL /work/[slug], ej. "blackrock-contemporary-garden".
    slug: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    coverImage: string;
    gallery: string[];
  }[];
  about: {
    heading: string;
    body: string;
    image: string;
  };
  contact: {
    heading: string;
    subheading: string;
    // A esta dirección llega el email del formulario (vía /api/contact + Resend)
    notifyEmail: string;
    projectTypes: string[];
  };
}

export const siteConfig: SiteConfig = {
  business: {
    name: "Emerald Estate",
    tagline: "Bespoke garden design in Dublin",
    phone: "+353 1 000 0000",
    email: "hello@emeraldestate.ie",
    whatsapp: "+353850000000",
    address: "Sandyford Business Park, Dublin 18",
    serviceAreas: ["Blackrock", "Dalkey", "Foxrock", "Dun Laoghaire", "Malahide"],
  },
  google: {
    placeId: "REPLACE_WITH_GOOGLE_PLACE_ID",
  },
  theme: {
    colors: {
      background: "#fafaf9",
      surface: "#ffffff",
      ink: "#1a1a1a",
      inkSoft: "#6b6b6b",
      primary: "#2d2d2d",
      accent: "#c9a961",
      border: "#e5e5e3",
    },
    fontPreset: "elegante",
  },
  hero: {
    eyebrow: "Garden Design Studio · Dublin",
    headline: "Gardens as *quiet* architecture",
    subheadline:
      "We shape outdoor spaces across Dublin with bespoke design, from the first sketch to the very last plant.",
    ctaLabel: "Get a Quote",
    image: "https://placehold.co/1920x1280/2d2d2d/fafaf9.png?text=Hero",
  },
  trustBar: {
    rotatingWords: ["unique", "lasting", "bespoke", "sustainable"],
    stats: [
      { label: "Years of experience", value: "12+" },
      { label: "Projects completed", value: "300+" },
      { label: "Service area", value: "Dublin" },
    ],
  },
  services: [
    {
      title: "Garden Design",
      description: "Complete bespoke projects, from the first sketch to the very last plant.",
      image: "https://placehold.co/800x1000/2d2d2d/fafaf9.png?text=Design",
    },
    {
      title: "Hardscaping",
      description: "Paths, patios and walls in natural stone and timber.",
      image: "https://placehold.co/800x1000/6b6b6b/fafaf9.png?text=Hardscaping",
    },
    {
      title: "Maintenance",
      description: "Regular upkeep to keep the garden looking impeccable all year round.",
      image: "https://placehold.co/800x1000/c9a961/1a1a1a.png?text=Maintenance",
    },
  ],
  portfolio: [
    {
      slug: "blackrock-contemporary-garden",
      title: "Contemporary Garden — Blackrock",
      description:
        "A full redesign of a suburban plot in Blackrock, pairing clean lines with lush, layered planting. We replaced an overgrown lawn with structured hardscaping, a sunken seating area, and drought-resistant borders for a garden that stays low-maintenance yet feels alive year-round.",
      beforeImage: "https://placehold.co/1200x800/e5e5e3/6b6b6b.png?text=Before",
      afterImage: "https://placehold.co/1200x800/2d2d2d/fafaf9.png?text=After",
      coverImage: "https://placehold.co/1200x800/2d2d2d/fafaf9.png?text=Blackrock",
      gallery: [
        "https://placehold.co/1200x800/2d2d2d/fafaf9.png?text=Photo+1",
        "https://placehold.co/1200x800/2d2d2d/fafaf9.png?text=Photo+2",
        "https://placehold.co/1200x800/2d2d2d/fafaf9.png?text=Photo+3",
      ],
    },
    {
      slug: "dalkey-georgian-garden",
      title: "Georgian Garden — Dalkey",
      description:
        "A period-sensitive restoration for a Georgian home in Dalkey, blending formal structure with soft, seasonal borders. Reclaimed stone paths and clipped hedging tie the new layout back to the house's original character.",
      beforeImage: "https://placehold.co/1200x800/e5e5e3/6b6b6b.png?text=Before",
      afterImage: "https://placehold.co/1200x800/6b6b6b/fafaf9.png?text=After",
      coverImage: "https://placehold.co/1200x800/6b6b6b/fafaf9.png?text=Dalkey",
      gallery: [
        "https://placehold.co/1200x800/6b6b6b/fafaf9.png?text=Photo+1",
        "https://placehold.co/1200x800/6b6b6b/fafaf9.png?text=Photo+2",
      ],
    },
  ],
  about: {
    heading: "About us",
    body:
      "We're a landscaping studio based in Dublin, devoted to the art of the garden for more than a decade. Every project starts by listening to how our clients want to live in their outdoor space.",
    image: "https://placehold.co/900x1100/e5e5e3/6b6b6b.png?text=Team",
  },
  contact: {
    heading: "Start your project",
    subheading:
      "We take on a limited number of projects each season to guarantee the highest quality.",
    notifyEmail: "hello@emeraldestate.ie",
    projectTypes: [
      "Full garden design",
      "Hardscaping only",
      "Maintenance & planting",
      "Commercial project",
    ],
  },
};
