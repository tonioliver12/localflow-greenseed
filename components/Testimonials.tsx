import { Star } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { GoogleReviewsResult } from "@/lib/googlePlaces";

interface TestimonialsProps {
  reviewsData: GoogleReviewsResult;
}

export default function Testimonials({ reviewsData }: TestimonialsProps) {
  const { reviews, rating, totalReviews } = reviewsData;

  if (reviews.length === 0) {
    // Todavía no hay Place ID / API key configurados: no rompemos el layout,
    // simplemente no renderizamos la sección.
    return null;
  }

  return (
    <section id="testimonios" className="py-24">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">
            What our clients say
          </h2>
          {rating && (
            <a
              href={`https://search.google.com/local/reviews?placeid=${siteConfig.google.placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-ink-soft underline-offset-4 hover:underline"
            >
              {rating.toFixed(1)} ★ · {totalReviews} reviews on Google → see all
            </a>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.authorName + review.relativeTime} className="border border-border bg-surface p-8">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="mt-4 font-body text-ink-soft">“{review.text}”</p>
              <p className="mt-6 font-body text-sm font-semibold text-ink">{review.authorName}</p>
              <p className="font-body text-xs text-ink-soft">{review.relativeTime}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
