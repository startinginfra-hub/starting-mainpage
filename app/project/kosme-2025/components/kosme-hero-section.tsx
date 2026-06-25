"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { KosmeSectionShell } from "./kosme-section-shell"

const { hero } = kosmeLandingContent

export function KosmeHeroSection() {
  return (
    <KosmeSectionShell
      className="kosme-hero-section overflow-hidden bg-white"
      innerClassName="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center py-8 md:py-10"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
        <Image
          src="/project/kosme/hero-emblem.png"
          alt=""
          width={479}
          height={486}
          className="kosme-hero-emblem h-auto w-full max-w-[280px] md:max-w-[360px]"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-4"
        >
          <Image src="/project/logos/kosme.png" alt="KOSME" width={140} height={52} className="h-10 w-auto object-contain md:h-12" />
          <StartingWordmark href={null} variant="wordmark" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-5xl"
        >
          {hero.titleLine1}
          <br />
          {hero.titleLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-sm text-muted-foreground md:text-base"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 w-full max-w-2xl rounded-xl bg-[#f97316] px-3 py-2.5 text-xs font-semibold leading-relaxed text-white sm:px-4 sm:py-3 sm:text-sm md:mt-10 md:text-base"
        >
          {hero.noticeBanner}
        </motion.div>
      </div>
    </KosmeSectionShell>
  )
}
