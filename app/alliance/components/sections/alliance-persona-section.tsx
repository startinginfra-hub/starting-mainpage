"use client"

import { useEffect, useState, type ComponentType, type CSSProperties } from "react"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { AllianceBrowserFrame } from "../persona/alliance-browser-frame"
import { PERSONA_STEPS, type PersonaStepId } from "../persona/alliance-persona-content"
import { PersonaApplyScreen } from "../persona/screens/persona-apply-screen"
import { PersonaInterviewScreen } from "../persona/screens/persona-interview-screen"
import { PersonaPaymentScreen } from "../persona/screens/persona-payment-screen"
import { PersonaReportScreen } from "../persona/screens/persona-report-screen"
import type { PersonaScreenProps } from "../persona/screens/persona-screen-shell"
import { PersonaTermsScreen } from "../persona/screens/persona-terms-screen"

const SCREENS: Record<PersonaStepId, ComponentType<PersonaScreenProps>> = {
  terms: PersonaTermsScreen,
  apply: PersonaApplyScreen,
  report: PersonaReportScreen,
  interview: PersonaInterviewScreen,
  payment: PersonaPaymentScreen,
}

export function AlliancePersonaDemo({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })
  const autoPlaying = inView && !paused && !reducedMotion

  useEffect(() => {
    if (!autoPlaying) return
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % PERSONA_STEPS.length)
    }, PERSONA_STEPS[activeIndex].durationMs)
    return () => window.clearTimeout(timer)
  }, [activeIndex, autoPlaying])

  const selectStep = (index: number) => {
    setPaused(true)
    setActiveIndex(index)
  }

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % PERSONA_STEPS.length)
  }

  const activeStep = PERSONA_STEPS[activeIndex]
  const ActiveScreen = SCREENS[activeStep.id]

  return (
    <div id="story" className={cn("w-full text-left", className)}>
      <div ref={ref} className="mx-auto max-w-5xl">
        <ol className="mb-4 hidden grid-cols-5 gap-2 lg:grid" aria-label="채용 단계">
          {PERSONA_STEPS.map((step, index) => {
            const active = index === activeIndex
            return (
              <li key={step.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-colors",
                    active
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums",
                      active ? "bg-[#1A7CFF] text-white" : "bg-white/[0.06] text-white/45",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn("truncate text-sm font-semibold", active ? "text-white" : "text-white/55")}
                  >
                    {step.label}
                  </span>
                  {active && autoPlaying ? (
                    <span
                      key={`progress-${activeIndex}`}
                      className="alliance-persona-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#1A7CFF] to-[#d9b877]"
                      style={{ "--alliance-step-ms": `${step.durationMs}ms` } as CSSProperties}
                      aria-hidden
                    />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ol>

        <div className="min-w-0">
          <div
            className="alliance-persona-tabs -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 lg:hidden"
            role="tablist"
            aria-label="채용 단계"
          >
            {PERSONA_STEPS.map((step, index) => {
              const active = index === activeIndex
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectStep(index)}
                  className={cn(
                    "shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? "border-[#1A7CFF] bg-[#1A7CFF] text-white"
                      : "border-white/10 bg-white/[0.03] text-white/55",
                  )}
                >
                  {index + 1}. {step.labelShort}
                </button>
              )
            })}
          </div>

          <AllianceBrowserFrame url={activeStep.url}>
            <div
              key={activeStep.id}
              className="alliance-persona-screen min-h-[26rem] md:h-[34rem] md:min-h-0 lg:h-[38rem]"
            >
              <ActiveScreen onNext={goNext} />
            </div>
          </AllianceBrowserFrame>
        </div>
      </div>

      <p className="mt-8 text-center text-[11px] text-white/30 md:text-xs">
        ※ 이해를 돕기 위한 예시 시나리오이며, 회사·화면 데이터는 가상입니다.
      </p>
    </div>
  )
}
