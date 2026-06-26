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
  initialPostings: JdListHomePostingRow[]
  totalCount: number
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
  initialPostings,
  totalCount,
  batchSize = JDLIST_LIST_SCROLL_BATCH_SIZE,
  className,
}: JdListInfinitePostingGridProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [postings, setPostings] = useState(initialPostings)
  const [isFetching, setIsFetching] = useState(false)
  const [visibleCount, setVisibleCount] = useState(() =>
    initialPostings.length === 0 ? 0 : Math.min(batchSize, initialPostings.length),
  )

  useEffect(() => {
    setPostings(initialPostings)
    setVisibleCount(
      initialPostings.length === 0 ? 0 : Math.min(batchSize, initialPostings.length),
    )
  }, [initialPostings, batchSize])

  const loopedPostings = useMemo(
    () => buildLoopedPostings(postings, visibleCount),
    [postings, visibleCount],
  )

  const fetchMorePostings = useCallback(async () => {
    if (isFetching || postings.length >= totalCount) return

    setIsFetching(true)
    try {
      const response = await fetch(
        `/api/jdlist/postings?offset=${postings.length}&limit=${batchSize}`,
      )
      if (!response.ok) return

      const data = (await response.json()) as {
        rows: JdListHomePostingRow[]
      }

      if (data.rows.length === 0) return

      setPostings((current) => [...current, ...data.rows])
    } finally {
      setIsFetching(false)
    }
  }, [batchSize, isFetching, postings.length, totalCount])

  const loadMore = useCallback(() => {
    if (postings.length === 0) return

    if (visibleCount < postings.length) {
      setVisibleCount((current) => current + batchSize)
      return
    }

    if (postings.length < totalCount) {
      void fetchMorePostings().then(() => {
        setVisibleCount((current) => current + batchSize)
      })
      return
    }

    setVisibleCount((current) => current + batchSize)
  }, [batchSize, fetchMorePostings, postings.length, totalCount, visibleCount])

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
      {isFetching ? (
        <p className="py-2 text-center text-xs text-muted-foreground" aria-live="polite">
          공고를 불러오는 중…
        </p>
      ) : null}
    </div>
  )
}
