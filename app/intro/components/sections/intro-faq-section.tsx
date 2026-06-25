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
      "회원가입 시 기본적으로 후불 요금제가 적용되며, 선불 요금제 이용을 원할 경우 담당 매니저에게 요청하시면 됩니다.",
  },
  {
    question: "후불 요금제 이용 중간에 선불 요금제로 변경할 수 있나요?",
    answer:
      "선불 요금제는 결제 완료 시점부터 적용됩니다. 따라서 채용 전형 진행 중이라도 면접 이전에 결제가 완료된 경우에만 선불 요금제로 인정됩니다. 만약 결제 전에 면접이 진행되면, 해당 인재는 자동으로 후불 요금제가 적용되며, 이후 소급 적용은 불가합니다.",
  },
  {
    question: "선불 요금제 이용 중간에 후불 요금제로 변경할 수 있나요?",
    answer:
      "선불 티켓이 먼저 차감되며, 이후 잔여 티켓이 부족한 포지션은 자동으로 후불제로 적용됩니다.",
  },
  {
    question: "선불 요금제는 어떤 프로세스로 진행되나요?",
    answer:
      "선불 요금제는 '채용 카운트' 방식으로 운영되며, 채용 확정 시 1명당 카운트 1개가 차감됩니다. 매칭 프로세스는 후불제와 동일하게 진행됩니다.",
  },
  {
    question: "선불 요금제 보증기간과 재추천은 어떻게 진행되나요?",
    answer: "입사일 기준 한 달 이내 자진퇴사 시, 카운트 원복 혹은 재추천을 제공합니다.",
  },
  {
    question: "선불 요금제 만료 기한이 지나면 어떻게 되나요?",
    answer: "잔여 티켓은 기한 만료와 함께 모두 소멸됩니다.",
  },
  {
    question: "선불 요금제 최대 지원 카운트 모두 소진시 어떻게 되나요?",
    answer: "후불 요금제가 자동 적용됩니다.",
  },
  {
    question: "선불 요금제 잔여 카운트가 남아있는 상태에서 추가 결제를 하면 어떻게 되나요?",
    answer:
      "선불 요금제 추가 결제를 하실 경우, 서비스 이용 기간은 초기화되며, 기존에 남아 있던 카운트는 소멸되지 않고 그대로 누적되어 함께 사용하실 수 있습니다.",
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
