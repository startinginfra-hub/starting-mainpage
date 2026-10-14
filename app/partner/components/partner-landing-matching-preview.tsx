import { cn } from "@/lib/utils"

type StatusTone = "active" | "settlement_pending" | "ended"
type StageTone = "starting" | "document" | "interview" | "final"

type PreviewRow = {
  status: { text: string; tone: StatusTone }
  stage: { text: string; tone: StageTone }
  companyName: string
  postingTitle: string
  applicantName: string
  appliedAt: string
  dispatchedAt: string
  dispatchedAtShort: string
  employmentDate: string
}

const STATUS_TABS = [
  { label: "전체", count: 5, active: true },
  { label: "진행중", count: 3, active: false },
  { label: "정산대기", count: 1, active: false },
  { label: "종료", count: 1, active: false },
]

const PREVIEW_ROWS: PreviewRow[] = [
  {
    status: { text: "진행중", tone: "active" },
    stage: { text: "스타팅 검토", tone: "starting" },
    companyName: "메디브릿지",
    postingTitle: "CFO (재무 총괄)",
    applicantName: "김O준",
    appliedAt: "2026.10.13",
    dispatchedAt: "-",
    dispatchedAtShort: "-",
    employmentDate: "-",
  },
  {
    status: { text: "진행중", tone: "active" },
    stage: { text: "서류검토", tone: "document" },
    companyName: "딥스케일",
    postingTitle: "AI 엔지니어링 리드",
    applicantName: "이O연",
    appliedAt: "2026.10.08",
    dispatchedAt: "2026.10.09 14:20",
    dispatchedAtShort: "10.09 14:20",
    employmentDate: "-",
  },
  {
    status: { text: "진행중", tone: "active" },
    stage: { text: "1차 면접", tone: "interview" },
    companyName: "그린모빌리티",
    postingTitle: "B2B 영업 총괄",
    applicantName: "박O윤",
    appliedAt: "2026.09.29",
    dispatchedAt: "2026.09.30 10:05",
    dispatchedAtShort: "09.30 10:05",
    employmentDate: "-",
  },
  {
    status: { text: "정산대기", tone: "settlement_pending" },
    stage: { text: "최종합격", tone: "final" },
    companyName: "모아커머스",
    postingTitle: "백엔드 개발자",
    applicantName: "최O은",
    appliedAt: "2026.08.18",
    dispatchedAt: "2026.08.19 16:40",
    dispatchedAtShort: "08.19 16:40",
    employmentDate: "2026.09.15",
  },
  {
    status: { text: "종료", tone: "ended" },
    stage: { text: "서류검토", tone: "document" },
    companyName: "핀플로우",
    postingTitle: "프로덕트 디자이너",
    applicantName: "정O우",
    appliedAt: "2026.09.02",
    dispatchedAt: "2026.09.03 11:15",
    dispatchedAtShort: "09.03 11:15",
    employmentDate: "-",
  },
]

const MOBILE_VISIBLE_COUNT = 3

const STATUS_TONE_CLASS: Record<StatusTone, string> = {
  active: "bg-[#1A7CFF]/10 text-[#126FE3]",
  settlement_pending: "bg-violet-500/11 text-violet-800",
  ended: "bg-neutral-100 text-neutral-600",
}

const STAGE_TONE_CLASS: Record<StageTone, string> = {
  starting: "bg-teal-500/11 text-teal-800",
  document: "bg-yellow-500/11 text-yellow-800",
  interview: "bg-[#1A7CFF]/10 text-[#126FE3]",
  final: "bg-violet-500/11 text-violet-800",
}

function StatusBadge({ status }: { status: PreviewRow["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        STATUS_TONE_CLASS[status.tone],
      )}
    >
      {status.tone === "active" ? (
        <span className="relative flex size-2 shrink-0 items-center justify-center">
          <span className="absolute inline-flex size-full rounded-full bg-[#1A7CFF]/40 motion-safe:animate-ping motion-reduce:animate-none" />
          <span className="relative size-1.5 rounded-full bg-[#1A7CFF]" />
        </span>
      ) : (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            status.tone === "settlement_pending" ? "bg-violet-600" : "bg-neutral-400/85",
          )}
        />
      )}
      {status.text}
    </span>
  )
}

function StageBadge({ stage }: { stage: PreviewRow["stage"] }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        STAGE_TONE_CLASS[stage.tone],
      )}
    >
      {stage.text}
    </span>
  )
}

