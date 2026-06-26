import type { Metadata } from "next"
import { JdListHeroBannerCarousel } from "./components/jdlist-hero-banner-carousel"
import { JdListHomeSections } from "./components/jdlist-home-sections"
import { JDLIST_INITIAL_CLIENT_BATCH } from "@/lib/jdlist/jdlist-list-config"
import { loadJdListAllPostings, loadJdListHomePostings } from "@/lib/jdlist/load-jdlist-home-postings"

export const metadata: Metadata = {
  title: "채용 공고",
}

export default async function JdListHomePage() {
  const [{ prepaidPostings }, { rows: allPostings, totalCount }] = await Promise.all([
    loadJdListHomePostings(),
    loadJdListAllPostings({ bucket: "all" }),
  ])

  return (
    <>
      <JdListHeroBannerCarousel />
      <div className="mt-8">
        <JdListHomeSections
          prepaidPostings={prepaidPostings}
          initialAllPostings={allPostings.slice(0, JDLIST_INITIAL_CLIENT_BATCH)}
          allPostingsTotalCount={totalCount}
        />
      </div>
    </>
  )
}
