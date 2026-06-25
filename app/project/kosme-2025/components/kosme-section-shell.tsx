import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** 랜딩 본문 공통 최대 너비 (섹션 배경은 풀폭, 콘텐츠만 중앙 정렬) */
export const kosmeLandingContentClassName = "mx-auto w-full max-w-[1180px] px-4 md:px-8 lg:px-10"

type KosmeSectionShellProps = {
  children: ReactNode
  className?: string
  innerClassName?: string
  id?: string
}

export function KosmeSectionShell({ children, className, innerClassName, id }: KosmeSectionShellProps) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      <div className={cn(kosmeLandingContentClassName, innerClassName)}>{children}</div>
    </section>
  )
}
