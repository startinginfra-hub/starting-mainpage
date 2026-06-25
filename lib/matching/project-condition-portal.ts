/** 개인화 키워드(ProjectConditionField) 드롭다운 — Radix Sheet/Dialog 외부 클릭 예외 처리용 */
export const PROJECT_CONDITION_LIST_ATTR = "data-project-condition-list"

export function isProjectConditionListTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(`[${PROJECT_CONDITION_LIST_ATTR}]`) != null
}

/** Radix Sheet·Dialog 안에서는 body가 아닌 모달 루트로 포털해야 항목 클릭이 막히지 않음 */
export function resolveProjectConditionPortalContainer(anchor: HTMLElement | null): HTMLElement | null {
  if (typeof document === "undefined") return null
  const modalRoot =
    anchor?.closest('[data-slot="sheet-content"]') ??
    anchor?.closest('[data-slot="dialog-content"]') ??
    anchor?.closest('[role="dialog"]')
  return (modalRoot as HTMLElement | null) ?? document.body
}
