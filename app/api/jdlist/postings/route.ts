import { JDLIST_LIST_SCROLL_BATCH_SIZE } from "@/lib/jdlist/jdlist-list-config"
import { loadJdListAllPostings } from "@/lib/jdlist/load-jdlist-home-postings"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const offset = Math.max(0, Number(searchParams.get("offset") ?? 0))
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get("limit") ?? JDLIST_LIST_SCROLL_BATCH_SIZE)),
  )

  const { rows, totalCount } = await loadJdListAllPostings({ bucket: "all" })

  return Response.json({
    rows: rows.slice(offset, offset + limit),
    totalCount,
    offset,
    limit,
  })
}
