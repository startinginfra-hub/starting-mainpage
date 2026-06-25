import { normalizeBillingChargeTypeKey } from "@/lib/admin/company-profile-charge-type-filter"
import { classifyJdListRoleBucket, type JdListRoleBucket } from "@/lib/jdlist/jdlist-role-buckets"
import { formatCareerYearsLabel } from "@/lib/job-posting/format-career-years-label"
import { flattenJobPostingRow } from "@/lib/job-posting/normalize-posting-row"
import { isJobPostingPubliclyVisible } from "@/lib/job-posting/posting-public-visibility"
import { normalizeDisplayLineBreaks } from "@/lib/normalize-display-line-breaks"
import { createClient } from "@/lib/supabase/server"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

export const JDLIST_HOME_SECTION_LIMIT = 32
export const LANDING_ACTIVE_POSTINGS_LIMIT = 15
export { JDLIST_LIST_SCROLL_BATCH_SIZE } from "@/lib/jdlist/jdlist-list-config"
export const JDLIST_FETCH_LIMIT = 500

export type JdListBucketFilter = "all" | JdListRoleBucket

export type JdListHomePostingRow = {
  publicNumber: number
  companyName: string
  companyLogoUrl: string | null
  title: string
  careerLabel: string
  employmentType: string
  contractType: string
  workAddressShort: string
  companyIntro: string
  investmentStage: string
}

export type JdListHomePostings = {
  prepaidPostings: JdListHomePostingRow[]
}

export type JdListAllPostingsResult = {
  rows: JdListHomePostingRow[]
  totalCount: number
}

const SELECT =
  "id, public_number, created_at, status, company_id, job_posting_details(title, recruit_job_title, contract_type, min_career_years, max_career_years, employment_type, work_address, job_option_role_key), job_posting_admin_details(visibility_text)"

type JdListCompanySnippet = {
  company_name: string | null
  company_logo_image_url: string | null
  company_intro: string | null
  investment_stage: string | null
  is_test_company: boolean | null
}

type JdListPostingWithBucket = {
  posting: JdListHomePostingRow
  bucket: JdListRoleBucket
  isPrepaid: boolean
}

function text(value: unknown): string {
  return String(value ?? "").trim()
}

function shortenWorkAddress(raw: string): string {
  const value = raw.trim()
  if (!value) return ""
  const parts = value.split(/\s+/).filter(Boolean)
  if (parts.length <= 2) return value
  return parts.slice(0, 2).join(" ")
}

function formatCompanyIntroPreview(raw: string): string {
  return normalizeDisplayLineBreaks(raw).replace(/\s+/g, " ").trim()
}

function formatJdListPostingTitle(raw: string): string {
  const title = raw.trim()
  if (!title) return "채용 공고"
  if (/채용\s*$/.test(title)) return title
  return `${title} 채용`
}

function buildCompanyDisplayName(company: JdListCompanySnippet | null | undefined): string {
  return text(company?.company_name) || "기업"
}

function toHomePostingRow(
  row: Record<string, unknown>,
  company: JdListCompanySnippet | null | undefined,
): JdListHomePostingRow | null {
  const publicNumber = Number(row.public_number)
  if (!Number.isFinite(publicNumber)) return null

  const companyName = buildCompanyDisplayName(company)
  const title = formatJdListPostingTitle(text(row.recruit_job_title) || text(row.title) || "채용 공고")

  return {
    publicNumber,
    companyName,
    companyLogoUrl: text(company?.company_logo_image_url) || null,
    title,
    careerLabel: formatCareerYearsLabel(
      typeof row.max_career_years === "number" ? row.max_career_years : null,
    ),
    employmentType: text(row.employment_type),
    contractType: text(row.contract_type),
    workAddressShort: shortenWorkAddress(text(row.work_address)),
    companyIntro: formatCompanyIntroPreview(text(company?.company_intro)),
    investmentStage: text(company?.investment_stage),
  }
}

async function loadJdListPostingsCore(): Promise<JdListPostingWithBucket[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("job_postings")
    .select(SELECT)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(JDLIST_FETCH_LIMIT)

  if (error) {
    console.error("[jdlist] loadJdListPostingsCore", error.message)
    return []
  }

  const visibleRows: Array<{ row: Record<string, unknown>; companyId: string }> = []
  const companyIds = new Set<string>()

  for (const rawRow of data ?? []) {
    const flattened = flattenJobPostingRow(rawRow as Record<string, unknown>)
    if (!flattened) continue

    if (
      !isJobPostingPubliclyVisible({
        status: text(flattened.status),
        visibilityText: text(flattened.visibility_text),
      })
    ) {
      continue
    }

    const companyId = text(flattened.company_id)
    if (!companyId) continue

    visibleRows.push({ row: flattened, companyId })
    companyIds.add(companyId)
  }

  const companyById = new Map<string, JdListCompanySnippet>()
  const prepaidCompanyIds = new Set<string>()
  if (companyIds.size > 0) {
    const serviceRole = createServiceRoleClient()
    const companyIdList = [...companyIds]
    const [{ data: companyRows, error: companyError }, { data: billingRows, error: billingError }] =
      await Promise.all([
        serviceRole
          .from("companies")
          .select("id, company_name, company_logo_image_url, company_intro, investment_stage, is_test_company")
          .in("id", companyIdList),
        serviceRole.from("company_billing").select("company_id, charge_type").in("company_id", companyIdList),
      ])

    if (companyError) {
      console.error("[jdlist] loadJdListPostingsCore companies", companyError.message)
    } else {
      for (const companyRow of companyRows ?? []) {
        companyById.set(String(companyRow.id), companyRow as JdListCompanySnippet)
      }
    }

    if (billingError) {
      console.error("[jdlist] loadJdListPostingsCore company_billing", billingError.message)
    } else {
      for (const billingRow of billingRows ?? []) {
        if (normalizeBillingChargeTypeKey(billingRow.charge_type) !== "prepaid") continue
        prepaidCompanyIds.add(String(billingRow.company_id))
      }
    }
  }

  const results: JdListPostingWithBucket[] = []

  for (const { row, companyId } of visibleRows) {
    const company = companyById.get(companyId)
    if (company?.is_test_company === true) continue

    const posting = toHomePostingRow(row, company)
    if (!posting) continue

    results.push({
      posting,
      bucket: classifyJdListRoleBucket(text(row.job_option_role_key)),
      isPrepaid: prepaidCompanyIds.has(companyId),
    })
  }

  return results
}

export async function loadJdListHomePostings(): Promise<JdListHomePostings> {
  const coreRows = await loadJdListPostingsCore()

  const prepaidPostings: JdListHomePostingRow[] = []

  for (const { posting, isPrepaid } of coreRows) {
    if (!isPrepaid) continue
    if (prepaidPostings.length >= JDLIST_HOME_SECTION_LIMIT) break
    prepaidPostings.push(posting)
  }

  return { prepaidPostings }
}

export async function loadJdListAllPostings(options?: {
  bucket?: JdListBucketFilter
}): Promise<JdListAllPostingsResult> {
  const bucket = options?.bucket ?? "all"

  const coreRows = await loadJdListPostingsCore()
  const filtered =
    bucket === "all" ? coreRows : coreRows.filter((row) => row.bucket === bucket)

  const rows = filtered.map((row) => row.posting)

  return {
    rows,
    totalCount: rows.length,
  }
}
