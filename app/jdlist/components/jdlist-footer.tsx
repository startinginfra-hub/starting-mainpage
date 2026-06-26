import Link from "next/link"
import { PrivacyPolicyDialogLink } from "@/app/components/legal/privacy-policy-dialog"
import { TermsOfServiceLink } from "@/app/components/legal/terms-of-service-link"
import { cn } from "@/lib/utils"

const footerLinkClassName = "text-neutral-500 transition-colors hover:text-neutral-700"

type JdListFooterProps = {
  className?: string
}

export function JdListFooter({ className }: JdListFooterProps) {
  return (
    <footer
      className={cn(
        "shrink-0 border-t border-neutral-200/75 bg-transparent pt-8 pb-4",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" aria-label="푸터 링크">
          <Link href="#" className={footerLinkClassName}>
            서비스 소개
          </Link>
          <TermsOfServiceLink className={footerLinkClassName} />
          <PrivacyPolicyDialogLink className={footerLinkClassName} />
        </nav>
        <p className="shrink-0 text-xs text-neutral-500">&copy; 2026 Starting Partners Inc.</p>
      </div>
      <div className="mt-4 text-xs leading-relaxed text-neutral-500">
        <div className="hidden space-y-1 md:block">
          <p>고객센터 : 1688-7360 | support@starting.kr</p>
          <p>
            스타팅파트너스(주) | 대표이사 : 김홍찬 | 본사 : 서울특별시 광진구 능동로 81, 3층 | 지사/연구소 : 서울특별시
            중구 퇴계로 15, 5층
          </p>
          <p>
            사업자등록번호 : 313-88-02066 | 통신판매번호 : 2025-서울광진-0701 | 직업정보제공번호 : 서울동부 제 2026-6
            호 | 유료직업소개번호 : 제 2025-3040234-14-5-00005 호
          </p>
        </div>
        <div className="space-y-1 md:hidden">
          <p className="font-medium text-neutral-600">스타팅파트너스(주)</p>
          <p>고객센터 : 1688-7360 | support@starting.kr</p>
          <p>대표이사 : 김홍찬 | 사업자 등록번호 : 313-88-02066</p>
          <p>통신판매번호 : 2025-서울광진-0701</p>
          <p>직업정보제공번호 : 서울동부 제 2026-6 호</p>
          <p>유료직업소개번호 : 제 2025-3040234-14-5-00005 호</p>
          <p>본사 : 서울특별시 광진구 능동로 81, 3층</p>
          <p>지사/연구소 : 서울특별시 중구 퇴계로 15, 5층</p>
        </div>
      </div>
    </footer>
  )
}
