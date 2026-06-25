import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  className?: string
}

export function FunnelSceneNav({ index, total, onPrev, onNext, className }: Props) {
  const canPrev = index > 0
  const canNext = index < total - 1

  return (
    <div className={cn(className ?? "fn-funnel-scene-nav", "max-md:hidden")}>
      <button
        type="button"
        className="fn-funnel-scene-nav-btn"
        aria-label="이전 단계"
        disabled={!canPrev}
        onClick={onPrev}
      >
        <ChevronLeft className="size-3.5 md:size-4" />
      </button>
      <span className="fn-funnel-scene-nav-indicator">
        {index + 1} / {total}
      </span>
      <button
        type="button"
        className="fn-funnel-scene-nav-btn"
        aria-label="다음 단계"
        disabled={!canNext}
        onClick={onNext}
      >
        <ChevronRight className="size-3.5 md:size-4" />
      </button>
    </div>
  )
}

type AdvanceButtonProps = {
  label: string
  active?: boolean
  onClick: () => void
  className?: string
}

export function FunnelAdvanceButton({
  label,
  active = true,
  onClick,
  className,
}: AdvanceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className ?? "fn-funnel-advance-btn"}
      data-active={active ? "" : undefined}
    >
      {label}
    </button>
  )
}
