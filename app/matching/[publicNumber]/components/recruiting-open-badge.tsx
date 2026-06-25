import { cn } from "@/lib/utils"

type PostingRecruitmentBadgeProps = {
  status: string
  size?: "default" | "sm"
}

/** 공개 매칭·형제 공고 카드용 채용 상태 pill */
export function PostingRecruitmentBadge({ status, size = "default" }: PostingRecruitmentBadgeProps) {
  const isSmall = size === "sm"

  if (status === "closed") {
    return (
      <span
        role="status"
        aria-label="마감"
        className={cn(
          "inline-flex shrink-0 items-center font-medium text-gray-500",
          isSmall
            ? "rounded-md bg-neutral-100 px-2 py-0.5 text-[11px]"
            : "rounded-full bg-gray-100 px-3 py-1 text-xs",
        )}
      >
        마감
      </span>
    )
  }

  return (
    <span
      role="status"
      aria-label="채용 중"
      className={cn(
        "inline-flex shrink-0 items-center bg-[#1A7CFF]/11",
        isSmall ? "gap-1 rounded-md px-2 py-0.5" : "gap-1.5 rounded-full px-3 py-1",
      )}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center",
          isSmall ? "size-1.5" : "size-2",
        )}
        aria-hidden
      >
        <span className="absolute inline-flex size-full rounded-full bg-[#1A7CFF]/40 motion-safe:animate-ping motion-reduce:animate-none" />
        <span className={cn("relative rounded-full bg-[#1A7CFF]", isSmall ? "size-1" : "size-1.5")} />
      </span>
      <span className={cn("font-medium text-[#1260cf]", isSmall ? "text-[11px]" : "text-xs")}>채용중</span>
    </span>
  )
}

/** @deprecated PostingRecruitmentBadge 사용 */
export function RecruitingOpenBadge() {
  return <PostingRecruitmentBadge status="open" />
}
