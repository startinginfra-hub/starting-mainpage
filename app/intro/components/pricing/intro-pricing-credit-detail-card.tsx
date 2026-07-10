import { Coins } from "lucide-react"
import type { CreditChargeMethod } from "./intro-pricing-constants"
import { PricingInvoiceRow, PricingInvoiceShell } from "./intro-pricing-invoice-shell"
import { cn } from "@/lib/utils"

type Props = {
  chargeCredits: number
  listPriceLabel: string
  discountValue: string
  discountPercent: number
  chargeAmountValue: string
  accent: CreditChargeMethod
}

export function IntroPricingCreditDetailCard({
  chargeCredits,
  listPriceLabel,
  discountValue,
  discountPercent,
  chargeAmountValue,
  accent,
}: Props) {
  const isBank = accent === "bank"
  const accentText = isBank ? "text-[#1A7CFF]" : "text-[#7C3AED]"
  const accentBadge = isBank ? "bg-[#1A7CFF]" : "bg-[#7C3AED]"

  return (
    <PricingInvoiceShell
      title="크레딧 충전 상세"
      icon={
        <Coins className={cn("size-4", accentText)} strokeWidth={2.25} />
      }
      featured={isBank}
      className={cn(
        "!max-w-none",
        !isBank &&
          "border-[#7C3AED]/30 shadow-[0_12px_40px_rgba(124,58,237,0.08)]",
      )}
    >
      <dl className="space-y-1 [&_.fn-payment-invoice-row]:py-2 md:[&_.fn-payment-invoice-row]:py-2.5">
        <PricingInvoiceRow
          size="large"
          label={`${chargeCredits.toLocaleString("ko-KR")} 크레딧 정가`}
          value={listPriceLabel}
          labelClassName="text-[#0b0f1c]"
          valueClassName="text-[#9aa5b8] line-through"
        />
        <PricingInvoiceRow
          size="large"
          label="선 할인"
          value={discountValue}
          labelClassName="text-[#0b0f1c]"
          highlight
          highlightClassName={cn(accentText, "font-bold")}
          labelBadge={
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white md:text-[11px]",
                accentBadge,
              )}
            >
              -{discountPercent}%
            </span>
          }
        />
      </dl>

      <div className="mt-4 border-t border-[#edf1f7] pt-3">
        <PricingInvoiceRow
          size="large"
          label="결제 금액"
          labelNote="VAT 제외"
          value={chargeAmountValue}
          labelClassName="text-[#0b0f1c]"
          strong
          valueClassName="text-[#0b0f1c]"
        />
      </div>
    </PricingInvoiceShell>
  )
}
