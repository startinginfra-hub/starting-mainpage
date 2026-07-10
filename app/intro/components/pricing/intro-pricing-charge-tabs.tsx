"use client"

import {
  CREDIT_CHARGE_DISCOUNTS,
  type CreditChargeMethod,
} from "./intro-pricing-constants"
import { cn } from "@/lib/utils"

const CHARGE_METHODS = ["bank", "card"] as const satisfies readonly CreditChargeMethod[]

type Props = {
  activeMethod: CreditChargeMethod
  onChange: (method: CreditChargeMethod) => void
  className?: string
}

export function IntroPricingChargeTabs({ activeMethod, onChange, className }: Props) {
  return (
    <div
      className={cn(
        "flex h-11 rounded-xl border border-[#e3e8f1] bg-[#f5f7fb] p-0.5 md:h-12",
        className,
      )}
      role="tablist"
      aria-label="크레딧 충전 결제 수단"
    >
      {CHARGE_METHODS.map((method) => {
        const active = activeMethod === method

        return (
          <button
            key={method}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(method)}
            className={cn(
              "flex h-full flex-1 items-center justify-center gap-1.5 rounded-[10px] px-2 text-xs font-bold transition-colors md:px-3 md:text-sm",
              active
                ? method === "bank"
                  ? "bg-[#1A7CFF] text-white shadow-sm"
                  : "bg-[#7C3AED] text-white shadow-sm"
                : "text-[#5d6a82] hover:text-[#0b0f1c]",
            )}
          >
            <span>{CREDIT_CHARGE_DISCOUNTS[method].label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[9px] font-extrabold leading-none md:text-[10px]",
                active
                  ? "bg-white/25 text-white"
                  : method === "bank"
                    ? "bg-[#1A7CFF] text-white"
                    : "bg-[#7C3AED] text-white",
              )}
            >
              -{Math.round(CREDIT_CHARGE_DISCOUNTS[method].rate * 100)}%
            </span>
          </button>
        )
      })}
    </div>
  )
}
