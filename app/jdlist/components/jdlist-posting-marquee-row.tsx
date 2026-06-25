"use client"

import { useState } from "react"
import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { cn } from "@/lib/utils"
import { JdListPostingCard } from "./jdlist-posting-card"

type JdListPostingMarqueeRowProps = {
  postings: JdListHomePostingRow[]
  className?: string
}

function MarqueeTrack({
  postings,
  keyPrefix,
  hidden,
}: {
  postings: JdListHomePostingRow[]
  keyPrefix: string
  hidden?: boolean
}) {
  return (
    <div
      className={cn("flex shrink-0 items-stretch gap-3 pr-3", hidden && "pointer-events-none")}
      aria-hidden={hidden || undefined}
    >
      {postings.map((posting) => (
        <JdListPostingCard key={`${keyPrefix}${posting.publicNumber}`} posting={posting} />
      ))}
    </div>
  )
}

export function JdListPostingMarqueeRow({ postings, className }: JdListPostingMarqueeRowProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className={cn("jdlist-marquee-row relative z-0 w-full overflow-hidden jdlist-marquee-fade", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
    >
      <div
        className="jdlist-marquee-track"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        <MarqueeTrack postings={postings} keyPrefix="" />
        <MarqueeTrack postings={postings} keyPrefix="dup-" hidden />
      </div>
    </div>
  )
}
