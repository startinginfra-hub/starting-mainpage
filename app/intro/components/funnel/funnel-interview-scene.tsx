"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, Mail } from "lucide-react"
import {
  FUNNEL_INTERVIEW_DEMO,
  INTERVIEW_CONFIRM_DELAYS,
  INTERVIEW_FUNNEL_PHASE_DELAYS,
  INTERVIEW_FUNNEL_PHASES,
  INTERVIEW_PROPOSAL_FIELD_DELAYS,
  type InterviewFunnelPhase,
} from "./funnel-constants"
import { FunnelSceneNav } from "./funnel-scene-nav"
import { usePausableSequence, type PausableSequenceStep } from "@/lib/intro/use-pausable-sequence"
import { cn } from "@/lib/utils"

type Props = {
  active: boolean
  animate: boolean
  paused?: boolean
  onAdvanceScene?: () => void
}

const labelCls = "text-[11px] font-semibold text-neutral-700 md:text-[12px]"
const inputCls =
  "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[11px] text-foreground md:h-10 md:text-[12px]"
const proposalInputCls = cn(
  inputCls,
  "pointer-events-none cursor-default select-none caret-transparent",
)
const proposalFieldCount = 5

type PhaseSnapshot = {
  filledStep: number
  sendActive: boolean
  ctaActive: boolean
  confirmActive: boolean
}

function getPhaseSnapshot(target: InterviewFunnelPhase): PhaseSnapshot {
  const base: PhaseSnapshot = {
    filledStep: 0,
    sendActive: false,
    ctaActive: false,
    confirmActive: false,
  }

  if (target === "proposal") {
    return { ...base, filledStep: proposalFieldCount, sendActive: true }
  }
  if (target === "email") {
    return { ...base, filledStep: proposalFieldCount, sendActive: true, ctaActive: true }
  }
  return {
    filledStep: proposalFieldCount,
    sendActive: true,
    ctaActive: true,
    confirmActive: true,
  }
}

function applyPhaseSnapshot(
  target: InterviewFunnelPhase,
  setters: {
    setFilledStep: (value: number) => void
    setSendActive: (value: boolean) => void
    setCtaActive: (value: boolean) => void
    setConfirmActive: (value: boolean) => void
  },
) {
  const snapshot = getPhaseSnapshot(target)
  setters.setFilledStep(snapshot.filledStep)
  setters.setSendActive(snapshot.sendActive)
  setters.setCtaActive(snapshot.ctaActive)
  setters.setConfirmActive(snapshot.confirmActive)
}

function buildInterviewAutoSteps(
  setFilledStep: (value: number) => void,
  setSendActive: (value: boolean) => void,
  setPhase: (value: InterviewFunnelPhase) => void,
  setCtaActive: (value: boolean) => void,
  setConfirmActive: (value: boolean) => void,
): PausableSequenceStep[] {
  const steps: PausableSequenceStep[] = []

  for (let step = 1; step <= proposalFieldCount; step += 1) {
    const delay =
      INTERVIEW_PROPOSAL_FIELD_DELAYS.start + (step - 1) * INTERVIEW_PROPOSAL_FIELD_DELAYS.step
    steps.push({ at: delay, run: () => setFilledStep(step) })
  }

  steps.push(
    {
      at: INTERVIEW_FUNNEL_PHASE_DELAYS.email - 400,
      run: () => setSendActive(true),
    },
    {
      at: INTERVIEW_FUNNEL_PHASE_DELAYS.email,
      run: () => setPhase("email"),
    },
    {
      at: INTERVIEW_FUNNEL_PHASE_DELAYS.email + 500,
      run: () => setCtaActive(true),
    },
    {
      at: INTERVIEW_FUNNEL_PHASE_DELAYS.confirm,
      run: () => setPhase("confirm"),
    },
    {
      at: INTERVIEW_FUNNEL_PHASE_DELAYS.confirm + INTERVIEW_CONFIRM_DELAYS.buttonActive,
      run: () => setConfirmActive(true),
    },
  )

  return steps
}

function Field({
  label,
  required,
  children,
  step,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  step?: number
}) {
  return (
    <div className="space-y-1.5" {...(step != null ? { "data-proposal-step": step } : {})}>
      <span className={labelCls}>
        {label}
        {required ? <span className="ml-0.5 text-[#1A7CFF]">*</span> : null}
      </span>
      {children}
    </div>
  )
}

