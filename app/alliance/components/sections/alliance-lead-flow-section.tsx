"use client"

import Image from "next/image"
import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { ArrowUp, Building2, Check } from "lucide-react"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"

type FieldHeadhunter = {
  photo: string
  name: string
  background: string
  candidates: number
  desktopOnly?: boolean
}

const FIELD_HEADHUNTERS: readonly FieldHeadhunter[] = [
  {
    photo: "/alliance/headhunters/hh-field-a.jpg",
    name: "헤드헌터 A",
    background: "IT 플랫폼 PM 채용 담당 출신 · 8년",
    candidates: 3,
  },
  {
    photo: "/alliance/headhunters/hh-field-b.jpg",
    name: "헤드헌터 B",
    background: "핀테크 프로덕트 리드 출신 · 10년",
    candidates: 4,
  },
  {
    photo: "/alliance/headhunters/hh-field-c.jpg",
    name: "헤드헌터 C",
    background: "테크 전문 서치펌 출신 · 6년",
    candidates: 2,
  },
  {
    photo: "/alliance/headhunters/hh-06-kang.jpg",
    name: "헤드헌터 D",
    background: "AI 스타트업 채용 총괄 출신 · 7년",
    candidates: 3,
    desktopOnly: true,
  },
]

const LEAD_DUTIES = ["JD 관리", "매칭 조건 관리", "후보자 최종 검토"] as const

const CORNER_RADIUS = 20

type FlowPath = { d: string; startY: number; endY: number }

