"use client"

import { companyHrCulture } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"

export function CompanyHrCultureSection() {
  return (
    <section id="culture" className="flex w-full flex-col gap-8 md:gap-10">
      <IntroReveal useAppMainScrollRoot>
        <div>
          <p className="text-sm font-medium tracking-tight text-black md:text-base">
            {companyHrCulture.title}
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-black md:mt-5 md:text-4xl md:leading-snug">
            {companyHrCulture.lines.map((line) => (
              <span key={line.accent} className="block">
                {line.before}
                <span className="font-bold">{line.accent}</span>
                {line.after}
              </span>
            ))}
          </h2>
        </div>
      </IntroReveal>

      <div className="flex flex-col gap-8 md:gap-10">
        {companyHrCulture.points.map((point, index) => (
          <IntroReveal key={point.title} delayMs={80 + index * 40} useAppMainScrollRoot>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 md:text-base">
                {point.body}
              </p>
            </div>
          </IntroReveal>
        ))}
      </div>
    </section>
  )
}
