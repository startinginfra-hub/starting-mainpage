import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import {
  LIST_FEE_MANWON,
  formatPricingManwon,
  getCreditPerHireAmountManwon,
} from "../pricing/intro-pricing-constants"
import { IntroPricingSimpleCard } from "../pricing/intro-pricing-simple-card"

export function IntroPricingOverviewSection() {
  const discountedPerHireManwon = getCreditPerHireAmountManwon("bank")

  return (
    <IntroSection id="pricing" variant="alt">
      <IntroSectionHeading
        title="채용 1명당 요금"
        subtitle="애초에 저렴한 채용 수수료에 추가 할인까지!"
      />

      <IntroReveal yOffset="16">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-5">
            <IntroPricingSimpleCard
              badge="할인 미적용"
              amount={LIST_FEE_MANWON.toLocaleString("ko-KR")}
              amountSuffix="만 원(크레딧)"
              description="600만 원 미만 충전 시 할인 혜택 미적용"
            />
            <p className="text-center text-sm font-semibold text-[#9aa5b8] md:text-base">or</p>
            <IntroPricingSimpleCard
              badge="할인 적용"
              amount={discountedPerHireManwon.toLocaleString("ko-KR")}
              amountSuffix="만 원"
              description="600만 원 이상 충전 시 15% 할인 적용 금액"
              featured
            />
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-[#9aa5b8] md:mt-5 md:text-xs">
            <span aria-hidden className="mr-0.5 text-[#c5cdd9]">
              ※
            </span>
            {formatPricingManwon(discountedPerHireManwon)}은 계좌이체 충전 할인 반영 실질금액
            입니다.
          </p>
        </div>
      </IntroReveal>
    </IntroSection>
  )
}
