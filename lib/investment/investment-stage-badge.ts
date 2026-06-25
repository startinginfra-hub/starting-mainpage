export type InvestmentStageBadgeTier = "early" | "growth" | "late" | "exit" | "none" | "unknown"

const GRAY_BADGE_CLASS = "bg-neutral-100 text-neutral-600"

const TIER_CLASS: Record<InvestmentStageBadgeTier, string> = {
  early: "bg-stone-100 text-stone-600",
  growth: "bg-sky-50 text-sky-700",
  late: "bg-violet-50 text-violet-700",
  exit: "bg-emerald-50 text-emerald-700",
  none: GRAY_BADGE_CLASS,
  unknown: GRAY_BADGE_CLASS,
}

function trimmed(raw: string): string {
  return raw.trim()
}

function isNoInvestmentHistory(raw: string): boolean {
  return /투자\s*이력\s*없음/i.test(trimmed(raw))
}

function isHiddenPlaceholder(raw: string): boolean {
  return /^(없음|무|해당\s*없음|미등록)$/i.test(trimmed(raw))
}

/** matching 인사이트 문구용 — 실제 투자 단계만 true */
export function hasMeaningfulInvestmentStage(raw: string): boolean {
  const t = trimmed(raw)
  if (!t || t === "-") return false
  if (isNoInvestmentHistory(t)) return false
  if (isHiddenPlaceholder(t)) return false
  return true
}

/** jdlist 카드 배지용 — 투자 이력 없음 포함, 빈값·플레이스홀더 제외 */
export function shouldShowJdListInvestmentStageBadge(raw: string): boolean {
  const t = trimmed(raw)
  if (!t || t === "-") return false
  if (isHiddenPlaceholder(t)) return false
  return true
}

export function normalizeInvestmentStageKey(raw: string): string {
  return trimmed(raw)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/시리즈/g, "series")
    .replace(/엔젤\s*투자/g, "엔젤투자")
}

export function getInvestmentStageBadgeTier(raw: string): InvestmentStageBadgeTier | null {
  if (!shouldShowJdListInvestmentStageBadge(raw)) return null

  const key = normalizeInvestmentStageKey(raw)
  if (isNoInvestmentHistory(key)) return "none"

  if (/^(엔젤투자|angel(\s*investment)?|pre[\s-]?seed|seed)$/.test(key)) {
    return "early"
  }

  if (/^pre[\s-]?a$/.test(key) || /^series [ab]$/.test(key)) {
    return "growth"
  }

  if (/^series [c-g]$/.test(key)) {
    return "late"
  }

  if (/^(m&a|ma|kosdaq|kospi)$/.test(key)) {
    return "exit"
  }

  return "unknown"
}

export function getInvestmentStageBadgeClassName(raw: string): string | null {
  const tier = getInvestmentStageBadgeTier(raw)
  if (!tier) return null
  return TIER_CLASS[tier]
}

export function getInvestmentStageBadgeLabel(raw: string): string | null {
  if (!shouldShowJdListInvestmentStageBadge(raw)) return null
  return trimmed(raw)
}
