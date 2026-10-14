import type { ReactNode } from "react"
import { Building2, Check, Copy, Link2 } from "lucide-react"
import { formatPartnerFeeRange } from "@/lib/partner/partner-fee"
import { cn } from "@/lib/utils"
import { PartnerLandingStepFlow, PartnerLandingStepFlowItem } from "./partner-landing-step-flow"

const PICK_POSTINGS = [
  { title: "UX 디자이너", fee: formatPartnerFeeRange(4000, 6000, true), selected: true },
  { title: "콘텐츠 마케터", fee: formatPartnerFeeRange(null, null, false), selected: false },
]

function PickMock() {
  return (
    <div className="flex flex-col gap-2">
      {PICK_POSTINGS.map((posting) => (
        <div
          key={posting.title}
          className={cn(
            "flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5",
            posting.selected ? "ring-2 ring-[#1A7CFF]" : "ring-1 ring-zinc-200",
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1A7CFF]/10 text-[#1A7CFF]">
            <Building2 className="size-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-zinc-800">{posting.title}</span>
          <span className="shrink-0 rounded-full bg-[#1A7CFF]/[0.08] px-2 py-0.5 text-[11px] font-bold text-[#126FE3] tabular-nums">
            {posting.fee}
          </span>
        </div>
      ))}
    </div>
  )
}

function CopyMock() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#1A7CFF] text-[13px] font-semibold text-white">
        <Copy className="size-3.5" strokeWidth={2} />
        추천 링크 복사
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-2 text-[12px] font-medium text-white">
        <Check className="size-3.5 text-[#5AA2FF]" strokeWidth={2.6} />
        추천 링크가 복사됐어요
      </span>
    </div>
  )
}

function ShareMock() {
  return (
    <div className="flex flex-col items-end gap-1.5 rounded-xl bg-[#BACEE0] p-3">
      <p className="rounded-[12px] rounded-tr-[4px] bg-[#FEE500] px-3 py-2 text-[12.5px] text-zinc-900">
        안녕하세요, 김OO님. 경력과 결이 맞는 포지션이 있어 제안드립니다.
      </p>
      <span className="inline-flex items-center gap-1 rounded-[10px] bg-white px-2.5 py-1.5 text-[11.5px] text-zinc-500">
        <Link2 className="size-3.5 text-[#1A7CFF]" strokeWidth={2} />
        starting.kr/career/jd/…
      </span>
    </div>
  )
}

const GUIDE_STEPS: Array<{ title: string; description: string; mock: ReactNode }> = [
  {
    title: "공고와 가이드 확인",
    description: "연봉 범위와 소싱 가이드를 보고 맞는 후보자를 떠올려요",
    mock: <PickMock />,
  },
  { title: "추천 링크 복사", description: "버튼 한 번으로 내 전용 링크가 복사돼요", mock: <CopyMock /> },
  { title: "후보자에게 전달", description: "평소 쓰는 채널로 후보자에게 보내면 끝", mock: <ShareMock /> },
]

export function PartnerLandingSendGuide() {
  return (
    <PartnerLandingStepFlow>
      {GUIDE_STEPS.map((step, index) => (
        <PartnerLandingStepFlowItem key={step.title} connector={index === GUIDE_STEPS.length - 1 ? "below" : "next"}>
          <div className="flex flex-col gap-1.5">
            <p className="text-[17px] font-bold tracking-tight text-zinc-900">{step.title}</p>
            <p className="text-[13.5px] leading-relaxed text-zinc-500">{step.description}</p>
          </div>
          <div className="mt-auto flex min-h-[132px] flex-col justify-center rounded-2xl bg-zinc-50 p-4" aria-hidden>
            {step.mock}
          </div>
        </PartnerLandingStepFlowItem>
      ))}
    </PartnerLandingStepFlow>
  )
}
