"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { FunnelAdvanceButton } from "@/app/intro/components/funnel/funnel-scene-nav"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const TERMS_SKELETON_SECTIONS = [
  {
    titleWidth: "w-[34%]",
    lines: ["w-full", "w-[96%]", "w-[90%]", "w-[72%]"],
  },
  {
    titleWidth: "w-[52%]",
    lines: ["w-full", "w-[94%]", "w-[88%]", "w-[96%]", "w-[68%]"],
  },
  {
    titleWidth: "w-[40%]",
    lines: ["w-[92%]", "w-full", "w-[84%]", "w-[78%]"],
  },
] as const

const CONFIRM_TEXT = "확인했습니다."
const TYPING_START_MS = 400
const TYPING_CHAR_MS = 80
const PAUSE_AFTER_COMPLETE_MS = 1200

function TermsSkeletonSection({
  titleWidth,
  lines,
  sectionIndex,
}: {
  titleWidth: string
  lines: readonly string[]
  sectionIndex: number
}) {
  return (
    <div className={cn(sectionIndex > 0 && "mt-5")}>
      <div
        className={cn("fn-skeleton-line h-3 rounded", titleWidth)}
        style={{ animationDelay: `${sectionIndex * 0.08}s` }}
        aria-hidden
      />
      <div className="mt-2.5 space-y-2">
        {lines.map((width, lineIndex) => (
          <div
            key={lineIndex}
            className={cn("fn-skeleton-line h-2.5 rounded", width)}
            style={{ animationDelay: `${sectionIndex * 0.08 + lineIndex * 0.06}s` }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}

export function ProcessContractVis() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const reducedMotion = usePrefersReducedMotion()
  const [typedLength, setTypedLength] = useState(0)

  useEffect(() => {
    if (!inView) {
      setTypedLength(0)
    }
  }, [inView])

  useEffect(() => {
    if (inView && reducedMotion) {
      setTypedLength(CONFIRM_TEXT.length)
    }
  }, [inView, reducedMotion])

  useEffect(() => {
    if (!inView || reducedMotion) return

    let cancelled = false
    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          if (!cancelled) resolve()
        }, ms)
        timeoutIds.push(id)
      })

    const runTypingLoop = async () => {
      while (!cancelled) {
        setTypedLength(0)
        await delay(TYPING_START_MS)
        if (cancelled) break

        for (let index = 0; index < CONFIRM_TEXT.length; index += 1) {
          setTypedLength(index + 1)
          await delay(TYPING_CHAR_MS)
          if (cancelled) break
        }
        if (cancelled) break

        await delay(PAUSE_AFTER_COMPLETE_MS)
      }
    }

    void runTypingLoop()

    return () => {
      cancelled = true
      timeoutIds.forEach(clearTimeout)
    }
  }, [inView, reducedMotion])

  const typedText = CONFIRM_TEXT.slice(0, typedLength)
  const isTyping = typedLength > 0 && typedLength < CONFIRM_TEXT.length
  const isConfirmComplete = typedLength === CONFIRM_TEXT.length

  return (
    <div
      ref={ref}
      className="intro-terms-card relative overflow-hidden rounded-2xl border border-[#e3e8f1] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)]"
    >
      <div className="relative border-b border-[#e8ecf4] px-4 pb-3.5 pt-4 md:px-5 md:pb-4 md:pt-5">
        <button
          type="button"
          className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-[#8b95a8] md:right-4 md:top-4"
          aria-hidden
          tabIndex={-1}
        >
          <X className="size-4" strokeWidth={2} />
        </button>
        <p className="text-[11px] font-semibold text-[#1A7CFF] md:text-xs">이용약관</p>
        <h3 className="mt-1 pr-8 text-base font-bold leading-snug text-[#0b0f1c] md:text-[17px]">
          스타팅 채용 서비스 이용약관
        </h3>
      </div>

      <div className="relative border-b border-[#e8ecf4]">
        <div
          className="intro-terms-scroll max-h-[9.5rem] overflow-y-auto px-4 py-3.5 md:max-h-[10.5rem] md:px-5 md:py-4"
          aria-hidden
        >
          {TERMS_SKELETON_SECTIONS.map((section, sectionIndex) => (
            <TermsSkeletonSection
              key={sectionIndex}
              titleWidth={section.titleWidth}
              lines={section.lines}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/90 to-transparent"
          aria-hidden
        />
        <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[10px] text-[#9aa5b8] md:text-[11px]">
          ∨ 스크롤을 내려 확인해주세요 ∨
        </p>
      </div>

      <div className="px-4 py-3.5 md:px-5 md:py-4">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <input
            readOnly
            className={cn(
              "h-11 min-w-0 flex-1 rounded-xl border border-dashed border-[#c8d0de] bg-[#fbfcfe] px-3.5 text-[12px] text-[#0b0f1c] placeholder:text-[#9aa5b8] md:h-12 md:px-4 md:text-[13px]",
              typedLength === 0 && "intro-shimmer text-transparent",
              isTyping && "border-[#1A7CFF]/50 bg-white",
            )}
            value={typedText}
            placeholder="확인했습니다."
            aria-label="약관 확인 문구"
          />
          <FunnelAdvanceButton
            label="동의하기"
            active={isConfirmComplete}
            onClick={() => {}}
            className={cn(
              "fn-funnel-advance-btn shrink-0",
              !isConfirmComplete &&
                "!cursor-not-allowed !border-[#e3e8f1] !bg-[#eef1f7] !text-[#9aa5b8] !shadow-none",
            )}
          />
        </div>
      </div>
    </div>
  )
}
