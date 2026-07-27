"use client"

import { useEffect, useRef } from "react"
import { IntroHeroFunnel } from "@/app/intro/components/sections/intro-hero-funnel"
import { companyDilemmaMerge } from "@/lib/company/company-content"
import { useInView } from "@/lib/intro/use-in-view"
import { cn } from "@/lib/utils"
import { CompanyWordmark } from "../company-wordmark"
import "../company-dilemma-merge.css"

const ACCENT = "#3B9EFF"
const BASE = "#E5E5E5"

/**
 * 좌·우 각각 아암→합류→stem.
 * 시작 x는 2열 그리드 중앙(25% / 75%)에 맞춰 텍스트 바로 아래에서 출발.
 */
const LEFT_PATH =
  "M 250 8 L 250 58 Q 250 68 260 68 L 490 68 Q 500 68 500 78 L 500 140"
const RIGHT_PATH =
  "M 750 8 L 750 58 Q 750 68 740 68 L 510 68 Q 500 68 500 78 L 500 140"

/**
 * 핵심 장표 — HR 플랫폼 × 헤드헌팅이 부드러운 Y 곡선으로 모여
 * 스타팅 워드마크로 결합되는 장면. 블루 펄스가 계속 흘러내림.
 */
export function CompanyDilemmaMergeSection() {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.28,
    once: true,
    useAppMainScrollRoot: true,
  })

  return (
    <section
      ref={ref}
      id="dilemma"
      className="relative w-full overflow-hidden bg-[#F4F7FB] py-24 md:py-36"
    >
      {/* 쿨톤 그라데이션 워시 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#EEF3F9_0%,#F7F9FC_40%,#F4F7FB_100%)]"
      />
      {/* 상단 소프트 페이드 — 다크 Indicators와의 경계 완화 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent)]"
      />
      {/* 중앙 블루 글로우 — 합류·Starting 집중 */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-[58%] h-[540px] w-[min(100vw,820px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,158,255,0.2),transparent_66%)] blur-2xl transition-opacity duration-1000",
          inView ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        {/* 좌·우 페인 — 모바일도 Y 보더에 맞춰 2열 */}
        <div className="grid grid-cols-2 items-start gap-3 md:gap-16 lg:gap-24">
          <PainPanel
            side="left"
            inView={inView}
            eyebrow={companyDilemmaMerge.left.eyebrow}
            title={companyDilemmaMerge.left.title}
            body={companyDilemmaMerge.left.body}
          />
          <PainPanel
            side="right"
            inView={inView}
            eyebrow={companyDilemmaMerge.right.eyebrow}
            title={companyDilemmaMerge.right.title}
            body={companyDilemmaMerge.right.body}
          />
        </div>

        {/* Y 결합 경로 — 텍스트 그리드와 동일 너비라 열 중앙에서 출발 */}
        <div className="relative mt-2 h-32 w-full md:mt-1 md:h-36 lg:h-40" aria-hidden>
          <MergeYPath active={inView} />
        </div>

        {/* 결과 — 카피+로고 함께 약하게 둥둥 */}
        <div
          className={cn(
            "flex flex-col items-center text-center transition-all duration-700 delay-500 motion-reduce:delay-0 motion-reduce:transition-none",
            inView ? "scale-100 opacity-100" : "scale-[0.92] opacity-0",
          )}
        >
          <div className={cn("dilemma-y-float", inView && "is-active")}>
            <p
              className="text-sm font-medium tracking-tight md:text-base"
              style={{ color: ACCENT }}
            >
              {companyDilemmaMerge.result.eyebrow}
            </p>
            <CompanyWordmark className="mt-5 h-10 md:mt-6 md:h-16" />
          </div>
        </div>

        {/* 서비스 데모 — 로고 바로 아래, Starting이 실제로 하는 채용 */}
        <div className="intro-funnel-section relative mt-10 w-full md:mt-12">
          <div className="intro-funnel-inner relative z-10 mx-auto w-full max-w-[1180px]">
            <IntroHeroFunnel />
          </div>
        </div>
      </div>
    </section>
  )
}

function MergeYPath({ active }: { active: boolean }) {
  const leftPulseRef = useRef<SVGPathElement>(null)
  const rightPulseRef = useRef<SVGPathElement>(null)

  // 실제 경로 길이를 재서 펄스 dash 패턴에 반영 — 양쪽 동일 길이라 도착 타이밍이 맞음
  useEffect(() => {
    for (const ref of [leftPulseRef, rightPulseRef]) {
      const node = ref.current
      if (!node) continue
      const len = node.getTotalLength()
      node.style.setProperty("--path-len", `${len}px`)
      node.style.setProperty("--pulse-len", `${len * 0.18}px`)
    }
  }, [])

  return (
    <svg
      viewBox="0 0 1000 150"
      preserveAspectRatio="none"
      className="h-full w-full overflow-visible"
      fill="none"
    >
      {/* 회색 베이스 곡선 */}
      <path
        d={LEFT_PATH}
        stroke={BASE}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cn("dilemma-y-base", active && "is-active")}
      />
      <path
        d={RIGHT_PATH}
        stroke={BASE}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cn("dilemma-y-base", active && "is-active")}
      />

      {/* 블루 펄스 — 좌·우 동시 출발, 합류 후 함께 하강 (무한 반복) */}
      <path
        ref={leftPulseRef}
        d={LEFT_PATH}
        stroke={ACCENT}
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cn("dilemma-y-pulse", active && "is-active")}
      />
      <path
        ref={rightPulseRef}
        d={RIGHT_PATH}
        stroke={ACCENT}
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cn("dilemma-y-pulse", active && "is-active")}
      />
    </svg>
  )
}

function PainPanel({
  side,
  inView,
  eyebrow,
  title,
  body,
}: {
  side: "left" | "right"
  inView: boolean
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div
      className={cn(
        "text-center transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none",
        side === "left" ? "delay-75" : "delay-150",
        inView
          ? "translate-x-0 opacity-100"
          : side === "left"
            ? "-translate-x-10 opacity-0"
            : "translate-x-10 opacity-0",
      )}
    >
      <p className="text-[11px] font-semibold tracking-tight text-neutral-400 md:text-base">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-[15px] font-bold leading-snug tracking-tight text-neutral-400 md:mt-4 md:text-4xl md:leading-snug">
        {title}
        <span className="mt-1 block whitespace-pre-line text-[14px] leading-snug text-neutral-950 md:text-4xl md:leading-snug">
          {body}
        </span>
      </h3>
    </div>
  )
}
