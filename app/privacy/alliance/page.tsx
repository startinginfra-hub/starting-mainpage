import type { Metadata } from "next"
import { PrivacyPolicyViewer } from "@/app/components/legal/privacy-policy-viewer"

export const metadata: Metadata = {
  title: "개인정보처리방침 · 스타팅 얼라이언스",
  description: "스타팅파트너스 주식회사 스타팅 얼라이언스 개인정보처리방침",
}

export default function PrivacyPolicyAlliancePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
        개인정보처리방침
      </h1>
      <PrivacyPolicyViewer activeId="alliance" />
    </div>
  )
}
