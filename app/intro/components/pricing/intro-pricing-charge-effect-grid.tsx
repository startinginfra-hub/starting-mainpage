import { formatPricingManwon } from "./intro-pricing-constants"
import type { CalculatorRowAccent } from "./intro-calculator-row"
import { cn } from "@/lib/utils"

type Props = {
  hireCapacity: number
  perHireAmountManwon: number
  accent?: CalculatorRowAccent
}

const ACCENT_VALUE = {
  bank: "text-[#1A7CFF]",
  card: "text-[#7C3AED]",
} as const

const VALUE_CLASS = "text-lg font-bold leading-tight tracking-tight tabular-nums md:text-xl"

function EffectCell({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: CalculatorRowAccent
}) {
  return (
    <article className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[#e3e8f1] bg-white px-2 py-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] md:gap-1.5 md:px-3 md:py-3">
      <p className="text-center text-[11px] font-semibold leading-tight text-[#0b0f1c] md:text-xs">
        {label}
      </p>
      <p className={cn("text-center", VALUE_CLASS, ACCENT_VALUE[accent])}>{value}</p>
    </article>
  )
}

export function IntroPricingChargeEffectGrid({
  hireCapacity,
  perHireAmountManwon,
  accent = "bank",
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2.5 md:gap-3">
      <EffectCell
        label="채용 가능 인원"
        value={`${hireCapacity.toLocaleString("ko-KR")}명`}
        accent={accent}
      />
      <EffectCell
        label="1명당 환산 비용"
        value={formatPricingManwon(Math.round(perHireAmountManwon))}
        accent={accent}
      />
      <EffectCell label="사용기한" value="무제한" accent={accent} />
    </div>
  )
}
