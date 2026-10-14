import type { Metadata } from "next"
import { PartnerLanding } from "@/app/partner/components/partner-landing"

const PARTNER_TITLE = "스타팅 | 리크루팅 파트너"
const PARTNER_DESCRIPTION = "기업 영업, 소통 없이 후보자 추천만 하고 채용 수수료의 50% 정산"

export const metadata: Metadata = {
  title: PARTNER_TITLE,
  description: PARTNER_DESCRIPTION,
  alternates: { canonical: "/partner" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "스타팅",
    images: [{ url: "/uploads/og-image.png", width: 2400, height: 1260 }],
    title: PARTNER_TITLE,
    description: PARTNER_DESCRIPTION,
    url: "https://starting.kr/partner",
  },
}

export default function PartnerPage() {
  return (
    <div className="bg-[#FAFAFC] text-zinc-900">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <PartnerLanding />
      </div>
    </div>
  )
}
