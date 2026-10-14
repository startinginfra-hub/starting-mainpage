/** 스타팅 얼라이언스 공고 수수료율 — app.starting.kr의 `STARTING_ALLIANCE_FEE_RATE`와 같은 값이어야 한다 */
export const STARTING_ALLIANCE_FEE_RATE = 0.2

/** 얼라이언스 수수료 중 파트너 배분 비율 */
export const PARTNER_FEE_SHARE_RATE = 0.5

function hasSalary(value: number | null): value is number {
  return value != null && Number.isFinite(value) && value > 0
}

export function partnerFeeManWon(salaryManWon: number): number {
  return Math.floor(salaryManWon * STARTING_ALLIANCE_FEE_RATE * PARTNER_FEE_SHARE_RATE)
}

/** 추천 인재 입사 시 스타팅이 인재에게 지급하는 이직 축하금 — 파트너 수수료와 별개 */
export const PARTNER_SIGN_ON_BONUS_MAN_WON = 50

/** 파트너 수수료 지급 시 원천징수하는 기타소득세율 (지방소득세 포함) */
export const PARTNER_WITHHOLDING_TAX_RATE = 0.088

/** 스타팅 일반(비얼라이언스) 공고 파트너 수수료 — 연봉과 무관한 고정액 */
export const PARTNER_STANDARD_FEE_MAN_WON = 50

export function partnerFeeTitle(isStartingAlliance: boolean): string {
  return isStartingAlliance ? "정산 예상 수수료" : "정산 확정 수수료"
}

/** 공고 연봉 범위(만원) → 예상 수수료 표시 문구. 얼라이언스 공고인데 연봉 정보가 없으면 null */
export function formatPartnerFeeRange(
  minManWon: number | null,
  maxManWon: number | null,
  isStartingAlliance: boolean,
): string | null {
  const fmt = (n: number) => `${n.toLocaleString("ko-KR")}만`
  if (!isStartingAlliance) return `${fmt(PARTNER_STANDARD_FEE_MAN_WON)}원`
  const min = hasSalary(minManWon) ? partnerFeeManWon(minManWon) : null
  const max = hasSalary(maxManWon) ? partnerFeeManWon(maxManWon) : null
  if (min != null && max != null) return min === max ? `${fmt(min)}원` : `${fmt(min)} ~ ${fmt(max)}원`
  if (min != null) return `${fmt(min)}원~`
  if (max != null) return `~${fmt(max)}원`
  return null
}
