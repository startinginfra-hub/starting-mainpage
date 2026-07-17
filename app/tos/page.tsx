import type { Metadata } from "next"
import { TermsOfServiceContent } from "@/app/components/legal/terms-of-service-content"

export const metadata: Metadata = {
  title: "이용약관",
  description: "스타팅파트너스 주식회사 서비스 이용약관",
}

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
        스타팅 서비스 이용약관
      </h1>
      <TermsOfServiceContent />
    </div>
  )
}
