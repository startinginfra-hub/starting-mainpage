"use client"

import Image from "next/image"
import type { IntroClientLogoItem } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"

type IntroClientLogoProps = Pick<IntroClientLogoItem, "name" | "src" | "cardScale"> & {
  variant?: "marquee" | "card"
}

export function IntroClientLogo({ name, src, cardScale, variant = "marquee" }: IntroClientLogoProps) {
  const isCard = variant === "card"

  const image = (
    <Image
      src={src}
      alt={`${name} 로고`}
      width={200}
      height={48}
      className={cn(isCard ? "intro-testimonial-logo__img" : "intro-marquee-logo__img")}
      style={
        cardScale
          ? {
              transform: `scale(${cardScale})`,
              transformOrigin: isCard ? "left center" : "center center",
            }
          : undefined
      }
      sizes={isCard ? "(max-width: 768px) 176px, 192px" : "(max-width: 768px) 128px, 144px"}
    />
  )

  if (!isCard) {
    return <span className="intro-marquee-logo">{image}</span>
  }

  return <div className="intro-testimonial-logo">{image}</div>
}
