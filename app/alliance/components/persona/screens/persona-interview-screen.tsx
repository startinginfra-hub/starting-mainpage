"use client"

import { FunnelInterviewScene } from "@/app/intro/components/funnel/funnel-interview-scene"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { PersonaScreenShell, type PersonaScreenProps } from "./persona-screen-shell"

export function PersonaInterviewScreen({ onNext }: PersonaScreenProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <PersonaScreenShell className="p-0 md:p-0">
      <div className="fn fn-preview-panel-interview relative h-full w-full">
        <div className="fn-scene-layer fn-scene-layer-active fn-scene-layer-interview items-stretch !p-0">
          <FunnelInterviewScene active animate={!reducedMotion} onAdvanceScene={onNext} />
        </div>
      </div>
    </PersonaScreenShell>
  )
}
