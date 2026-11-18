import type { Metadata } from "next"
import { AllianceLegalPage } from "@/app/alliance/components/alliance-legal-page"
import { PrivacyPolicyContentAlliance } from "@/app/components/legal/privacy-policy-content-alliance"
import { JsonLdScript } from "@/app/components/seo/json-ld"
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld"

export const metadata: Metadata = {
  title: "개인정보처리방침 · 스타팅 얼라이언스",
  description: "스타팅파트너스 주식회사 스타팅 얼라이언스 개인정보처리방침",
  alternates: { canonical: "/alliance/privacy" },
}

export default function AlliancePrivacyPolicyPage() {
  return (
    <>
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "스타팅", path: "/" },
          { name: "스타팅 얼라이언스", path: "/alliance" },
          { name: "개인정보처리방침", path: "/alliance/privacy" },
        ])}
      />
      <AllianceLegalPage title="개인정보처리방침">
        <PrivacyPolicyContentAlliance />
      </AllianceLegalPage>
    </>
  )
}
