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
  testimonials: {
    // Reseñas escritas a mano para clientes que todavía tienen pocas (o
    // ninguna) reseña en Google. Si este array tiene elementos, Testimonials
    // los muestra directamente y NO se llama a la Google Places API (ni el
    // fetch de reseñas en app/page.tsx, ni el rating en TrustBar).
    // Al no venir de Google no traen una puntuación individual, así que la
    // card se renderiza sin estrellas.
    // Déjalo como array vacío para volver al comportamiento por defecto:
    // reseñas reales vía Google Reviews (Places API + siteConfig.google.placeId).
    manual: { author: string; text: string }[];
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
    name: "Greenseed Landscapes",
    tagline: "Bespoke landscape design & build in Dublin",
    phone: "087 972 4475",
    email: "info@greenseed.ie",
    address: "13 Grosvenor Road, Rathmines, Dublin 6",
    serviceAreas: ["Rathmines", "Rathfarnham", "Dundrum", "Sandymount", "Churchtown", "Castleknock"],
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
      primary: "#1f3a2d",
      accent: "#a8987d",
      border: "#e5e5e3",
    },
    fontPreset: "elegante",
  },
  hero: {
    eyebrow: "RATHMINES, DUBLIN — LANDSCAPE STUDIO",
    headline: "Gardens built to *outlast* the trends",
    subheadline:
      "For over a decade, we've designed, built and maintained gardens across Dublin — combining hands-on craftsmanship with a personalised service, from first sketch to final planting.",
    ctaLabel: "Start your garden",
    image: "/images/hero/hero.jpg",
  },
  trustBar: {
    rotatingWords: ["unique", "lasting", "bespoke", "sustainable"],
    stats: [
      { label: "Years of experience", value: "12+" },
      { label: "Projects completed", value: "300+" },
      { label: "Service area", value: "Dublin" },
    ],
  },
  testimonials: {
    manual: [
      {
        author: "Paul D. Griffin, Dip. Arch.",
        text: "Clear, precise proposals and a landscaping consultant I have no hesitation recommending to clients.",
      },
      {
        author: "Joe Harrington",
        text: "Professional, reliable and flexible — they listened to our brief and delivered on time and on budget.",
      },
      {
        author: "Carmel Hennessy",
        text: "Exceptional hardscaping quality, extensive plant knowledge, and thorough follow-up after the work was done.",
      },
    ],
  },
  services: [
    {
      title: "Garden Design",
      description: "Bespoke garden plans tailored to how you actually want to live outdoors.",
      image: "https://placehold.co/800x1000/1f3a2d/fafaf9.png?text=Garden+Design",
    },
    {
      title: "Building",
      description: "Hardscaping, planting and construction, carried out by our own hands-on team.",
      image: "https://placehold.co/800x1000/33513f/fafaf9.png?text=Building",
    },
    {
      title: "Maintenance",
      description: "Ongoing care to keep your garden thriving through every season.",
      image: "https://placehold.co/800x1000/8a9a5b/1a1a1a.png?text=Maintenance",
    },
  ],
  portfolio: [
    {
      slug: "hawthorn-lodge-castleknock",
      title: "Hawthorn Lodge, Castleknock",
      description:
        "A curved garden reimagined with a sandstone patio, raised planters and new fencing for privacy.",
      beforeImage: "/images/portfolio/hawthorn-lodge-castleknock/before.jpg",
      afterImage: "/images/portfolio/hawthorn-lodge-castleknock/after.jpg",
      coverImage: "/images/portfolio/hawthorn-lodge-castleknock/after.jpg",
      gallery: [
        "/images/portfolio/hawthorn-lodge-castleknock/gallery-1.jpg",
        "/images/portfolio/hawthorn-lodge-castleknock/gallery-2.jpg",
      ],
    },
    {
      slug: "strand-road-sandymount",
      title: "Strand Road, Sandymount",
      description:
        "A full design-and-build project completed as part of a home refurbishment, finished on time and on budget.",
      beforeImage: "/images/portfolio/strand-road-sandymount/before.jpg",
      afterImage: "/images/portfolio/strand-road-sandymount/after.jpg",
      coverImage: "/images/portfolio/strand-road-sandymount/after.jpg",
      gallery: [
        "/images/portfolio/strand-road-sandymount/gallery-1.jpg",
        "/images/portfolio/strand-road-sandymount/gallery-2.jpg",
      ],
    },
    {
      slug: "ballytore-road-rathfarnham",
      title: "Ballytore Road, Rathfarnham",
      description:
        "A hybrid hardscape solution designed around the family's needs after a house extension.",
      beforeImage: "/images/portfolio/ballytore-road-rathfarnham/before.jpg",
      afterImage: "/images/portfolio/ballytore-road-rathfarnham/after.jpg",
      coverImage: "/images/portfolio/ballytore-road-rathfarnham/after.jpg",
      gallery: [
        "/images/portfolio/ballytore-road-rathfarnham/gallery-1.jpg",
        "/images/portfolio/ballytore-road-rathfarnham/gallery-2.jpg",
      ],
    },
  ],
  about: {
    heading: "About Greenseed",
    body:
      "Greenseed Landscapes is a Dublin-based landscaping studio combining professional design training with hands-on building experience. We handle every project ourselves, end to end, so the quality of the finish is never left to chance.",
    image: "https://placehold.co/900x1100/1f3a2d/fafaf9.png?text=Greenseed+Team",
  },
  contact: {
    heading: "Start your project",
    subheading: "Tell us about your garden and we'll get back to you to arrange a visit.",
    notifyEmail: "info@greenseed.ie",
    projectTypes: ["Garden design", "Build / hardscaping", "Maintenance", "Full renovation"],
  },
};
