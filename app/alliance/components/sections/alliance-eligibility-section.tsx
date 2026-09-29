"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import {
  ALLIANCE_DEFAULT_SALARY_MANWON,
  ALLIANCE_EFFECTIVE_RATE,
  calculateAllianceFee,
  formatRatePercent,
  normalizeAllianceSalaryInput,
  parseAllianceSalaryInput,
} from "@/lib/alliance/alliance-fee"
import { formatManwon } from "@/lib/intro/hiring-cost-calculator"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"

export function AllianceEligibilitySection() {
  const [salaryInput, setSalaryInput] = useState(
    ALLIANCE_DEFAULT_SALARY_MANWON.toLocaleString("ko-KR"),
  )
  const salaryManwon = parseAllianceSalaryInput(salaryInput)
  const result = calculateAllianceFee(salaryManwon)

  return (
    <AllianceSection id="eligibility">
      <AllianceSectionHeading
        title={
          <>
            연봉 <span className="alliance-text-gold">4,000만 원 이상</span> 포지션 전용
          </>
        }
        subtitle="연봉 구간 상관없이 수수료율은 고정이에요."
      />

      <IntroReveal yOffset="16">
        <div className="grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f131c] md:grid-cols-3">
          <div className="p-6 md:p-8">
            <label htmlFor="alliance-salary" className="text-sm font-medium text-white/60">
              채용 후보자 연봉
            </label>
            <div className="mt-3 flex items-baseline gap-2 border-b border-white/15 pb-2 focus-within:border-[#1A7CFF]">
              <input
                id="alliance-salary"
                inputMode="numeric"
                autoComplete="off"
                value={salaryInput}
                onChange={(event) => setSalaryInput(normalizeAllianceSalaryInput(event.target.value))}
                placeholder="8,000"
                className="w-full min-w-0 bg-transparent text-3xl font-bold tracking-tight text-white tabular-nums outline-none placeholder:text-white/20 md:text-4xl"
              />
              <span className="shrink-0 text-base text-white/50">만 원</span>
            </div>
            <p className="mt-3 text-xs text-white/35">최소 연봉 4,000만 원</p>
          </div>

          {result.eligible ? (
            <>
              <div
                className="flex flex-col justify-center border-t border-white/[0.08] p-6 md:border-t-0 md:border-l md:p-8"
                aria-live="polite"
              >
                <p className="flex items-center justify-between gap-2 text-sm text-white/55">
                  적용 요율
                  <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-semibold text-white/60">
                    {formatRatePercent(result.rate)}
                  </span>
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white/40 tabular-nums line-through decoration-white/40 decoration-2">
                  {formatManwon(result.feeManwon)}
                </p>
              </div>
              <div className="flex flex-col justify-center border-t border-white/[0.08] bg-[#1A7CFF]/[0.05] p-6 md:border-t-0 md:border-l md:p-8">
                <p className="flex items-center justify-between gap-2 text-sm text-white/55">
                  크레딧 충전 시 실결제
                  <span className="shrink-0 rounded-full bg-[#1A7CFF]/15 px-2 py-0.5 text-[11px] font-semibold text-[#74acff]">
                    {formatRatePercent(ALLIANCE_EFFECTIVE_RATE)}
                  </span>
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-[#74acff] tabular-nums">
                  {formatManwon(result.paidManwon)}
                </p>
              </div>
            </>
          ) : (
            <div
              className="flex items-center gap-3 border-t border-white/[0.08] p-6 md:col-span-2 md:border-t-0 md:border-l md:p-8"
              aria-live="polite"
            >
              <Info className="size-5 shrink-0 text-white/40" strokeWidth={2} aria-hidden />
              <p className="text-sm leading-relaxed text-white/60">연봉 4,000만 원 이상 포지션만 신청할 수 있어요.</p>
            </div>
          )}
        </div>
      </IntroReveal>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-white/35 md:text-xs">
        ※ 부가가치세 별도 · 채용 확정 시 차감
      </p>
    </AllianceSection>
  )
}
