import { siteConfig } from "@/config/site.config";
import { getGoogleReviews, EMPTY_GOOGLE_REVIEWS } from "@/lib/googlePlaces";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  // Con testimonios manuales configurados no hace falta gastar cuota de la
  // Places API: Testimonials los usa directamente en vez de reseñas de Google.
  const reviewsData =
    siteConfig.testimonials.manual.length > 0
      ? EMPTY_GOOGLE_REVIEWS
      : await getGoogleReviews(siteConfig.google.placeId);

  return (
    <main>
      <Header />
      <Hero />
      <TrustBar googleRating={reviewsData.rating ?? undefined} googleReviewCount={reviewsData.totalReviews ?? undefined} />
      <Services />
      <Portfolio />
      <About />
      <Testimonials reviewsData={reviewsData} />
      <Contact />
      <Footer />
    </main>
  );
}
