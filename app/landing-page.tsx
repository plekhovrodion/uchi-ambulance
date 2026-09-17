import { LandingHeader } from "@/components/landing-header"
import { LandingSmoothScroll } from "@/components/landing-smooth-scroll"

import { HeroSection } from "./sections/hero-section"
import { WhySection } from "./sections/why-section"
import { HowSection } from "./sections/how-section"
import { PricingSection } from "./sections/pricing-section"
import { CTASection } from "./sections/cta-section"
import { FAQSection } from "./sections/faq-section"
import { Footer } from "./sections/footer"

export function LandingPage() {
  return (
    <LandingSmoothScroll>
      <LandingHeader />
      <main className="min-h-screen bg-landing-purple">
        <HeroSection />
        <WhySection />
        <HowSection />
        <PricingSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </main>
    </LandingSmoothScroll>
  )
}
