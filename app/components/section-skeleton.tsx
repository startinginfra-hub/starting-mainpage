import { cn } from "@/lib/utils"

type SectionSkeletonProps = {
  className?: string
  rows?: number
}

export function SectionSkeleton({ className, rows = 3 }: SectionSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-4 px-4 py-12 md:px-8", className)} aria-hidden>
      <div className="mx-auto h-8 w-48 rounded-md bg-neutral-200/80" />
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="h-40 rounded-xl bg-neutral-200/60" />
        ))}
      </div>
    </div>
  )
}
