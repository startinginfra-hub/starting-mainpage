"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { JdListPostingCard } from "@/app/jdlist/components/jdlist-posting-card"
import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"

type IntroActivePostingsSectionContentProps = {
  postings: JdListHomePostingRow[]
}

const PEEK_VISIBLE_ROWS = 3

function getGridColumns(width: number) {
  if (width >= 1024) return 3
  if (width >= 640) return 2
  return 1
}

function getRowCount(postingCount: number, columns: number) {
  return Math.ceil(postingCount / columns)
}

function useActivePostingsLayout(postingCount: number) {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const update = () => setColumns(getGridColumns(window.innerWidth))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const rowCount = getRowCount(postingCount, columns)
  const hasPeek = rowCount > PEEK_VISIBLE_ROWS

  return { hasPeek }
}

function ActivePostingsGrid({ postings }: { postings: JdListHomePostingRow[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {postings.map((posting, index) => (
        <IntroReveal key={posting.publicNumber} delayMs={120 + index * 80}>
          <JdListPostingCard posting={posting} layout="grid" />
        </IntroReveal>
      ))}
    </div>
  )
}

export function IntroActivePostingsSectionContent({ postings }: IntroActivePostingsSectionContentProps) {
  const { hasPeek } = useActivePostingsLayout(postings.length)

  return (
    <IntroSection className="bg-white">
      <IntroReveal>
        <IntroSectionHeading title="현재 다양한 포지션이 진행되고 있어요" />
      </IntroReveal>

      {hasPeek ? (
        <div className="intro-active-postings-grid-mask">
          <div className="intro-active-postings-grid-inner">
            <ActivePostingsGrid postings={postings} />
          </div>
        </div>
      ) : (
        <ActivePostingsGrid postings={postings} />
      )}

      <IntroReveal delayMs={120 + postings.length * 80}>
        <div className="mt-10 text-center">
          <Link
            href="/jdlist"
            className="inline-flex items-center gap-0.5 text-xs font-medium text-[#5d6a82] transition-colors hover:text-[#3f4a60] md:text-sm"
          >
            전체 공고 보기
            <ChevronRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </div>
      </IntroReveal>
    </IntroSection>
  )
}
