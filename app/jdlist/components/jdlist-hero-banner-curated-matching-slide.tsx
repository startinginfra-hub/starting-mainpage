import { ArrowRight, CheckCircle2, User, Users } from "lucide-react"
import { jdlistBannerFrameClassName } from "./jdlist-banner-slides"
import { JdListHeroBannerMobileIcon } from "./jdlist-hero-banner-mobile-icon"
import { cn } from "@/lib/utils"

type JdListHeroBannerCuratedMatchingSlideProps = {
  className?: string
}

function JdListCuratedMatchingBannerBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5B4FE9] via-[#4F63E8] to-[#1A7CFF]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_25%,rgba(255,255,255,0.2),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_90%_70%,rgba(255,255,255,0.14),transparent_62%)]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to left, black 35%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to left, black 35%, transparent 92%)",
        }}
      />

      <div className="absolute -left-8 top-1/3 size-72 rounded-full bg-[#8B7CFF]/25 blur-3xl" />
      <div className="absolute -right-12 bottom-0 size-80 rounded-full bg-[#4DA3FF]/30 blur-3xl motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="absolute right-[22%] top-6 size-28 rounded-full bg-white/10 blur-2xl" />
    </div>
  )
}

function CandidateProfileCard({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center gap-1 rounded-md border px-1 py-1 md:gap-1.5 md:px-1.5 md:py-1.5",
        highlighted
          ? "border-white/40 bg-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
          : "border-white/10 bg-white/8",
      )}
    >
      <div
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full md:size-[1.125rem]",
          highlighted ? "bg-white/25" : "bg-white/12",
        )}
      >
        <User
          className={cn("size-2.5 md:size-3", highlighted ? "text-white" : "text-white/50")}
          strokeWidth={2}
        />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div
          className={cn(
            "h-0.5 w-full max-w-[2rem] rounded-full md:max-w-[2.25rem]",
            highlighted ? "bg-white/50" : "bg-white/25",
          )}
        />
        <div
          className={cn(
            "h-0.5 w-2/3 max-w-[1.25rem] rounded-full md:max-w-[1.5rem]",
            highlighted ? "bg-white/35" : "bg-white/15",
          )}
        />
      </div>
    </div>
  )
}

function JdListCuratedMatchingBannerIllustration() {
  return (
    <div className="relative hidden h-full min-w-[14rem] shrink-0 items-center justify-center pr-4 md:flex md:min-w-[19rem] md:pr-8 lg:min-w-[23rem] lg:pr-10">
      <div className="absolute right-6 top-1/2 size-48 -translate-y-1/2 rounded-full bg-white/10 blur-2xl md:size-52" aria-hidden />

      <div className="relative flex scale-[0.92] items-center gap-3 md:scale-100 md:gap-4 lg:gap-5">
        <div className="w-[11rem] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md md:w-[13rem] md:p-3.5 lg:w-[14rem] lg:p-4">
          <div className="flex items-center gap-2.5">
            <Users className="size-5 text-white/80 md:size-6" strokeWidth={2} />
            <span className="text-xs font-semibold text-white/90 md:text-sm">100명</span>
          </div>
          <div className="mt-2.5 grid grid-cols-4 gap-1 md:mt-3 md:gap-1.5">
            {Array.from({ length: 12 }).map((_, index) => (
              <CandidateProfileCard key={index} />
            ))}
          </div>
        </div>

        <div className="flex items-center text-white/80">
          <ArrowRight className="size-6 md:size-7" strokeWidth={2.5} />
        </div>

        <div className="w-[9.5rem] rounded-2xl border border-white/30 bg-white/15 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-md md:w-[11rem] md:p-3.5 lg:w-[12rem] lg:p-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="size-5 text-white md:size-6" strokeWidth={2} />
            <span className="text-xs font-semibold text-white md:text-sm">3명</span>
          </div>
          <div className="mt-2.5 flex items-stretch gap-1 md:mt-3 md:gap-1.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="min-w-0 flex-1">
                <CandidateProfileCard highlighted />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function JdListHeroBannerCuratedMatchingSlide({ className }: JdListHeroBannerCuratedMatchingSlideProps) {
  return (
    <div className={cn(jdlistBannerFrameClassName, "bg-[#4F63E8]", className)}>
      <JdListCuratedMatchingBannerBackground />
      <JdListHeroBannerMobileIcon icon={CheckCircle2} />

      <div className="relative z-[2] flex h-full min-w-0 items-stretch">
        <div className="relative flex min-w-0 flex-1 flex-col justify-center px-6 pr-8 md:px-10 md:pr-10">
          <p className="relative text-xl font-bold leading-snug tracking-tight text-white drop-shadow-sm md:text-3xl">
            100명 검토할 시간에 3명만 보세요.
          </p>
          <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-white/85 md:mt-3 md:text-lg">
            핏 맞는 인재, 검토해서 매칭해드려요.
          </p>
        </div>

        <JdListCuratedMatchingBannerIllustration />
      </div>
    </div>
  )
}
