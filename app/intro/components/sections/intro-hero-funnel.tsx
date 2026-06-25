"use client"

import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { FunnelApplyScene } from "@/app/intro/components/funnel/funnel-apply-scene"
import {
  getManualFlowSceneIndex,
  isManualFlowScene,
  MANUAL_FLOW_SCENES,
  SCENE_DELAYS,
  sceneReducer,
  sceneToTab,
  type FunnelScene,
} from "@/app/intro/components/funnel/funnel-constants"
import { FunnelInterviewScene } from "@/app/intro/components/funnel/funnel-interview-scene"
import { FunnelMatchingReportScene } from "@/app/intro/components/funnel/funnel-matching-report-scene"
import { FunnelPaymentScene } from "@/app/intro/components/funnel/funnel-payment-scene"
import { FunnelScreeningScene } from "@/app/intro/components/funnel/funnel-screening-scene"
import { FunnelStepTabs, tabIndexToScene } from "@/app/intro/components/funnel/funnel-step-tabs"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

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
                  "fn-scene-layer items-stretch !p-0",
                  scene === "apply" && "fn-scene-layer-active",
                )}
                aria-hidden={scene !== "apply"}
              >
                <FunnelApplyScene
                  active={scene === "apply"}
                  animate={animate}
                  paused={isHovered}
                  onAdvanceScene={advanceToNextScene}
                />
              </div>

              <div
                className={cn(
                  "fn-scene-layer fn-scene-layer-screening",
                  scene === "screening" && "fn-scene-layer-active",
                )}
                aria-hidden={scene !== "screening"}
              >
                <FunnelScreeningScene
                  active={scene === "screening"}
                  animate={animate}
                  paused={isHovered}
                  onAdvanceScene={advanceToNextScene}
                />
              </div>

              <div
                className={cn(
                  "fn-scene-layer fn-scene-layer-report",
                  scene === "matching" && "fn-scene-layer-active",
                )}
                aria-hidden={scene !== "matching"}
              >
                <FunnelMatchingReportScene
                  active={scene === "matching"}
                  animate={animate}
                  paused={isHovered}
                  onAdvanceScene={advanceToNextScene}
                />
              </div>

              <div
                className={cn(
                  "fn-scene-layer fn-scene-layer-interview",
                  scene === "interview" && "fn-scene-layer-active",
                )}
                aria-hidden={scene !== "interview"}
              >
                <FunnelInterviewScene
                  active={scene === "interview"}
                  animate={animate}
                  paused={isHovered}
                  onAdvanceScene={advanceFromInterview}
                />
              </div>

              <div
                className={cn("fn-scene-layer", scene === "payment" && "fn-scene-layer-active")}
                aria-hidden={scene !== "payment"}
              >
                <FunnelPaymentScene
                  active={scene === "payment"}
                  animate={animate}
                  paused={isHovered}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
