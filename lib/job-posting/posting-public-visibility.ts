export const DEFAULT_JOB_POSTING_VISIBILITY = "public"
export const PRIVATE_JOB_POSTING_VISIBILITY = "private"

/** DB·폼 저장용 canonical value (`public` | `private`) */
export function normalizeJobPostingVisibilityText(raw: string | null | undefined): string {
  const value = String(raw ?? "").trim()
  if (!value || value === "공개") return DEFAULT_JOB_POSTING_VISIBILITY
  if (value === "private" || value === "비공개") return PRIVATE_JOB_POSTING_VISIBILITY
  return value
}

/** 공고 공개 여부(visibility_text) — status=open 과 별개 */
export function isJobPostingPrivateVisibility(visibilityText: string | null | undefined): boolean {
  return normalizeJobPostingVisibilityText(visibilityText) === PRIVATE_JOB_POSTING_VISIBILITY
}

/** 외부 공개 페이지(/matching/{n})에 노출 가능한지 */
export function isJobPostingPubliclyVisible(input: {
  status: string | null | undefined
  visibilityText: string | null | undefined
}): boolean {
  return !isJobPostingPrivateVisibility(input.visibilityText)
}

/** 지원(검토 요청) 가능 여부 — 채용 중이면서 공개 공고만 */
export function isJobPostingAcceptingApplications(input: {
  status: string | null | undefined
  visibilityText: string | null | undefined
}): boolean {
  return String(input.status ?? "").trim() === "open" && isJobPostingPubliclyVisible(input)
}
