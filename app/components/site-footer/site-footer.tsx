import Link from "next/link"
import { ChannelTalkInquiryLink } from "@/app/components/app-shell/channel-talk-inquiry-link"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { INTRO_CONTENT_MAX } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"

type SiteFooterVariant = "default" | "alliance"

const footerTheme = {
  default: {
    root: "border-[#e3e8f1] bg-[#fbfcfe]",
    link: "text-sm text-[#5d6a82] transition-colors hover:text-[#0b0f1c]",
    heading: "text-[#0b0f1c]",
    body: "text-[#5d6a82]",
    company: "text-[#3f4a60]",
  },
  alliance: {
    root: "border-white/[0.08] bg-[#07090f]",
    link: "text-sm text-white/45 transition-colors hover:text-white",
    heading: "text-white/80",
    body: "text-white/40",
    company: "text-white/60",
  },
} as const

const footerLinks = {
  default: {
    solution: [
      { href: "/#features", label: "특징" },
      { href: "/#process", label: "이용 순서" },
      { href: "/#pricing", label: "요금" },
      { href: "/#faq", label: "FAQ" },
    ],
    tos: "/tos",
    privacy: "/privacy",
  },
  alliance: {
    solution: [
      { href: "/alliance#eligibility", label: "요금" },
      { href: "/alliance#features", label: "특징" },
      { href: "/alliance#faq", label: "FAQ" },
    ],
    tos: "/alliance/tos",
    privacy: "/alliance/privacy",
  },
} as const

type SiteFooterProps = {
  className?: string
  variant?: SiteFooterVariant
}

export function SiteFooter({ className, variant = "default" }: SiteFooterProps) {
  const theme = footerTheme[variant]
  const links = footerLinks[variant]
  const headingClass = cn("mb-3 text-xs font-semibold uppercase tracking-wide", theme.heading)

  return (
    <footer className={cn("border-t py-12 md:py-16", theme.root, className)}>
      <div className={cn(INTRO_CONTENT_MAX, "mx-auto w-full px-4 md:px-8")}>
        <div className="mb-10">
          {variant === "alliance" ? (
            <StartingWordmark href="/" tone="onDark" />
          ) : (
            <StartingWordmark href="/" className="[&_img:last-child]:brightness-0" />
          )}
        </div>

        <div className="mb-10 grid grid-cols-2 gap-8 max-[600px]:grid-cols-1 md:grid-cols-3">
          <div>
            <p className={headingClass}>솔루션</p>
            <ul className="space-y-2">
              {links.solution.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={theme.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={headingClass}>회사</p>
            <ul className="space-y-2">
              <li>
                <Link href="/company" className={theme.link}>
                  회사 소개
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.starting.kr/ko"
                  className={theme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  블로그
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 max-[600px]:col-span-1 md:col-span-1">
            <p className={headingClass}>지원</p>
            <ul className="space-y-2">
              <li>
                <ChannelTalkInquiryLink className={theme.link}>문의하기</ChannelTalkInquiryLink>
              </li>
              <li>
                <Link href={links.tos} className={theme.link}>
                  이용약관
                </Link>
              </li>
              <li>
                <Link href={links.privacy} className={theme.link}>
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={cn("text-xs leading-relaxed break-words", theme.body)}>
          <div className="hidden space-y-1.5 md:block">
            <p className={cn("font-medium", theme.company)}>스타팅파트너스(주)</p>
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
          </div>
          <div className="space-y-1 md:hidden">
            <p className={cn("font-medium", theme.company)}>스타팅파트너스(주)</p>
            <p>대표이사 : 김홍찬 | 사업자 등록번호 : 313-88-02066</p>
            <p>통신판매번호 : 2025-서울광진-0701</p>
            <p>직업정보제공번호 : 서울동부 제 2026-6 호</p>
            <p>유료직업소개번호 : 제 2025-3040234-14-5-00005 호</p>
            <p>본사 : 서울특별시 광진구 능동로 81, 3층</p>
            <p>지사/연구소 : 서울특별시 중구 퇴계로 15, 5층</p>
            <p>문의 : 1688-7360 / support@starting.kr</p>
          </div>
          <p className={cn("pt-4", theme.body)}>&copy; 2026, Starting Partners Inc.</p>
        </div>
      </div>
    </footer>
  )
}
