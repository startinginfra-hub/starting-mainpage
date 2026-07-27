import type { Metadata } from "next"
import { COMPANY_META_DESCRIPTION } from "@/lib/company/company-content"
import { CompanyHrBenefitsSection } from "../components/sections/company-hr-benefits-section"
import { CompanyHrCultureSection } from "../components/sections/company-hr-culture-section"
import { CompanyHrHeroSection } from "../components/sections/company-hr-hero-section"
import { CompanyHrOfficeSection } from "../components/sections/company-hr-office-section"

export const metadata: Metadata = {
  title: "HR - 스타팅파트너스",
  description: COMPANY_META_DESCRIPTION,
}

export default function CompanyHrPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-20 px-5 py-16 md:gap-40 md:px-8 md:py-40">
      <CompanyHrHeroSection />
      <CompanyHrCultureSection />
      <CompanyHrOfficeSection />
      <CompanyHrBenefitsSection />
    </div>
  )
}
