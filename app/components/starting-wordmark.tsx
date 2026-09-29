"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

type StartingWordmarkProps = {
  /** `null`이면 링크 없이 표시만 합니다. */
  href?: string | null
  /** `href`가 없을 때 클릭 동작(예: 같은 페이지 최상단으로). */
  onClick?: () => void
  className?: string
  /** `icon`: 심볼 로고, `wordmark`: 텍스트 로고(기본), `both`: 심볼 + 텍스트 */
  variant?: "icon" | "wordmark" | "both"
  /** `onDark`: 어두운 배경용 흰색 텍스트 로고 */
  tone?: "default" | "onDark"
  /** 클라이언트 라우팅 대신 문서 전체를 새로 불러옵니다. */
  reloadDocument?: boolean
}

export function StartingWordmark({
  href = "/",
  onClick,
  className,
  variant = "wordmark",
  tone = "default",
  reloadDocument = false,
}: StartingWordmarkProps) {
  const interactiveClassName = [
    "group rounded-md outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#1A7CFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ]

  const classNames = cn(
    "inline-flex shrink-0 items-center",
    variant === "both" && "gap-1.5",
    href != null && interactiveClassName,
    href == null && onClick != null && ["cursor-pointer", ...interactiveClassName],
    className,
  )

  const content = (
    <>
      <span className="sr-only">Starting</span>
      {(variant === "icon" || variant === "both") && (
        /* eslint-disable-next-line @next/next/no-img-element -- 정적 브랜드 SVG */
        <img
          src="/starting-logo-round.svg"
          alt=""
          className="pointer-events-none block size-8 shrink-0 select-none md:size-9"
        />
      )}
      {(variant === "wordmark" || variant === "both") && (
        /* eslint-disable-next-line @next/next/no-img-element -- 정적 브랜드 SVG */
        <img
          src={tone === "onDark" ? "/starting-text-white.svg" : "/starting-text-black.svg"}
          alt=""
          className="pointer-events-none block h-[22px] w-auto select-none md:h-[26px]"
        />
      )}
    </>
  )

  if (href == null) {
    if (onClick) {
      return (
        <button type="button" onClick={onClick} className={classNames} aria-label="페이지 최상단으로">
          {content}
        </button>
      )
    }

    return <span className={classNames}>{content}</span>
  }

  if (reloadDocument) {
    return (
      <a href={href} className={classNames}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  )
}
