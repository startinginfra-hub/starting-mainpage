"use client"

import Image from "next/image"
import { useState } from "react"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import type { ProjectBrandLogo } from "@/lib/project/projects"
import { cn } from "@/lib/utils"

type ProjectBrandLogosProps = {
  partnerLogos?: ProjectBrandLogo[]
  className?: string
}

function PartnerLogo({ logo }: { logo: ProjectBrandLogo }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <span className="inline-flex h-5 items-center rounded-md bg-neutral-100 px-2 text-[10px] font-medium text-neutral-500">
        {logo.alt}
      </span>
    )
  }

  return (
    <Image
      src={logo.src}
      alt={`${logo.alt} 로고`}
      width={120}
      height={logo.height ?? 18}
      className="w-auto object-contain"
      style={{ height: logo.height ?? 18, width: "auto" }}
      onError={() => setHasError(true)}
    />
  )
}

export function ProjectBrandLogos({ partnerLogos, className }: ProjectBrandLogosProps) {
  const hasPartners = partnerLogos && partnerLogos.length > 0

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <StartingWordmark href={null} variant="wordmark" className="[&_img]:!h-4" />
      {hasPartners ? (
        <>
          <span className="text-[10px] text-neutral-300" aria-hidden>
            ×
          </span>
          {partnerLogos.map((logo) => (
            <PartnerLogo key={logo.src} logo={logo} />
          ))}
        </>
      ) : null}
    </div>
  )
}
