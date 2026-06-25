"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { CoordinatorAvatar } from "@/app/intro/components/coordinator-avatar"
import {
  COORDINATOR_INTRO_SHORT,
  SCREENING_REVEAL_DELAYS,
  SCREENING_SECTION_REVIEWS,
  SCREENING_SUMMARY,
  type ScreeningSectionStatus,
} from "./funnel-constants"
import { FunnelAdvanceButton } from "./funnel-scene-nav"
import { usePausableSequence } from "@/lib/intro/use-pausable-sequence"
import { cn } from "@/lib/utils"

type Props = {
  active: boolean
  animate: boolean
  paused?: boolean
  onAdvanceScene?: () => void
}

/** 0=typing, 1=intro, 2=summary, 3+=sections */
type VisibleStep = number

function sectionStatusBadgeClass(status: ScreeningSectionStatus): string {
  switch (status) {
    case "ok":
      return "border-[#1A7CFF]/25 bg-[#1A7CFF]/10 text-[#126FE3]"
    case "mismatch":
      return "border-rose-200 bg-rose-50 text-rose-950"
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950"
  }
}

function SuggestionList({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim())

  return (
    <ul className="m-0 list-none space-y-1.5 p-0">
      {lines.map((line) => {
        const trimmed = line.trim()
        const isBullet = trimmed.startsWith("·")
        const body = isBullet ? trimmed.slice(1).trim() : trimmed

        return (
          <li
            key={trimmed}
            className={cn(
              "text-[11px] leading-[1.55] text-[#0b0f1c] md:text-[12px] md:leading-[1.6]",
              isBullet && "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-1.5",
            )}
          >
            {isBullet ? (
              <>
                <span className="shrink-0 select-none text-[#1A7CFF]" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 break-words">{body}</span>
              </>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}

function ChatBubble({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="fn-screening-bubble flex w-full min-w-0 max-w-[720px] flex-col items-start gap-2">
      <CoordinatorAvatar
        size={18}
        className="size-[18px] shadow-sm ring-1 ring-white/70"
      />
      <div
        className={cn(
          "w-full min-w-0 rounded-xl border border-white/50 bg-white/70 p-3 shadow-sm backdrop-blur-sm md:p-4",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="fn-screening-bubble flex w-full min-w-0 max-w-[720px] items-start gap-2">
      <CoordinatorAvatar
        size={18}
        className="size-[18px] shadow-sm ring-1 ring-white/70"
      />
      <div className="flex gap-1 rounded-xl bg-white/70 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="intro-ai-blink size-1.5 rounded-full bg-[#1A7CFF]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function getLastSectionStep() {
  return 2 + SCREENING_SECTION_REVIEWS.length
}

export function FunnelScreeningScene({ active, animate, paused = false, onAdvanceScene }: Props) {
  const lastSectionStep = getLastSectionStep()
  const [visibleStep, setVisibleStep] = useState<VisibleStep>(0)
  const [autoCancelled, setAutoCancelled] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)

  const resetDemo = useCallback(() => {
    setVisibleStep(0)
    setAutoCancelled(false)
  }, [])

  useEffect(() => {
    if (!active) return
    if (!animate) {
      setVisibleStep(lastSectionStep)
      return
    }
    setVisibleStep(0)
    setAutoCancelled(false)
  }, [active, animate, lastSectionStep])

  const steps = useMemo(() => {
    const sequence = [
      { at: SCREENING_REVEAL_DELAYS.intro, run: () => setVisibleStep(1) },
      { at: SCREENING_REVEAL_DELAYS.summary, run: () => setVisibleStep(2) },
    ]

    SCREENING_SECTION_REVIEWS.forEach((_, index) => {
      const step = index + 3
      sequence.push({
        at: SCREENING_REVEAL_DELAYS.sectionStart + index * SCREENING_REVEAL_DELAYS.sectionStep,
        run: () => setVisibleStep(step),
      })
    })

    return sequence
  }, [])

  usePausableSequence({
    active: active && animate,
    enabled: !paused && !autoCancelled,
    steps,
    onReset: resetDemo,
  })

  useEffect(() => {
    if (!active) return

    const scrollToLatest = () => {
      const thread = threadRef.current
      if (!thread) return
      thread.scrollTo({
        top: thread.scrollHeight,
        behavior: animate ? "smooth" : "auto",
      })
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToLatest)
    })

    return () => cancelAnimationFrame(frame)
  }, [active, animate, visibleStep])

  const handleAdvance = () => {
    setAutoCancelled(true)
    onAdvanceScene?.()
  }

  return (
    <div className="fn-screening-scene flex h-full w-full flex-col">
      <header className="fn-screening-header sticky top-0 z-10 flex shrink-0 items-center gap-3">
        <CoordinatorAvatar
          size={40}
          alt="코디네이터 서윤"
          className="size-10 shadow-sm ring-1 ring-white/60"
        />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#0b0f1c] md:text-[14px]">서윤</p>
          <p className="text-[11px] text-[#5d6a82] md:text-[12px]">담당 코디네이터</p>
        </div>
      </header>

      <div
        ref={threadRef}
        className="fn-screening-thread"
        role="log"
        aria-label="코디네이터 스크리닝"
      >
        {visibleStep === 0 && animate ? <TypingIndicator /> : null}

        {visibleStep >= 1 ? (
          <ChatBubble>
            <p className="whitespace-pre-line text-[12px] leading-[1.58] text-[#0b0f1c]/88 md:text-[13px]">
              {COORDINATOR_INTRO_SHORT}
            </p>
          </ChatBubble>
        ) : null}

        {visibleStep >= 2 ? (
          <ChatBubble className="intro-chat-in">
            <p className="text-[12px] font-semibold text-[#0b0f1c] md:text-[13px]">종합의견</p>
            <p className="mt-2 whitespace-pre-line text-[11px] leading-[1.58] text-[#3f4a60] md:text-[12px]">
              {SCREENING_SUMMARY}
            </p>
          </ChatBubble>
        ) : null}

        {SCREENING_SECTION_REVIEWS.map((review, index) => {
          const step = index + 3
          if (visibleStep < step) return null

          return (
            <ChatBubble key={review.id} className="intro-chat-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] font-semibold text-[#0b0f1c] md:text-[13px]">{review.section}</p>
                <span
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[10px] font-bold shadow-none",
                    sectionStatusBadgeClass(review.status),
                  )}
                >
                  {review.statusLabel}
                </span>
              </div>
              <p className="mt-2.5 whitespace-pre-line text-[11px] leading-[1.58] text-[#3f4a60] md:text-[12px]">
                {review.reason}
              </p>
              <div className="mt-3 space-y-1.5 border-t border-black/[0.04] pt-3">
                <p className="text-[11px] font-medium text-[#5d6a82] md:text-[12px]">수정 제안</p>
                <SuggestionList text={review.suggestion} />
              </div>
            </ChatBubble>
          )
        })}
      </div>

      {onAdvanceScene ? (
        <div className="fn-funnel-advance-footer relative z-10 max-md:!hidden">
          <FunnelAdvanceButton label="스크리닝 완료하기" active onClick={handleAdvance} />
        </div>
      ) : null}
    </div>
  )
}
