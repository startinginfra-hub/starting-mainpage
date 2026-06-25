"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { KosmeClosedCtaButton } from "./kosme-closed-cta-button"
import { KosmeReveal } from "./kosme-reveal"
import { KosmeSectionShell } from "./kosme-section-shell"

const { faqCta } = kosmeLandingContent

export function KosmeFaqCtaSection() {
  return (
    <KosmeSectionShell className="bg-white py-10 md:py-20">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <KosmeReveal>
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Image src="/project/logos/kosme.png" alt="KOSME" width={120} height={44} className="h-9 w-auto object-contain" />
              <StartingWordmark href={null} variant="wordmark" className="[&_img]:!h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">{faqCta.title}</h2>
            <p className="text-sm text-muted-foreground">{faqCta.subtitle}</p>
            <KosmeClosedCtaButton size="lg" className="w-full sm:w-fit" />
          </div>
        </KosmeReveal>

        <div className="flex flex-col gap-3">
          {faqCta.faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="rounded-xl border border-[#c7dcff] bg-[#e8f2ff]/60 px-4 py-4 md:px-5">
                <p className="text-xs font-semibold text-[#1260cf]">Q. {item.id}</p>
                <p className="mt-1 text-sm font-semibold text-neutral-900">{item.question}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </KosmeSectionShell>
  )
}
