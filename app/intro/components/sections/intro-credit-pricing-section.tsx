import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { IntroPricingCreditCard } from "../pricing/intro-pricing-credit-card"

export function IntroCreditPricingSection() {
  return (
    <IntroSection variant="default">
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
