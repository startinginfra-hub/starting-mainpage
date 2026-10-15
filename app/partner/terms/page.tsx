import type { Metadata } from "next"
import { PartnerTermsContent } from "@/app/components/legal/partner-terms-content"
import { PartnerLegalPage } from "@/app/partner/components/partner-legal-page"

export const metadata: Metadata = {
  title: "파트너 이용약관 · 스타팅",
  description: "스타팅파트너스 주식회사 스타팅 파트너 이용약관",
  alternates: { canonical: "/partner/terms" },
}

export default function PartnerTermsPage() {
  return (
    <PartnerLegalPage title="스타팅 파트너 이용약관">
      <PartnerTermsContent />
    </PartnerLegalPage>
  )
}
