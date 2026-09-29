import type { Metadata } from "next"
import { AllianceLegalPage } from "@/app/alliance/components/alliance-legal-page"
import { TermsOfServiceContentAlliance } from "@/app/components/legal/terms-of-service-content-alliance"

export const metadata: Metadata = {
  title: "이용약관 · 스타팅 얼라이언스",
  description: "스타팅파트너스 주식회사 스타팅 얼라이언스 서비스 이용약관",
}

export default function AllianceTermsOfServicePage() {
  return (
    <AllianceLegalPage title="이용약관">
      <TermsOfServiceContentAlliance />
    </AllianceLegalPage>
  )
}
