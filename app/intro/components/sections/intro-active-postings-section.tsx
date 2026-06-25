import {
  LANDING_ACTIVE_POSTINGS_LIMIT,
  loadJdListAllPostings,
} from "@/lib/jdlist/load-jdlist-home-postings"
import { IntroActivePostingsSectionContent } from "./intro-active-postings-section-content"

export async function IntroActivePostingsSection() {
  const { rows } = await loadJdListAllPostings({ bucket: "all" })
  const postings = rows.slice(0, LANDING_ACTIVE_POSTINGS_LIMIT)

  if (postings.length === 0) {
    return null
  }

  return <IntroActivePostingsSectionContent postings={postings} />
}
