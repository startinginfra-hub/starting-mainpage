import type { Metadata } from "next"
import { COMPANY_META_DESCRIPTION } from "@/lib/company/company-content"
import { CompanyContactSection } from "./components/sections/company-contact-section"
import { CompanyDilemmaMergeSection } from "./components/sections/company-dilemma-merge-section"
import { CompanyHeroSection } from "./components/sections/company-hero-section"
import { CompanyHistorySection } from "./components/sections/company-history-section"
import { CompanyIndicatorsSection } from "./components/sections/company-indicators-section"
import { CompanyManifestoSection } from "./components/sections/company-manifesto-section"
import { CompanyPartnersSection } from "./components/sections/company-partners-section"

export const metadata: Metadata = {
  title: "스타팅파트너스",
  description: COMPANY_META_DESCRIPTION,
}

export default function CompanyPage() {
  return (
    <>
      <CompanyHeroSection />
      <CompanyManifestoSection />
      <CompanyDilemmaMergeSection />
      <CompanyIndicatorsSection />
      <CompanyHistorySection />
      <CompanyPartnersSection />
      <CompanyContactSection />
    </>
  )
}
