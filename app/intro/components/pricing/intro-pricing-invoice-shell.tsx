import type { ReactNode } from "react"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function PricingInvoiceRow({
  label,
  value,
  strong = false,
  highlight = false,
  highlightClassName = "text-[#0d9488]",
  className,
  labelClassName,
  valueClassName,
  labelBadge,
  labelNote,
  size = "default",
}: {
  label: string
  value: string
  strong?: boolean
  highlight?: boolean
  highlightClassName?: string
  className?: string
  labelClassName?: string
  valueClassName?: string
  labelBadge?: ReactNode
  labelNote?: string
  size?: "default" | "large"
}) {
  const isLarge = size === "large"

  return (
    <div className={cn("fn-payment-invoice-row", labelNote && "!items-baseline", className)}>
      <dt
        className={cn(
          isLarge
            ? "text-sm font-medium leading-none text-[#5d6a82] md:text-base"
            : "fn-payment-invoice-label",
          highlight && !isLarge && "font-semibold text-[#0b0f1c]",
          labelClassName,
        )}
      >
        <span
          className={cn(
            "inline-flex flex-wrap gap-x-1 gap-y-0",
            labelNote ? "items-baseline" : "items-center",
          )}
        >
          <span>{label}</span>
          {labelNote ? (
            <span className="text-[10px] font-normal leading-none text-[#9aa5b8] md:text-[11px]">
              ({labelNote})
            </span>
          ) : null}
          {labelBadge}
        </span>
      </dt>
      <dd
        className={cn(
          "tabular-nums",
          isLarge
            ? strong
              ? "text-xl font-bold leading-none md:text-2xl"
              : "text-lg font-semibold leading-none text-[#0b0f1c] md:text-xl"
            : cn("fn-payment-invoice-value", strong && "fn-payment-invoice-value-strong"),
          highlight && highlightClassName,
          valueClassName,
        )}
      >
        {value}
      </dd>
    </div>
  )
}

export function PricingInvoiceShell({
  title,
  statusLabel,
  icon = <FileText className="size-4 text-[#1A7CFF]" strokeWidth={2.25} />,
  children,
  className,
  featured = false,
  statusClassName,
  headerClassName,
}: {
  title: string
  statusLabel?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  featured?: boolean
  statusClassName?: string
  headerClassName?: string
}) {
  return (
    <article
      className={cn(
        "fn-payment-invoice-card !max-w-none",
        featured && "border-[#1A7CFF]/30 shadow-[0_12px_40px_rgba(26,124,255,0.08)]",
        className,
      )}
    >
      <div className={cn("fn-payment-invoice-header pb-8", headerClassName)}>
        <div className="flex items-start gap-2.5">
          <div className="fn-payment-invoice-icon-wrap">{icon}</div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#0b0f1c] md:text-lg">{title}</h3>
          </div>
        </div>
        {statusLabel ? (
          <span
            className={cn(
              "fn-payment-invoice-status shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold md:text-xs",
              statusClassName ?? "fn-payment-invoice-status-issued",
            )}
          >
            {statusLabel}
          </span>
        ) : null}
      </div>
      {children}
    </article>
  )
}
