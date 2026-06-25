import Link from "next/link"
import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { cn } from "@/lib/utils"
import { JdListHorizontalScrollRow } from "./jdlist-horizontal-scroll-row"
import { JdListPostingMarqueeRow } from "./jdlist-posting-marquee-row"
import { JdListPostingCard } from "./jdlist-posting-card"

type JdListPostingCarouselSectionProps = {
  title: string
  postings: JdListHomePostingRow[]
  seeMoreHref?: string
  variant?: "scroll" | "marquee"
  className?: string
}

export function JdListPostingCarouselSection({
  title,
  postings,
  seeMoreHref,
  variant = "scroll",
  className,
}: JdListPostingCarouselSectionProps) {
  const useMarquee = variant === "marquee" && postings.length >= 2

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

      {postings.length === 0 ? (
        <p className="py-8 text-sm text-muted-foreground">등록된 공고가 없습니다.</p>
      ) : useMarquee ? (
        <JdListPostingMarqueeRow postings={postings} />
      ) : variant === "marquee" ? (
        <div className="flex gap-3">
          {postings.map((posting) => (
            <JdListPostingCard key={posting.publicNumber} posting={posting} />
          ))}
        </div>
      ) : (
        <JdListHorizontalScrollRow>
          {postings.map((posting) => (
            <JdListPostingCard key={posting.publicNumber} posting={posting} />
          ))}
        </JdListHorizontalScrollRow>
      )}
    </section>
  )
}
