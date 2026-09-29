import type { ReactNode } from "react"
import { INTRO_CONTENT_MAX } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"

type AllianceSectionProps = {
  id?: string
  variant?: "default" | "alt"
  className?: string
  innerClassName?: string
  children: ReactNode
}

export function AllianceSection({
  id,
  variant = "default",
  className,
  innerClassName,
  children,
}: AllianceSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate z-0 w-full py-16 md:py-24",
        variant === "alt" ? "border-y border-white/[0.06] bg-[#0b0e16]" : "bg-[#07090f]",
        className,
      )}
    >
      <div className={cn(INTRO_CONTENT_MAX, "mx-auto w-full px-4 md:px-8", innerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function AllianceSectionHeading({
  title,
  subtitle,
  className,
}: {
  title: ReactNode
  subtitle?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto mb-10 max-w-3xl text-center md:mb-14", className)}>
      <h2 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">{subtitle}</p>
      ) : null}
    </div>
  )
}
