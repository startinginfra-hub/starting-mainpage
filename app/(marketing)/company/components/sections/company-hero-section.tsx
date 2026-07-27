"use client"

import Link from "next/link"
import { companyHero } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import { CompanyHeroFilterAnimation } from "../company-hero-filter"

export function CompanyHeroSection() {
  return (
    <section className="relative -mt-14 w-full min-w-0 overflow-hidden bg-[#050A14] md:-mt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(165deg,#050A14_0%,#0A1224_48%,#071018_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[520px] w-[min(100vw,900px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,158,255,0.18),transparent_68%)] blur-2xl md:h-[720px]"
      />

      {/* AI Agent filter core — below keywords and copy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="company-hero-agent-core">
          <div className="company-hero-agent-core-ring">
            <span>AI Agent</span>
          </div>
        </div>
      </div>

      {/* Keyword chips — captured above the AI Agent core */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <CompanyHeroFilterAnimation />
      </div>

      {/* Fade sits above chips, below text — mobile: even veil so chips stay visible both sides */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(5,10,20,0.72)_0%,rgba(5,10,20,0.42)_48%,rgba(5,10,20,0.18)_78%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(5,10,20,0.94)_0%,rgba(5,10,20,0.78)_36%,rgba(5,10,20,0.28)_68%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-[1280px] items-center px-5 py-20 pt-28 md:min-h-[calc(100dvh-4rem)] md:px-8 md:py-28 md:pt-32">
        <div className="w-full max-w-4xl text-center md:max-w-5xl md:text-left">
          <IntroReveal useAppMainScrollRoot>
            <p className="text-sm font-semibold tracking-tight text-white/70 md:text-base">
              {companyHero.brand}
            </p>
          </IntroReveal>

          <IntroReveal delayMs={60} useAppMainScrollRoot>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] md:mt-6 md:text-6xl md:leading-[1.15]">
              <span className="block md:whitespace-nowrap">{companyHero.headline}</span>
              <span className="mt-1 block text-[#7EC4FF] md:mt-2 md:whitespace-nowrap">
                {companyHero.headlineLine2}
              </span>
            </h1>
          </IntroReveal>

          <IntroReveal delayMs={120} useAppMainScrollRoot>
            <p className="mt-6 max-w-none text-base leading-relaxed text-white/70 md:mt-8 md:text-xl lg:whitespace-nowrap">
              {companyHero.sub}
            </p>
          </IntroReveal>

          <IntroReveal delayMs={180} useAppMainScrollRoot>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12 md:justify-start">
              <Link
                href={companyHero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#3B9EFF] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:px-7 md:text-base"
              >
                {companyHero.primaryCta.label}
              </Link>
              <Link
                href={companyHero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:px-7 md:text-base"
              >
                {companyHero.secondaryCta.label}
              </Link>
            </div>
          </IntroReveal>
        </div>
      </div>
    </section>
  )
}
