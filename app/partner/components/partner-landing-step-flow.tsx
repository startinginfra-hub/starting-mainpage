import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type StepFlowConnector = "next" | "below" | "none"

export function PartnerLandingStepFlow({ children }: { children: ReactNode }) {
  return <ol className="grid gap-6 md:grid-cols-3 md:gap-10">{children}</ol>
}

export function PartnerLandingStepFlowItem({
  connector,
  children,
}: {
  connector: StepFlowConnector
  children: ReactNode
}) {
  return (
    <li className="relative flex flex-col gap-5 rounded-[1.5rem] bg-white p-5 ring-1 ring-zinc-200/80">
      {children}
      {connector !== "none" ? (
        <ChevronRight
          className={cn(
            "absolute -bottom-[1.375rem] left-1/2 size-5 -translate-x-1/2 rotate-90 text-zinc-300",
            connector === "next"
              ? "md:-right-[1.875rem] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rotate-0"
              : "md:-bottom-6",
          )}
          strokeWidth={2.4}
          aria-hidden
        />
      ) : null}
    </li>
  )
}
