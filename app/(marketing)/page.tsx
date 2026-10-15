import dynamic from "next/dynamic"
import { Suspense } from "react"
import { SectionSkeleton } from "@/app/components/section-skeleton"
import { IntroActivePostingsSection } from "@/app/intro/components/sections/intro-active-postings-section"
import { IntroCapabilitiesSection } from "@/app/intro/components/sections/intro-capabilities-section"
import { IntroCompareSection } from "@/app/intro/components/sections/intro-compare-section"
import { IntroHeroSection } from "@/app/intro/components/sections/intro-hero-section"
import { IntroLogoMarqueeSection } from "@/app/intro/components/sections/intro-logo-marquee-section"
import { IntroLicensingTrustSection } from "@/app/intro/components/sections/intro-licensing-trust-section"
import { IntroCreditPricingSection } from "@/app/intro/components/sections/intro-credit-pricing-section"
import { IntroPricingOverviewSection } from "@/app/intro/components/sections/intro-pricing-overview-section"
import { IntroProcessSection } from "@/app/intro/components/sections/intro-process-section"
import { IntroStatsSection } from "@/app/intro/components/sections/intro-stats-section"
import { isCreditDiscountEventActive } from "@/app/intro/components/pricing/intro-pricing-constants"

/** 정적 HTML이 할인 이벤트 종료 시각 이후 재배포 없이 갱신되도록 한다. */
export const revalidate = 3600

const IntroFunnelSection = dynamic(
  () =>
    import("@/app/intro/components/sections/intro-funnel-section").then((module) => ({
      default: module.IntroFunnelSection,
    })),
  { loading: () => <div className="h-64 animate-pulse rounded-2xl bg-neutral-200/40" aria-hidden /> },
)

const IntroFeaturesSection = dynamic(
  () =>
    import("@/app/intro/components/sections/intro-features-section").then((module) => ({
      default: module.IntroFeaturesSection,
    })),
  { loading: () => <SectionSkeleton rows={2} /> },
)

const IntroTestimonialsSection = dynamic(
  () =>
    import("@/app/intro/components/sections/intro-testimonials-section").then((module) => ({
      default: module.IntroTestimonialsSection,
    })),
  { loading: () => <SectionSkeleton rows={3} /> },
)

const IntroCostCalculatorSection = dynamic(
  () =>
    import("@/app/intro/components/sections/intro-cost-calculator-section").then((module) => ({
      default: module.IntroCostCalculatorSection,
    })),
  { loading: () => <SectionSkeleton rows={1} /> },
)

const IntroFaqSection = dynamic(
  () =>
    import("@/app/intro/components/sections/intro-faq-section").then((module) => ({
      default: module.IntroFaqSection,
    })),
  { loading: () => <SectionSkeleton rows={4} /> },
)


function ActivePostingsFallback() {
  return <SectionSkeleton rows={3} className="bg-[#fbfcfe]" />
}

export default function HomePage() {
  const discountEventActive = isCreditDiscountEventActive()

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
      <Suspense fallback={<ActivePostingsFallback />}>
        <IntroActivePostingsSection />
      </Suspense>
      <IntroStatsSection />
      <IntroFeaturesSection />
      <IntroProcessSection />
      <IntroTestimonialsSection />
      <IntroCostCalculatorSection />
      <IntroPricingOverviewSection discountEventActive={discountEventActive} />
      {discountEventActive ? <IntroCreditPricingSection /> : null}
      <IntroFaqSection discountEventActive={discountEventActive} />
      <IntroLicensingTrustSection />
    </div>
  )
}
