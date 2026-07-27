"use client"

import { companyHrBenefits } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"

export function CompanyHrBenefitsSection() {
  const left = companyHrBenefits.items.slice(0, 3)
  const right = companyHrBenefits.items.slice(3)

  return (
    <section id="benefits" className="flex w-full flex-col gap-8 md:gap-10">
      <IntroReveal useAppMainScrollRoot>
        <p className="text-sm font-medium tracking-tight text-black md:text-base">
          {companyHrBenefits.title}
        </p>
      </IntroReveal>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 md:gap-x-12 md:gap-y-16">
        {[left, right].map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-10 md:gap-12">
            {column.map((item, index) => (
              <IntroReveal
                key={item.id}
                delayMs={(columnIndex * 3 + index) * 40}
                useAppMainScrollRoot
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 md:text-base">
                    {item.body}
                  </p>
                </div>
              </IntroReveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