function DateText({ value }: { value: string }) {
  return <span className={value === "-" ? "text-neutral-300" : undefined}>{value}</span>
}

function StatusTabs() {
  return (
    <div className="flex gap-1.5 overflow-x-auto">
      {STATUS_TABS.map((tab) => (
        <span
          key={tab.label}
          className={cn(
            "inline-flex h-8 shrink-0 items-center gap-1 rounded-full border px-3 text-[13px] font-medium",
            tab.active ? "border-[#1A7CFF] bg-[#1A7CFF] text-white" : "border-zinc-200 bg-white text-zinc-600",
          )}
        >
          {tab.label}
          <span className={cn("tabular-nums", tab.active ? "text-white/70" : "text-zinc-400")}>{tab.count}</span>
        </span>
      ))}
    </div>
  )
}

function DesktopTable() {
  return (
    <div className="hidden overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-white md:block">
      <table className="w-full table-fixed text-left">
        <thead className="border-b border-neutral-100 bg-neutral-50/60 text-[12px] font-medium text-neutral-500">
          <tr>
            <th className="w-28 py-3 pr-3 pl-5 text-center font-medium">현재 상태</th>
            <th className="w-28 px-3 py-3 text-center font-medium">전형 단계</th>
            <th className="px-3 py-3 font-medium">기업·공고</th>
            <th className="w-20 px-3 py-3 text-center font-medium">이름</th>
            <th className="w-28 px-3 py-3 text-center font-medium">지원일</th>
            <th className="w-36 px-3 py-3 text-center font-medium">기업발송일</th>
            <th className="w-28 py-3 pr-5 pl-3 text-center font-medium">입사일</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {PREVIEW_ROWS.map((row) => (
            <tr key={row.applicantName} className={cn("align-middle", row.status.tone === "ended" && "bg-neutral-50")}>
              <td className="py-3.5 pr-3 pl-5 text-center">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-3 py-3.5 text-center">
                <StageBadge stage={row.stage} />
              </td>
              <td className="px-3 py-3.5">
                <p className="truncate text-[12px] text-neutral-500">{row.companyName}</p>
                <p className="truncate text-[14px] font-medium text-neutral-900">{row.postingTitle}</p>
              </td>
              <td className="truncate px-3 py-3.5 text-center text-[14px] font-semibold text-neutral-900">
                {row.applicantName}
              </td>
              <td className="px-3 py-3.5 text-center text-[13px] text-neutral-600 tabular-nums">
                <DateText value={row.appliedAt} />
              </td>
              <td className="px-3 py-3.5 text-center text-[13px] text-neutral-600 tabular-nums">
                <DateText value={row.dispatchedAt} />
              </td>
              <td className="py-3.5 pr-5 pl-3 text-center text-[13px] text-neutral-600 tabular-nums">
                <DateText value={row.employmentDate} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MobileDateCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] text-neutral-500">{label}</p>
      <p
        className={cn(
          "mt-0.5 truncate text-[13px] font-medium tabular-nums",
          value === "-" ? "text-neutral-300" : "text-neutral-800",
        )}
      >
        {value}
      </p>
    </div>
  )
}

function MobileCards() {
  return (
    <ul className="flex flex-col gap-3 md:hidden">
      {PREVIEW_ROWS.slice(0, MOBILE_VISIBLE_COUNT).map((row) => (
        <li key={row.applicantName} className="rounded-[1.25rem] border border-neutral-200 bg-white p-4">
          <p className="truncate text-[16px] font-semibold text-neutral-900">{row.applicantName}</p>
          <p className="mt-0.5 truncate text-[13px] text-neutral-500">
            {row.companyName}
            <span className="mx-1 text-neutral-300">·</span>
            <span className="font-medium text-neutral-800">{row.postingTitle}</span>
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={row.status} />
            <StageBadge stage={row.stage} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-neutral-50 px-3 py-2.5">
            <MobileDateCell label="지원일" value={row.appliedAt} />
            <MobileDateCell label="기업발송" value={row.dispatchedAtShort} />
            <MobileDateCell label="입사일" value={row.employmentDate} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function PartnerLandingMatchingPreview() {
  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-4 ring-1 ring-zinc-200/80 sm:p-6" aria-hidden>
      <StatusTabs />
      <DesktopTable />
      <MobileCards />
    </div>
  )
}
