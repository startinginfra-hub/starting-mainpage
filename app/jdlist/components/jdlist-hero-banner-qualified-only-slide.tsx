import { ArrowRight, CheckCircle2, UserX, UserCheck } from "lucide-react"
import { jdlistBannerFrameClassName } from "./jdlist-banner-slides"
import { JdListHeroBannerMobileIcon } from "./jdlist-hero-banner-mobile-icon"
import { cn } from "@/lib/utils"

type JdListHeroBannerQualifiedOnlySlideProps = {
  className?: string
}

function JdListQualifiedOnlyBannerBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E7490] via-[#1486C8] to-[#1A7CFF]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_18%_22%,rgba(255,255,255,0.2),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_48%_at_88%_78%,rgba(255,255,255,0.13),transparent_60%)]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "linear-gradient(to left, black 38%, transparent 94%)",
          WebkitMaskImage: "linear-gradient(to left, black 38%, transparent 94%)",
        }}
      />

      <div className="absolute -left-10 top-1/4 size-72 rounded-full bg-[#5EEAD4]/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 size-80 rounded-full bg-[#4DA3FF]/28 blur-3xl motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="absolute right-[24%] top-5 size-32 rounded-full bg-white/10 blur-2xl" />
    </div>
  )
}

function RejectedProfileRow({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-2 py-1.5",
        dimmed ? "border-white/10 bg-white/6 opacity-55" : "border-white/15 bg-white/10",
      )}
    >
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/12 md:size-7">
        <div className="size-2 rounded-full bg-white/40 md:size-2.5" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="h-1.5 w-full max-w-[4.5rem] rounded-full bg-white/30" />
        <div className="h-1 w-2/3 max-w-[3rem] rounded-full bg-white/20" />
      </div>
      <UserX className="size-3.5 shrink-0 text-white/55 md:size-4" strokeWidth={2.25} />
    </div>
  )
}

function JdListQualifiedOnlyBannerIllustration() {
  return (
    <div className="relative hidden h-full min-w-[14rem] shrink-0 items-center justify-center pr-4 md:flex md:min-w-[19rem] md:pr-8 lg:min-w-[23rem] lg:pr-10">
      <div className="absolute right-6 top-1/2 size-48 -translate-y-1/2 rounded-full bg-white/10 blur-2xl md:size-52" aria-hidden />

      <div className="relative flex scale-[0.92] items-center gap-3 md:scale-100 md:gap-4 lg:gap-5">
        <div className="w-[9.5rem] rounded-2xl border border-white/20 bg-white/10 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md md:w-[11rem] md:p-4 lg:w-[12rem]">
          <div className="flex items-center gap-2.5">
            <UserX className="size-5 text-white/75 md:size-6" strokeWidth={2} />
            <span className="text-xs font-semibold text-white/85 md:text-sm">불필요한 후보</span>
          </div>
          <div className="mt-3 space-y-2">
            <RejectedProfileRow />
            <RejectedProfileRow dimmed />
            <RejectedProfileRow dimmed />
          </div>
        </div>

        <div className="flex items-center text-white/80">
          <ArrowRight className="size-6 md:size-7" strokeWidth={2.5} />
        </div>

        <div className="w-[9.5rem] rounded-2xl border border-white/30 bg-white/15 p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-md md:w-[11rem] md:p-4 lg:w-[12rem]">
          <div className="flex items-center gap-2.5">
            <UserCheck className="size-5 text-white md:size-6" strokeWidth={2} />
            <span className="text-xs font-semibold text-white md:text-sm">합격 인재</span>
          </div>
          <div className="mt-3 rounded-xl border border-white/25 bg-white/12 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-full bg-white/20 md:size-10">
                <CheckCircle2 className="size-5 text-white md:size-6" strokeWidth={2} />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-14 rounded-full bg-white/55 md:w-16" />
                <div className="h-1.5 w-10 rounded-full bg-white/35" />
              </div>
            </div>
            <div className="mt-2.5 inline-flex rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white md:text-xs">
              핏 매칭
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function JdListHeroBannerQualifiedOnlySlide({ className }: JdListHeroBannerQualifiedOnlySlideProps) {
  return (
    <div className={cn(jdlistBannerFrameClassName, "bg-[#1486C8]", className)}>
      <JdListQualifiedOnlyBannerBackground />
      <JdListHeroBannerMobileIcon icon={UserCheck} />

      <div className="relative z-[2] flex h-full min-w-0 items-stretch">
        <div className="relative flex min-w-0 flex-1 flex-col justify-center px-6 pr-8 md:px-10 md:pr-10">
          <p className="relative text-xl font-bold leading-snug tracking-tight text-white drop-shadow-sm md:text-3xl">
            안 맞는 후보 거르느라 지치셨나요?
          </p>
          <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-white/85 md:mt-3 md:text-lg">
            합격할 인재만 보여드립니다.
          </p>
        </div>

        <JdListQualifiedOnlyBannerIllustration />
      </div>
    </div>
  )
}
