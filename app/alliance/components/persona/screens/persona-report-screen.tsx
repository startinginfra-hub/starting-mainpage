"use client"

import { FunnelMatchingReportScene } from "@/app/intro/components/funnel/funnel-matching-report-scene"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { PersonaScreenShell } from "./persona-screen-shell"

export function PersonaReportScreen() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <PersonaScreenShell className="p-0 md:p-0">
      <div className="fn fn-preview-panel-report relative flex h-full w-full">
        <FunnelMatchingReportScene active animate={!reducedMotion} />
      </div>
    </PersonaScreenShell>
  )
}
