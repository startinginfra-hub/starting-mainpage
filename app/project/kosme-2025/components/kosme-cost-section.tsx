"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { KosmeReveal } from "./kosme-reveal"
import { KosmeSectionShell } from "./kosme-section-shell"

const { cost } = kosmeLandingContent

function CountUpZero() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLParagraphElement>({ threshold: 0.5 })
  const [amount, setAmount] = useState(reduced ? 0 : 2_000_000)

  useEffect(() => {
    if (!inView || reduced) {
      setAmount(0)
      return
    }

    let frame = 0
    const start = 2_000_000
    const durationMs = 1400
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1)
      setAmount(Math.round(start * (1 - progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced])

  return (
    <p ref={ref} className="text-base font-bold break-keep sm:text-lg md:text-xl">
      {amount > 0 ? `${amount.toLocaleString("ko-KR")}원 → ` : ""}0원(무료)
    </p>
  )
}

export function KosmeCostSection() {
  return (
    <KosmeSectionShell className="pt-12 pb-14 text-white md:pt-16 md:pb-16">
      <KosmeReveal>
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          {cost.title}
          <br />
          <span className="text-[#fde047]">{cost.titleHighlight}</span>
        </h2>
      </KosmeReveal>

      <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3">
        {cost.steps.map((step, index) => (
          <KosmeReveal key={step.label} delayMs={index * 100} className="w-full">
            <div className="rounded-xl bg-white/15 px-5 py-4 text-center backdrop-blur-sm">
              <p className="text-xs text-white/80">{step.label}</p>
              <p className="mt-1 text-xl font-bold">{step.amount}</p>
            </div>
          </KosmeReveal>
        ))}

        <ChevronDown className="kosme-arrow-bounce size-6 text-white/80" aria-hidden />

        <KosmeReveal delayMs={200} className="w-full">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-neutral-900 sm:flex-row sm:gap-3 sm:px-5 sm:py-4">
            <Image src="/project/logos/kosme.png" alt="KOSME" width={100} height={38} className="h-7 w-auto shrink-0 object-contain sm:h-8" />
            <p className="text-center text-xs font-semibold sm:text-left sm:text-sm">{cost.supportLabel}</p>
          </div>
        </KosmeReveal>

        <ChevronDown className="kosme-arrow-bounce size-6 text-white/80" aria-hidden />

        <KosmeReveal delayMs={300} className="w-full">
          <div className="rounded-xl bg-[#f97316] px-5 py-5 text-center">
            <CountUpZero />
            <p className="mt-1 text-sm font-medium text-white/90">{cost.finalLabel}</p>
          </div>
        </KosmeReveal>
      </div>
    </KosmeSectionShell>
  )
}
