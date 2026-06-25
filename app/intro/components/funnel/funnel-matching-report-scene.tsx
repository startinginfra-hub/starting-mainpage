"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from "react"
import { Check, Mail } from "lucide-react"
import {
  FUNNEL_INTERVIEW_DEMO,
  FUNNEL_REPORT_APPLICANT,
  FUNNEL_REPORT_CONDITION_LABEL,
  FUNNEL_REPORT_ROWS,
  FUNNEL_RESUME_SECTIONS,
  MATCHING_ARRIVAL_DELAYS,
  MATCHING_FUNNEL_PHASE_DELAYS,
  MATCHING_FUNNEL_PHASES,
  MATCHING_REPORT_DEMO_DELAYS,
  type FunnelReportRow,
  type MatchingFunnelPhase,
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

type HighlightBox = {
  top: number
  left: number
  width: number
  height: number
}

type PhaseSnapshot = {
  ctaActive: boolean
  selectedIndex: number | null
}

function getPhaseSnapshot(target: MatchingFunnelPhase): PhaseSnapshot {
  if (target === "arrival") {
    return { ctaActive: true, selectedIndex: null }
  }
  return { ctaActive: true, selectedIndex: 0 }
}

function applyPhaseSnapshot(
  target: MatchingFunnelPhase,
  setters: {
    setCtaActive: (value: boolean) => void
    setSelectedIndex: (value: number | null) => void
  },
) {
  const snapshot = getPhaseSnapshot(target)
  setters.setCtaActive(snapshot.ctaActive)
  setters.setSelectedIndex(snapshot.selectedIndex)
}

function buildMatchingAutoSteps(
  setPhase: (value: MatchingFunnelPhase) => void,
  setCtaActive: (value: boolean) => void,
  setSelectedIndex: (value: number | null) => void,
): PausableSequenceStep[] {
  const steps: PausableSequenceStep[] = [
    {
      at: MATCHING_ARRIVAL_DELAYS.ctaActive,
      run: () => setCtaActive(true),
    },
    {
      at: MATCHING_FUNNEL_PHASE_DELAYS.report,
      run: () => setPhase("report"),
    },
  ]

  FUNNEL_REPORT_ROWS.forEach((_, index) => {
    steps.push({
      at: MATCHING_REPORT_DEMO_DELAYS.firstSelect + index * MATCHING_REPORT_DEMO_DELAYS.step,
      run: () => setSelectedIndex(index),
    })
  })

  return steps
}

function scrollPdfToTop(container: HTMLElement) {
  container.scrollTo({ top: 0, behavior: "auto" })
}

function scrollPdfToHighlight(
  container: HTMLElement,
  evidence: HTMLElement,
  behavior: ScrollBehavior = "smooth",
) {
  const containerTop = container.getBoundingClientRect().top
  const evidenceTop = evidence.getBoundingClientRect().top
  const delta = evidenceTop - containerTop + container.scrollTop - container.clientHeight * 0.32

  container.scrollTo({ top: Math.max(0, delta), behavior })
}

function isMobileMatchingViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
}

const MOBILE_HIGHLIGHT_SCROLL_DELAY_MS = 700

function scrollContainerToElement(
  container: HTMLElement,
  element: HTMLElement,
  behavior: ScrollBehavior = "smooth",
) {
  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  const nextTop =
    elementRect.top -
    containerRect.top +
    container.scrollTop -
    (container.clientHeight - element.clientHeight) / 2

  container.scrollTo({ top: Math.max(0, nextTop), behavior })
}

function scrollToSelectedConditionCard(container: HTMLElement, selectedIndex: number) {
  const tryScroll = () => {
    const card = container.querySelector<HTMLElement>(`[data-condition-index="${selectedIndex}"]`)
    if (!card || container.clientHeight <= 0) return false
    scrollContainerToElement(container, card, "smooth")
    return true
  }

  const attempt = (retriesLeft: number) => {
    if (tryScroll()) return
    if (retriesLeft > 0) requestAnimationFrame(() => attempt(retriesLeft - 1))
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      attempt(12)
      window.setTimeout(() => tryScroll(), 100)
      window.setTimeout(() => tryScroll(), 300)
    })
  })
}

