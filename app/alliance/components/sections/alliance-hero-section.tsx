"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ChannelTalkInquiryLink } from "@/app/components/app-shell/channel-talk-inquiry-link"
import { APP_LOGIN_PATH, buildAppUrl } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"
import { AlliancePersonaDemo } from "./alliance-persona-section"

export function AllianceHeroSection() {
  return (
    <section className="alliance-hero relative overflow-x-clip">
      <div className="alliance-hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="alliance-hero-glow pointer-events-none absolute" aria-hidden />

      <div className="intro-hero-inner relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="mx-auto flex w-full max-w-[920px] flex-col items-center text-center">
          <span className="intro-hero-text-in -mb-2 inline-flex items-center rounded-full border border-[#d9b877]/30 bg-[#d9b877]/[0.08] px-3 py-1 text-xs font-semibold md:px-3.5 md:py-1.5 md:text-sm">
            <span className="alliance-text-gold">스타팅 얼라이언스</span>
          </span>
          <h1 className="alliance-hero-headline intro-hero-text-in intro-hero-text-in-delay-1">
            리드급 채용에 특화된
            <span className="alliance-text-gold block">다수의 헤드헌터가 함께 찾습니다</span>
          </h1>

          <p className="intro-hero-text-in intro-hero-text-in-delay-2 mt-6 max-w-[620px] text-base leading-relaxed text-white/60 md:text-lg">
            연봉 4천 이상 포지션 전용. 계약 연봉의 18% 정찰제
          </p>

          <div className="intro-hero-cta intro-hero-text-in intro-hero-text-in-delay-3">
            <Link href={buildAppUrl(APP_LOGIN_PATH, "alliance")} className="intro-hero-btn intro-hero-btn-primary group">
              인재 매칭받아보기
              <ArrowRight className="intro-hero-btn-arrow" strokeWidth={2.25} aria-hidden />
            </Link>
            <ChannelTalkInquiryLink className={cn("intro-hero-btn alliance-btn-ghost cursor-pointer")}>
              문의하기
            </ChannelTalkInquiryLink>
          </div>

        </div>

        <AlliancePersonaDemo className="intro-hero-text-in intro-hero-text-in-delay-4 mt-14 md:mt-20" />
      </div>
    </section>
  )
}
