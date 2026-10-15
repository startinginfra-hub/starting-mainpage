import type { Metadata } from "next"
import { PartnerPrivacyContent } from "@/app/components/legal/partner-privacy-content"
import { PartnerLegalPage } from "@/app/partner/components/partner-legal-page"

export const metadata: Metadata = {
  title: "개인정보처리방침 · 스타팅 파트너",
  description: "스타팅파트너스 주식회사 스타팅 커리어·파트너 개인정보처리방침",
  alternates: { canonical: "/partner/privacy" },
}

export default function PartnerPrivacyPage() {
  return (
    <PartnerLegalPage title="스타팅 커리어 개인정보처리방침">
      <PartnerPrivacyContent />
    </PartnerLegalPage>
  )
}
