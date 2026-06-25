"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useInView } from "@/lib/intro/use-in-view"
import { cn } from "@/lib/utils"

type KosmeRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  threshold?: number
}

export function KosmeReveal({ children, className, delayMs = 0, threshold = 0.12 }: KosmeRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold })

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.style.transitionDelay = inView && delayMs > 0 ? `${delayMs}ms` : ""
  }, [delayMs, inView, ref])

  return (
    <div ref={ref} className={cn("kosme-reveal", inView && "kosme-reveal-visible", className)}>
      {children}
    </div>
  )
}
