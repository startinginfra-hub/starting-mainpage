"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

type AiIconProps = {
  size?: number
  colorStart?: string
  colorEnd?: string
  className?: string
}

export function AiIcon({ size = 24, colorStart = "#1f7bff", colorEnd = "#5ec8ff", className }: AiIconProps) {
  const gradientId = `aiGrad-${useId().replace(/:/g, "")}`

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={cn(className)} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>
      </defs>
      <path
        d="M 50 2 C 59 32 68 41 98 50 C 68 59 59 68 50 98 C 41 68 32 59 2 50 C 32 41 41 32 50 2 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}
