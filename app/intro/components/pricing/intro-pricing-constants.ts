/** Face-value hire fee in manwon (1 credit ≈ 1만 원 list price). */
export const LIST_FEE_MANWON = 300
export const CREDIT_PER_HIRE = 300
export const CREDIT_CHARGE_BASE_CREDITS = 600
export const CREDIT_CHARGE_BASE_MANWON = 600
export const MIN_CREDIT_CHARGE_CREDITS = 600
export const CREDIT_CHARGE_STEP = 300

export const CREDIT_CHARGE_DISCOUNTS = {
  card: { rate: 0.06, label: "카드결제 충전" },
  bank: { rate: 0.1, label: "계좌이체 충전" },
} as const

export type CreditChargeMethod = keyof typeof CREDIT_CHARGE_DISCOUNTS

/** 2026-12-01 00:00 Asia/Seoul. 이후에는 충전 할인이 없다. */
export const CREDIT_DISCOUNT_EVENT_END_AT = new Date("2026-11-30T15:00:00.000Z")
export const CREDIT_DISCOUNT_EVENT_END_LABEL = "11월 30일"

export function isCreditDiscountEventActive(asOf: Date = new Date()): boolean {
  return asOf.getTime() < CREDIT_DISCOUNT_EVENT_END_AT.getTime()
}

export function formatPricingManwon(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}만 원`
}

export function formatPricingWon(amountManwon: number): string {
  return `${Math.round(amountManwon * 10000).toLocaleString("ko-KR")}원`
}

export function creditsToListPriceManwon(credits: number): number {
  return credits
}

export function parseCreditChargeInput(value: string): number {
  const digits = value.replace(/[^\d]/g, "")
  if (!digits) return 0
  return Number.parseInt(digits, 10)
}

export function formatCreditChargeInput(credits: number): string {
  return credits.toLocaleString("ko-KR")
}

export function clampCreditChargeCredits(credits: number): number {
  return Math.max(MIN_CREDIT_CHARGE_CREDITS, credits)
}

export function normalizeCreditChargeInput(value: string): number {
  return clampCreditChargeCredits(parseCreditChargeInput(value))
}

export function getCreditChargeAmountManwon(
  method: CreditChargeMethod,
  credits: number = CREDIT_CHARGE_BASE_CREDITS,
): number {
  const rate = CREDIT_CHARGE_DISCOUNTS[method].rate
  return Math.round(credits * (1 - rate))
}

export function getCreditDiscountManwon(
  method: CreditChargeMethod,
  credits: number = CREDIT_CHARGE_BASE_CREDITS,
): number {
  return creditsToListPriceManwon(credits) - getCreditChargeAmountManwon(method, credits)
}

export function getCreditPerHireAmountManwon(
  method: CreditChargeMethod,
  credits?: number,
): number {
  if (credits !== undefined) {
    const hireCapacity = getHireCapacityFromCredits(credits)
    if (hireCapacity > 0) {
      const chargeWon = getCreditChargeAmountManwon(method, credits) * 10000
      return Math.round(chargeWon / hireCapacity) / 10000
    }
    return 0
  }

  const rate = CREDIT_CHARGE_DISCOUNTS[method].rate
  return Math.round(CREDIT_PER_HIRE * (1 - rate))
}

export function getHireCapacityFromCredits(credits: number): number {
  return Math.floor(credits / CREDIT_PER_HIRE)
}

export function getCreditChargeDiscountPercent(method: CreditChargeMethod): number {
  return Math.round(CREDIT_CHARGE_DISCOUNTS[method].rate * 100)
}

export const CREDIT_CHARGE_OPTIONS = (["card", "bank"] as const).map((method) => ({
  method,
  label: CREDIT_CHARGE_DISCOUNTS[method].label,
  discountRate: CREDIT_CHARGE_DISCOUNTS[method].rate,
  discountPercent: getCreditChargeDiscountPercent(method),
  chargeAmountManwon: getCreditChargeAmountManwon(method),
  perHireAmountManwon: getCreditPerHireAmountManwon(method),
}))
