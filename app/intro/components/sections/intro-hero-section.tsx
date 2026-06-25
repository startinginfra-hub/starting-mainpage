"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ChannelTalkInquiryLink } from "@/app/components/app-shell/channel-talk-inquiry-link"
import { INTRO_APP_URL } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"

export function IntroHeroSection() {
  return (
    <section className="intro-hero relative">
      <div className="intro-hero-inner relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="intro-hero-copy mx-auto flex w-full flex-col items-center text-center">
          <h1 className="intro-hero-headline intro-hero-text-in intro-hero-text-in-delay-1">
            채용 플랫폼을 대체하는
            <span className="intro-hero-headline-accent">AI Agent 헤드헌팅 솔루션</span>
          </h1>

          <p className="intro-hero-sub intro-hero-text-in intro-hero-text-in-delay-2">
            정확히 필터링된 인재를 부담없는 정찰제로
          </p>

          <div className="intro-hero-cta intro-hero-text-in intro-hero-text-in-delay-3">
            <Link href={INTRO_APP_URL} className="intro-hero-btn intro-hero-btn-primary group">
              인재 매칭받아보기
              <ArrowRight className="intro-hero-btn-arrow" strokeWidth={2.25} aria-hidden />
            </Link>
            <ChannelTalkInquiryLink className="intro-hero-btn intro-hero-btn-ghost">
              문의하기
            </ChannelTalkInquiryLink>
          </div>

          <p className="intro-hero-meta intro-hero-text-in intro-hero-text-in-delay-4">
            <span>유료직업소개사업 정식 허가</span>
            <span className="intro-hero-meta-dot" aria-hidden />
            <span>채용 확정 시 결제</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export function IntroCtaButtons({ className }: { className?: string }) {
  return (
    <div className={cn("intro-hero-cta", className)}>
      <Link href={INTRO_APP_URL} className="intro-hero-btn intro-hero-btn-primary group">
        인재 매칭받아보기
        <ArrowRight className="intro-hero-btn-arrow" strokeWidth={2.25} aria-hidden />
      </Link>
    </div>
  )
}