function buildTreePath(startX: number, startY: number, endX: number, endY: number): string {
  const midY = (startY + endY) / 2
  const dx = endX - startX
  if (Math.abs(dx) < CORNER_RADIUS * 2) {
    return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`
  }
  const dir = Math.sign(dx)
  const r = CORNER_RADIUS
  return [
    `M ${startX} ${startY}`,
    `V ${midY + r}`,
    `Q ${startX} ${midY} ${startX + dir * r} ${midY}`,
    `H ${endX - dir * r}`,
    `Q ${endX} ${midY} ${endX} ${midY - r}`,
    `V ${endY}`,
  ].join(" ")
}

function useTreePaths() {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const sourceRefs = useRef<(HTMLElement | null)[]>([])
  const [paths, setPaths] = useState<FlowPath[]>([])

  const measure = useCallback(() => {
    const container = containerRef.current
    const target = targetRef.current
    if (!container || !target) return

    const base = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const endX = targetRect.left + targetRect.width / 2 - base.left
    const endY = targetRect.bottom - base.top

    const next: FlowPath[] = []
    for (const source of sourceRefs.current) {
      if (!source) continue
      const rect = source.getBoundingClientRect()
      if (rect.width === 0) continue
      const startX = rect.left + rect.width / 2 - base.left
      const startY = rect.top - base.top
      next.push({ d: buildTreePath(startX, startY, endX, endY), startY, endY })
    }
    setPaths(next)
  }, [])

  useLayoutEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    for (const source of sourceRefs.current) if (source) observer.observe(source)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  return { containerRef, targetRef, sourceRefs, paths }
}

function FieldHeadhunterCard({
  headhunter,
  cardRef,
}: {
  headhunter: FieldHeadhunter
  cardRef: (node: HTMLElement | null) => void
}) {
  return (
    <article
      ref={cardRef}
      className={cn(
        "flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#0f131c] px-3 py-5 text-center md:px-6 md:py-8",
        headhunter.desktopOnly && "hidden md:flex",
      )}
    >
      <Image
        src={headhunter.photo}
        alt={`${headhunter.name} 프로필 사진`}
        width={72}
        height={72}
        className="size-12 rounded-full object-cover md:size-[72px]"
      />
      <p className="mt-3 text-xs font-semibold text-[#74acff] md:mt-4 md:text-sm">{headhunter.name}</p>
      <p className="mt-1 text-[10px] leading-snug text-white/45 md:text-xs">{headhunter.background}</p>
      <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/60 md:mt-4 md:text-xs">
        <ArrowUp className="size-3" strokeWidth={2.5} aria-hidden />
        후보 {headhunter.candidates}명 추천
      </span>
    </article>
  )
}

function LeadGroup({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative mx-auto w-full max-w-[440px] rounded-3xl border border-dashed border-[#1A7CFF]/45 bg-[#1A7CFF]/[0.02] p-4 pt-7 md:p-6 md:pt-8">
      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#1A7CFF]/40 bg-[#07090f] px-3 py-1 text-[11px] font-semibold text-[#74acff] md:text-xs">
        1:1 전담 소통
      </span>

      <article className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#0f131c] p-4 text-center md:p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] md:size-10">
            <Building2 className="size-[18px] text-white/70 md:size-5" strokeWidth={1.8} aria-hidden />
          </span>
          <p className="text-sm font-semibold text-white md:text-base">고객사</p>
        </div>
      </article>

      <div className="mx-auto h-8 w-px bg-gradient-to-b from-[#1A7CFF]/60 to-[#1A7CFF]/30 md:h-10" aria-hidden />

      <div
        ref={targetRef}
        className="rounded-2xl border border-[#1A7CFF]/45 bg-[#0f131c] p-5 text-center shadow-[0_0_32px_-12px_rgba(26,124,255,0.5)] md:p-6"
      >
        <p className="text-base font-semibold text-white md:text-lg">총괄 헤드헌터</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
          {LEAD_DUTIES.map((duty) => (
            <li
              key={duty}
              className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70 md:text-xs"
            >
              <Check className="size-3 text-[#74acff]" strokeWidth={2.5} aria-hidden />
              {duty}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function AllianceLeadFlowSection() {
  const { containerRef, targetRef, sourceRefs, paths } = useTreePaths()
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.2 })
  const reducedMotion = usePrefersReducedMotion()
  const showEnergy = inView && !reducedMotion

  return (
    <AllianceSection id="lead-headhunter" innerClassName="max-w-[1440px]">
      <AllianceSectionHeading
        title={
          <>
            소통 창구는 <span className="alliance-text-gold">하나</span>,
            <br className="md:hidden" /> 전문가는 <span className="alliance-text-gold">여러 명</span>
          </>
        }
        subtitle="총괄 헤드헌터가 분야별 헤드헌터와 조율하고, 진행 상황을 한곳에서 전달해 드려요."
      />

      <div ref={inViewRef}>
        <div ref={containerRef} className="relative">
          <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs>
              {paths.map((path, index) => (
                <linearGradient
                  key={index}
                  id={`alliance-flow-grad-${index}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={path.startY}
                  x2="0"
                  y2={path.endY}
                >
                  <stop offset="0%" stopColor="#1A7CFF" />
                  <stop offset="100%" stopColor="#74acff" />
                </linearGradient>
              ))}
            </defs>
            {paths.map((path, index) => (
              <path
                key={`base-${index}`}
                d={path.d}
                fill="none"
                stroke="rgb(255 255 255 / 0.1)"
                strokeWidth={1.5}
              />
            ))}
            {showEnergy
              ? paths.map((path, index) => (
                  <path
                    key={`energy-${index}`}
                    d={path.d}
                    fill="none"
                    stroke={`url(#alliance-flow-grad-${index})`}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="14 86"
                    className="alliance-flow-energy"
                  />
                ))
              : null}
          </svg>

          <div className="relative">
            <LeadGroup targetRef={targetRef} />
          </div>

          <div className="h-24 md:h-32" aria-hidden />

          <div className="relative">
            <div className="grid grid-cols-3 gap-2.5 md:grid-cols-4 md:gap-5">
              {FIELD_HEADHUNTERS.map((headhunter, index) => (
                <FieldHeadhunterCard
                  key={headhunter.name}
                  headhunter={headhunter}
                  cardRef={(node) => {
                    sourceRefs.current[index] = node
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/40 md:mt-10 md:text-sm">
          분야마다 여러 명의 헤드헌터가 동시에 후보를 찾아요
        </p>
      </div>
    </AllianceSection>
  )
}
