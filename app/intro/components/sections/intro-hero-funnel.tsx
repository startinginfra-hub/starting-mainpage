"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import {
  getManualFlowSceneIndex,
  isManualFlowScene,
  MANUAL_FLOW_SCENES,
  SCENE_DELAYS,
  sceneReducer,
  sceneToTab,
  type FunnelScene,
} from "@/app/intro/components/funnel/funnel-constants"
import { FunnelStepTabs, tabIndexToScene } from "@/app/intro/components/funnel/funnel-step-tabs"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const FunnelApplyScene = dynamic(
  () =>
    import("@/app/intro/components/funnel/funnel-apply-scene").then((module) => ({
      default: module.FunnelApplyScene,
    })),
  { loading: () => <div className="min-h-[18rem] animate-pulse rounded-xl bg-neutral-200/40" aria-hidden /> },
)

const FunnelScreeningScene = dynamic(
  () =>
    import("@/app/intro/components/funnel/funnel-screening-scene").then((module) => ({
      default: module.FunnelScreeningScene,
    })),
  { loading: () => <div className="min-h-[18rem] animate-pulse rounded-xl bg-neutral-200/40" aria-hidden /> },
)

const FunnelMatchingReportScene = dynamic(
  () =>
    import("@/app/intro/components/funnel/funnel-matching-report-scene").then((module) => ({
      default: module.FunnelMatchingReportScene,
    })),
  { loading: () => <div className="min-h-[18rem] animate-pulse rounded-xl bg-neutral-200/40" aria-hidden /> },
)

const FunnelInterviewScene = dynamic(
  () =>
    import("@/app/intro/components/funnel/funnel-interview-scene").then((module) => ({
      default: module.FunnelInterviewScene,
    })),
  { loading: () => <div className="min-h-[18rem] animate-pulse rounded-xl bg-neutral-200/40" aria-hidden /> },
)

const FunnelPaymentScene = dynamic(
  () =>
    import("@/app/intro/components/funnel/funnel-payment-scene").then((module) => ({
      default: module.FunnelPaymentScene,
    })),
  { loading: () => <div className="min-h-[18rem] animate-pulse rounded-xl bg-neutral-200/40" aria-hidden /> },
)

