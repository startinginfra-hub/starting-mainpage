import { Check } from "lucide-react"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import {
  ALLIANCE_EFFECTIVE_RATE,
  ALLIANCE_FEE_RATE,
  calculateAllianceFee,
  formatRatePercent,
} from "@/lib/alliance/alliance-fee"
import { formatManwon } from "@/lib/intro/hiring-cost-calculator"
import { cn } from "@/lib/utils"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"

type CompareCell = { main: string; caption?: string }

type CompareRow = { id: string; label: string; searchFirm: CompareCell; alliance: CompareCell }

const COMPARE_ROWS: readonly CompareRow[] = [
  {
    id: "request",
    label: "포지션 의뢰",
    searchFirm: { main: "이메일·전화로 JD 전달" },
    alliance: { main: "채용공고 URL만 붙여넣으면 바로 신청" },
  },
  {
    id: "delivery",
    label: "후보자 전달",
    searchFirm: { main: "이메일 첨부 이력서" },
    alliance: { main: "대시보드에서 매칭 리포트와 함께 확인" },
  },
  {
    id: "interview",
    label: "면접 일정 조율",
    searchFirm: { main: "헤드헌터를 거쳐 메일·전화로 여러 차례 왕복" },
    alliance: { main: "일정을 제안하면 후보가 선택하고 바로 확정" },
  },
  {
    id: "status",
    label: "진행 현황",
    searchFirm: { main: "담당 헤드헌터에게 직접 물어봐야 확인" },
    alliance: { main: "단계별 진행 상황을 실시간으로 확인" },
  },
  {
    id: "rate",
    label: "수수료율",
    searchFirm: { main: "직급·연봉에 따라 15~30%" },
    alliance: {
      main: `연봉 무관 ${formatRatePercent(ALLIANCE_FEE_RATE)} 고정`,
      caption: `크레딧 충전 시 실결제 ${formatRatePercent(ALLIANCE_EFFECTIVE_RATE)}`,
    },
  },
  {
    id: "verification",
    label: "후보 검증",
    searchFirm: { main: "헤드헌터 단독 검수" },
    alliance: { main: "1차 AI 정밀 필터링", caption: "2차 전담 헤드헌터 검수" },
  },
  {
    id: "payment",
    label: "결제 시점",
    searchFirm: { main: "계약별 상이", caption: "착수금이 있는 경우도 있음" },
    alliance: { main: "입사 확인 후에만 크레딧 차감" },
  },
]

const FEE_EXAMPLE_SALARY_MANWON = 10000
const FEE_EXAMPLE_SALARY_LABEL = "1억 원"
const feeExample = calculateAllianceFee(FEE_EXAMPLE_SALARY_MANWON)

const ROW_GRID = "grid grid-cols-2 md:grid-cols-[180px_1fr_1fr]"

