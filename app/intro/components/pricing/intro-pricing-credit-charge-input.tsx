"use client"

import { Minus, Plus } from "lucide-react"
import {
  CREDIT_CHARGE_STEP,
  clampCreditChargeCredits,
  formatCreditChargeInput,
  MIN_CREDIT_CHARGE_CREDITS,
} from "./intro-pricing-constants"
import { cn } from "@/lib/utils"

type Props = {
  credits: number
  onChange: (credits: number) => void
  className?: string
}

export function IntroPricingCreditChargeInput({ credits, onChange, className }: Props) {
  const adjustCredits = (delta: number) => {
    onChange(clampCreditChargeCredits(credits + delta))
  }

  const buttonClassName =
    "flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e3e8f1] bg-white text-[#5d6a82] transition-colors hover:border-[#1A7CFF]/35 hover:text-[#1A7CFF] disabled:cursor-not-allowed disabled:opacity-40"

  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xs font-medium text-[#5d6a82]">
          충전 크레딧
        </span>
        <div
          className="flex h-10 w-full items-center rounded-xl border border-[#e3e8f1] bg-[#fbfcfe] py-2 pr-12 pl-[5.75rem]"
          aria-live="polite"
          aria-label={`충전 크레딧 ${formatCreditChargeInput(credits)}`}
        >
          <p className="ml-auto text-right text-base font-semibold tabular-nums text-[#0b0f1c]">
            {formatCreditChargeInput(credits)}
          </p>
        </div>
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-[#5d6a82]">
          크레딧
        </span>
      </div>

      <button
        type="button"
        className={buttonClassName}
        aria-label={`충전 크레딧 ${CREDIT_CHARGE_STEP} 증가`}
        onClick={() => adjustCredits(CREDIT_CHARGE_STEP)}
      >
        <Plus className="size-4" strokeWidth={2.25} />
      </button>

      <button
        type="button"
        className={buttonClassName}
        aria-label={`충전 크레딧 ${CREDIT_CHARGE_STEP} 감소`}
        disabled={credits <= MIN_CREDIT_CHARGE_CREDITS}
        onClick={() => adjustCredits(-CREDIT_CHARGE_STEP)}
      >
        <Minus className="size-4" strokeWidth={2.25} />
      </button>
    </div>
  )
}