function ResultBadge({ result }: { result: FunnelReportRow["result"] }) {
  if (result === "충족") {
    return (
      <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#1A7CFF]/10 px-2 py-0.5 text-[11px] font-semibold text-[#1A7CFF]">
        <Check className="size-3" strokeWidth={3} />
        충족
      </span>
    )
  }
  if (result === "일부충족") {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-600">
        일부충족
      </span>
    )
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
      미충족
    </span>
  )
}

function MatchingReportArrival({
  ctaActive,
  onAdvance,
  canAdvance,
}: {
  ctaActive: boolean
  onAdvance: () => void
  canAdvance: boolean
}) {
  const demo = FUNNEL_INTERVIEW_DEMO
  const applicant = FUNNEL_REPORT_APPLICANT

  return (
    <div className="fn-interview-email">
      <div className="fn-interview-email-wrap">
        <p className="fn-interview-email-notice">
          <Mail className="fn-interview-email-notice-icon" aria-hidden />
          <span>후보자 매칭리포트가 도착했어요</span>
        </p>
        <div className="fn-interview-email-card">
          <p className="text-[14px] font-semibold leading-snug text-foreground">매칭리포트</p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            매칭된 후보자를 확인해 보세요.
          </p>
          <dl className="mt-4 space-y-2.5 text-[12px]">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 font-medium text-muted-foreground">후보자</dt>
              <dd className="text-foreground">{applicant.name}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 font-medium text-muted-foreground">채용명</dt>
              <dd className="text-foreground">{demo.positionTitle}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 font-medium text-muted-foreground">조건 분석</dt>
              <dd className="rounded-md bg-[#EEF5FF] px-2 py-1 font-semibold text-[#1A7CFF]">
                {applicant.matchScore}%
              </dd>
            </div>
          </dl>
          <button
            type="button"
            disabled={!canAdvance}
            onClick={onAdvance}
            className={cn("fn-interview-email-cta mt-5", ctaActive && "fn-interview-cta-active")}
          >
            매칭리포트 확인하기
          </button>
        </div>
      </div>
    </div>
  )
}

type ResumePageProps = {
  selectedIndex: number | null
  evidenceRefs: MutableRefObject<(HTMLSpanElement | null)[]>
}

