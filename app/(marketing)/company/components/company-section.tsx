import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CompanySectionProps = {
  id?: string
  className?: string
  innerClassName?: string
  children: ReactNode
}

export function CompanySection({ id, className, innerClassName, children }: CompanySectionProps) {
  return (
    <section
      id={id}
      className={cn("relative w-full border-t border-neutral-100 bg-white py-20 md:py-28", className)}
    >
      <div className={cn("mx-auto w-full max-w-[1280px] px-5 text-center md:px-8 md:text-left", innerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function CompanySectionEyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.08em] text-neutral-400",
        className,
      )}
    >
      {children}
    </p>
  )
}

export function CompanySectionHeading({
  title,
  className,
}: {
  title: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "text-2xl font-bold tracking-tight text-neutral-950 md:text-4xl md:leading-tight",
        className,
      )}
    >
      {title}
    </h2>
  )
}

export function CompanySectionLead({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn("mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 md:mx-0 md:text-lg", className)}>
      {children}
    </p>
  )
}
