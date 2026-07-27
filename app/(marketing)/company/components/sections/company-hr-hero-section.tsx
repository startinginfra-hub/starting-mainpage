"use client"

import Image from "next/image"
import { companyHrHero } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import { cn } from "@/lib/utils"

export function CompanyHrHeroSection() {
  return (
    <section className="flex w-full flex-col gap-8 md:gap-10">
      <IntroReveal useAppMainScrollRoot>
        <div>
          <p className="text-sm font-medium tracking-tight text-black md:text-base">
            {companyHrHero.label}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-black md:mt-5 md:text-5xl md:leading-[1.25]">
            {companyHrHero.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-500 md:mt-4 md:text-xl">
            {companyHrHero.sub}
          </p>
        </div>
      </IntroReveal>

      <IntroReveal delayMs={100} yOffset="24" useAppMainScrollRoot>
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-4">
          {companyHrHero.images.map((image) => (
            <div
              key={image.src}
              className={cn(
                "relative h-[250px] min-w-0 w-full overflow-hidden rounded-2xl md:h-[400px]",
                image.flex,
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </IntroReveal>
    </section>
  )
}
