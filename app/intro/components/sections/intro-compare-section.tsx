"use client"

import { StartingWordmark } from "@/app/components/starting-wordmark"
import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { useInView } from "@/lib/intro/use-in-view"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const COMPARE_COLUMNS = [
  { id: "platform", label: "채용 플랫폼", featured: false },
  { id: "starting", label: "스타팅", featured: true },
  { id: "searchfirm", label: "서치펌 헤드헌팅", featured: false },
] as const

type TextCell = string | { lines: readonly string[] }

type CompareRow =
  | {
      id: string
      label: string
      labelCaption?: string
      variant: "text"
      cells: readonly [TextCell, TextCell, TextCell]
    }
  | {
      id: string
      label: string
      variant: "fee"
    }

const FEE_CELLS = [
  { amount: "350만 원", caption: "연봉 7%" },
  { amount: "300만 원", caption: "정찰제" },
  { amount: "750만 원~1,500만 원", caption: "연봉 15~30%" },
] as const

const COMPARE_ROWS: readonly CompareRow[] = [
  {
    id: "workload",
    label: "수행 방식",
    labelCaption: "(서치, 설득, 필터링)",
    variant: "text",
    cells: ["직접", "대행", "대행"],
  },
  {
    id: "filtering",
    label: "소싱·필터링",
    variant: "text",
    cells: [
      "다수 지원자 직접 걸러냄",
      {
        lines: ["1차 : 조건 기반 AI 필터링", "2차 : 헤드헌터 추가 검증"],
      },
      "매니저 단독 검증",
    ],
  },
  {
    id: "deliverable",
    label: "매칭 특징",
    variant: "text",
    cells: [
      "필터 없이 다수 인재 유입",
      "핏한 인재 소수 매칭",
      "핏한 인재 소수 매칭",
    ],
  },
  {
    id: "burden",
    label: "비용 특징",
    variant: "text",
    cells: [
      "연봉 오를수록 수수료 증가",
      "연봉 무관 정찰제",
      "연봉 오를수록 수수료 증가",
    ],
  },
  {
    id: "payment-timing",
    label: "결제 시점",
    variant: "text",
    cells: ["입사 후 결제", "입사 후 결제", "입사 후 결제"],
  },
  {
    id: "fee",
    label: "수수료",
    variant: "fee",
  },
] as const

const LABEL_BG = "bg-[#f8fafc]"
const CONTENT_BG = "bg-white"
const FEE_ROW_STYLE = "bg-[#1A7CFF] text-white"

function splitTrailingParenthesis(text: string) {
  const match = text.match(/^(.+?)\s*(\([^)]+\))\s*$/)
  if (!match) return { main: text, caption: undefined as string | undefined }
  return { main: match[1].trimEnd(), caption: match[2] }
}

