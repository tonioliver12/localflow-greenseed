// Llama a la Places API (legacy Place Details) para traer reseñas + rating
// medio de un negocio a partir de su Place ID.
//
// Requiere la variable de entorno GOOGLE_PLACES_API_KEY (ver .env.example).
// Esta función SOLO debe llamarse desde el servidor (Server Components o
// Route Handlers) — nunca desde un componente cliente, para no exponer la
// API key en el navegador.

export interface GoogleReview {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface GoogleReviewsResult {
  rating: number | null;
  totalReviews: number | null;
  reviews: GoogleReview[];
}

const EMPTY_RESULT: GoogleReviewsResult = { rating: null, totalReviews: null, reviews: [] };

export async function getGoogleReviews(placeId: string): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || !placeId || placeId === "REPLACE_WITH_GOOGLE_PLACE_ID") {
    // Sin key o sin Place ID configurado todavía: no rompemos la build,
    // simplemente no mostramos reseñas reales (útil en desarrollo local).
    return EMPTY_RESULT;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("language", "es");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      // Cacheamos 6 horas: las reseñas no cambian cada minuto y así no
      // gastamos cuota de la API en cada visita.
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!res.ok) return EMPTY_RESULT;

    const data = await res.json();
    if (data.status !== "OK" || !data.result) return EMPTY_RESULT;

    const reviews: GoogleReview[] = (data.result.reviews ?? []).map((r: any) => ({
      authorName: r.author_name,
      authorPhoto: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
    }));

    return {
      rating: data.result.rating ?? null,
      totalReviews: data.result.user_ratings_total ?? null,
      reviews,
    };
  } catch {
    return EMPTY_RESULT;
  }
}
