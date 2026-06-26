import { cn } from "@/lib/utils"

type JdListPostingCardSkeletonProps = {
  layout?: "carousel" | "grid"
  className?: string
}

function JdListPostingCardSkeleton({ layout = "grid", className }: JdListPostingCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex min-h-[11.5rem] flex-col rounded-xl border border-neutral-200/80 bg-white px-4 pt-4",
        layout === "grid" ? "w-full min-w-0" : "w-[340px] shrink-0 md:w-[360px]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-2.5">
          <div className="size-9 shrink-0 animate-pulse rounded-lg bg-neutral-200/70" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200/70" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-100" />
          </div>
        </div>
        <div className="h-5 w-11 shrink-0 animate-pulse rounded-full bg-neutral-100" />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
        <div className="h-3 w-[88%] animate-pulse rounded bg-neutral-100" />
      </div>

      <div className="mt-auto pt-3">
        <div className="flex flex-wrap gap-1.5">
          <div className="h-5 w-14 animate-pulse rounded-md bg-neutral-100" />
          <div className="h-5 w-16 animate-pulse rounded-md bg-neutral-100" />
          <div className="h-5 w-12 animate-pulse rounded-md bg-neutral-100" />
        </div>
        <div className="mt-3 border-t border-neutral-100/80 py-3">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
        </div>
      </div>
    </div>
  )
}

export function JdListPageSkeleton() {
  return (
    <div aria-hidden>
      <div className="relative">
        <div className="relative aspect-[2/1] max-h-[330px] min-h-[9rem] w-full animate-pulse overflow-hidden rounded-2xl bg-neutral-200/70 md:aspect-[21/9] md:min-h-[11rem]" />
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="size-2 rounded-full bg-neutral-300/80" />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <section>
          <div className="mb-4 h-7 w-40 animate-pulse rounded-md bg-neutral-200/80" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 3 }, (_, index) => (
              <JdListPostingCardSkeleton key={index} layout="carousel" />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 h-7 w-24 animate-pulse rounded-md bg-neutral-200/80" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <JdListPostingCardSkeleton key={index} layout="grid" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
