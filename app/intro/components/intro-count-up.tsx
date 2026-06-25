"use client"

import { useEffect, useState } from "react"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

type IntroCountUpProps = {
  value: number
  suffix?: string
  prefix?: string
  durationMs?: number
  delayMs?: number
  className?: string
  valueClassName?: string
  suffixClassName?: string
  format?: (n: number) => string
}

export function IntroCountUp({
  value,
  suffix = "",
  prefix = "",
  durationMs = 1600,
  delayMs = 0,
  className,
  valueClassName,
  suffixClassName,
  format,
}: IntroCountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 })
  const reducedMotion = usePrefersReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? value : 0)

  useEffect(() => {
    if (!inView) {
      if (!reducedMotion) setDisplay(0)
      return
    }
    if (reducedMotion) {
      setDisplay(value)
      return
    }

    let frame = 0
    let start: number | null = null
    const timeout = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (start == null) start = ts
        const progress = Math.min((ts - start) / durationMs, 1)
        setDisplay(Math.round(value * easeOutCubic(progress)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [delayMs, durationMs, inView, reducedMotion, value])

  const formatted = format ? format(display) : display.toLocaleString("ko-KR")

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className={valueClassName}>{formatted}</span>
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  )
}
