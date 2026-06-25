"use client"

import { IntroCountUp } from "../intro-count-up"
import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { cn } from "@/lib/utils"

const STATS = [
  {
    value: 100000,
    suffix: "+",
    label: "즉시 매칭 가능한 인재",
    delayMs: 0,
    valueClassName:
      "bg-gradient-to-br from-[#1A7CFF] via-[#4d9aff] to-[#126FE3] bg-clip-text text-transparent",
    suffixClassName: "text-[#1A7CFF]",
  },
  {
    value: 90,
    suffix: "%",
    label: "3개월 이상 재직률",
    delayMs: 200,
    valueClassName:
      "bg-gradient-to-br from-[#126FE3] via-[#1A7CFF] to-[#4d9aff] bg-clip-text text-transparent",
    suffixClassName: "text-[#126FE3]",
  },
  {
    value: 67,
    suffix: "%",
    label: "평균 서류 합격률",
    delayMs: 400,
    valueClassName:
      "bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#1A7CFF] bg-clip-text text-transparent",
    suffixClassName: "text-[#7C3AED]",
  },
] as const

function StatStripItem({ stat }: { stat: (typeof STATS)[number] }) {
  return (
    <article className="px-4 py-8 text-center md:py-10">
      <p className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl md:text-6xl lg:text-7xl">
        <IntroCountUp
          value={stat.value}
          suffix={stat.suffix}
          delayMs={stat.delayMs}
          durationMs={1600}
          valueClassName={stat.valueClassName}
          suffixClassName={cn("ml-0.5 text-[0.72em] font-bold", stat.suffixClassName)}
          format={(n) => n.toLocaleString("ko-KR")}
        />
      </p>
      <p className="mt-3 text-xs font-medium text-[#3f4a60] md:mt-4 md:text-sm">{stat.label}</p>
    </article>
  )
}

export function IntroStatsSection() {
  return (
    <IntroSection variant="alt">
      <IntroSectionHeading
        title={
          <>
            이유 있는 선택,{" "}
            <br className="md:hidden" />
            데이터로 증명해요
          </>
        }
        subtitle="검증된 매칭이 만드는 결과, 높은 합격률과 긴 재직률로 증명해요."
      />

      <div className="grid grid-cols-1 divide-y divide-[#e3e8f1] md:grid-cols-3 md:divide-x md:divide-y-0">
        {STATS.map((stat, index) => (
          <IntroReveal key={stat.label} delayMs={index * 120}>
            <StatStripItem stat={stat} />
          </IntroReveal>
        ))}
      </div>
    </IntroSection>
  )
}
