import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

/** 배너 원본 비율 (832×563) — 모바일은 더 낮은 비율로 카드 높이 축소 */
const BANNER_ASPECT_CLASS = "aspect-[2/1] sm:aspect-[832/563]"

type ProjectComingSoonCardProps = {
  className?: string
}

export function ProjectComingSoonCard({ className }: ProjectComingSoonCardProps) {
  return (
    <div
      className={cn(
        "flex h-full cursor-default flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white sm:rounded-2xl sm:flex-row sm:items-stretch",
        className,
      )}
    >
      <div className="order-2 flex min-w-0 flex-1 flex-col gap-2 p-3 sm:order-1 sm:gap-4 sm:p-5 sm:pr-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            role="status"
            aria-label="준비 중"
            className="inline-flex w-fit shrink-0 items-center rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700"
          >
            준비 중
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1 sm:gap-2">
          <h2 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-foreground sm:text-base">
            새로운 프로젝트를 준비하고 있어요
          </h2>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-sm">
            곧 새로운 협업·지원 프로그램을 만나보실 수 있어요.
          </p>
        </div>
      </div>

      <div className="order-1 flex shrink-0 items-stretch sm:order-2 sm:min-h-[200px]">
        <div
          className={cn(
            "relative flex h-auto w-full max-w-full items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-100 sm:h-full sm:w-auto sm:rounded-t-none sm:rounded-l-2xl sm:rounded-r-2xl",
            BANNER_ASPECT_CLASS,
          )}
        >
          <div className="flex flex-col items-center gap-2 text-amber-600/70">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
            <span className="text-xs font-semibold tracking-wider sm:text-sm">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
