"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useInView } from "@/lib/intro/use-in-view"
import { cn } from "@/lib/utils"

type IntroRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  yOffset?: "16" | "24"
  threshold?: number
}

export function IntroReveal({
  children,
  className,
  delayMs = 0,
  yOffset = "16",
  threshold = 0.12,
}: IntroRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.style.transitionDelay = inView && delayMs > 0 ? `${delayMs}ms` : ""
  }, [delayMs, inView, ref])

  return (
    <div
      ref={ref}
      className={cn(
        "intro-reveal h-auto min-h-[1px] w-full",
        yOffset === "24" && "intro-reveal-y24",
        inView && "intro-reveal-visible",
        className,
      )}
    >
      {children}
    </div>
  )
}
