import {
  formatPricingManwon,
  getCreditPerHireAmountManwon,
} from "./intro-pricing-constants"
import { IntroPricingSimpleCard } from "./intro-pricing-simple-card"

export function IntroPricingCreditSummaryCard() {
  const perHireAmountManwon = getCreditPerHireAmountManwon("bank")

  return (
    <IntroPricingSimpleCard
      badge="크레딧 결제"
      variant="credit"
      amountLabel="환산 비용"
      amount={formatPricingManwon(perHireAmountManwon)}
      description="#연봉무관 #1명 기준 #크레딧 충전 할인"
    />
  )
}
