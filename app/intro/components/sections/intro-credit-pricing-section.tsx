import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { CREDIT_DISCOUNT_EVENT_END_LABEL } from "../pricing/intro-pricing-constants"
import { IntroPricingCreditCard } from "../pricing/intro-pricing-credit-card"

export function IntroCreditPricingSection() {
  return (
    <IntroSection variant="default">
      <div className="mb-3 flex justify-center md:mb-4">
        <span className="inline-flex items-center rounded-full border border-[#1A7CFF]/20 bg-[#1A7CFF]/10 px-3 py-1 text-xs font-bold text-[#126FE3] md:text-[13px]">
          충전 할인 EVENT({CREDIT_DISCOUNT_EVENT_END_LABEL}까지)
        </span>
      </div>
      <IntroSectionHeading
        title="크레딧으로 채용 비용을 낮춰보세요"
        subtitle="미리 충전하고, 채용 1명당 크레딧이 차감돼요"
      />

      <div className="mx-auto max-w-md md:max-w-lg">
        <IntroReveal yOffset="16">
          <IntroPricingCreditCard />
        </IntroReveal>
      </div>
    </IntroSection>
  )
}
