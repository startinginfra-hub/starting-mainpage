import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { IntroPricingCreditCard } from "../pricing/intro-pricing-credit-card"

export function IntroCreditPricingSection() {
  return (
    <IntroSection id="pricing-credit" variant="default">
      <IntroSectionHeading
        title="정찰제 가격도 부담스럽다면?"
        subtitle="크레딧 충전 후 이용해보세요"
      />

      <div className="mx-auto max-w-md md:max-w-lg">
        <IntroReveal yOffset="16">
          <IntroPricingCreditCard />
        </IntroReveal>
      </div>
    </IntroSection>
  )
}
