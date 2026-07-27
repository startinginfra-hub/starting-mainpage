"use client"

import Image from "next/image"
import { companyHrOffice } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"

export function CompanyHrOfficeSection() {
  const [topLeft, topRight, bottom] = companyHrOffice.images

  return (
    <section id="office" className="w-full">
      <IntroReveal yOffset="24" useAppMainScrollRoot>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {[topLeft, topRight].map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-2xl sm:aspect-[16/10] md:aspect-[4/5]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}

          <div className="relative col-span-2 aspect-[16/10] min-w-0 overflow-hidden rounded-2xl md:aspect-[21/10]">
            <Image
              src={bottom.src}
              alt={bottom.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>
      </IntroReveal>
    </section>
  )
}
