type RelationValue<T> = T | T[] | null | undefined

export function firstRelation<T>(value: RelationValue<T>): T | null {
  if (Array.isArray(value)) return value[0] ?? null
  return value ?? null
}

export function flattenJobPostingRow<T extends Record<string, unknown>>(
  row: T | null | undefined,
): (T & Record<string, unknown>) | null {
  if (!row) return null

  const detail = firstRelation(row.job_posting_details as RelationValue<Record<string, unknown>>) ?? {}
  const adminDetail = firstRelation(row.job_posting_admin_details as RelationValue<Record<string, unknown>>) ?? {}
  const merged: Record<string, unknown> = {
    ...row,
    ...detail,
    ...adminDetail,
  }

  if ("hidden_condition" in detail) {
    merged["hidden_condition"] = detail.hidden_condition
  }

  return merged as T & Record<string, unknown>
}
