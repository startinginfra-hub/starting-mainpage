export const CHARGE_TYPE_FILTER_ALL = "__all__" as const

export const COMPANY_PROFILE_CHARGE_TYPE_FILTER_OPTIONS = [
  { value: "postpaid", label: "후불" },
  { value: "prepaid", label: "선불" },
  { value: "sbc", label: "중진공" },
] as const

export type AdminCompanyProfileChargeTypeFilter =
  | typeof CHARGE_TYPE_FILTER_ALL
  | (typeof COMPANY_PROFILE_CHARGE_TYPE_FILTER_OPTIONS)[number]["value"]

export type AdminCompanyChargeTypeTabCounts = Record<
  (typeof COMPANY_PROFILE_CHARGE_TYPE_FILTER_OPTIONS)[number]["value"],
  number
> & {
  all: number
}

export const EMPTY_ADMIN_COMPANY_CHARGE_TYPE_TAB_COUNTS: AdminCompanyChargeTypeTabCounts = {
  all: 0,
  postpaid: 0,
  prepaid: 0,
  sbc: 0,
}

export function normalizeCompanyProfileChargeTypeFilter(
  raw: unknown,
): AdminCompanyProfileChargeTypeFilter {
  if (raw === "postpaid" || raw === "prepaid" || raw === "sbc") return raw
  return CHARGE_TYPE_FILTER_ALL
}

export function normalizeBillingChargeTypeKey(
  raw: string | null | undefined,
): "postpaid" | "prepaid" | "sbc" {
  const value = String(raw ?? "").trim().toLowerCase()
  if (value === "prepaid" || value === "선불") return "prepaid"
  if (value === "sbc" || value === "중진공") return "sbc"
  return "postpaid"
}

const PREPAID_CHARGE_TYPE_DB_VALUES = ["prepaid", "선불"] as const
const SBC_CHARGE_TYPE_DB_VALUES = ["sbc", "중진공"] as const

export function billingChargeTypeDbValuesForFilter(
  filter: Exclude<AdminCompanyProfileChargeTypeFilter, typeof CHARGE_TYPE_FILTER_ALL>,
): readonly string[] {
  if (filter === "prepaid") return PREPAID_CHARGE_TYPE_DB_VALUES
  if (filter === "sbc") return SBC_CHARGE_TYPE_DB_VALUES
  return []
}

export function billingChargeTypeDbValuesExcludedFromPostpaid(): string[] {
  return [...PREPAID_CHARGE_TYPE_DB_VALUES, ...SBC_CHARGE_TYPE_DB_VALUES]
}
