import type { Metadata } from "next"
import { TermsOfServiceViewer } from "@/app/components/legal/terms-of-service-viewer"

export const metadata: Metadata = {
  title: "이용약관 · 스타팅 얼라이언스",
  description: "스타팅파트너스 주식회사 스타팅 얼라이언스 서비스 이용약관",
}

export default function TermsOfServiceAlliancePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">이용약관</h1>
      <TermsOfServiceViewer activeId="alliance" />
    </div>
  )
}
