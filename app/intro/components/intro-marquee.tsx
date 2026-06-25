"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type IntroMarqueeProps = {
  children: ReactNode
  direction?: "ltr" | "rtl"
  durationSec?: number
  className?: string
  fadeClassName?: string
  itemsClassName?: string
}

export function IntroMarquee({
  children,
  direction = "ltr",
  durationSec = 40,
  className,
  fadeClassName = "intro-marquee-fade",
  itemsClassName = "gap-3 pr-3",
}: IntroMarqueeProps) {
  const trackItemsClassName = cn("flex shrink-0 items-center", itemsClassName)

  return (
    <div className={cn("intro-marquee-row relative z-0 w-full overflow-hidden", fadeClassName, className)}>
      <div
        className={cn("intro-marquee-track", direction === "rtl" && "intro-marquee-rtl")}
        style={{ animationDuration: `${durationSec}s` }}
      >
        <div className={trackItemsClassName}>{children}</div>
        <div className={trackItemsClassName} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
