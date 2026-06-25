export const JDLIST_IT_ROLE_KEYS = ["developer", "designer", "marketer", "planner"] as const

export type JdListRoleBucket = "it" | "other"

const IT_ROLE_KEY_SET = new Set<string>(JDLIST_IT_ROLE_KEYS)

export function classifyJdListRoleBucket(roleKey: string | null | undefined): JdListRoleBucket {
  const normalized = String(roleKey ?? "").trim()
  if (normalized && IT_ROLE_KEY_SET.has(normalized)) return "it"
  return "other"
}
