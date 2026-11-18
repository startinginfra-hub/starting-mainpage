import type { Metadata } from "next"
import { PartnerTermsContent } from "@/app/components/legal/partner-terms-content"
import { PartnerLegalPage } from "@/app/partner/components/partner-legal-page"
import { JsonLdScript } from "@/app/components/seo/json-ld"
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld"

export const metadata: Metadata = {
  title: "파트너 이용약관 · 스타팅",
  description: "스타팅파트너스 주식회사 스타팅 파트너 이용약관",
  alternates: { canonical: "/partner/terms" },
}

export default function PartnerTermsPage() {
  return (
    <>
      <JsonLdScript
        data={buildBreadcrumbJsonLd([
          { name: "스타팅", path: "/" },
          { name: "스타팅 파트너", path: "/partner" },
          { name: "이용약관", path: "/partner/terms" },
        ])}
      />
      <PartnerLegalPage title="스타팅 파트너 이용약관">
        <PartnerTermsContent />
      </PartnerLegalPage>
    </>
  )
}
