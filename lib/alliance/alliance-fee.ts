import { extractSalaryDigits } from "@/lib/intro/hiring-cost-calculator"

/** 이용 자격 최소 제시 연봉(만 원) */
export const ALLIANCE_MIN_SALARY_MANWON = 4000
/** 연봉 구간과 관계없이 적용되는 단일 요율 */
export const ALLIANCE_FEE_RATE = 0.2
/** 크레딧 충전 시 적용되는 할인율 */
export const ALLIANCE_CREDIT_DISCOUNT_RATE = 0.1
/** 크레딧 충전 할인을 반영한 실질 요율 */
export const ALLIANCE_EFFECTIVE_RATE = ALLIANCE_FEE_RATE * (1 - ALLIANCE_CREDIT_DISCOUNT_RATE)
export const ALLIANCE_MAX_SALARY_MANWON = 100000
export const ALLIANCE_DEFAULT_SALARY_MANWON = 4000

export type AllianceFeeResult =
  | { eligible: false; salaryManwon: number }
  | { eligible: true; salaryManwon: number; rate: number; feeManwon: number; paidManwon: number }

export function calculateAllianceFee(salaryManwon: number): AllianceFeeResult {
  if (!Number.isFinite(salaryManwon) || salaryManwon < ALLIANCE_MIN_SALARY_MANWON) {
    return { eligible: false, salaryManwon }
  }
  const feeManwon = Math.round(salaryManwon * ALLIANCE_FEE_RATE)
  return {
    eligible: true,
    salaryManwon,
    rate: ALLIANCE_FEE_RATE,
    feeManwon,
    paidManwon: feeManwon - Math.round(feeManwon * ALLIANCE_CREDIT_DISCOUNT_RATE),
  }
}

export function normalizeAllianceSalaryInput(raw: string): string {
  const digits = extractSalaryDigits(raw).slice(0, String(ALLIANCE_MAX_SALARY_MANWON).length)
  if (!digits) return ""
  const parsed = Number.parseInt(digits, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return ""
  return Math.min(ALLIANCE_MAX_SALARY_MANWON, parsed).toLocaleString("ko-KR")
}

export function parseAllianceSalaryInput(raw: string): number {
  const digits = extractSalaryDigits(raw)
  if (!digits) return 0
  const parsed = Number.parseInt(digits, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return 0
  return Math.min(ALLIANCE_MAX_SALARY_MANWON, parsed)
}

export function formatRatePercent(rate: number): string {
  return `${Math.round(rate * 100)}%`
}
