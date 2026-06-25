"use client"

import Image from "next/image"
import { Building2 } from "lucide-react"
import { kosmeLandingContent } from "@/lib/project/kosme-landing-content"
import { cn } from "@/lib/utils"
import { KosmeReveal } from "./kosme-reveal"
import { KosmeSectionShell } from "./kosme-section-shell"

const { participants } = kosmeLandingContent

function ParticipantCard({
  name,
  logoSrc,
  variant,
}: {
  name: string
  logoSrc: string | null
  variant?: "text"
}) {
  return (
    <article
      className={cn(
        "kosme-participant-card group relative flex aspect-[5/4] flex-col overflow-hidden rounded-xl border bg-white p-3 sm:rounded-2xl sm:p-4 md:p-5",
        variant === "text"
          ? "border-neutral-800/10 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          : "border-neutral-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.04)]",
      )}
    >
      <div
        className={cn(
          "relative flex flex-1 items-center justify-center overflow-hidden rounded-xl px-3 py-4 md:px-4 md:py-5",
          variant === "text"
            ? "bg-neutral-900"
            : "bg-neutral-100",
        )}
      >
        {variant === "text" ? (
          <span className="text-xl font-bold tracking-wide text-white/95 md:text-2xl" aria-hidden>
            {name.replace(/\(주\)|주식회사/g, "").trim().slice(0, 2)}
          </span>
        ) : logoSrc ? (
          <div className="kosme-participant-logo-frame">
            <Image
              src={logoSrc}
              alt={`${name} 로고`}
              fill
              sizes="(max-width: 640px) 120px, 144px"
              className="kosme-participant-logo object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <Building2 className="size-7 text-neutral-300" aria-hidden />
        )}

        {variant !== "text" ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.04),transparent_70%)]" />
          </div>
        ) : null}
      </div>

      <p className="mt-2 line-clamp-2 text-center text-[10px] font-bold leading-snug text-neutral-900 sm:mt-3 sm:text-[11px] md:text-xs">
        {name}
      </p>
    </article>
  )
}

export function KosmeParticipantsSection() {
  return (
    <KosmeSectionShell className="relative overflow-hidden bg-[#f8fafc] py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1A7CFF]/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-[#1A7CFF]/[0.04] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 size-72 rounded-full bg-[#1A7CFF]/[0.05] blur-3xl"
        aria-hidden
      />

      <KosmeReveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
            {participants.title}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 md:text-base">{participants.subtitle}</p>
        </div>
      </KosmeReveal>

      <div className="relative mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {participants.items.map((company, index) => (
          <KosmeReveal key={company.name} delayMs={index * 50} className="h-full">
            <ParticipantCard
              name={company.name}
              logoSrc={company.logoSrc}
              variant={"variant" in company ? company.variant : undefined}
            />
          </KosmeReveal>
        ))}
      </div>
    </KosmeSectionShell>
  )
}
