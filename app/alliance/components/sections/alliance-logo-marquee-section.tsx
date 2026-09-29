"use client"

import { IntroClientLogo } from "@/app/intro/components/intro-client-logo"
import { IntroMarquee } from "@/app/intro/components/intro-marquee"
import { INTRO_CLIENT_LOGOS, type IntroClientLogoItem } from "@/lib/intro/intro-tokens"
import { AllianceSection } from "../alliance-section"

const MARQUEE_REPEAT = 4

function repeatLogos(logos: readonly IntroClientLogoItem[], times = MARQUEE_REPEAT) {
  return Array.from({ length: times }, () => logos).flat()
}

export function AllianceLogoMarqueeSection() {
  return (
    <AllianceSection
      variant="alt"
      className="py-12 md:py-16"
      innerClassName="max-w-none px-0"
    >
      <p className="mb-8 px-4 text-center text-sm font-medium text-white/50 md:mb-10 md:px-8 md:text-base">
        성장하는 기업들이 스타팅과 함께 핵심 인재를 채용하고 있어요
      </p>
      <div className="alliance-logo-mono flex w-full flex-col items-center overflow-x-hidden">
        <IntroMarquee
          direction="ltr"
          durationSec={80}
          fadeClassName="intro-marquee-fade-wide"
          itemsClassName="gap-12 pr-12 md:gap-16 md:pr-16 lg:gap-20 lg:pr-20"
        >
          {repeatLogos(INTRO_CLIENT_LOGOS).map((client, index) => (
            <IntroClientLogo
              key={`${client.id}-${index}`}
              name={client.name}
              src={client.src}
              cardScale={client.cardScale}
            />
          ))}
        </IntroMarquee>
      </div>
    </AllianceSection>
  )
}
