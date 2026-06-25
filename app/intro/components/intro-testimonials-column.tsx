"use client"

import { Fragment, type ReactNode } from "react"
import { motion } from "motion/react"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

type IntroTestimonialsColumnProps<T> = {
  className?: string
  duration?: number
  phaseIndex?: number
  phaseCount?: number
  items: readonly T[]
  renderItem: (item: T) => ReactNode
  getItemKey: (item: T) => string
}

function getPhasedForwardAnimation(phaseIndex: number, phaseCount: number) {
  const step = 50 / phaseCount
  const start = -(phaseIndex * step)
  return { translateY: [`${start}%`, `${start - 50}%`] as const }
}

export function IntroTestimonialsColumn<T>({
  className,
  duration = 15,
  phaseIndex = 0,
  phaseCount = 1,
  items,
  renderItem,
  getItemKey,
}: IntroTestimonialsColumnProps<T>) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <div className={cn("flex w-full max-w-xs flex-col gap-6", className)}>
        {items.map((item) => (
          <Fragment key={getItemKey(item)}>{renderItem(item)}</Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("h-full w-full max-w-xs overflow-hidden", className)}>
      <motion.div
        animate={getPhasedForwardAnimation(phaseIndex, phaseCount)}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {Array.from({ length: 2 }, (_, loopIndex) => (
          <Fragment key={loopIndex}>
            {items.map((item) => (
              <Fragment key={`${loopIndex}-${getItemKey(item)}`}>{renderItem(item)}</Fragment>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  )
}
