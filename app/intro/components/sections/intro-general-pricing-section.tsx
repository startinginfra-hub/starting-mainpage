import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { IntroPricingCreditSummaryCard } from "../pricing/intro-pricing-credit-summary-card"
import { IntroPricingGeneralCard } from "../pricing/intro-pricing-general-card"

export function IntroGeneralPricingSection() {
  return (
    <IntroSection id="pricing" variant="alt">
      <IntroSectionHeading
        title="입사 후 결제 방식 선택"
        subtitle="300만 원 일반 결제 or 추가 할인 받고 크레딧 결제"
      />

      <IntroReveal yOffset="16">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-5">
            <IntroPricingGeneralCard />
            <p className="text-center text-sm font-semibold text-[#9aa5b8] md:text-base">or</p>
            <IntroPricingCreditSummaryCard />
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-[#9aa5b8] md:mt-5 md:text-xs">
            <span aria-hidden className="mr-0.5 text-[#c5cdd9]">
              ※
            </span>
            크레딧의 경우 1명당 300 크레딧이 차감되며, 255만원은 충전 시 할인 혜택이 반영 된 실질금액
            입니다.
          </p>
        </div>
      </IntroReveal>
    </IntroSection>
  )
}
