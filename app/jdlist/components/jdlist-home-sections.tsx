import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { JdListPostingCarouselSection } from "./jdlist-posting-carousel-section"
import { JdListPostingGridSection } from "./jdlist-posting-grid-section"

type JdListHomeSectionsProps = {
  prepaidPostings: JdListHomePostingRow[]
  initialAllPostings: JdListHomePostingRow[]
  allPostingsTotalCount: number
}

export function JdListHomeSections({
  prepaidPostings,
  initialAllPostings,
  allPostingsTotalCount,
}: JdListHomeSectionsProps) {
  return (
    <>
      <JdListPostingCarouselSection title="적극 채용중인 기업" postings={prepaidPostings} variant="marquee" />
      <JdListPostingGridSection
        title="전체 공고"
        initialPostings={initialAllPostings}
        totalCount={allPostingsTotalCount}
        className="mt-10"
      />
    </>
  )
}
