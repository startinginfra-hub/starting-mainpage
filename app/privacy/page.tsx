import type { Metadata } from "next"
import { PrivacyPolicyContent } from "@/app/components/legal/privacy-policy-content"

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "스타팅파트너스 주식회사 개인정보처리방침",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
        개인정보처리방침
      </h1>
      <PrivacyPolicyContent />
    </div>
  )
}