function ProposalModal({
  filledStep,
  sendActive,
  onAdvance,
  canAdvance,
}: {
  filledStep: number
  sendActive: boolean
  onAdvance: () => void
  canAdvance: boolean
}) {
  const demo = FUNNEL_INTERVIEW_DEMO
  const locationLabel = demo.interviewType === "대면" ? "인터뷰 장소" : "비대면 링크"
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (filledStep <= 0) return

    const scrollToLatestField = () => {
      const body = bodyRef.current
      if (!body) return

      const target = body.querySelector<HTMLElement>(`[data-proposal-step="${filledStep}"]`)
      if (target) {
        target.scrollIntoView({ block: "nearest", behavior: "smooth" })
        return
      }

      body.scrollTo({ top: body.scrollHeight, behavior: "smooth" })
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToLatestField)
    })

    return () => cancelAnimationFrame(frame)
  }, [filledStep])

  return (
    <div className="fn-interview-modal">
      <div className="fn-interview-modal-header">
        <h3 className="text-[15px] font-semibold text-foreground">인터뷰 요청하기</h3>
      </div>
      <div
        ref={bodyRef}
        className="fn-interview-modal-body fn-interview-modal-body-readonly space-y-3"
      >
        <Field label="전형 단계" required step={1}>
          <input
            readOnly
            tabIndex={-1}
            draggable={false}
            aria-readonly
            className={cn(proposalInputCls, filledStep < 1 && "intro-shimmer text-transparent")}
            value={filledStep >= 1 ? demo.screeningStage : ""}
          />
        </Field>
        <Field label="인터뷰 유형" required step={2}>
          <input
            readOnly
            tabIndex={-1}
            draggable={false}
            aria-readonly
            className={cn(proposalInputCls, filledStep < 2 && "intro-shimmer text-transparent")}
            value={filledStep >= 2 ? demo.interviewType : ""}
          />
        </Field>
        <Field label={locationLabel} required step={3}>
          <input
            readOnly
            tabIndex={-1}
            draggable={false}
            aria-readonly
            className={cn(proposalInputCls, filledStep < 3 && "intro-shimmer text-transparent")}
            value={filledStep >= 3 ? demo.location : ""}
          />
        </Field>
        <Field label="인터뷰 일시" required>
          <div className="space-y-2">
            {demo.proposedSlots.map((slot, index) => (
              <input
                key={slot.id}
                data-proposal-step={4 + index}
                readOnly
                tabIndex={-1}
                draggable={false}
                aria-readonly
                className={cn(
                  proposalInputCls,
                  index > 0 && "max-md:hidden",
                  filledStep < 4 + index && "intro-shimmer text-transparent",
                )}
                value={filledStep >= 4 + index ? slot.label : ""}
              />
            ))}
          </div>
        </Field>
      </div>
      <div className="fn-interview-modal-footer">
        <button
          type="button"
          disabled={!canAdvance}
          onClick={onAdvance}
          className={cn(
            "fn-interview-primary-btn",
            sendActive && "fn-interview-primary-btn-active",
          )}
        >
          발송하기
        </button>
      </div>
    </div>
  )
}

function EmailPreview({
  ctaActive,
  onAdvance,
  canAdvance,
}: {
  ctaActive: boolean
  onAdvance: () => void
  canAdvance: boolean
}) {
  const demo = FUNNEL_INTERVIEW_DEMO

  return (
    <div className="fn-interview-email fn-interview-email-phase">
      <div className="fn-interview-email-wrap">
        <p className="fn-interview-email-notice">
          <Mail className="fn-interview-email-notice-icon" aria-hidden />
          <span>
            <strong>{demo.applicantName}</strong> 후보자에게 면접 일정을 제안했어요.
          </span>
        </p>
        <div className="fn-interview-email-card">
        <p className="text-[14px] font-semibold leading-snug text-foreground">면접 일정 안내 드립니다.</p>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
          아래 일정으로 면접을 요청드립니다.
        </p>
        <dl className="mt-4 space-y-2.5 text-[12px] max-md:space-y-2">
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-medium text-muted-foreground">채용명</dt>
            <dd className="text-foreground">{demo.positionTitle}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-medium text-muted-foreground">일정명</dt>
            <dd className="text-foreground">{demo.scheduleName}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-medium text-muted-foreground">후보자</dt>
            <dd className="text-foreground">{demo.applicantName}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-medium text-muted-foreground">장소</dt>
            <dd className="truncate text-foreground">{demo.location}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-medium text-muted-foreground">일정</dt>
            <dd className="space-y-1 text-foreground">
              {demo.proposedSlots.map((slot, index) => (
                <p
                  key={slot.id}
                  className={cn(
                    "rounded-md bg-[#FFF9E6] px-2 py-1 tabular-nums",
                    index > 0 && "max-md:hidden",
                  )}
                >
                  {slot.label}
                </p>
              ))}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-medium text-muted-foreground">답변 기한</dt>
            <dd className="rounded-md bg-[#FFF9E6] px-2 py-1 tabular-nums text-foreground">
              {demo.responseDeadline}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          disabled={!canAdvance}
          onClick={onAdvance}
          className={cn("fn-interview-email-cta mt-5 max-md:mt-6", ctaActive && "fn-interview-cta-active")}
        >
          면접 일정 답변하기
        </button>
        </div>
      </div>
    </div>
  )
}

