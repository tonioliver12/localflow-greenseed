import { siteConfig } from "@/config/site.config";
import { getGoogleReviews } from "@/lib/googlePlaces";

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
  const reviewsData = await getGoogleReviews(siteConfig.google.placeId);

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
