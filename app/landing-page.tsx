"use client"

import { Header } from "./sections/header"
import { HeroSection } from "./sections/hero-section"
import { AudienceSection } from "./sections/audience-section"
import { FitSection } from "./sections/fit-section"
import { SavingsSection } from "./sections/savings-section"
import { CompareSection } from "./sections/compare-section"
import { StepsSection } from "./sections/steps-section"
import { TestimonialsSection } from "./sections/testimonials-section"
import { FAQSection } from "./sections/faq-section"
import { PricingSection } from "./sections/pricing-section"
import { CTASection } from "./sections/cta-section"
import { Footer } from "./sections/footer"

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AudienceSection />
      <FitSection />
      <SavingsSection />
      <CompareSection />
      <StepsSection />
      <TestimonialsSection />
      <FAQSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
