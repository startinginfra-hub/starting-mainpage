import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type JdListHeroBannerMobileIconProps = {
  icon: LucideIcon
  className?: string
}

export function JdListHeroBannerMobileIcon({ icon: Icon, className }: JdListHeroBannerMobileIconProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute right-1 bottom-0 z-[1] translate-y-1/4 md:hidden",
        className,
      )}
      aria-hidden
    >
      <div className="flex size-[5.5rem] items-center justify-center rounded-2xl border border-white/15 bg-white/8 shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-sm">
        <Icon className="size-11 text-white/35" strokeWidth={1.75} />
      </div>
    </div>
  )
}
