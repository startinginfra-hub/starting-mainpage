import { BadgeCheck, Info, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

type CompareRow = {
  label: string
  general: { text: string; locked: boolean }
  verified: string
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "공고 목록", general: { text: "전체 열람", locked: false }, verified: "전체 열람" },
  {
    label: "연봉 범위",
    general: { text: "6,000~8,000만원", locked: true },
    verified: "6,000~8,000만원",
  },
  {
    label: "기업 인재상",
    general: { text: "주도적으로 문제를 정의하는 시니어", locked: true },
    verified: "주도적으로 문제를 정의하는 시니어",
  },
  {
    label: "세부 조건",
    general: { text: "커머스 트래픽 대응 경험 필수", locked: true },
    verified: "커머스 트래픽 대응 경험 필수",
  },
  {
    label: "탈락 사유 히스토리",
    general: { text: "결제 도메인 경험 부족으로 2명 탈락", locked: true },
    verified: "결제 도메인 경험 부족으로 2명 탈락",
  },
]

const ROW_CLASS = "flex flex-col gap-1 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-3"
const LABEL_CLASS = "shrink-0 text-[13px] font-semibold sm:w-[7.5rem]"
const VALUE_CLASS = "min-w-0 text-[13px] sm:flex-1 sm:truncate sm:text-right"

function GeneralCard() {
  return (
    <div className="flex flex-col gap-5 rounded-[1.75rem] bg-white p-5 ring-1 ring-zinc-200/80 sm:p-7">
      <div className="flex flex-col gap-1">
        <span className="self-start rounded-full bg-zinc-100 px-2.5 py-1 text-[12px] font-bold text-zinc-500">
          일반 파트너
        </span>
        <p className="mt-2 text-[19px] font-extrabold tracking-tight text-zinc-900 sm:text-[20px]">가입만 하면</p>
        <p className="text-[13.5px] text-zinc-500">공고를 보고 바로 추천할 수 있어요.</p>
      </div>
      <ul className="flex flex-col gap-2">
        {COMPARE_ROWS.map((row) => (
          <li key={row.label} className={cn(ROW_CLASS, "bg-zinc-50")}>
            <span className={cn(LABEL_CLASS, "text-zinc-500")}>{row.label}</span>
            {row.general.locked ? (
              <span className={cn(VALUE_CLASS, "flex items-center gap-1.5 sm:justify-end")}>
                <span className="truncate font-semibold text-zinc-700 blur-[5px] select-none" aria-hidden>
                  {row.general.text}
                </span>
                <Lock className="size-3.5 shrink-0 text-zinc-400" strokeWidth={2.2} aria-label="비공개" />
              </span>
            ) : (
              <span className={cn(VALUE_CLASS, "font-semibold text-zinc-700")}>{row.general.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function VerifiedCard() {
  return (
    <div className="relative flex flex-col gap-5 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#1A7CFF] to-[#5B5CFF] p-5 text-white shadow-[0_16px_36px_-22px_rgba(26,124,255,0.7)] sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/15 blur-3xl" />
      <div className="relative flex flex-col gap-1">
        <span className="inline-flex items-center gap-1 self-start rounded-full bg-white px-2.5 py-1 text-[12px] font-bold text-[#1A7CFF]">
          <BadgeCheck className="size-3.5" strokeWidth={2.4} aria-hidden />
          인증 파트너
        </span>
        <p className="mt-2 text-[19px] font-extrabold tracking-tight sm:text-[20px]">경력 인증하면</p>
        <p className="text-[13.5px] text-white/75">스타팅 헤드헌터가 기업 스크리닝으로 얻은 소싱 가이드가 열려요.</p>
      </div>
      <ul className="relative flex flex-col gap-2">
        {COMPARE_ROWS.map((row) => (
          <li
            key={row.label}
            className={cn(
              ROW_CLASS,
              "ring-1",
              row.general.locked ? "bg-white text-zinc-900 ring-white" : "bg-white/10 ring-white/15",
            )}
          >
            <span className={cn(LABEL_CLASS, row.general.locked ? "text-zinc-500" : "text-white/75")}>
              {row.label}
            </span>
            <span
              className={cn(VALUE_CLASS, "font-bold", row.general.locked ? "text-[#126FE3]" : "text-white")}
            >
              {row.verified}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PartnerLandingTierCompare() {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="grid items-stretch gap-4 md:gap-5 lg:grid-cols-2">
        <GeneralCard />
        <VerifiedCard />
      </div>
      <p className="flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-[13px] ring-1 ring-[#1A7CFF]/15 leading-relaxed text-zinc-600">
        <Info className="mt-[3px] size-3.5 shrink-0 text-[#1A7CFF]" strokeWidth={2.25} aria-hidden />
        <span>
          기업의 내부 채용 정보가 담겨 있어,{" "}
          <strong className="font-semibold text-zinc-800">리크루팅 경력이 확인된 인증 파트너에게만</strong> 공개해요.
        </span>
      </p>
    </div>
  )
}
