import { Check } from "lucide-react"
import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { cn } from "@/lib/utils"

const PLAN_ACCENTS = {
  blue: {
    badge: "bg-[#1A7CFF] text-white shadow-sm",
    planKind: "text-[#1A7CFF]",
    cardFeatured:
      "border-[#1A7CFF]/30 bg-gradient-to-b from-[#f8fbff] to-white shadow-[0_12px_40px_rgba(26,124,255,0.08)]",
    cardDefault: "border-[#e3e8f1] hover:border-[#1A7CFF]/25 hover:shadow-md",
    topBar: "bg-gradient-to-r from-[#1A7CFF] via-[#4d9aff] to-[#74acff]",
    checkWrap: "bg-[#eef5ff]",
    checkIcon: "text-[#1A7CFF]",
  },
  purple: {
    badge: "bg-[#7C3AED] text-white shadow-sm",
    planKind: "text-[#7C3AED]",
    cardFeatured: "border-[#7C3AED]/30 bg-white",
    cardDefault: "border-[#e3e8f1] hover:border-[#7C3AED]/25 hover:shadow-md",
    topBar: "bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]",
    checkWrap: "bg-[#f3e8ff]",
    checkIcon: "text-[#7C3AED]",
  },
} as const

const PLANS = [
  {
    planKind: "후불 정찰제",
    badge: "입사 이후 결제",
    title: "합격 후 결제",
    price: "300",
    perUnit: "1명 기준(VAT 별도)",
    accent: "blue" as const,
    features: [
      "다양한 서류 지원 · 창업자 출신 전담 매니저",
      "기업 내부 조건에 맞는 인재 프리미엄 매칭",
      "신속한 서류 검토 · 유사도 분석 리포트 제공",
      "면접 일정 조율 및 처우 협의 서포트",
    ],
    total: "300만 원 (VAT 별도)",
    featured: false,
  },
  {
    planKind: "선불 정찰제",
    badge: "면접 진행 전 결제",
    title: "1명당 50만 원 절약",
    price: "250",
    perUnit: "1명 기준(VAT 별도)",
    accent: "purple" as const,
    features: [
      { text: "1년간 헤드헌팅 최대 2명 지원", highlight: true },
      { text: "후불형 대비 총 100만 원 절감", highlight: true },
      "다양한 서류 지원 · 창업자 출신 전담 매니저",
      "기업 내부 조건에 맞는 인재 프리미엄 매칭",
      "신속한 서류 검토 · 유사도 분석 리포트 제공",
    ],
    total: "500만 원 (VAT 별도)",
    featured: true,
  },
] as const

type PlanFeature = string | { text: string; highlight?: boolean }

function getFeatureText(feature: PlanFeature) {
  return typeof feature === "string" ? feature : feature.text
}

function isFeatureHighlighted(feature: PlanFeature) {
  return typeof feature !== "string" && feature.highlight === true
}

type Plan = (typeof PLANS)[number]

function PricingPlanCard({ plan }: { plan: Plan }) {
  const accent = PLAN_ACCENTS[plan.accent]

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all md:p-8",
        plan.featured ? accent.cardFeatured : accent.cardDefault,
      )}
    >
      {plan.featured ? (
        <div
          className={cn("pointer-events-none absolute inset-x-0 top-0 h-1", accent.topBar)}
          aria-hidden
        />
      ) : null}

      <div className="min-h-7">
        {plan.badge ? (
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", accent.badge)}>
            {plan.badge}
          </span>
        ) : null}
      </div>

      <p className={cn("mt-4 text-sm font-semibold", accent.planKind)}>{plan.planKind}</p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#0b0f1c] md:text-xl">
        {plan.title}
      </h3>

      <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
        <p className="text-3xl font-bold tracking-tight text-[#0b0f1c] md:text-[2rem]">
          {plan.price}
          <span className="ml-0.5 text-sm font-normal text-[#5d6a82] md:text-base">만 원</span>
        </p>
        <span className="pb-0.5 text-xs text-[#5d6a82] md:text-sm">/ {plan.perUnit}</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3.5">
        {plan.features.map((feature) => {
          const featureText = getFeatureText(feature)
          const highlighted = isFeatureHighlighted(feature)

          return (
            <li key={featureText} className="flex gap-3">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  accent.checkWrap,
                )}
                aria-hidden
              >
                <Check className={cn("size-3", accent.checkIcon)} strokeWidth={3} />
              </span>
              <span
                className={cn(
                  "text-sm leading-relaxed",
                  highlighted ? cn("font-bold", accent.planKind) : "text-[#3f4a60]",
                )}
              >
                {featureText}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-[#e3e8f1] bg-white px-4 py-3.5">
        <p className="text-xs font-medium text-[#5d6a82]">최종 결제</p>
        <p className="text-right text-sm font-semibold text-[#0b0f1c]">{plan.total}</p>
      </div>
    </article>
  )
}

export function IntroPricingSection() {
  return (
    <IntroSection id="pricing" variant="alt">
      <IntroSectionHeading
        title={
          <>
            스타트업을 위한
            <br className="md:hidden" />
            {" "}
            합리적인 가격
          </>
        }
        subtitle="연봉 비례 수수료 대신, 인재 1명당 정찰제로 책정해요."
      />

      <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
        {PLANS.map((plan, index) => (
          <IntroReveal key={plan.title} delayMs={index * 120} yOffset="16">
            <PricingPlanCard plan={plan} />
          </IntroReveal>
        ))}
      </div>
    </IntroSection>
  )
}
