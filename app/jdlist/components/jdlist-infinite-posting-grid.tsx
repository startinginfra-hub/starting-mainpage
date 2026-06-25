"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { JDLIST_LIST_SCROLL_BATCH_SIZE } from "@/lib/jdlist/jdlist-list-config"
import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { cn } from "@/lib/utils"
import { JdListPostingCard } from "./jdlist-posting-card"

type LoopedPostingItem = {
  key: string
  posting: JdListHomePostingRow
}

type JdListInfinitePostingGridProps = {
  postings: JdListHomePostingRow[]
  batchSize?: number
  className?: string
}

function buildLoopedPostings(postings: JdListHomePostingRow[], visibleCount: number): LoopedPostingItem[] {
  const length = postings.length
  if (length === 0) return []

  return Array.from({ length: visibleCount }, (_, index) => {
    const posting = postings[index % length]!
    return {
      key: `${Math.floor(index / length)}-${index}-${posting.publicNumber}`,
      posting,
    }
  })
}

export function JdListInfinitePostingGrid({
  postings,
  batchSize = JDLIST_LIST_SCROLL_BATCH_SIZE,
  className,
}: JdListInfinitePostingGridProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(() =>
    postings.length === 0 ? 0 : Math.min(batchSize, postings.length),
  )

  useEffect(() => {
    setVisibleCount(postings.length === 0 ? 0 : Math.min(batchSize, postings.length))
  }, [postings, batchSize])

  const loopedPostings = useMemo(
    () => buildLoopedPostings(postings, visibleCount),
    [postings, visibleCount],
  )

  const loadMore = useCallback(() => {
    if (postings.length === 0) return
    setVisibleCount((current) => current + batchSize)
  }, [batchSize, postings.length])

  useEffect(() => {
    if (postings.length === 0) return

    const node = sentinelRef.current
    if (!node) return

    const root = document.querySelector("main[data-app-main]")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) loadMore()
      },
      {
        root: root instanceof Element ? root : null,
        rootMargin: "320px 0px",
        threshold: 0,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore, postings.length])

  if (postings.length === 0) {
    return <p className="py-12 text-center text-sm text-muted-foreground">등록된 공고가 없습니다.</p>
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loopedPostings.map(({ key, posting }) => (
          <JdListPostingCard key={key} posting={posting} layout="grid" />
        ))}
      </div>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />
    </div>
  )
}
