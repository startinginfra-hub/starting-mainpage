"use client"

import { INTRO_CLIENT_LOGOS, type IntroClientLogoItem } from "@/lib/intro/intro-tokens"
import { IntroClientLogo } from "../intro-client-logo"
import { IntroMarquee } from "../intro-marquee"
import { IntroSection } from "../intro-section"

const MARQUEE_REPEAT = 4

function repeatLogos(logos: IntroClientLogoItem[], times = MARQUEE_REPEAT) {
  return Array.from({ length: times }, () => logos).flat()
}

export function IntroLogoMarqueeSection() {
  const row1 = INTRO_CLIENT_LOGOS.slice(0, 8)
  const row2 = INTRO_CLIENT_LOGOS.slice(8)
  const marqueeGap = "gap-12 pr-12 md:gap-16 md:pr-16 lg:gap-20 lg:pr-20"

  return (
    <IntroSection
      variant="alt"
      className="border-t border-[#e3e8f1] pt-12 pb-10 md:pt-20 md:pb-16"
      innerClassName="max-w-none px-0"
    >
      <p className="mb-8 px-4 text-center text-sm font-medium text-[#3f4a60] md:mb-10 md:px-8 md:text-base">
        Seed부터 Series 기업까지, 성장하는 기업이 스타팅을 선택해요
      </p>
      <div className="flex w-full flex-col items-center gap-6 overflow-x-hidden md:gap-8">
        <IntroMarquee
          direction="ltr"
          durationSec={70}
          fadeClassName="intro-marquee-fade-wide"
          itemsClassName={marqueeGap}
        >
          {repeatLogos(row1).map((client, index) => (
            <IntroClientLogo
              key={`${client.id}-${index}`}
              name={client.name}
              src={client.src}
              cardScale={client.cardScale}
            />
          ))}
        </IntroMarquee>
        <IntroMarquee
          direction="rtl"
          durationSec={76}
          fadeClassName="intro-marquee-fade-wide"
          itemsClassName={marqueeGap}
        >
          {repeatLogos(row2).map((client, index) => (
            <IntroClientLogo
              key={`${client.id}-${index}`}
              name={client.name}
              src={client.src}
              cardScale={client.cardScale}
            />
          ))}
        </IntroMarquee>
      </div>
    </IntroSection>
  )
}
