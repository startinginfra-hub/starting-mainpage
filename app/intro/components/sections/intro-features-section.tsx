"use client"

import { useEffect, useRef, useState } from "react"
import { FUNNEL_HOLD_SEGMENTS, FUNNEL_STEP_COUNT, FunnelContent, StaticFunnel } from "../intro-filter-funnel"
import { IntroSectionHeading } from "../intro-section"
import { INTRO_CONTENT_MAX } from "@/lib/intro/intro-tokens"
import { useInView } from "@/lib/intro/use-in-view"
import { useStickyScrollScrub } from "@/lib/intro/use-sticky-scroll-scrub"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/** Shared header (`h-14`) sticks to the top of `main[data-app-main]`. */
const STICKY_TOP_PX = 56

const FEATURES_HEADING = <>헤드헌팅 그 이상의 정교함</>

const FEATURES_SUBTITLE = "다수 지원자 중 핏한 인재만 남기는 이중 필터링"

function FeaturesHeading() {
  return (
    <IntroSectionHeading
      title={FEATURES_HEADING}
      subtitle={FEATURES_SUBTITLE}
      className="mb-5 md:mb-6"
    />
  )
}

export function IntroFeaturesSection() {
  const reducedMotion = usePrefersReducedMotion()
  const wasInViewRef = useRef(false)
  const { ref: sectionRef, inView } = useInView<HTMLElement>({
    threshold: 0,
    useAppMainScrollRoot: true,
  })
  const [replayToken, setReplayToken] = useState(0)
  const { trackRef, activeStep, reset } = useStickyScrollScrub({
    stepCount: FUNNEL_STEP_COUNT,
    holdSegments: FUNNEL_HOLD_SEGMENTS,
    stickyTop: STICKY_TOP_PX,
    reducedMotion,
  })

  useEffect(() => {
    if (inView) {
      if (!wasInViewRef.current) {
        setReplayToken((token) => token + 1)
      }
      wasInViewRef.current = true
      return
    }

    wasInViewRef.current = false
    reset()
  }, [inView, reset])

  if (reducedMotion) {
    return (
      <section id="features" className="relative z-10 hidden w-full bg-[#fbfcfe] py-12 md:block md:py-20">
        <div className={cn(INTRO_CONTENT_MAX, "mx-auto w-full px-4 md:px-8")}>
          <FeaturesHeading />
          <StaticFunnel />
        </div>
      </section>
    )
  }

  return (
    <section id="features" ref={sectionRef} className="relative z-10 hidden w-full bg-[#fbfcfe] md:block">
      <div
        ref={trackRef}
        className="intro-features-scroll-track relative w-full"
        style={{
          height: `calc(var(--intro-funnel-segment-vh) * (${FUNNEL_STEP_COUNT} + ${FUNNEL_HOLD_SEGMENTS}))`,
        }}
      >
        <div
          className="intro-features-sticky-panel sticky z-10 flex min-h-[calc(100dvh-3.5rem)] w-full flex-col bg-[#fbfcfe] pt-10 pb-6 md:pt-20 md:pb-10"
          style={{ top: STICKY_TOP_PX }}
        >
          <div
            className={cn(
              INTRO_CONTENT_MAX,
              "mx-auto flex w-full min-h-0 flex-1 flex-col px-4 md:px-8",
            )}
          >
            <FeaturesHeading />
            <div className="flex min-h-0 flex-1 flex-col justify-start">
              <FunnelContent activeStep={activeStep} replayToken={replayToken} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
