import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";
import { getGoogleReviews } from "@/lib/googlePlaces";

// GET /api/reviews
// Devuelve el rating medio, el total de reseñas y hasta 5 reseñas de Google
// para el Place ID configurado en site.config.ts. Se usa como endpoint
// independiente (por si en el futuro se consume desde el cliente o desde
// otro proyecto); la Testimonials section de esta plantilla ya trae los
// datos directamente en el servidor sin pasar por aquí, por eficiencia.
export async function GET() {
  const result = await getGoogleReviews(siteConfig.google.placeId);
  return NextResponse.json(result);
}
