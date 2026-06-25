"use client"

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { APPLY_FORM_SAMPLE } from "./funnel-constants"
import { FunnelAdvanceButton } from "./funnel-scene-nav"
import { FunnelSkeletonTextarea } from "./funnel-skeleton"
import { usePausableSequence } from "@/lib/intro/use-pausable-sequence"
import { cn } from "@/lib/utils"

type Props = {
  active: boolean
  animate: boolean
  paused?: boolean
  previewMode?: boolean
  onAdvanceScene?: () => void
}

const labelCls = "text-[10px] font-semibold text-[#0b0f1c] md:text-[11px]"
const inputCls =
  "h-10 w-full rounded-md border border-[#e3e8f1] bg-white px-3 text-[12px] text-[#0b0f1c] md:h-11 md:px-3.5 md:text-[13px]"
const textareaCls =
  "min-h-[6.5rem] w-full resize-none rounded-md border border-[#e3e8f1] bg-white px-3 py-2.5 text-[11px] leading-[1.55] text-[#0b0f1c] md:min-h-[7rem] md:px-3.5 md:py-3 md:text-[12px] md:leading-[1.6]"

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className={labelCls}>
        {label}
        {required ? <span className="ml-0.5 text-[#1A7CFF]">*</span> : null}
      </label>
      {children}
    </div>
  )
}

export function FunnelApplyScene({
  active,
  animate,
  paused = false,
  previewMode = false,
  onAdvanceScene,
}: Props) {
  const [filledStep, setFilledStep] = useState(0)
  const [autoCancelled, setAutoCancelled] = useState(false)

  const resetDemo = useCallback(() => {
    setFilledStep(0)
    setAutoCancelled(false)
  }, [])

  useEffect(() => {
    if (!active) return
    if (!animate) {
      setFilledStep(5)
      return
    }
    setFilledStep(0)
    setAutoCancelled(false)
  }, [active, animate])

  const steps = useMemo(
    () => [
      { at: 200, run: () => setFilledStep(1) },
      { at: 500, run: () => setFilledStep(2) },
      { at: 800, run: () => setFilledStep(3) },
      { at: 1100, run: () => setFilledStep(4) },
      { at: 1400, run: () => setFilledStep(5) },
    ],
    [],
  )

  usePausableSequence({
    active: active && animate,
    enabled: !paused && !autoCancelled,
    steps,
    onReset: resetDemo,
  })

  const handleAdvance = () => {
    setAutoCancelled(true)
    onAdvanceScene?.()
  }

  const sample = APPLY_FORM_SAMPLE
  const fieldInputCls = cn(inputCls, previewMode && "h-9 bg-[#f5f7fb] md:h-10")
  const fieldTextareaCls = cn(
    textareaCls,
    previewMode && "min-h-[3.25rem] bg-[#f5f7fb] py-2 md:min-h-[3.5rem] md:py-2",
  )
  const sectionGapCls = previewMode ? "mt-3" : "mt-4"
  const gridGapCls = previewMode ? "gap-2.5" : "gap-3.5 sm:gap-4"
  const gridGapMdCls = previewMode ? "gap-2.5" : "gap-3.5 md:gap-4"

  return (
    <div
      className={cn(
        "fn-apply-scene flex w-full flex-col",
        previewMode ? "h-auto" : "h-full min-h-0",
        previewMode && "fn-apply-scene-preview",
      )}
    >
      <div
        className={cn(
          !previewMode &&
            "flex min-h-0 flex-1 flex-col max-md:overflow-hidden md:overflow-y-auto md:overscroll-contain md:[-webkit-overflow-scrolling:touch]",
        )}
      >
        <div
          className={cn(
            previewMode &&
              "rounded-xl border border-[#e3e8f1] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:p-4",
          )}
        >
      <div className={cn("grid grid-cols-1 sm:grid-cols-3", gridGapCls)}>
        <Field label="채용 직군" required>
          <input
            readOnly
            className={cn(fieldInputCls, filledStep < 1 && "intro-shimmer text-transparent")}
            value={filledStep >= 1 ? sample.recruitJobTitle : ""}
            placeholder="예: 백엔드 개발자"
          />
        </Field>
        <Field label="최소 경력" required>
          <input
            readOnly
            className={cn(fieldInputCls, filledStep < 2 && "intro-shimmer text-transparent")}
            value={filledStep >= 2 ? `${sample.minCareerYears}년` : ""}
            placeholder="예: 3년"
          />
        </Field>
        <Field label="최대 경력" required>
          <input
            readOnly
            className={cn(fieldInputCls, filledStep < 2 && "intro-shimmer text-transparent")}
            value={filledStep >= 2 ? `${sample.maxCareerYears}년` : ""}
            placeholder="예: 7년"
          />
        </Field>
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-3", sectionGapCls, gridGapMdCls)}>
        <Field label="주요 업무" required>
          <textarea
            readOnly
            rows={previewMode ? 2 : 3}
            className={cn(
              fieldTextareaCls,
              "fn-apply-main-tasks",
              filledStep < 3 && "intro-shimmer text-transparent",
            )}
            value={filledStep >= 3 ? sample.mainTasks : ""}
            placeholder="내용을 입력해주세요"
          />
        </Field>
        <Field label="자격 요건" required>
          <textarea
            readOnly
            rows={previewMode ? 2 : 3}
            className={cn(fieldTextareaCls, filledStep < 4 && "intro-shimmer text-transparent")}
            value={filledStep >= 4 ? sample.qualifications : ""}
            placeholder="내용을 입력해주세요"
          />
        </Field>
        <Field label="우대 사항" required className="max-md:hidden">
          <textarea
            readOnly
            rows={previewMode ? 2 : 3}
            className={cn(fieldTextareaCls, filledStep < 5 && "intro-shimmer text-transparent")}
            value={filledStep >= 5 ? sample.preferredPoints : ""}
            placeholder="내용을 입력해주세요"
          />
        </Field>
      </div>

      <div className={cn("flex min-h-0 flex-col max-md:hidden", sectionGapCls)}>
        <Field label="히든조건" className={cn(!previewMode && "flex min-h-0 flex-1 flex-col")}>
          <FunnelSkeletonTextarea
            className={cn(
              "fn-apply-hidden-condition",
              previewMode ? "min-h-[2.75rem] md:min-h-[3rem]" : "min-h-[5rem] md:min-h-[6.5rem]",
              previewMode && "bg-[#f5f7fb]",
              !previewMode && "flex-1",
            )}
          />
        </Field>
      </div>
        </div>
      </div>

      {onAdvanceScene ? (
        <div className="mt-4 flex shrink-0 justify-end max-md:!hidden">
          <FunnelAdvanceButton label="작성 완료" active onClick={handleAdvance} />
        </div>
      ) : null}
    </div>
  )
}
