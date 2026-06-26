import type { Metadata } from "next"
import { IntroActivePostingsSection } from "@/app/intro/components/sections/intro-active-postings-section"
import { IntroCapabilitiesSection } from "@/app/intro/components/sections/intro-capabilities-section"
import { IntroCompareSection } from "@/app/intro/components/sections/intro-compare-section"
import { IntroFaqSection } from "@/app/intro/components/sections/intro-faq-section"
import { IntroFeaturesSection } from "@/app/intro/components/sections/intro-features-section"
import { IntroFunnelSection } from "@/app/intro/components/sections/intro-funnel-section"
import { IntroHeroSection } from "@/app/intro/components/sections/intro-hero-section"
import { IntroLogoMarqueeSection } from "@/app/intro/components/sections/intro-logo-marquee-section"
import { IntroLicensingTrustSection } from "@/app/intro/components/sections/intro-licensing-trust-section"
import { IntroCostCalculatorSection } from "@/app/intro/components/sections/intro-cost-calculator-section"
import { IntroPricingSection } from "@/app/intro/components/sections/intro-pricing-section"
import { IntroProcessSection } from "@/app/intro/components/sections/intro-process-section"
import { IntroStatsSection } from "@/app/intro/components/sections/intro-stats-section"
import { IntroTestimonialsSection } from "@/app/intro/components/sections/intro-testimonials-section"

export const metadata: Metadata = {
  description: "채용 플랫폼을 대체하는 AI Agent 헤드헌팅 솔루션",
}

export default async function HomePage() {
  return (
    <div className="max-w-full overflow-x-clip">
      <div className="intro-hero-stack relative overflow-x-clip bg-[#fbfcfe]">
        <div className="intro-hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="intro-hero-glow pointer-events-none absolute" aria-hidden />
        <IntroHeroSection />
        <IntroFunnelSection />
      </div>
      <IntroLogoMarqueeSection />
      <IntroCapabilitiesSection />
      <IntroCompareSection />
      <IntroActivePostingsSection />
      <IntroStatsSection />
      <IntroFeaturesSection />
      <IntroProcessSection />
      <IntroTestimonialsSection />
      <IntroCostCalculatorSection />
      <IntroPricingSection />
      <IntroFaqSection />
      <IntroLicensingTrustSection />
    </div>
  )
}
