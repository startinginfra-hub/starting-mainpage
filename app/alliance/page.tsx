import type { Metadata } from "next"
import { IntroLicensingTrustSection } from "@/app/intro/components/sections/intro-licensing-trust-section"
import { AllianceCompareSection } from "./components/sections/alliance-compare-section"
import { AllianceEligibilitySection } from "./components/sections/alliance-eligibility-section"
import { AllianceFaqSection } from "./components/sections/alliance-faq-section"
import { AllianceHeadhuntersSection } from "./components/sections/alliance-headhunters-section"
import { AllianceHeroSection } from "./components/sections/alliance-hero-section"
import { AllianceLeadFlowSection } from "./components/sections/alliance-lead-flow-section"
import { AllianceLogoMarqueeSection } from "./components/sections/alliance-logo-marquee-section"
import { AllianceProcessSection } from "./components/sections/alliance-process-section"
export const metadata: Metadata = {
  title: "스타팅 얼라이언스",
  description:
    "연봉 4,000만 원 이상 핵심 포지션을 위한 정찰제 헤드헌팅. AI 정밀 필터링과 전담 헤드헌터가 검증한 인재만 추천해요.",
  alternates: { canonical: "/alliance" },
  openGraph: {
    title: "스타팅 얼라이언스",
    description: "연봉 4,000만 원 이상 핵심 포지션을 위한 정찰제 헤드헌팅",
    url: "https://starting.kr/alliance",
  },
}

export default function AlliancePage() {
  return (
    <div className="alliance-page max-w-full overflow-x-clip">
      <AllianceHeroSection />
      <AllianceHeadhuntersSection />
      <AllianceLeadFlowSection />
      <AllianceCompareSection />
      <AllianceEligibilitySection />
      <AllianceProcessSection />
      <AllianceLogoMarqueeSection />
      <IntroLicensingTrustSection />
      <AllianceFaqSection />
    </div>
  )
}
