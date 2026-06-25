"use client"

import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { IntroSalaryCostCalculator } from "../pricing/intro-salary-cost-calculator"

export function IntroCostCalculatorSection() {
  return (
    <IntroSection id="cost-calculator" className="bg-white">
      <IntroSectionHeading
        title="현재 채용중인 포지션 연봉은 얼마인가요?"
        subtitle="포지션 연봉을 입력하면 비용을 한눈에 비교할 수 있어요."
      />
      <IntroReveal yOffset="16">
        <IntroSalaryCostCalculator />
      </IntroReveal>
    </IntroSection>
  )
}
