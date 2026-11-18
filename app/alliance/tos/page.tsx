import type { Metadata } from "next"
import { AllianceLegalPage } from "@/app/alliance/components/alliance-legal-page"
import { TermsOfServiceContentAlliance } from "@/app/components/legal/terms-of-service-content-alliance"
import { JsonLdScript } from "@/app/components/seo/json-ld"
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld"

export const metadata: Metadata = {
  title: "이용약관 · 스타팅 얼라이언스",
  description: "스타팅파트너스 주식회사 스타팅 얼라이언스 서비스 이용약관",
  alternates: { canonical: "/alliance/tos" },
}

export default function AllianceTermsOfServicePage() {
  return (
    <>
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "스타팅", path: "/" },
          { name: "스타팅 얼라이언스", path: "/alliance" },
          { name: "이용약관", path: "/alliance/tos" },
        ])}
      />
      <AllianceLegalPage title="이용약관">
        <TermsOfServiceContentAlliance />
      </AllianceLegalPage>
    </>
  )
}
