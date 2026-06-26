import Link from "next/link"
import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { cn } from "@/lib/utils"
import { JdListInfinitePostingGrid } from "./jdlist-infinite-posting-grid"

type JdListPostingGridSectionProps = {
  title: string
  initialPostings: JdListHomePostingRow[]
  totalCount: number
  seeMoreHref?: string
  className?: string
}

export function JdListPostingGridSection({
  title,
  initialPostings,
  totalCount,
  seeMoreHref,
  className,
}: JdListPostingGridSectionProps) {
  return (
    <section className={cn(className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {seeMoreHref ? (
          <Link href={seeMoreHref} className="shrink-0 text-sm font-medium text-[#1A7CFF] hover:text-[#126FE3]">
            더 보기
          </Link>
        ) : null}
      </div>

      <JdListInfinitePostingGrid initialPostings={initialPostings} totalCount={totalCount} />
    </section>
  )
}
