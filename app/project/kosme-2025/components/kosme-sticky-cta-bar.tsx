"use client"

import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { KosmeClosedCtaButton } from "./kosme-closed-cta-button"

const { hero } = kosmeLandingContent

export function KosmeStickyCtaBar() {
  return (
    <div
      className="kosme-sticky-cta-bar fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800/20 bg-neutral-900/95 px-4 pt-3 shadow-[0_-8px_32px_rgba(15,23,42,0.18)] backdrop-blur-md md:px-6 md:pt-3.5"
      role="region"
      aria-label="사업 모집 안내"
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-2.5 sm:gap-3 md:gap-4">
        <p className="min-w-0 flex-1 text-left text-[11px] font-medium leading-snug text-white sm:text-xs md:text-sm">
          {hero.ctaBarText}
        </p>
        <KosmeClosedCtaButton size="sm" className="shrink-0" />
      </div>
    </div>
  )
}
