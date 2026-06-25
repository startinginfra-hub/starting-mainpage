import type { Metadata } from "next"
import { KosmeParticipantsSection } from "./components/kosme-participants-section"
import { KosmeResultsSection } from "./components/kosme-results-section"
import { KosmeCostSection } from "./components/kosme-cost-section"
import { KosmeFaqCtaSection } from "./components/kosme-faq-cta-section"
import { KosmeStickyCtaBar } from "./components/kosme-sticky-cta-bar"
import { KosmeHeroSection } from "./components/kosme-hero-section"
import { KosmeOverviewSection } from "./components/kosme-overview-section"
import "./kosme-landing.css"

export const metadata: Metadata = {
  title: "중소벤처기업진흥공단 채용 수수료 전액 지원사업",
  description:
    "IT·SW·AI 분야 채용을 희망하는 중소기업을 대상으로, 채용 수수료 전액을 지원하는 공공 연계 프로젝트예요.",
}

export default function KosmeLandingPage() {
  return (
    <>
      <div className="kosme-landing relative left-1/2 -mt-4 w-screen max-w-none -translate-x-1/2 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:-mt-5 md:pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))]">
        <KosmeHeroSection />
        <KosmeOverviewSection />
        <div className="bg-[#1A7CFF]">
          <KosmeCostSection />
        </div>
        <KosmeParticipantsSection />
        <KosmeResultsSection />
        <KosmeFaqCtaSection />
      </div>
      <KosmeStickyCtaBar />
      <div className="h-4 shrink-0 md:h-6" aria-hidden />
    </>
  )
}
