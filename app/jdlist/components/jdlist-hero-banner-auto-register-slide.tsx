import { LayoutTemplate } from "lucide-react"
import { jdlistBannerFrameClassName } from "./jdlist-banner-slides"
import { JdListHeroBannerMobileIcon } from "./jdlist-hero-banner-mobile-icon"
import { cn } from "@/lib/utils"

type JdListHeroBannerAutoRegisterSlideProps = {
  className?: string
}

function JdListAutoRegisterBannerBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A7CFF] via-[#1570EE] to-[#0B5FD4]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_75%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to right, black 40%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 95%)",
        }}
      />

      <div className="absolute -right-10 top-1/2 size-80 -translate-y-1/2 rounded-full bg-[#4DA3FF]/30 blur-3xl motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="absolute -left-12 bottom-0 size-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-[28%] top-4 size-32 rounded-full bg-[#7EC0FF]/25 blur-2xl motion-safe:animate-pulse motion-reduce:animate-none [animation-delay:1.2s]" />
      <div className="absolute bottom-6 left-[35%] size-24 rounded-full bg-white/8 blur-2xl" />

      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="62" y1="8" x2="96" y2="42" stroke="rgba(255,255,255,0.35)" strokeWidth="0.15" />
        <line x1="70" y1="58" x2="98" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="0.12" />
        <circle cx="96" cy="42" r="0.8" fill="rgba(255,255,255,0.55)" />
        <circle cx="98" cy="86" r="0.6" fill="rgba(255,255,255,0.4)" />
      </svg>
    </div>
  )
}

function JdListAutoRegisterBannerIllustration() {
  return (
    <div className="relative hidden h-full min-w-[12rem] shrink-0 items-center justify-center pr-4 md:flex md:min-w-[16rem] md:pr-8 lg:min-w-[20rem] lg:pr-10">
      <div className="absolute right-8 top-1/2 size-56 -translate-y-1/2 rounded-full bg-white/10 blur-2xl md:size-64" aria-hidden />

      <div className="w-[11rem] rotate-[2deg] md:w-[13rem] lg:w-[15rem]">
        <div className="overflow-hidden rounded-2xl border border-white/35 bg-white/15 shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="flex items-center gap-1.5 border-b border-white/20 bg-white/10 px-3 py-2">
            <div className="size-2 rounded-full bg-white/35" />
            <div className="size-2 rounded-full bg-white/25" />
            <div className="size-2 rounded-full bg-white/25" />
            <div className="ml-2 h-1.5 flex-1 rounded-full bg-white/20" />
          </div>

          <div className="bg-gradient-to-r from-white/25 to-white/10 px-3 py-3.5 md:px-4 md:py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] md:size-12">
                <LayoutTemplate className="size-6 text-white md:size-7" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 space-y-2">
                <div className="h-2 w-20 rounded-full bg-white/60 md:w-24" />
                <div className="h-1.5 w-14 rounded-full bg-white/35" />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 p-3 md:p-4">
            <div className="h-2.5 w-3/4 rounded-full bg-white/45" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/25" />
              <div className="h-1.5 w-full rounded-full bg-white/20" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
            </div>
            <div className="h-6 w-full rounded-lg bg-white/30 md:h-7" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function JdListHeroBannerAutoRegisterSlide({ className }: JdListHeroBannerAutoRegisterSlideProps) {
  return (
    <div className={cn(jdlistBannerFrameClassName, "bg-[#126FE3]", className)}>
      <JdListAutoRegisterBannerBackground />
      <JdListHeroBannerMobileIcon icon={LayoutTemplate} />

      <div className="relative z-[2] flex h-full min-w-0 items-stretch">
        <div className="relative flex min-w-0 flex-1 flex-col justify-center px-6 pr-8 md:px-10 md:pr-10">
          <p className="relative text-xl font-bold leading-snug tracking-tight text-white drop-shadow-sm md:text-3xl">
            매칭신청하면 자동으로 공고가 완성돼요
          </p>
          <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-white/85 md:mt-3 md:text-lg">
            기업 브랜딩까지 생각한 UI를 만나보세요.
          </p>
        </div>

        <JdListAutoRegisterBannerIllustration />
      </div>
    </div>
  )
}