function ConfirmCard({ onAdvanceScene }: { onAdvanceScene?: () => void }) {
  const demo = FUNNEL_INTERVIEW_DEMO
  const selectedSlot = demo.proposedSlots[demo.selectedSlotIndex]

  return (
    <div className="fn-interview-confirm">
      <article className="fn-interview-confirm-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-foreground">{demo.scheduleName}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{demo.applicantName} · 응답 완료</p>
          </div>
          <span className="fn-interview-status-badge">응답 완료</span>
        </div>
        <div className="mt-4 border-l-2 border-[#1A7CFF]/35 pl-3">
          <p className="text-[13px] font-semibold text-foreground">{demo.companyConfirmMessage}</p>
          <p className="mt-2 rounded-lg bg-neutral-50 px-3 py-2 text-[12px] font-medium tabular-nums text-neutral-700">
            {selectedSlot.label}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            disabled={!onAdvanceScene}
            onClick={onAdvanceScene}
            className={cn(
              "fn-interview-confirm-btn",
              onAdvanceScene && "fn-interview-confirm-btn-active",
            )}
          >
            <CheckCircle2 className="size-3.5" />
            확정하기
          </button>
        </div>
      </article>
    </div>
  )
}

function PhaseNav({
  phaseIndex,
  onPrev,
  onNext,
}: {
  phaseIndex: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <FunnelSceneNav
      className="fn-interview-phase-nav"
      index={phaseIndex}
      total={INTERVIEW_FUNNEL_PHASES.length}
      onPrev={onPrev}
      onNext={onNext}
    />
  )
}

export function FunnelInterviewScene({ active, animate, paused = false, onAdvanceScene }: Props) {
  const [phase, setPhase] = useState<InterviewFunnelPhase>("proposal")
  const [filledStep, setFilledStep] = useState(0)
  const [sendActive, setSendActive] = useState(false)
  const [ctaActive, setCtaActive] = useState(false)
  const [confirmActive, setConfirmActive] = useState(false)
  const [autoCancelled, setAutoCancelled] = useState(false)

  const setters = {
    setFilledStep,
    setSendActive,
    setCtaActive,
    setConfirmActive,
  }

  const resetDemo = useCallback(() => {
    setPhase("proposal")
    setFilledStep(0)
    setSendActive(false)
    setCtaActive(false)
    setConfirmActive(false)
    setAutoCancelled(false)
  }, [])

  useEffect(() => {
    if (!active) return
    if (!animate) {
      setPhase("confirm")
      applyPhaseSnapshot("confirm", setters)
      return
    }
    resetDemo()
  }, [active, animate, resetDemo])

  const steps = useMemo(
    () =>
      buildInterviewAutoSteps(
        setFilledStep,
        setSendActive,
        setPhase,
        setCtaActive,
        setConfirmActive,
      ),
    [],
  )

  usePausableSequence({
    active: active && animate,
    enabled: !paused && !autoCancelled,
    steps,
    onReset: resetDemo,
  })

  const goToPhase = useCallback((target: InterviewFunnelPhase) => {
    setAutoCancelled(true)
    setPhase(target)
    applyPhaseSnapshot(target, setters)
  }, [])

  const phaseIndex = INTERVIEW_FUNNEL_PHASES.indexOf(phase)
  const canAdvance = phaseIndex < INTERVIEW_FUNNEL_PHASES.length - 1

  const goPrev = useCallback(() => {
    if (phaseIndex <= 0) return
    goToPhase(INTERVIEW_FUNNEL_PHASES[phaseIndex - 1])
  }, [goToPhase, phaseIndex])

  const goNext = useCallback(() => {
    if (phaseIndex >= INTERVIEW_FUNNEL_PHASES.length - 1) return
    goToPhase(INTERVIEW_FUNNEL_PHASES[phaseIndex + 1])
  }, [goToPhase, phaseIndex])

  return (
    <div className="fn-interview-scene">
      {INTERVIEW_FUNNEL_PHASES.map((layerPhase) => {
        const isActive = layerPhase === phase

        return (
          <div
            key={layerPhase}
            className={cn(
              "fn-interview-layer",
              layerPhase === "email" && "fn-interview-layer-email",
              isActive && "fn-interview-layer-active",
            )}
            aria-hidden={!isActive}
          >
            {layerPhase === "proposal" ? (
              <ProposalModal
                filledStep={filledStep}
                sendActive={sendActive && isActive}
                onAdvance={goNext}
                canAdvance={canAdvance}
              />
            ) : null}
            {layerPhase === "email" ? (
              <EmailPreview
                ctaActive={ctaActive && isActive}
                onAdvance={goNext}
                canAdvance={canAdvance}
              />
            ) : null}
            {layerPhase === "confirm" ? (
              <ConfirmCard
                onAdvanceScene={
                  isActive
                    ? () => {
                        setAutoCancelled(true)
                        onAdvanceScene?.()
                      }
                    : undefined
                }
              />
            ) : null}
          </div>
        )
      })}

      {active ? (
        <PhaseNav phaseIndex={phaseIndex} onPrev={goPrev} onNext={goNext} />
      ) : null}
    </div>
  )
}

export type { InterviewFunnelPhase }
