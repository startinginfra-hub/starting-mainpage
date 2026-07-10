import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type CalculatorRowAccent = "bank" | "card"

const ACCENT_STYLES = {
  bank: {
    border: "border-[#1A7CFF]/35",
    gradient: "bg-gradient-to-r from-[#f0f6ff] to-[#f8fbff]",
    shadow: "shadow-[0_4px_16px_rgba(26,124,255,0.06)]",
    label: "text-[#1A7CFF]",
    value: "text-[#1A7CFF]",
    badge: "bg-[#1A7CFF]",
  },
  card: {
    border: "border-[#7C3AED]/35",
    gradient: "bg-gradient-to-r from-[#f3e8ff] to-[#f8f5ff]",
    shadow: "shadow-[0_4px_16px_rgba(124,58,237,0.06)]",
    label: "text-[#7C3AED]",
    value: "text-[#7C3AED]",
    badge: "bg-[#7C3AED]",
  },
} as const

const PRICE_BADGE_BASE =
  "inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-semibold leading-none md:text-[11px]"

const CHEAP_BADGE_CLASS = "border-[#1A7CFF] bg-[#1A7CFF] text-white shadow-sm"

const EXPENSIVE_BADGE_CLASS = "border-[#f5caca] bg-[#fef2f2] text-[#d94848] shadow-none"

export type CalculatorRowPriceRank = "cheapest" | "most_expensive" | null

type Props = {
  label: string
  value: string
  caption?: string
  labelNote?: string
  badge?: ReactNode
  valuePrefix?: string
  variant?: "default" | "featured"
  accent?: CalculatorRowAccent
  priceRank?: CalculatorRowPriceRank
  labelClassName?: string
  valueClassName?: string
  className?: string
}

export function IntroCalculatorRow({
  label,
  value,
  caption,
  labelNote,
  badge,
  valuePrefix,
  variant = "default",
  accent = "bank",
  priceRank = null,
  labelClassName,
  valueClassName,
  className,
}: Props) {
  const isFeatured = variant === "featured"
  const accentStyles = ACCENT_STYLES[accent]

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        isFeatured
          ? cn(accentStyles.border, accentStyles.gradient, accentStyles.shadow)
          : "border-[#e3e8f1] bg-white",
        "max-[380px]:flex max-[380px]:flex-col max-[380px]:gap-2",
        "min-[381px]:grid min-[381px]:grid-cols-[minmax(0,1fr)_auto] min-[381px]:items-center min-[381px]:gap-x-3 min-[381px]:gap-y-0.5",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <p
            className={cn(
              "text-sm font-semibold md:text-[15px]",
              isFeatured ? accentStyles.label : "text-[#0b0f1c]",
              labelClassName,
            )}
          >
            <span className="inline-flex flex-wrap items-baseline gap-x-1 gap-y-0">
              <span>{label}</span>
              {labelNote ? (
                <span className="text-[10px] font-normal leading-none text-[#9aa5b8] md:text-[11px]">
                  ({labelNote})
                </span>
              ) : null}
            </span>
          </p>
          {badge}
          {priceRank === "cheapest" ? (
            <span className={cn(PRICE_BADGE_BASE, CHEAP_BADGE_CLASS)}>가장 저렴</span>
          ) : null}
          {priceRank === "most_expensive" ? (
            <span className={cn(PRICE_BADGE_BASE, EXPENSIVE_BADGE_CLASS)}>가장 비쌈</span>
          ) : null}
        </div>
        {caption ? (
          <p className="mt-0.5 text-[10px] text-[#5d6a82] md:text-[11px]">{caption}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center justify-end gap-1 text-right max-[380px]:w-full max-[380px]:justify-between min-[381px]:whitespace-nowrap">
        {valuePrefix ? (
          <span className="text-[10px] font-bold leading-tight text-[#3f4a60] md:text-[11px]">
            {valuePrefix}
          </span>
        ) : null}
        <span
          className={cn(
            "text-sm font-bold leading-tight tabular-nums text-[#0b0f1c] md:text-[15px]",
            isFeatured && accentStyles.value,
            valueClassName,
          )}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

export function CalculatorDiscountBadge({
  children,
  accent = "bank",
}: {
  children: ReactNode
  accent?: CalculatorRowAccent
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white md:text-[11px]",
        ACCENT_STYLES[accent].badge,
      )}
    >
      {children}
    </span>
  )
}
