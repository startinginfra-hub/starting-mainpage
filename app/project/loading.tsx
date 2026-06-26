import { SectionSkeleton } from "@/app/components/section-skeleton"

export default function ProjectLoading() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse rounded-2xl bg-neutral-200/70 p-8" aria-hidden>
        <div className="h-8 w-2/3 rounded-md bg-neutral-300/60" />
        <div className="mt-4 h-4 w-full max-w-xl rounded-md bg-neutral-300/50" />
      </div>
      <SectionSkeleton rows={3} className="py-0" />
    </div>
  )
}
