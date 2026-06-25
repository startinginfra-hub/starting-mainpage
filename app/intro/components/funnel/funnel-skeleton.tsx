import { CoordinatorAvatar } from "@/app/intro/components/coordinator-avatar"
import { cn } from "@/lib/utils"

type LabelWidth = "sm" | "md" | "lg"

const labelWidthClass: Record<LabelWidth, string> = {
  sm: "w-16",
  md: "w-20",
  lg: "w-24",
}

export function FunnelSkeletonLabel({ width = "md" }: { width?: LabelWidth }) {
  return <div className={cn("fn-skeleton-line h-3 rounded", labelWidthClass[width])} aria-hidden />
}

export function FunnelSkeletonInput({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-10 w-full rounded-md border border-[#e3e8f1] intro-shimmer md:h-11",
        className,
      )}
      aria-hidden
    />
  )
}

export function FunnelSkeletonTextarea({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "min-h-[5rem] w-full rounded-md border border-[#e3e8f1] intro-shimmer md:min-h-[5.5rem]",
        className,
      )}
      aria-hidden
    />
  )
}

export function FunnelSkeletonField({
  variant = "input",
  labelWidth = "md",
}: {
  variant?: "input" | "textarea"
  labelWidth?: LabelWidth
}) {
  return (
    <div className="space-y-1.5">
      <FunnelSkeletonLabel width={labelWidth} />
      {variant === "textarea" ? <FunnelSkeletonTextarea /> : <FunnelSkeletonInput />}
    </div>
  )
}

export function FunnelSkeletonChipRow({ count = 5 }: { count?: number }) {
  const widths = ["w-14", "w-20", "w-16", "w-24", "w-[4.5rem]"] as const

  return (
    <div className="flex flex-wrap gap-2" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn("fn-skeleton-chip h-7 rounded-full", widths[i % widths.length])}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  )
}

type ChatBubbleSkeletonVariant = "default" | "withButtons" | "withTextarea"

export function FunnelSkeletonChatBubble({
  variant = "default",
  className,
}: {
  variant?: ChatBubbleSkeletonVariant
  className?: string
}) {
  return (
    <div
      className={cn(
        "fn-screening-bubble flex w-full min-w-0 max-w-[720px] flex-col items-start gap-2",
        className,
      )}
      aria-hidden
    >
      <CoordinatorAvatar
        size={18}
        className="size-[18px] shadow-sm ring-1 ring-white/70"
      />
      <div className="w-full min-w-0 rounded-xl border border-white/50 bg-white/70 p-3 shadow-sm backdrop-blur-sm md:p-4">
        <div className="fn-skeleton-line h-3 w-20 rounded" />
        <div className="mt-3 space-y-2">
          <div className="fn-skeleton-line h-2.5 w-[90%] rounded" style={{ animationDelay: "0.1s" }} />
          <div className="fn-skeleton-line h-2.5 w-[70%] rounded" style={{ animationDelay: "0.2s" }} />
          {variant !== "default" ? (
            <div className="fn-skeleton-line h-2.5 w-[55%] rounded" style={{ animationDelay: "0.3s" }} />
          ) : null}
        </div>
        {variant === "withButtons" ? (
          <div className="mt-3 flex gap-2">
            <div className="fn-skeleton-line h-7 w-12 rounded-lg" style={{ animationDelay: "0.35s" }} />
            <div className="fn-skeleton-line h-7 w-14 rounded-lg" style={{ animationDelay: "0.45s" }} />
          </div>
        ) : null}
        {variant === "withTextarea" ? (
          <div className="mt-3">
            <FunnelSkeletonTextarea className="min-h-[4rem]" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
