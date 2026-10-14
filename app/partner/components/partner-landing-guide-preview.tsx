"use client"

import { useEffect, useState } from "react"
import { BadgeCheck } from "lucide-react"
import { AiIcon } from "@/components/icons/ai-icon"
import { formatPartnerFeeRange } from "@/lib/partner/partner-fee"
import { cn } from "@/lib/utils"

/** 소싱 가이드 항목이 하나씩 채워지는 시점(ms) */
const STEP_AT_MS = [700, 1700, 2700]
const LAST_STEP = STEP_AT_MS.length
const LOOP_MS = 9000

const EXAMPLE_FEE = formatPartnerFeeRange(6000, 8000, true)

const SOURCING_GUIDE_ITEMS: Array<{ label: string; body: string }> = [
  { label: "기업 인재상", body: "주도적으로 문제를 정의하는 시니어" },
  { label: "세부 조건", body: "커머스 트래픽 대응 경험 필수, 이직 3회 이하 선호" },
  { label: "탈락 사유 히스토리", body: "결제 도메인 경험 부족으로 2명 탈락" },
]

function GuideItemSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-1.5 rounded-xl bg-zinc-50 px-3.5" aria-hidden>
      <span className="h-2.5 w-16 animate-pulse rounded bg-zinc-200/70" />
      <span className="h-3 w-4/5 animate-pulse rounded bg-zinc-200/60" />
    </div>
  )
}

/** 실제 내용을 항상 렌더해 높이를 고정하고, 공개 전에는 스켈레톤으로 덮는다 */
function GuideItem({ item, revealed }: { item: (typeof SOURCING_GUIDE_ITEMS)[number]; revealed: boolean }) {
  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-xl bg-[#F3F8FF] px-3.5 py-3 ring-1 ring-[#1A7CFF]/10",
          revealed ? "animate-in fade-in slide-in-from-bottom-1 duration-500 ease-out" : "invisible",
        )}
      >
        <p className="text-[11.5px] font-semibold text-[#126FE3]">{item.label}</p>
        <p className="mt-0.5 text-[13.5px] font-semibold leading-snug text-zinc-900">{item.body}</p>
      </div>
      {revealed ? null : <GuideItemSkeleton />}
    </div>
  )
}

export function PartnerLandingGuidePreview() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(LAST_STEP)
      return
    }

    let timers: number[] = []
    const play = () => {
      timers.forEach(window.clearTimeout)
      setStep(0)
      timers = STEP_AT_MS.map((at, index) => window.setTimeout(() => setStep(index + 1), at))
    }

    play()
    const loop = window.setInterval(play, LOOP_MS)
    return () => {
      timers.forEach(window.clearTimeout)
      window.clearInterval(loop)
    }
  }, [])

  return (
    <div className="relative flex flex-col gap-3 overflow-hidden rounded-[1.75rem] bg-[#FAFAFC] p-4 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.5)] ring-1 ring-zinc-900/10 sm:p-5">
      <div className="flex items-center gap-3 px-1 pt-1">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-[15px] font-extrabold tracking-tight text-white">
          M
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium text-neutral-500">모아커머스</p>
          <p className="truncate text-[15px] font-bold tracking-tight text-neutral-900">백엔드 개발자 (경력 5년+)</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-zinc-200/70 text-[11.5px]">
        <div className="bg-white px-3 py-2">
          <dt className="text-neutral-500">연봉</dt>
          <dd className="mt-0.5 font-semibold text-neutral-900 tabular-nums">6,000~8,000만원</dd>
        </div>
        <div className="bg-white px-3 py-2">
          <dt className="text-neutral-500">예상 수수료</dt>
          <dd className="mt-0.5 font-semibold text-neutral-900 tabular-nums">{EXAMPLE_FEE}</dd>
        </div>
      </dl>

      <div className="relative rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgba(26,124,255,0.55)] ring-2 ring-[#1A7CFF]/25">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[15px] font-bold tracking-tight text-zinc-900">
            <AiIcon size={18} className="shrink-0" />
            소싱 가이드
          </p>
          <span className="inline-flex h-6 shrink-0 items-center gap-0.5 rounded-full bg-[#1A7CFF]/10 px-2 text-[11px] font-semibold text-[#1A7CFF]">
            <BadgeCheck className="size-3.5" strokeWidth={2.25} />
            인증 파트너
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {SOURCING_GUIDE_ITEMS.map((item, index) => (
            <GuideItem key={item.label} item={item} revealed={step > index} />
          ))}
        </div>
        <p
          className={cn(
            "mt-3 text-center text-[11.5px] font-medium text-zinc-500 transition-opacity duration-500",
            step >= LAST_STEP ? "opacity-100" : "opacity-0",
          )}
        >
          스타팅 헤드헌터가 실제 스크리닝 결과로 정리했어요
        </p>
      </div>
    </div>
  )
}
