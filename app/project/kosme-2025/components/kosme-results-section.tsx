"use client"

import { Fragment, useEffect, useState } from "react"
import { ChevronDown, ChevronRight, Send, Trophy, UserCheck, Users, type LucideIcon } from "lucide-react"
import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { KosmeReveal } from "./kosme-reveal"
import { KosmeSectionShell } from "./kosme-section-shell"

const { results } = kosmeLandingContent

const iconMap: Record<(typeof results.metrics)[number]["icon"], LucideIcon> = {
  send: Send,
  userCheck: UserCheck,
  users: Users,
  trophy: Trophy,
}

function getConversionRate(index: number): number | null {
  if (index === 0) return null
  const prev = results.metrics[index - 1].target
  const current = results.metrics[index].target
  return (current / prev) * 100
}

function CountUpMetric({
  target,
  suffix,
  delayMs = 0,
}: {
  target: number
  suffix: string
  delayMs?: number
}) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLParagraphElement>({ threshold: 0.45 })
  const [count, setCount] = useState(reduced ? target : 0)

  useEffect(() => {
    if (reduced) {
      setCount(target)
      return
    }

    if (!inView) return

    let frame = 0
    const durationMs = 1400
    let startedAt: number | null = null

    const tick = (now: number) => {
      if (startedAt === null) startedAt = now + delayMs
      if (now < startedAt) {
        frame = requestAnimationFrame(tick)
        return
      }

      const progress = Math.min((now - startedAt) / durationMs, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(target * eased))

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, target, delayMs])

  return (
    <p
      ref={ref}
      className="mt-2 text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl lg:text-2xl xl:text-3xl"
    >
      {count.toLocaleString("ko-KR")}
      {suffix}
    </p>
  )
}

function ResultStepCard({
  label,
  target,
  suffix,
  icon,
  isFinal,
  conversionRate,
  delayMs,
}: {
  label: string
  target: number
  suffix: string
  icon: (typeof results.metrics)[number]["icon"]
  isFinal: boolean
  conversionRate: number | null
  delayMs: number
}) {
  const Icon = iconMap[icon]

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center rounded-2xl px-4 py-5 text-center backdrop-blur-sm sm:px-5 sm:py-6",
        isFinal
          ? "border border-transparent bg-[#f97316] shadow-[0_8px_32px_rgba(249,115,22,0.35)]"
          : "border border-white/20 bg-white/15",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-white/20 sm:size-11">
        <Icon className="size-5 text-white sm:size-[1.35rem]" aria-hidden />
      </div>
      <p className="mt-3 text-xs font-medium text-white/80 sm:text-sm">{label}</p>
      {conversionRate !== null ? (
        <span className="mt-1.5 inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white/90">
          전환율 {conversionRate.toFixed(1)}%
        </span>
      ) : (
        <span className="mt-1.5 inline-flex h-[18px]" aria-hidden />
      )}
      <CountUpMetric target={target} suffix={suffix} delayMs={delayMs} />
    </div>
  )
}

export function KosmeResultsSection() {
  return (
    <KosmeSectionShell className="relative overflow-hidden bg-[#1A7CFF] py-14 text-white md:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-white/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 size-72 rounded-full bg-white/[0.08] blur-3xl"
        aria-hidden
      />

      <KosmeReveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{results.title}</h2>
          <p className="mt-2 text-sm text-white/80 md:text-base">{results.subtitle}</p>
        </div>
      </KosmeReveal>

      <div className="relative mx-auto mt-8 flex max-w-5xl flex-col items-center gap-2 sm:mt-10 lg:flex-row lg:items-stretch lg:justify-center lg:gap-1">
        {results.metrics.map((metric, index) => {
          const conversionRate = getConversionRate(index)

          return (
            <Fragment key={metric.label}>
              {index > 0 ? (
                <>
                  <ChevronDown
                    className="kosme-arrow-bounce size-5 shrink-0 text-white/70 lg:hidden"
                    aria-hidden
                  />
                  <ChevronRight
                    className="hidden size-5 shrink-0 self-center text-white/50 lg:block"
                    aria-hidden
                  />
                </>
              ) : null}

              <KosmeReveal delayMs={index * 80} className="w-full lg:min-w-0 lg:flex-1">
                <ResultStepCard
                  label={metric.label}
                  target={metric.target}
                  suffix={metric.suffix}
                  icon={metric.icon}
                  isFinal={index === results.metrics.length - 1}
                  conversionRate={conversionRate}
                  delayMs={index * 120}
                />
              </KosmeReveal>
            </Fragment>
          )
        })}
      </div>
    </KosmeSectionShell>
  )
}
