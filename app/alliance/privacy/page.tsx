import type { Metadata } from "next"
import { AllianceLegalPage } from "@/app/alliance/components/alliance-legal-page"
import { PrivacyPolicyContentAlliance } from "@/app/components/legal/privacy-policy-content-alliance"

export const metadata: Metadata = {
  title: "개인정보처리방침 · 스타팅 얼라이언스",
  description: "스타팅파트너스 주식회사 스타팅 얼라이언스 개인정보처리방침",
}

export default function AlliancePrivacyPolicyPage() {
  return (
    <AllianceLegalPage title="개인정보처리방침">
      <PrivacyPolicyContentAlliance />
    </AllianceLegalPage>
  )
}
