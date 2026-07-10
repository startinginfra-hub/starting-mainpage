import {
  formatPricingManwon,
  GENERAL_FEE_MANWON,
} from "./intro-pricing-constants"
import { IntroPricingSimpleCard } from "./intro-pricing-simple-card"

export function IntroPricingGeneralCard() {
  return (
    <IntroPricingSimpleCard
      badge="일반 결제"
      variant="general"
      amount={formatPricingManwon(GENERAL_FEE_MANWON)}
      description="#연봉무관 #1명 기준"
    />
  )
}
