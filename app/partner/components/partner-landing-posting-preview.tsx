import { Building2 } from "lucide-react"
import { formatPartnerFeeRange, partnerFeeTitle } from "@/lib/partner/partner-fee"
import { cn } from "@/lib/utils"

const MOBILE_VISIBLE_COUNT = 4

type PreviewPosting = {
  companyName: string
  title: string
  meta: string[]
  isStartingAlliance: boolean
  salaryMinManWon: number | null
  salaryMaxManWon: number | null
}

/** 수수료 높은순 */
const PREVIEW_POSTINGS: PreviewPosting[] = [
  {
    companyName: "메디브릿지",
    title: "CFO (재무 총괄)",
    meta: ["경력 15년+", "서울 강남구"],
    isStartingAlliance: true,
    salaryMinManWon: 12000,
    salaryMaxManWon: 18000,
  },
  {
    companyName: "딥스케일",
    title: "AI 엔지니어링 리드",
    meta: ["경력 10년+", "서울 강남구"],
    isStartingAlliance: true,
    salaryMinManWon: 10000,
    salaryMaxManWon: 15000,
  },
  {
    companyName: "그린모빌리티",
    title: "B2B 영업 총괄",
    meta: ["경력 10년+", "경기 성남시"],
    isStartingAlliance: true,
    salaryMinManWon: 8000,
    salaryMaxManWon: 10000,
  },
  {
    companyName: "모아커머스",
    title: "백엔드 개발자",
    meta: ["경력 5년+", "서울 성동구"],
    isStartingAlliance: true,
    salaryMinManWon: 6000,
    salaryMaxManWon: 8000,
  },
  {
    companyName: "핀플로우",
    title: "프로덕트 디자이너",
    meta: ["경력 3년+", "서울 강남구"],
    isStartingAlliance: true,
    salaryMinManWon: 4000,
    salaryMaxManWon: 6000,
  },
  {
    companyName: "스테이로그",
    title: "고객경험(CX) 매니저",
    meta: ["경력 3년+", "서울 중구"],
    isStartingAlliance: true,
    salaryMinManWon: 4000,
    salaryMaxManWon: 5000,
  },
]

function PreviewCard({ posting, className }: { posting: PreviewPosting; className?: string }) {
  const feeLabel = formatPartnerFeeRange(posting.salaryMinManWon, posting.salaryMaxManWon, posting.isStartingAlliance)
  return (
    <li
      className={cn(
        "flex min-w-0 flex-col gap-3 rounded-[1.25rem] border border-neutral-200 bg-white p-4 sm:gap-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="relative flex min-w-0 flex-1 items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
            <Building2 className="size-5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate pr-14 text-[13px] font-medium text-neutral-500">{posting.companyName}</p>
            <p className="mt-0.5 line-clamp-2 text-[15px] font-semibold text-neutral-900">{posting.title}</p>
            <p className="mt-1 line-clamp-2 text-[13px] text-neutral-500">{posting.meta.join(" · ")}</p>
          </div>
        </div>

        {feeLabel ? (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-[#1A7CFF]/[0.06] px-3.5 py-3">
            <span className="shrink-0 text-[12px] font-medium text-[#1A7CFF]/80">
              {partnerFeeTitle(posting.isStartingAlliance)}
            </span>
            <span className="min-w-0 truncate text-[17px] font-bold tracking-tight text-[#126FE3] tabular-nums">
              {feeLabel}
            </span>
          </div>
        ) : null}
      </div>
    </li>
  )
}

export function PartnerLandingPostingPreview() {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3" aria-hidden>
      {PREVIEW_POSTINGS.map((posting, index) => (
        <PreviewCard
          key={posting.companyName}
          posting={posting}
          className={index >= MOBILE_VISIBLE_COUNT ? "max-md:hidden" : undefined}
        />
      ))}
    </ul>
  )
}
