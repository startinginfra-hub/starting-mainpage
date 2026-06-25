import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { cn } from "@/lib/utils"
import { JdListPostingCard } from "./jdlist-posting-card"

type JdListPostingGridProps = {
  postings: JdListHomePostingRow[]
  className?: string
}

export function JdListPostingGrid({ postings, className }: JdListPostingGridProps) {
  if (postings.length === 0) {
    return <p className="py-12 text-center text-sm text-muted-foreground">등록된 공고가 없습니다.</p>
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {postings.map((posting) => (
        <JdListPostingCard key={posting.publicNumber} posting={posting} layout="grid" />
      ))}
    </div>
  )
}
