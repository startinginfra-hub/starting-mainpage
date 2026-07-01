"use client"

import Image from "next/image"
import Link from "next/link"
import { PostingRecruitmentBadge } from "@/app/matching/[publicNumber]/components/recruiting-open-badge"
import type { JdListHomePostingRow } from "@/lib/jdlist/load-jdlist-home-postings"
import {
  getInvestmentStageBadgeClassName,
  getInvestmentStageBadgeLabel,
} from "@/lib/investment/investment-stage-badge"
import { cn } from "@/lib/utils"
import { useJdListDragScrollClickGuard } from "./jdlist-horizontal-scroll-row"

const MATCHING_DETAIL_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://app.starting.kr"

function JdListCompanyLogo({ logoUrl, name }: { logoUrl: string | null; name: string }) {
  if (logoUrl) {
    return (
      <div className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-neutral-200/80 bg-white">
        <Image src={logoUrl} alt={`${name} 로고`} fill className="object-contain p-1" sizes="36px" />
      </div>
    )
  }

  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1A7CFF] text-sm font-bold text-white">
      {name.charAt(0) || "S"}
    </div>
  )
}

function buildCompanyMetaLine(posting: JdListHomePostingRow): string {
  return [posting.companyName, posting.careerLabel].filter(Boolean).join(" · ")
}

type JdListPostingCardProps = {
  posting: JdListHomePostingRow
  className?: string
  layout?: "carousel" | "grid"
}

export function JdListPostingCard({ posting, className, layout = "carousel" }: JdListPostingCardProps) {
  const consumeClickSuppression = useJdListDragScrollClickGuard()
  const companyMetaLine = buildCompanyMetaLine(posting)
  const investmentStageLabel = getInvestmentStageBadgeLabel(posting.investmentStage)
  const investmentStageClassName = getInvestmentStageBadgeClassName(posting.investmentStage)

  return (
    <Link
      href={`${MATCHING_DETAIL_BASE_URL}/matching/${posting.publicNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className={cn(
        "group flex h-full min-h-[11.5rem] flex-col rounded-xl border border-neutral-200/80 bg-white px-4 pt-4 pb-0 transition-[border-color] hover:border-[#1A7CFF]/25",
        layout === "grid" ? "w-full min-w-0" : "w-[340px] shrink-0 md:w-[360px]",
        className,
      )}
      onClick={(event) => {
        if (consumeClickSuppression?.()) {
          event.preventDefault()
        }
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-2.5">
          <JdListCompanyLogo logoUrl={posting.companyLogoUrl} name={posting.companyName} />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-[#126FE3]">
              {posting.title}
            </p>
            {companyMetaLine ? (
              <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">{companyMetaLine}</p>
            ) : null}
          </div>
        </div>
        <PostingRecruitmentBadge status="open" size="sm" />
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        {posting.companyIntro ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{posting.companyIntro}</p>
        ) : null}
        <div className={cn("flex-1 min-h-0", posting.companyIntro ? "mt-3" : null)} aria-hidden />
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {investmentStageLabel && investmentStageClassName ? (
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[11px] font-medium",
                  investmentStageClassName,
                )}
              >
                {investmentStageLabel}
              </span>
            ) : null}
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
              상시 채용
            </span>
            {posting.contractType ? (
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                {posting.contractType}
              </span>
            ) : null}
            {posting.workAddressShort ? (
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                {posting.workAddressShort}
              </span>
            ) : null}
          </div>
          <p className="mt-3 border-t border-neutral-100/80 py-3 text-[11px] leading-snug text-muted-foreground">
            담당 헤드헌터의 검토를 통과한 인재만 매칭받고 있어요.
          </p>
        </div>
      </div>
    </Link>
  )
}
