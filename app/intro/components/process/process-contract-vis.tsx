"use client"

import { type CSSProperties } from "react"
import { Check } from "lucide-react"
import { useInView } from "@/lib/intro/use-in-view"
import { cn } from "@/lib/utils"

const CLAUSE_LINES = [
  "제1조 (서비스 범위) · 스타팅 채용 서비스 이용 조건",
  "제2조 (수수료) · 입사 확인 후 정찰제 수수료 적용",
  "제3조 (기밀 유지) · 채용 정보 및 후보자 정보 비공개",
] as const

function ContractSealStamp({
  topLine,
  bottomLine,
  visible,
  rotate,
  delayMs = 0,
  className,
}: {
  topLine: string
  bottomLine: string
  visible: boolean
  rotate: string
  delayMs?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "intro-contract-stamp absolute flex size-11 flex-col items-center justify-center rounded-full md:size-12",
        visible ? "intro-contract-stamp-in" : "scale-[1.35] opacity-0",
        className,
      )}
      style={
        {
          "--stamp-rotate": rotate,
          animationDelay: visible ? `${delayMs}ms` : undefined,
        } as CSSProperties
      }
      aria-hidden
    >
      <span className="intro-contract-stamp-ring" />
      <span className="intro-contract-stamp-inner" />
      <span className="relative z-[1] text-[7px] font-bold leading-[1.15] tracking-tight text-[#c41e3a] md:text-[8px]">
        {topLine}
      </span>
      <span className="relative z-[1] mt-0.5 text-[6px] font-semibold leading-none text-[#c41e3a]/90 md:text-[7px]">
        {bottomLine}
      </span>
    </div>
  )
}

export function ProcessContractVis() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div ref={ref} className="relative rounded-xl border border-[#e3e8f1] bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e3e8f1] pb-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#0b0f1c] md:text-[15px]">
            스타팅 채용 서비스 표준 계약서
          </p>
          <p className="mt-1 text-[10px] text-[#5d6a82] md:text-[11px]">
            에이비씨기업 ↔ 스타팅파트너스(주)
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-opacity duration-500 md:text-[11px]",
            inView
              ? "intro-pop-in bg-[#e8f2ff] text-[#1A7CFF]"
              : "bg-[#eef1f7] text-transparent opacity-0",
          )}
        >
          <Check className="size-3" strokeWidth={3} aria-hidden />
          체결 완료
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {CLAUSE_LINES.map((line, index) => (
          <div
            key={line}
            className="intro-shimmer h-2.5 rounded"
            style={{ width: `${92 - index * 8}%`, animationDelay: `${index * 0.15}s` }}
            aria-hidden
          />
        ))}
        <p className="sr-only">{CLAUSE_LINES.join(" ")}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e3e8f1] pt-4">
        <div className="rounded-lg border border-dashed border-[#d4dbe7] bg-[#fbfcfe] px-3 py-3">
          <p className="text-[10px] font-semibold text-[#5d6a82]">고객사</p>
          <p className="mt-2 text-[11px] font-medium text-[#0b0f1c]">에이비씨기업</p>
          <div className="relative mt-3 h-12">
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-6 rounded border border-[#e3e8f1] transition-opacity duration-300",
                inView ? "opacity-0" : "intro-shimmer opacity-100",
              )}
              aria-hidden
            />
            <ContractSealStamp
              topLine="에이비씨"
              bottomLine="직인"
              visible={inView}
              rotate="-11deg"
              delayMs={120}
              className="right-0 bottom-0"
            />
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-[#d4dbe7] bg-[#fbfcfe] px-3 py-3">
          <p className="text-[10px] font-semibold text-[#5d6a82]">수행사</p>
          <p className="mt-2 text-[11px] font-medium text-[#0b0f1c]">스타팅파트너스(주)</p>
          <div className="relative mt-3 h-12">
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-6 rounded border border-[#e3e8f1] transition-opacity duration-300",
                inView ? "opacity-0" : "intro-shimmer opacity-100",
              )}
              aria-hidden
            />
            <ContractSealStamp
              topLine="스타팅"
              bottomLine="파트너스"
              visible={inView}
              rotate="9deg"
              delayMs={320}
              className="right-0 bottom-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
