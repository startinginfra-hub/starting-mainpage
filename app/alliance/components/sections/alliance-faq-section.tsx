"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"

const FAQ_ITEMS = [
  {
    question: "어떤 포지션을 신청할 수 있나요?",
    answer: "매칭 신청 시 제시 연봉이 4,000만 원 이상인 포지션만 신청할 수 있어요.",
  },
  {
    question: "수수료는 어떻게 책정되나요?",
    answer:
      "연봉 구간과 관계없이 채용 후보자의 첫 해 총 보수의 20%가 적용돼요. (부가가치세 별도)",
  },
  {
    question: "언제 결제하나요?",
    answer:
      "채용이 확정되고 입사가 확인된 이후에 크레딧이 차감돼요. 면접 전이나 채용 과정 중에는 비용이 청구되지 않아요.",
  },
  {
    question: "크레딧은 어떻게 충전하나요?",
    answer: "카드 결제 또는 계좌이체로 충전할 수 있고, 1 크레딧은 1만 원이에요. 충전한 크레딧은 유효기간 없이 사용할 수 있어요.",
  },
] as const

type FaqItem = (typeof FAQ_ITEMS)[number]

function AllianceFaqItem({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        "rounded-xl border bg-[#0f131c] transition-colors duration-300",
        isOpen ? "border-[#d9b877]/35" : "border-white/[0.08]",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-white md:gap-4 md:px-5 md:text-base"
      >
        {item.question}
        <Plus
          className={cn(
            "size-5 shrink-0 text-white/40 transition-all duration-300",
            isOpen && "rotate-45 text-[#d9b877]",
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
              "border-t border-white/[0.08] px-4 pb-4 pt-3 text-sm leading-relaxed text-white/60 transition-opacity duration-300 md:px-5",
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

export function AllianceFaqSection() {
  return (
    <AllianceSection id="faq" variant="alt">
      <AllianceSectionHeading title="자주 묻는 질문" />

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <AllianceFaqItem key={item.question} item={item} defaultOpen={index === 0} />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-white/40 md:text-sm">
        자세한 이용 조건은{" "}
        <Link href="/tos/alliance" className="text-white/70 underline underline-offset-4 hover:text-white">
          스타팅 얼라이언스 이용약관
        </Link>
        에서 확인할 수 있어요.
      </p>
    </AllianceSection>
  )
}
