import { cn } from "@/lib/utils"

type KosmeClosedCtaButtonProps = {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function KosmeClosedCtaButton({ className, size = "md" }: KosmeClosedCtaButtonProps) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label="모집 종료"
      className={cn(
        "inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-[#f97316] font-semibold text-white opacity-60",
        size === "sm" && "min-h-9 px-3.5 py-2 text-xs sm:min-h-0 sm:px-4",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className,
      )}
    >
      모집 종료
    </button>
  )
}