function CompareValue({ cell, featured }: { cell: CompareCell; featured: boolean }) {
  return (
    <div className={cn("flex gap-2", featured ? "text-white" : "text-white/45")}>
      {featured ? (
        <Check className="mt-0.5 size-4 shrink-0 text-[#74acff]" strokeWidth={2.5} aria-hidden />
      ) : null}
      <div className="min-w-0">
        <p className={cn("text-[13px] leading-relaxed md:text-sm", featured && "font-semibold")}>{cell.main}</p>
        {cell.caption ? (
          <p className={cn("mt-0.5 text-[11px] leading-snug md:text-xs", featured ? "text-white/55" : "text-white/35")}>
            {cell.caption}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function CompareTable() {
  return (
    <div className="relative mx-auto w-full">
      <div className={cn(ROW_GRID, "pointer-events-none absolute inset-0 hidden md:grid")} aria-hidden>
        <div className="col-start-3 rounded-2xl border border-[#1A7CFF]/45 bg-[#0f131c] shadow-[0_0_32px_-12px_rgba(26,124,255,0.5)]" />
      </div>

      <div className="relative">
        <div className={cn(ROW_GRID, "items-end pb-4")}>
          <span className="hidden md:block" aria-hidden />
          <p className="px-3 text-center text-xs font-semibold text-white/45 md:px-5 md:text-sm">일반 서치펌</p>
          <div className="flex flex-col items-center gap-1 px-3 pt-4 md:px-5 md:pt-6">
            <StartingWordmark
              href={null}
              tone="onDark"
              className="justify-center [&_img]:!block [&_img]:!h-5 [&_img]:!w-auto md:[&_img]:!h-6"
            />
            <span className="text-[11px] font-semibold text-[#74acff] md:text-xs">얼라이언스</span>
          </div>
        </div>

        <div className="border-t border-white/[0.08]">
          {COMPARE_ROWS.map((row, index) => (
            <IntroReveal key={row.id} delayMs={index * 60} yOffset="16">
              <div
                className={cn(
                  ROW_GRID,
                  "py-3.5 md:py-4",
                  index > 0 && "border-t border-white/[0.05]",
                )}
              >
                <p className="col-span-2 px-3 pb-2 text-xs font-medium text-white/60 md:col-span-1 md:px-5 md:pb-0 md:text-sm">
                  {row.label}
                </p>
                <div className="px-3 md:px-5">
                  <CompareValue cell={row.searchFirm} featured={false} />
                </div>
                <div className="rounded-lg bg-[#1A7CFF]/[0.06] px-3 py-1 md:bg-transparent md:px-5 md:py-0">
                  <CompareValue cell={row.alliance} featured />
                </div>
              </div>
            </IntroReveal>
          ))}
        </div>

        {feeExample.eligible ? (
          <IntroReveal delayMs={120} yOffset="16">
            <div className={cn(ROW_GRID, "items-center border-t border-white/[0.08] py-4 md:py-5")}>
              <div className="col-span-2 px-3 pb-3 md:col-span-1 md:px-5 md:pb-0">
                <p className="text-sm font-semibold text-white">수수료 예시</p>
                <p className="text-[11px] text-white/45 md:text-xs">연봉 {FEE_EXAMPLE_SALARY_LABEL} 기준</p>
              </div>
              <div className="px-3 md:px-5">
                <p className="text-sm font-bold text-white/45 md:text-base">2,000만~3,000만 원</p>
                <p className="text-[11px] text-white/35 md:text-xs">연봉 20~30%</p>
              </div>
              <div className="rounded-lg bg-[#1A7CFF]/[0.06] px-3 py-1 md:bg-transparent md:px-5 md:py-0">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-lg font-bold text-[#74acff] md:text-xl">{formatManwon(feeExample.paidManwon)}</span>
                  <span className="text-[11px] text-white/35 line-through decoration-white/40 md:text-xs">
                    {formatManwon(feeExample.feeManwon)}
                  </span>
                </p>
                <p className="text-[11px] text-white/55 md:text-xs">
                  크레딧 충전 시 실결제 {formatRatePercent(ALLIANCE_EFFECTIVE_RATE)}
                </p>
              </div>
            </div>
          </IntroReveal>
        ) : null}
      </div>
    </div>
  )
}

export function AllianceCompareSection() {
  return (
    <AllianceSection id="compare" className="border-t border-white/[0.06]">
      <AllianceSectionHeading
        title={
          <>
            더 간단하고 <span className="alliance-text-gold">합리적으로</span>
          </>
        }
        subtitle={`신청부터 면접 확정까지 스타팅에서, 수수료는 연봉 무관 ${formatRatePercent(ALLIANCE_FEE_RATE)} 고정이에요.`}
      />

      <CompareTable />

      <p className="mt-6 text-center text-[11px] leading-relaxed text-white/35 md:text-xs">
        ※ 일반 서치펌 수수료는 업계 통상 범위 기준이며 계약에 따라 다를 수 있어요 · 부가가치세 별도
      </p>
    </AllianceSection>
  )
}
