"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { cn } from "@/lib/utils"

type FaqItem = (typeof FAQ_ITEMS)[number]

function IntroFaqItem({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        "rounded-xl border border-[#e3e8f1] bg-white transition-[border-color,box-shadow] duration-300",
        isOpen && "border-[#1A7CFF]/40 shadow-sm",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-[#0b0f1c] md:gap-4 md:px-5 md:py-4 md:text-base"
      >
        {item.question}
        <Plus
          className={cn(
            "size-5 shrink-0 text-[#5d6a82] transition-all duration-300",
            isOpen && "rotate-45 text-[#1A7CFF]",
          )}
          strokeWidth={2}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "border-t border-[#e3e8f1] px-4 pb-3.5 pt-2.5 text-sm leading-relaxed text-[#3f4a60] transition-opacity duration-300 md:px-5 md:pb-4 md:pt-3",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  )
}

const FAQ_ITEMS = [
  {
    question: "요금제는 언제, 어디서 신청하나요?",
    answer:
      "회원가입 시 일반 요금제가 적용돼요. 별도 요금제 신청 없이 서비스를 이용할 수 있어요.",
  },
  {
    question: "언제 결제하나요?",
    answer:
      "채용이 확정되고 입사가 확인된 이후에 결제해요. 면접 전이나 채용 과정 중에는 비용이 청구되지 않아요.",
  },
  {
    question: "크레딧 결제는 일반 결제와 무엇이 다른가요?",
    answer:
      "크레딧은 미리 충전해 두고, 채용 1명당 300 크레딧이 차감되는 방식이에요. 일반 결제(300만 원)와 달리 충전 시 할인이 적용되어 1명당 실질 비용이 낮아져요. 연봉과 무관하게 1명 기준으로 동일하게 적용돼요.",
  },
  {
    question: "크레딧은 언제 충전하고, 언제 차감되나요?",
    answer:
      "결제일 이전에 미리 충전할 수 있고, 잔여 크레딧이 있다면 입사일 기준으로 자동 차감돼요.",
  },
  {
    question: "수수료는 어떻게 책정되나요?",
    answer:
      "연봉과 무관하게 채용 1명당 300만 원(VAT 별도)의 정찰제가 적용돼요. 포지션 연봉이 높아져도 수수료는 동일해요.",
  },
  {
    question: "보증기간과 재추천은 어떻게 진행되나요?",
    answer: "입사일 기준 한 달 이내 자진퇴사 시 재추천을 제공해요.",
  },
] as const

export function IntroFaqSection() {
  return (
    <IntroSection id="faq">
      <IntroSectionHeading title="궁금한 점, 미리 정리해뒀어요" />

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <IntroFaqItem key={item.question} item={item} defaultOpen={index === 0} />
        ))}
      </div>
    </IntroSection>
  )
}
