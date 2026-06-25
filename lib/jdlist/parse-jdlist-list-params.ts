import type { JdListBucketFilter } from "@/lib/jdlist/load-jdlist-home-postings"

export function parseJdListBucketFilter(raw: string | undefined): JdListBucketFilter {
  if (raw === "it" || raw === "other") return raw
  return "all"
}
