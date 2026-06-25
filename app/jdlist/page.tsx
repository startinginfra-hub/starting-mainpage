import type { Metadata } from "next"
import { JdListHeroBannerCarousel } from "./components/jdlist-hero-banner-carousel"
import { JdListHomeSections } from "./components/jdlist-home-sections"
import { loadJdListAllPostings, loadJdListHomePostings } from "@/lib/jdlist/load-jdlist-home-postings"

export const metadata: Metadata = {
  title: "채용 공고",
}

export default async function JdListHomePage() {
  const [{ prepaidPostings }, { rows: allPostings }] = await Promise.all([
    loadJdListHomePostings(),
    loadJdListAllPostings({ bucket: "all" }),
  ])

  return (
    <>
      <JdListHeroBannerCarousel />
      <div className="mt-8">
        <JdListHomeSections prepaidPostings={prepaidPostings} allPostings={allPostings} />
      </div>
    </>
  )
}
