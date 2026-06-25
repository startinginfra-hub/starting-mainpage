import type { ReactNode } from "react"
import { INTRO_CONTENT_MAX } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"

type IntroSectionProps = {
  id?: string
  variant?: "default" | "alt"
  className?: string
  innerClassName?: string
  children: ReactNode
}

export function IntroSection({
  id,
  variant = "default",
  className,
  innerClassName,
  children,
}: IntroSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate z-0 w-full py-12 md:py-20",
        variant === "alt" ? "border-y border-[#e3e8f1] bg-[#f5f7fb]" : "bg-[#fbfcfe]",
        className,
      )}
    >
      <div className={cn(INTRO_CONTENT_MAX, "mx-auto w-full px-4 md:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function IntroSectionHeading({
  title,
  subtitle,
  className,
}: {
  title: ReactNode
  subtitle?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto mb-8 max-w-3xl text-center md:mb-12", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-[#0b0f1c] md:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-[#3f4a60] md:text-base">{subtitle}</p>
      ) : null}
    </div>
  )
}