function useSceneAutoAdvance({
  scene,
  inView,
  reducedMotion,
  isHovered,
  onAdvance,
}: {
  scene: FunnelScene
  inView: boolean
  reducedMotion: boolean
  isHovered: boolean
  onAdvance: () => void
}) {
  const sceneStartedAtRef = useRef(0)
  const pausedAccumMsRef = useRef(0)
  const pausedAtRef = useRef<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onAdvanceRef = useRef(onAdvance)
  onAdvanceRef.current = onAdvance

  useEffect(() => {
    sceneStartedAtRef.current = Date.now()
    pausedAccumMsRef.current = 0
    pausedAtRef.current = null
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [scene])

  useEffect(() => {
    const clearScheduled = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const documentHidden = typeof document !== "undefined" && document.hidden
    const canAutoAdvance = inView && !reducedMotion && !isHovered && !documentHidden

    if (!canAutoAdvance) {
      clearScheduled()
      if (pausedAtRef.current == null && sceneStartedAtRef.current > 0) {
        pausedAtRef.current = Date.now()
      }
      return clearScheduled
    }

    if (pausedAtRef.current != null) {
      pausedAccumMsRef.current += Date.now() - pausedAtRef.current
      pausedAtRef.current = null
    }

    const elapsed = Date.now() - sceneStartedAtRef.current - pausedAccumMsRef.current
    const remaining = Math.max(0, SCENE_DELAYS[scene] - elapsed)

    timeoutRef.current = setTimeout(() => onAdvanceRef.current(), remaining)
    return clearScheduled
  }, [inView, reducedMotion, isHovered, scene])
}

function ActiveFunnelScene({
  scene,
  animate,
  paused,
  onAdvanceToNext,
  onAdvanceFromInterview,
}: {
  scene: FunnelScene
  animate: boolean
  paused: boolean
  onAdvanceToNext: () => void
  onAdvanceFromInterview: () => void
}) {
  switch (scene) {
    case "apply":
      return (
        <FunnelApplyScene
          active
          animate={animate}
          paused={paused}
          onAdvanceScene={onAdvanceToNext}
        />
      )
    case "screening":
      return (
        <FunnelScreeningScene
          active
          animate={animate}
          paused={paused}
          onAdvanceScene={onAdvanceToNext}
        />
      )
    case "matching":
      return (
        <FunnelMatchingReportScene
          active
          animate={animate}
          paused={paused}
          onAdvanceScene={onAdvanceToNext}
        />
      )
    case "interview":
      return (
        <FunnelInterviewScene
          active
          animate={animate}
          paused={paused}
          onAdvanceScene={onAdvanceFromInterview}
        />
      )
    case "payment":
      return <FunnelPaymentScene active animate={animate} paused={paused} />
    default:
      return null
  }
}

export function IntroHeroFunnel() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
    once: false,
  })
  const reducedMotion = usePrefersReducedMotion()
  const [scene, dispatch] = useReducer(sceneReducer, "apply")
  const [isHovered, setIsHovered] = useState(false)
  const sceneRef = useRef(scene)
  sceneRef.current = scene

  const handleTabClick = (tabIndex: number) => {
    dispatch({ type: "set", scene: tabIndexToScene(tabIndex) })
  }

  const advanceToNextScene = useCallback(() => {
    const index = getManualFlowSceneIndex(sceneRef.current)
    if (index < 0 || index >= MANUAL_FLOW_SCENES.length - 1) return
    dispatch({ type: "set", scene: MANUAL_FLOW_SCENES[index + 1] })
  }, [])

  const advanceFromInterview = useCallback(() => {
    dispatch({ type: "set", scene: "payment" })
  }, [])

  const handleSceneAutoAdvance = useCallback(() => {
    const current = sceneRef.current
    if (current === "payment") {
      dispatch({ type: "next" })
      return
    }
    if (current === "interview") {
      advanceFromInterview()
      return
    }
    if (isManualFlowScene(current)) {
      advanceToNextScene()
    }
  }, [advanceFromInterview, advanceToNextScene])

  useSceneAutoAdvance({
    scene,
    inView,
    reducedMotion,
    isHovered,
    onAdvance: handleSceneAutoAdvance,
  })

  const activeTab = sceneToTab(scene)
  const animate = !reducedMotion
  const panelScreening = scene === "screening"
  const panelMatching = scene === "matching"
  const panelInterview = scene === "interview"
  const panelPayment = scene === "payment"
  const panelManualFlow = isManualFlowScene(scene)

  return (
    <div
      ref={ref}
      className="fn intro-hero-funnel-loop w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
    >
      <div className="fn-stage">
        <FunnelStepTabs activeTab={activeTab} onTabClick={handleTabClick} />

        <div className="fn-stage-body">
          <div
            className={cn(
              "fn-preview-panel",
              panelManualFlow && "fn-preview-panel-manual-flow",
              panelScreening && "fn-preview-panel-screening matching-coordinator-panel-bg",
              panelMatching && "fn-preview-panel-report",
              panelInterview && "fn-preview-panel-interview",
              panelPayment && "fn-preview-panel-interview",
            )}
          >
            {panelScreening ? (
              <div className="matching-coordinator-panel-bg__layer" aria-hidden>
                <span className="matching-coordinator-panel-bg__blob matching-coordinator-panel-bg__blob--blue" />
                <span className="matching-coordinator-panel-bg__blob matching-coordinator-panel-bg__blob--pink" />
                <span className="matching-coordinator-panel-bg__blob matching-coordinator-panel-bg__blob--yellow" />
              </div>
            ) : null}

            <div className="fn-scene-stack relative z-[1]">
              <div
                className={cn(
                  "fn-scene-layer fn-scene-layer-active items-stretch !p-0",
                  scene === "screening" && "fn-scene-layer-screening",
                  scene === "matching" && "fn-scene-layer-report",
                  scene === "interview" && "fn-scene-layer-interview",
                )}
              >
                <ActiveFunnelScene
                  scene={scene}
                  animate={animate}
                  paused={isHovered}
                  onAdvanceToNext={advanceToNextScene}
                  onAdvanceFromInterview={advanceFromInterview}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
