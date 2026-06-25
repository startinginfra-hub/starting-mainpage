import Link from "next/link"
import { ChannelTalkInquiryLink } from "@/app/components/app-shell/channel-talk-inquiry-link"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { INTRO_CONTENT_MAX } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"

const footerLinkClass =
  "text-sm text-[#5d6a82] transition-colors hover:text-[#0b0f1c]"

export function IntroFooter() {
  return (
    <footer className="border-t border-[#e3e8f1] bg-[#fbfcfe] py-12 md:py-16">
      <div className={cn(INTRO_CONTENT_MAX, "mx-auto w-full px-4 md:px-8")}>
        <div className="mb-10">
          <StartingWordmark href="/" className="[&_img:last-child]:brightness-0" />
        </div>

        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#0b0f1c]">솔루션</p>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className={footerLinkClass}>
                  특징
                </Link>
              </li>
              <li>
                <Link href="#process" className={footerLinkClass}>
                  이용 순서
                </Link>
              </li>
              <li>
                <Link href="#pricing" className={footerLinkClass}>
                  요금
                </Link>
              </li>
              <li>
                <Link href="#faq" className={footerLinkClass}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#0b0f1c]">회사</p>
            <ul className="space-y-2">
              <li>
                <Link href="/company" className={footerLinkClass}>
                  회사 소개
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.starting.kr/ko"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  블로그
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#0b0f1c]">지원</p>
            <ul className="space-y-2">
              <li>
                <ChannelTalkInquiryLink className={footerLinkClass}>문의하기</ChannelTalkInquiryLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-1.5 text-xs leading-relaxed break-words text-[#5d6a82]">
          <p className="font-medium text-[#3f4a60]">스타팅파트너스(주)</p>
          <p>
            대표이사 : 김홍찬 | 사업자 등록번호 : 313-88-02066 | 통신판매번호 : 2025-서울광진-0701
          </p>
          <p>
            직업정보제공번호 : 서울동부 제 2026-6 호 | 유료직업소개번호 : 제 2025-3040234-14-5-00005
            호
          </p>
          <p>
            본사 : 서울특별시 광진구 능동로 81, 3층 | 지사/연구소 : 서울특별시 중구 퇴계로 15, 5층
          </p>
          <p>문의 : 1688-7360 / support@starting.kr</p>
          <p className="pt-4 text-[#5d6a82]">&copy; 2026, Starting Partners Inc.</p>
        </div>
      </div>
    </footer>
  )
}
