import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedConsultants } from "@/components/home/FeaturedConsultants";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { FixedPriceServices } from "@/components/home/FixedPriceServices";
import { AIMatchingTeaser } from "@/components/home/AIMatchingTeaser";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ConsultantCTA } from "@/components/home/ConsultantCTA";

export const metadata: Metadata = {
  title: { absolute: "Pronto Consulente — La consulenza giusta. Subito." },
  description:
    "Trova, confronta e prenota consulenti qualificati in finanza agevolata, legale, HSE, marketing, cybersecurity e altri 18 settori. Prezzi chiari, recensioni verificate.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedConsultants />
      <HowItWorks />
      <WhyUs />
      <FixedPriceServices />
      <AIMatchingTeaser />
      <TestimonialsSection />
      <ConsultantCTA />
    </>
  );
}
