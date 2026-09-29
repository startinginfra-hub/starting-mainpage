import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ALLIANCE_PERSONA } from "../alliance-persona-content"

export type PersonaScreenProps = {
  onNext?: () => void
}

type PersonaScreenShellProps = {
  className?: string
  children: ReactNode
}

export function PersonaScreenShell({ className, children }: PersonaScreenShellProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-[#e3e8f1] bg-white px-4 py-2.5 md:px-5">
        {/* eslint-disable-next-line @next/next/no-img-element -- 정적 브랜드 SVG */}
        <img src="/starting-text-black.svg" alt="" className="h-3.5 w-auto shrink-0 md:h-4" />
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[11px] text-[#5d6a82] sm:inline">{ALLIANCE_PERSONA.company}</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-[#0b0f1c] text-[10px] font-semibold text-white">
            {ALLIANCE_PERSONA.initial}
          </span>
        </div>
      </div>
      <div className={cn("min-h-0 flex-1 overflow-hidden p-4 md:p-5", className)}>{children}</div>
    </div>
  )
}