function ResumePage({ selectedIndex, evidenceRefs }: ResumePageProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  const [highlightBox, setHighlightBox] = useState<HighlightBox | null>(null)

  useLayoutEffect(() => {
    if (selectedIndex == null) {
      setHighlightBox(null)
      return
    }

    const page = pageRef.current
    const evidence = evidenceRefs.current[selectedIndex]
    if (!page || !evidence) {
      setHighlightBox(null)
      return
    }

    const pageRect = page.getBoundingClientRect()
    const evidenceRect = evidence.getBoundingClientRect()
    const padding = 3

    setHighlightBox({
      top: evidenceRect.top - pageRect.top - padding,
      left: evidenceRect.left - pageRect.left - padding,
      width: evidenceRect.width + padding * 2,
      height: evidenceRect.height + padding * 2,
    })
  }, [selectedIndex, evidenceRefs])

  return (
    <div ref={pageRef} className="fn-resume-page">
      <header className="fn-resume-header">
        <h3 className="fn-resume-name">{FUNNEL_REPORT_APPLICANT.name}</h3>
        <p className="fn-resume-role">{FUNNEL_REPORT_APPLICANT.role}</p>
        <p className="fn-resume-contact">
          {FUNNEL_REPORT_APPLICANT.email} · {FUNNEL_REPORT_APPLICANT.phone}
        </p>
        <p className="fn-resume-location">{FUNNEL_REPORT_APPLICANT.location}</p>
      </header>

      {FUNNEL_RESUME_SECTIONS.map((section) => (
        <section key={section.title} className="fn-resume-section">
          <h4 className="fn-resume-section-title">{section.title}</h4>
          <ul className="fn-resume-list">
            {section.items.map((item, itemIndex) => {
              const isEvidence = item.evidenceIndex != null
              const evidenceIndex = item.evidenceIndex

              return (
                <li key={`${section.title}-${itemIndex}`} className="fn-resume-item">
                  {isEvidence ? (
                    <span
                      ref={(el) => {
                        if (evidenceIndex != null) {
                          evidenceRefs.current[evidenceIndex] = el
                        }
                      }}
                      className={cn(
                        "fn-resume-evidence",
                        selectedIndex === evidenceIndex && "fn-resume-evidence-active",
                      )}
                    >
                      {item.primary}
                    </span>
                  ) : (
                    <span className="fn-resume-text">{item.primary}</span>
                  )}
                  {item.secondary ? (
                    <span className="fn-resume-subtext">{item.secondary}</span>
                  ) : null}
                  {"bullets" in item && item.bullets?.length ? (
                    <ul className="fn-resume-bullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      {highlightBox ? (
        <div
          className="fn-pdf-highlight"
          style={{
            top: `${highlightBox.top}px`,
            left: `${highlightBox.left}px`,
            width: `${highlightBox.width}px`,
            height: `${highlightBox.height}px`,
          }}
        />
      ) : null}
    </div>
  )
}

type MatchingReportPanelProps = {
  selectedIndex: number | null
  onSelectIndex: (index: number) => void
  pdfScrollRef: MutableRefObject<HTMLDivElement | null>
  conditionsListRef: MutableRefObject<HTMLDivElement | null>
  evidenceRefs: MutableRefObject<(HTMLSpanElement | null)[]>
}

function MatchingReportPanel({
  selectedIndex,
  onSelectIndex,
  pdfScrollRef,
  conditionsListRef,
  evidenceRefs,
}: MatchingReportPanelProps) {
  return (
    <div className="fn-report-scene flex min-h-0 h-full w-full flex-1 flex-col overflow-hidden">
      <div className="fn-report-topbar max-md:hidden">
        <div className="fn-report-attachment-tabs max-md:hidden">
          <span className="fn-report-attachment-tab fn-report-attachment-tab-active">이력서</span>
          <span className="fn-report-attachment-tab">포트폴리오</span>
        </div>
        <div className="fn-report-applicant-meta max-md:w-full max-md:justify-between">
          <span className="fn-report-applicant-name">{FUNNEL_REPORT_APPLICANT.name}</span>
          <span className="fn-report-applicant-score max-md:shrink-0">
            조건 분석 {FUNNEL_REPORT_APPLICANT.matchScore}%
          </span>
        </div>
      </div>

      <div className="fn-report-split">
        <div ref={pdfScrollRef} className="fn-mock-pdf">
          <ResumePage selectedIndex={selectedIndex} evidenceRefs={evidenceRefs} />
        </div>

        <div className="fn-report-conditions max-md:hidden">
          <div ref={conditionsListRef} className="fn-report-conditions-list">
            {FUNNEL_REPORT_ROWS.map((row, index) => {
              const selected = selectedIndex === index
              return (
                <button
                  key={row.id}
                  type="button"
                  data-condition-index={index}
                  onClick={() => onSelectIndex(index)}
                  className={cn(
                    "fn-report-condition-card",
                    selected && "fn-report-condition-card-selected",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-muted-foreground">
                        {FUNNEL_REPORT_CONDITION_LABEL}
                      </p>
                      <p className="mt-1 text-[13px] font-semibold leading-snug text-foreground">
                        {row.requirement}
                      </p>
                    </div>
                    <ResultBadge result={row.result} />
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{row.analysis}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {row.sourceBadges.map((badge) => (
                      <span key={badge} className="fn-report-source-badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
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
      total={MATCHING_FUNNEL_PHASES.length}
      onPrev={onPrev}
      onNext={onNext}
    />
  )
}

export function FunnelMatchingReportScene({
  active,
  animate,
  paused = false,
}: Props) {
  const [phase, setPhase] = useState<MatchingFunnelPhase>("arrival")
  const [ctaActive, setCtaActive] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [autoCancelled, setAutoCancelled] = useState(false)
  const pdfScrollRef = useRef<HTMLDivElement>(null)
  const conditionsListRef = useRef<HTMLDivElement>(null)
  const evidenceRefs = useRef<(HTMLSpanElement | null)[]>([])

  const setters = {
    setCtaActive,
    setSelectedIndex,
  }

  const resetDemo = useCallback(() => {
    setPhase("arrival")
    setCtaActive(false)
    setSelectedIndex(null)
    setAutoCancelled(false)
  }, [])

  useEffect(() => {
    if (!active) return
    if (!animate) {
      setPhase("report")
      applyPhaseSnapshot("report", setters)
      return
    }
    resetDemo()
  }, [active, animate, resetDemo])

  const steps = useMemo(
    () => buildMatchingAutoSteps(setPhase, setCtaActive, setSelectedIndex),
    [],
  )

  usePausableSequence({
    active: active && animate,
    enabled: !paused && !autoCancelled,
    steps,
    onReset: resetDemo,
  })

  useEffect(() => {
    if (phase !== "report") return
    if (!isMobileMatchingViewport()) return

    const scrollTop = () => {
      const container = pdfScrollRef.current
      if (!container) return
      scrollPdfToTop(container)
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(scrollTop)
    })

    return () => cancelAnimationFrame(frame)
  }, [phase])

  useEffect(() => {
    if (phase !== "report" || selectedIndex == null) return
    const container = pdfScrollRef.current
    const evidence = evidenceRefs.current[selectedIndex]
    if (!container || !evidence) return

    const runHighlightScroll = () => {
      const liveContainer = pdfScrollRef.current
      const liveEvidence = evidenceRefs.current[selectedIndex]
      if (!liveContainer || !liveEvidence) return
      scrollPdfToHighlight(liveContainer, liveEvidence, "smooth")
    }

    if (isMobileMatchingViewport()) {
      if (selectedIndex === 0) {
        const timeout = window.setTimeout(runHighlightScroll, MOBILE_HIGHLIGHT_SCROLL_DELAY_MS)
        return () => window.clearTimeout(timeout)
      }

      runHighlightScroll()
      return
    }

    scrollPdfToHighlight(container, evidence, "smooth")

    const conditionsList = conditionsListRef.current
    if (conditionsList) {
      scrollToSelectedConditionCard(conditionsList, selectedIndex)
    }
  }, [phase, selectedIndex])

  const goToPhase = useCallback((target: MatchingFunnelPhase) => {
    setAutoCancelled(true)
    setPhase(target)
    applyPhaseSnapshot(target, setters)
  }, [])

  const phaseIndex = MATCHING_FUNNEL_PHASES.indexOf(phase)
  const canAdvance = phaseIndex < MATCHING_FUNNEL_PHASES.length - 1

  const goPrev = useCallback(() => {
    if (phaseIndex <= 0) return
    goToPhase(MATCHING_FUNNEL_PHASES[phaseIndex - 1])
  }, [goToPhase, phaseIndex])

  const goNext = useCallback(() => {
    if (phaseIndex >= MATCHING_FUNNEL_PHASES.length - 1) return
    goToPhase(MATCHING_FUNNEL_PHASES[phaseIndex + 1])
  }, [goToPhase, phaseIndex])

  const handleSelectIndex = (index: number) => {
    setAutoCancelled(true)
    setSelectedIndex(index)
  }

  return (
    <div className="fn-interview-scene">
      {MATCHING_FUNNEL_PHASES.map((layerPhase) => {
        const isActive = layerPhase === phase

        return (
          <div
            key={layerPhase}
            className={cn("fn-interview-layer", isActive && "fn-interview-layer-active")}
            aria-hidden={!isActive}
          >
            {layerPhase === "arrival" ? (
              <MatchingReportArrival
                ctaActive={ctaActive && isActive}
                onAdvance={goNext}
                canAdvance={canAdvance}
              />
            ) : null}
            {layerPhase === "report" ? (
              <MatchingReportPanel
                selectedIndex={selectedIndex}
                onSelectIndex={handleSelectIndex}
                pdfScrollRef={pdfScrollRef}
                conditionsListRef={conditionsListRef}
                evidenceRefs={evidenceRefs}
              />
            ) : null}
          </div>
        )
      })}

      {active ? <PhaseNav phaseIndex={phaseIndex} onPrev={goPrev} onNext={goNext} /> : null}
    </div>
  )
}

export type { MatchingFunnelPhase }
