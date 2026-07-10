export const DEFAULT_SALARY_MANWON = 5000
/** 2026년 최저임금 기준 연봉(만 원) */
export const MIN_SALARY_MANWON = 2588
export const MAX_SALARY_MANWON = 30000

const PLATFORM_FEE_RATE = 0.07
const HEADHUNTING_MIN_RATE = 0.15
const HEADHUNTING_MAX_RATE = 0.3

export const STARTING_FEE = 300

export type HiringCostBreakdown = {
  salaryManwon: number
  platformFee: number
  startingFee: number
  headhuntingMin: number
  headhuntingMax: number
  savingsPlatform: number
  savingsHeadhuntingMin: number
  savingsHeadhuntingMax: number
}

function shouldClampSalaryToMin(parsed: number): boolean {
  return parsed < MIN_SALARY_MANWON && parsed * 10 > MAX_SALARY_MANWON
}

export function clampSalaryManwon(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return DEFAULT_SALARY_MANWON
  return Math.min(MAX_SALARY_MANWON, Math.max(MIN_SALARY_MANWON, Math.round(value)))
}

export function extractSalaryDigits(raw: string): string {
  return raw.replace(/[^\d]/g, "")
}

/** 입력 중 표시용 — 최저·최대 범위 밖 값은 즉시 보정 */
export function normalizeSalaryInput(raw: string): string {
  const digits = extractSalaryDigits(raw).slice(0, String(MAX_SALARY_MANWON).length)
  if (!digits) return ""
  const parsed = Number.parseInt(digits, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return ""
  let bounded = Math.min(MAX_SALARY_MANWON, parsed)
  if (shouldClampSalaryToMin(bounded)) {
    bounded = MIN_SALARY_MANWON
  }
  return bounded.toLocaleString("ko-KR")
}

/** 계산용 — 빈 값은 기본값, 확정적으로 최저 미만이면 최저 적용 */
export function getSalaryManwonForCalculation(raw: string): number {
  const digits = extractSalaryDigits(raw)
  if (!digits) return DEFAULT_SALARY_MANWON
  const parsed = Number.parseInt(digits, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_SALARY_MANWON
  const capped = Math.min(MAX_SALARY_MANWON, parsed)
  if (shouldClampSalaryToMin(capped)) return MIN_SALARY_MANWON
  if (capped < MIN_SALARY_MANWON) return capped
  return capped
}

export function parseSalaryInput(raw: string): number {
  return clampSalaryManwon(getSalaryManwonForCalculation(raw))
}

export function formatSalaryInput(value: number): string {
  return value.toLocaleString("ko-KR")
}

export function calculateHiringCosts(salaryManwon: number): HiringCostBreakdown {
  const salary =
    Number.isFinite(salaryManwon) && salaryManwon > 0
      ? clampSalaryManwon(salaryManwon)
      : DEFAULT_SALARY_MANWON
  const platformFee = Math.round(salary * PLATFORM_FEE_RATE)
  const startingFee = STARTING_FEE
  const headhuntingMin = Math.round(salary * HEADHUNTING_MIN_RATE)
  const headhuntingMax = Math.round(salary * HEADHUNTING_MAX_RATE)

  return {
    salaryManwon: salary,
    platformFee,
    startingFee,
    headhuntingMin,
    headhuntingMax,
    savingsPlatform: Math.max(0, platformFee - startingFee),
    savingsHeadhuntingMin: Math.max(0, headhuntingMin - startingFee),
    savingsHeadhuntingMax: Math.max(0, headhuntingMax - startingFee),
  }
}

export function formatManwon(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}만 원`
}

export function formatManwonRange(min: number, max: number): string {
  if (min === max) return formatManwon(min)
  return `${min.toLocaleString("ko-KR")}만 원~${max.toLocaleString("ko-KR")}만 원`
}