function CompareTextCell({ cell, featured }: { cell: TextCell; featured: boolean }) {
  const mainClass = cn(
    featured
      ? "w-full text-xs font-semibold leading-relaxed text-[#0b0f1c] md:text-base"
      : "w-full text-[11px] leading-relaxed text-[#5d6a82] md:text-sm",
  )
  const captionClass = "w-full text-[10px] leading-snug text-[#5d6a82] md:text-xs"

  if (typeof cell === "string") {
    const { main, caption } = splitTrailingParenthesis(cell)
    if (!caption) {
      return <p className={mainClass}>{main}</p>
    }

    return (
      <div className="flex w-full flex-col gap-1">
        <p className={mainClass}>{main}</p>
        <p className={captionClass}>{caption}</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-1">
      {cell.lines.map((line) => (
        <p key={line} className={mainClass}>
          {line}
        </p>
      ))}
    </div>
  )
}

function CompareRowHeader({
  label,
  caption,
  isFeeRow,
}: {
  label: string
  caption?: string
  isFeeRow: boolean
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1">
      <span
        className={cn(
          "text-xs font-medium text-[#0b0f1c] md:text-sm",
          isFeeRow && "text-xs font-semibold text-white md:text-base",
        )}
      >
        {label}
      </span>
      {caption ? (
        <span
          className={cn(
            "text-[10px] leading-snug md:text-xs",
            isFeeRow ? "text-white/80" : "text-[#5d6a82]",
          )}
        >
          {caption}
        </span>
      ) : null}
    </div>
  )
}

const ROW_STEP_DELAY_MS = 90
const FEE_POP_EXTRA_DELAY_MS = 160

function compareRowReveal(inView: boolean, reducedMotion: boolean) {
  return cn(
    "intro-compare-row-reveal",
    (inView || reducedMotion) && "intro-compare-row-reveal-visible",
  )
}

function compareRowStyle(delayMs: number, reducedMotion: boolean) {
  if (reducedMotion) return undefined
  return { transitionDelay: `${delayMs}ms` }
}

function CompareMatrix() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const reducedMotion = usePrefersReducedMotion()
  const revealed = inView || reducedMotion

  return (
    <div
      ref={ref}
      className="intro-compare-scroll w-full max-w-full overflow-x-auto overflow-y-clip overscroll-x-contain md:overflow-visible"
    >
      <table className="intro-compare-table min-w-[460px] md:min-w-0">
        <caption className="sr-only">
          채용 플랫폼, 스타팅, 서치펌 헤드헌팅 비교
        </caption>
        <colgroup>
          <col className="w-[84px] md:w-[152px]" />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr
            className={compareRowReveal(revealed, reducedMotion)}
            style={compareRowStyle(0, reducedMotion)}
          >
            <th
              className={cn(
                "intro-compare-sticky-label intro-compare-sticky-corner sticky top-0 left-0 z-40 p-3 md:p-5",
                LABEL_BG,
              )}
              aria-hidden
            />
            {COMPARE_COLUMNS.map((col) => (
              <th
                key={col.id}
                className={cn(
                  "sticky top-0 z-30 px-3 py-3.5 text-center md:px-5 md:py-5",
                  CONTENT_BG,
                  col.featured && revealed && "intro-compare-featured-col",
                )}
              >
                {col.featured ? (
                  <div className="flex min-h-6 items-center justify-center md:min-h-8">
                    <StartingWordmark
                      href={null}
                      variant="wordmark"
                      className="justify-center [&_img]:!block [&_img]:!h-5 [&_img]:!w-auto [&_img]:-translate-y-px md:[&_img]:!h-7 md:[&_img]:-translate-y-0.5"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-6 items-center justify-center md:min-h-8">
                    <p className="text-xs font-semibold leading-snug text-[#0b0f1c] md:text-sm">
                      {col.label}
                    </p>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row, rowIndex) => {
            const isFeeRow = row.variant === "fee"
            const rowDelay = (rowIndex + 1) * ROW_STEP_DELAY_MS

            return (
              <tr
                key={row.id}
                className={cn(
                  isFeeRow && "intro-compare-fee-row",
                  compareRowReveal(revealed, reducedMotion),
                )}
                style={compareRowStyle(rowDelay, reducedMotion)}
              >
                <th
                  scope="row"
                  className={cn(
                    "intro-compare-sticky-label sticky left-0 z-20 p-3 text-center font-normal md:static md:p-5",
                    isFeeRow
                      ? cn(FEE_ROW_STYLE, "intro-compare-fee-sticky py-3.5 md:py-6")
                      : LABEL_BG,
                  )}
                >
                  <CompareRowHeader
                    label={row.label}
                    isFeeRow={isFeeRow}
                    caption={
                      isFeeRow
                        ? "연봉 5,000만 원 기준"
                        : row.variant === "text"
                          ? row.labelCaption
                          : undefined
                    }
                  />
                </th>

                {row.variant === "fee"
                  ? FEE_CELLS.map((feeCell, colIndex) => (
                      <td
                        key={`${row.id}-${COMPARE_COLUMNS[colIndex].id}`}
                        className={cn(
                          "px-3 py-3.5 text-center md:px-5 md:py-6",
                          FEE_ROW_STYLE,
                        )}
                      >
                        <div className="flex w-full flex-col items-center gap-1">
                          <p
                            className={cn(
                              "font-bold tracking-tight text-white",
                              colIndex === 1
                                ? "text-base md:text-xl"
                                : "text-sm md:text-lg",
                              revealed && !reducedMotion && "intro-compare-fee-amount-pop",
                            )}
                            style={
                              reducedMotion
                                ? undefined
                                : { animationDelay: `${rowDelay + FEE_POP_EXTRA_DELAY_MS}ms` }
                            }
                          >
                            {feeCell.amount}
                          </p>
                          <p className="text-[10px] leading-snug text-white/80 md:text-xs">
                            {feeCell.caption}
                          </p>
                        </div>
                      </td>
                    ))
                  : row.cells.map((cell, colIndex) => {
                      const col = COMPARE_COLUMNS[colIndex]

                      return (
                        <td
                          key={`${row.id}-${col.id}`}
                          className={cn(
                            "px-3 py-3 text-center md:px-5 md:py-5",
                            CONTENT_BG,
                            col.featured && revealed && "intro-compare-featured-col",
                          )}
                        >
                          <CompareTextCell cell={cell} featured={col.featured} />
                        </td>
                      )
                    })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <p
        className={cn(
          "mt-3 text-center text-xs text-[#94a3b8] md:hidden",
          compareRowReveal(revealed, reducedMotion),
        )}
        style={compareRowStyle(
          (COMPARE_ROWS.length + 1) * ROW_STEP_DELAY_MS,
          reducedMotion,
        )}
      >
        좌우로 밀어서 비교
      </p>
    </div>
  )
}

export function IntroCompareSection() {
  return (
    <IntroSection className="relative" innerClassName="relative">
      <IntroReveal>
        <IntroSectionHeading
          title="헤드헌팅 솔루션은 무엇이 다른가요?"
          subtitle="채용 플랫폼, 서치펌 헤드헌팅과 어떻게 다른지 한눈에 비교해봤어요."
          className="mb-6 max-md:[&_p]:text-xs md:mb-12"
        />
      </IntroReveal>
      <CompareMatrix />
    </IntroSection>
  )
}
