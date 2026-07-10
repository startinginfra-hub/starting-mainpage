"use client"

import { useMemo, useState } from "react"
import {
  CREDIT_CHARGE_OPTIONS,
  type CreditChargeMethod,
  creditsToListPriceManwon,
  formatPricingWon,
  getCreditChargeAmountManwon,
  getCreditDiscountManwon,
  getCreditPerHireAmountManwon,
  getHireCapacityFromCredits,
  MIN_CREDIT_CHARGE_CREDITS,
} from "./intro-pricing-constants"
import { IntroPricingCreditDetailCard } from "./intro-pricing-credit-detail-card"
import { IntroPricingChargeEffectGrid } from "./intro-pricing-charge-effect-grid"
import { IntroPricingChargeTabs } from "./intro-pricing-charge-tabs"
import { IntroPricingCreditChargeInput } from "./intro-pricing-credit-charge-input"

export function IntroPricingCreditCard() {
  const [activeMethod, setActiveMethod] = useState<CreditChargeMethod>("bank")
  const [chargeCredits, setChargeCredits] = useState(MIN_CREDIT_CHARGE_CREDITS)

  const activeOption = useMemo(
    () => CREDIT_CHARGE_OPTIONS.find((option) => option.method === activeMethod)!,
    [activeMethod],
  )

  const listPriceManwon = creditsToListPriceManwon(chargeCredits)
  const discountManwon = getCreditDiscountManwon(activeMethod, chargeCredits)
  const chargeAmountManwon = getCreditChargeAmountManwon(activeMethod, chargeCredits)
  const perHireAmountManwon = getCreditPerHireAmountManwon(activeMethod, chargeCredits)
  const hireCapacity = getHireCapacityFromCredits(chargeCredits)

  return (
    <div className="flex w-full flex-col gap-8">
      <IntroPricingChargeTabs activeMethod={activeMethod} onChange={setActiveMethod} />

      <IntroPricingCreditChargeInput credits={chargeCredits} onChange={setChargeCredits} />

      <IntroPricingCreditDetailCard
        chargeCredits={chargeCredits}
        listPriceLabel={formatPricingWon(listPriceManwon)}
        discountValue={`-${formatPricingWon(discountManwon)}`}
        discountPercent={activeOption.discountPercent}
        chargeAmountValue={formatPricingWon(chargeAmountManwon)}
        accent={activeMethod}
      />

      <IntroPricingChargeEffectGrid
        hireCapacity={hireCapacity}
        perHireAmountManwon={perHireAmountManwon}
        accent={activeMethod}
      />
    </div>
  )
}
