"use client"

import { FunnelApplyScene } from "@/app/intro/components/funnel/funnel-apply-scene"
import { FunnelPaymentScene } from "@/app/intro/components/funnel/funnel-payment-scene"
import { cn } from "@/lib/utils"

type Props = {
  variant: "apply" | "payment"
}

export function ProcessFunnelPreview({ variant }: Props) {
  return (
    <div
      className={cn(
        "intro-process-funnel-preview w-full overflow-hidden rounded-xl",
        variant === "apply" && "intro-process-funnel-preview-apply",
        variant === "payment" && "intro-process-funnel-preview-payment",
      )}
    >
      {variant === "apply" ? (
        <FunnelApplyScene active animate={false} previewMode />
      ) : (
        <FunnelPaymentScene active animate={false} previewMode />
      )}
    </div>
  )
}
