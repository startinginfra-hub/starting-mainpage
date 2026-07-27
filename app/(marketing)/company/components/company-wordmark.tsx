import { cn } from "@/lib/utils"

type CompanyWordmarkProps = {
  /** dark hero 위 등 — 흰 글자 버전, i점 블루 유지 */
  inverted?: boolean
  className?: string
}

/**
 * 회사 워드마크 Starting
 * 제공 로고 기반 PNG — 검정/흰색 전환 시 i점 블루 유지
 */
export function CompanyWordmark({ inverted = false, className }: CompanyWordmarkProps) {
  const src = inverted
    ? "/company/assets/company-wordmark-white.png"
    : "/company/assets/company-wordmark-black.png"

  return (
    // eslint-disable-next-line @next/next/no-img-element -- 회사 워드마크
    <img
      src={src}
      alt="Starting"
      width={300}
      height={85}
      className={cn("pointer-events-none h-5 w-auto select-none md:h-6", className)}
      decoding="async"
    />
  )
}
