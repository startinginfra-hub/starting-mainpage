import type { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"
import { IntroReveal } from "../intro-reveal"
import { IntroSection } from "../intro-section"

const LICENSING_ITEMS = [
  {
    title: "유료직업소개사업 정식 허가",
    detail: "신고번호 · 제 2025-3040234-14-5-00005 호",
    icon: ShieldCheck,
  },
  {
    title: "유료직업소개사업 보증보험 가입",
    detail: "증권번호 · 제 100-000-2026-0354-0215 호",
    icon: ShieldCheck,
  },
] as const

function SectionPillLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 md:mb-10 md:gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" aria-hidden />
      <span className="shrink-0 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/75 md:px-4 md:text-sm">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" aria-hidden />
    </div>
  )
}

function LicensingTrustCard({
  title,
  detail,
  icon: Icon,
}: (typeof LICENSING_ITEMS)[number]) {
  return (
    <article className="flex h-full gap-4 rounded-xl border border-white/10 bg-[#161b22] p-5 md:gap-5 md:p-6">
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] md:size-11"
        aria-hidden
      >
        <Icon className="size-5 text-[#74acff] md:size-[22px]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold leading-snug text-white md:text-[15px]">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/50 md:text-sm">{detail}</p>
      </div>
    </article>
  )
}

export function IntroLicensingTrustSection() {
  return (
    <IntroSection className="border-y border-white/[0.08] bg-[#0d1117] py-16 md:py-20">
      <IntroReveal yOffset="16">
        <h2 className="mx-auto max-w-3xl text-center text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
          법적 요건을 갖춘
          <br className="md:hidden" />
          {" "}
          유료직업소개사업
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/55 md:text-base">
          정식 허가와 보증보험 가입으로 안심하고 채용을 맡기실 수 있어요.
        </p>
      </IntroReveal>

      <IntroReveal delayMs={120} yOffset="16" className="mt-12 md:mt-14">
        <SectionPillLabel>유료직업소개사업 인증</SectionPillLabel>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {LICENSING_ITEMS.map((item, index) => (
            <IntroReveal key={item.title} delayMs={160 + index * 80} yOffset="16">
              <LicensingTrustCard {...item} />
            </IntroReveal>
          ))}
        </div>
      </IntroReveal>
    </IntroSection>
  )
}
