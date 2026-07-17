import { cn } from "@/lib/utils"

type Props = {
  badge: string
  amount: string
  amountSuffix?: string
  description: string
  featured?: boolean
}

export function IntroPricingSimpleCard({
  badge,
  amount,
  amountSuffix,
  description,
  featured = false,
}: Props) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-6 md:p-8",
        featured
          ? "border-[#1A7CFF]/35 bg-gradient-to-br from-[#f0f6ff] via-white to-[#f8fbff] shadow-[0_12px_40px_rgba(26,124,255,0.12)] ring-1 ring-[#1A7CFF]/15"
          : "border-[#e3e8f1] bg-[#fbfcfe] shadow-[0_1px_3px_rgba(15,23,42,0.04)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={cn(
            "text-sm font-semibold md:text-base",
            featured ? "text-[#0b3d8f]" : "text-[#0b0f1c]",
          )}
        >
          1명당 채용 성공 수수료
        </p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
            featured
              ? "bg-[#1A7CFF] text-white shadow-sm"
              : "bg-[#0b0f1c] text-white",
          )}
        >
          {badge}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-1.5">
        <p
          className={cn(
            "text-3xl font-bold tabular-nums tracking-tight md:text-4xl",
            featured ? "text-[#1A7CFF]" : "text-[#0b0f1c]",
          )}
        >
          {amount}
        </p>
        {amountSuffix ? (
          <span
            className={cn(
              "text-sm font-medium md:text-[15px]",
              featured ? "text-[#5b8fd9]" : "text-[#9aa5b8]",
            )}
          >
            {amountSuffix}
          </span>
        ) : null}
      </div>

      <p
        className={cn(
          "mt-2 text-[11px] leading-relaxed md:text-xs",
          featured ? "text-[#3f4a60]" : "text-[#5d6a82]",
        )}
      >
        {description}
      </p>
    </div>
  )
}
