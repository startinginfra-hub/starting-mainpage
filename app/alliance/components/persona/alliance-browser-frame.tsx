import type { ReactNode } from "react"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

type AllianceBrowserFrameProps = {
  url: string
  className?: string
  children: ReactNode
}

export function AllianceBrowserFrame({ url, className, children }: AllianceBrowserFrameProps) {
  return (
    <div className={cn("alliance-browser relative", className)}>
      <div className="alliance-browser-glow pointer-events-none absolute" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161b26] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="flex min-w-0 max-w-sm flex-1 items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-[11px] text-white/45">
              <Lock className="size-3 shrink-0" strokeWidth={2} aria-hidden />
              <span className="truncate">{url}</span>
            </div>
          </div>
          <div className="w-[42px] shrink-0" aria-hidden />
        </div>
        <div className="bg-[#f5f7fb] text-[#0b0f1c] [color-scheme:light]">{children}</div>
      </div>
    </div>
  )
}
