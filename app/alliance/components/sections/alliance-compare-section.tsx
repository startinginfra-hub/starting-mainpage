import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import { ALLIANCE_FEE_RATE, calculateAllianceFee, formatRatePercent } from "@/lib/alliance/alliance-fee"
import { formatManwon } from "@/lib/intro/hiring-cost-calculator"
import { cn } from "@/lib/utils"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"

type CompareCell = { main: string; mobileMain?: ReactNode; caption?: string }

type CompareRow = { id: string; label: string; searchFirm: CompareCell; alliance: CompareCell }

const COMPARE_ROWS: readonly CompareRow[] = [
  {
    id: "request",
    label: "포지션 의뢰",
    searchFirm: { main: "이메일·전화로 JD 전달" },
    alliance: { main: "채용공고 URL만 넣으면 신청 완료" },
  },
  {
    id: "delivery",
    label: "후보자 전달",
    searchFirm: { main: "이메일 첨부 이력서" },
    alliance: {
      main: "매칭 리포트 (적합도 분석 및 근거 자동 추출)",
      mobileMain: (
        <>
          매칭 리포트
          <br />
          (적합도 분석 및 근거 자동 추출)
        </>
      ),
    },
  },
  {
    id: "interview",
    label: "면접 일정 조율",
    searchFirm: { main: "헤드헌터 거쳐 메일·전화로 여러 차례 왕복" },
    alliance: { main: "시스템 기반 일정 조율 자동 완료" },
  },
  {
    id: "status",
    label: "진행 현황",
    searchFirm: { main: "담당 헤드헌터에게 매번 문의" },
    alliance: { main: "단계별 진행 상황 실시간 확인" },
  },
  {
    id: "rate",
    label: "수수료율",
    searchFirm: { main: "직급·연봉에 따라 15~30%" },
    alliance: { main: `연봉 무관 ${formatRatePercent(ALLIANCE_FEE_RATE)} 정찰제 수수료` },
  },
  {
    id: "verification",
    label: "후보 검증",
    searchFirm: { main: "헤드헌터 직감으로만 검수" },
    alliance: { main: "1차 AI 정밀 필터링", caption: "2차 전담 헤드헌터 검수" },
  },
  {
    id: "payment",
    label: "결제 시점",
    searchFirm: { main: "계약별 상이", caption: "착수금이 있는 경우도 있음" },
    alliance: { main: "입사 이후 수수료 정산" },
  },
]

const FEE_EXAMPLE_SALARY_MANWON = 5000
const FEE_EXAMPLE_SALARY_LABEL = "5천만원"
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

const MOBILE_CELL_BASE = "flex flex-col justify-center rounded-xl px-3 py-2.5 text-center break-keep"
const MOBILE_SEARCH_FIRM_CELL = cn(MOBILE_CELL_BASE, "bg-white/[0.03]")
const MOBILE_ALLIANCE_CELL = cn(MOBILE_CELL_BASE, "border border-[#1A7CFF]/30 bg-[#1A7CFF]/[0.08]")

function CompareMobileCell({ cell, featured }: { cell: CompareCell; featured: boolean }) {
  const mainCls = cn("text-[12.5px] leading-snug", featured ? "font-semibold text-white" : "text-white/45")

  return (
    <div className={featured ? MOBILE_ALLIANCE_CELL : MOBILE_SEARCH_FIRM_CELL}>
      <p className={mainCls}>{cell.mobileMain ?? cell.main}</p>
      {cell.caption ? (
        <p className={featured ? cn(mainCls, "mt-0.5") : "mt-1 text-[11px] leading-snug text-white/35"}>
          {cell.caption}
        </p>
      ) : null}
    </div>
  )
}

function CompareMobileList() {
  return (
    <div className="md:hidden">
      <div className="grid grid-cols-2 items-end gap-2 pb-3">
        <p className="text-center text-xs font-semibold text-white/45">일반 서치펌</p>
        <div className="flex flex-col items-center gap-0.5">
          <StartingWordmark
            href={null}
            tone="onDark"
            className="justify-center [&_img]:!block [&_img]:!h-[18px] [&_img]:!w-auto"
          />
          <span className="text-[11px] font-semibold text-[#74acff]">얼라이언스</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {COMPARE_ROWS.map((row, index) => (
          <IntroReveal key={row.id} delayMs={index * 60} yOffset="16">
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f131c] p-2.5">
              <p className="pb-2 text-center text-xs font-semibold text-white/70">{row.label}</p>
              <div className="grid grid-cols-2 gap-2">
                <CompareMobileCell cell={row.searchFirm} featured={false} />
                <CompareMobileCell cell={row.alliance} featured />
              </div>
            </div>
          </IntroReveal>
        ))}

        {feeExample.eligible ? (
          <IntroReveal delayMs={120} yOffset="16">
            <div className="rounded-2xl border border-[#1A7CFF]/45 bg-[#0f131c] p-2.5 shadow-[0_0_32px_-12px_rgba(26,124,255,0.5)]">
              <p className="pb-2 text-center text-xs font-semibold text-white">
                수수료 예시
                <span className="font-normal text-white/45">(연봉 {formatManwon(FEE_EXAMPLE_SALARY_MANWON)} 기준)</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className={MOBILE_SEARCH_FIRM_CELL}>
                  <p className="text-sm font-bold text-white/45">1,000만~1,250만 원</p>
                  <p className="mt-0.5 text-[11px] text-white/35">연봉 20~25%</p>
                </div>
                <div className={MOBILE_ALLIANCE_CELL}>
                  <p className="text-lg font-bold leading-tight text-[#74acff]">
                    {formatManwon(feeExample.feeManwon)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/55">연봉 {formatRatePercent(feeExample.rate)}</p>
                </div>
              </div>
            </div>
          </IntroReveal>
        ) : null}
      </div>
    </div>
  )
}

function CompareTable() {
  return (
    <div className="relative mx-auto hidden w-full md:block">
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
                <p className="text-sm font-bold text-white/45 md:text-base">1,000만~1,250만 원</p>
                <p className="text-[11px] text-white/35 md:text-xs">연봉 20~25%</p>
              </div>
              <div className="rounded-lg bg-[#1A7CFF]/[0.06] px-3 py-1 md:bg-transparent md:px-5 md:py-0">
                <p className="text-lg font-bold text-[#74acff] md:text-xl">{formatManwon(feeExample.feeManwon)}</p>
                <p className="text-[11px] text-white/55 md:text-xs">연봉 {formatRatePercent(feeExample.rate)}</p>
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
            최고의 효율을, <span className="alliance-text-gold">합리적 가격으로</span>
          </>
        }
        subtitle="신청부터 채용까지 들어가는 시간과 비용을 줄여 드립니다"
      />

      <CompareMobileList />
      <CompareTable />

      <p className="mt-6 text-center text-[11px] leading-relaxed text-white/35 md:text-xs">
        ※ 일반 서치펌 수수료는 업계 통상 범위 기준이며 계약에 따라 다를 수 있어요 · 부가가치세 별도
      </p>
    </AllianceSection>
  )
}
