"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { KosmeReveal } from "./kosme-reveal"
import { KosmeSectionShell } from "./kosme-section-shell"

const { overview } = kosmeLandingContent

export function KosmeOverviewSection() {
  return (
    <KosmeSectionShell className="bg-[#0b2d5c] py-10 text-white md:py-16">
      <KosmeReveal>
        <h2 className="text-center text-2xl font-bold md:text-3xl">{overview.title}</h2>
      </KosmeReveal>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-8 flex max-w-[280px] justify-center md:mt-10 md:max-w-[340px]"
      >
        <Image
          src="/project/kosme/korea-map.png"
          alt="대한민국 지도"
          width={538}
          height={868}
          className="h-auto w-full object-contain"
          priority
        />
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 md:mt-10">
        {overview.items.map((item, index) => (
          <KosmeReveal key={item.label} delayMs={index * 80} className="h-full">
            <div className="flex h-full min-h-[80px] flex-col justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-center backdrop-blur-sm sm:min-h-[88px] sm:px-5 sm:py-4 sm:text-left">
              <p className="text-xs font-medium text-white/70">{item.label}</p>
              <p className="mt-1.5 text-sm font-bold leading-snug text-white md:text-base">{item.value}</p>
            </div>
          </KosmeReveal>
        ))}
      </div>
    </KosmeSectionShell>
  )
}
