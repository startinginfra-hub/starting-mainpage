"use client"

import { companyManifesto } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import "./company-manifesto.css"

export function CompanyManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden border-t border-neutral-100 bg-white py-20 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl space-y-8 text-center md:space-y-10">
          {companyManifesto.paragraphs.map((paragraph, index) => (
            <IntroReveal key={paragraph.id} delayMs={index * 50} useAppMainScrollRoot>
              {"lines" in paragraph ? (
                <p className="text-base font-medium leading-relaxed tracking-tight text-neutral-950 md:text-lg md:leading-relaxed">
                  {paragraph.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="whitespace-pre-line text-base font-medium leading-relaxed tracking-tight text-neutral-950 md:text-lg md:leading-relaxed">
                  {paragraph.parts.map((part, partIndex) =>
                    part.strong ? (
                      <strong key={partIndex} className="font-bold text-neutral-950">
                        {part.text}
                      </strong>
                    ) : (
                      <span key={partIndex}>{part.text}</span>
                    ),
                  )}
                </p>
              )}
            </IntroReveal>
          ))}
        </div>

        <IntroReveal delayMs={280} useAppMainScrollRoot>
          <div className="mt-14 flex justify-center md:mt-16" aria-hidden>
            <div className="company-manifesto-arrows">
              <ChevronDown className="company-manifesto-arrow company-manifesto-arrow-back" />
              <ChevronDown className="company-manifesto-arrow company-manifesto-arrow-front" />
            </div>
          </div>
        </IntroReveal>
      </div>
    </section>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
