import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { IntroBanner } from "@/components/sections/intro-banner";
import { Hero } from "@/components/sections/hero";
import { Advantages } from "@/components/sections/advantages";
import { HiddenProblems } from "@/components/sections/hidden-problems";
import { Services } from "@/components/sections/services";
import { ForWho } from "@/components/sections/for-who";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyUs } from "@/components/sections/why-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <IntroBanner />
        <Hero />
        <Advantages />
        <HiddenProblems />
        <Services />
        <ForWho />
        <HowItWorks />
        <WhyUs />
        <CtaBanner />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
