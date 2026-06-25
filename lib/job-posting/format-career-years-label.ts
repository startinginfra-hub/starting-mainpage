/** 공개 공고·지원 페이지 경력 칩 문구 — 최대 경력만 표시 */
export function formatCareerYearsLabel(max: number | null): string {
  if (max != null && Number.isFinite(max)) return `경력 ${max}년 이하`
  return "경력 무관"
}
