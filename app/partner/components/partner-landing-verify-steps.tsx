import type { ReactNode } from "react"
import { BadgeCheck, FileText, Minus, Plus } from "lucide-react"
import { PartnerLandingStepFlow, PartnerLandingStepFlowItem } from "./partner-landing-step-flow"

function SignupMock() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FEE500] text-[14px] font-bold text-[#191919]">
        {/* eslint-disable-next-line @next/next/no-img-element -- 정적 브랜드 로고 */}
        <img src="/brand/kakao-logo.png" alt="" width={18} height={18} className="shrink-0" />
        카카오로 시작하기
      </span>
      <span className="text-[11.5px] text-zinc-500">가입하면 파트너 프로필이 바로 만들어져요</span>
    </div>
  )
}

function MockField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold text-zinc-600">{label}</span>
      {children}
    </div>
  )
}

function VerifyFormMock() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2">
        <MockField label="소속">
          <span className="flex h-8 items-center rounded-lg border border-neutral-200 bg-white px-2.5 text-[12px] text-zinc-900">
            스타팅서치
          </span>
        </MockField>
        <MockField label="리크루팅 경력">
          <span className="flex items-center gap-1">
            <span className="flex h-8 min-w-0 flex-1 items-center justify-between rounded-lg border border-neutral-200 bg-white px-2.5 text-[12px] text-zinc-900 tabular-nums">
              7<span className="text-neutral-500">년</span>
            </span>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500">
              <Minus className="size-3" strokeWidth={2} />
            </span>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500">
              <Plus className="size-3" strokeWidth={2} />
            </span>
          </span>
        </MockField>
      </div>
      <MockField label="경력 확인 가능한 서류">
        <span className="flex h-8 items-center gap-1.5 rounded-lg bg-white px-2.5 text-[12px] font-medium text-zinc-800 ring-1 ring-neutral-200">
          <FileText className="size-3.5 shrink-0 text-[#1A7CFF]" strokeWidth={2} />
          재직증명서.pdf
        </span>
      </MockField>
      <span className="mt-0.5 flex h-8 items-center justify-center rounded-lg bg-[#1A7CFF] text-[12px] font-semibold text-white">
        인증 심사 신청
      </span>
    </div>
  )
}

function VerifiedMock() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-zinc-200">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-bold text-zinc-600">
          김
        </span>
        <span className="text-[13px] font-semibold text-zinc-900">김OO 님</span>
        <span className="inline-flex h-5 shrink-0 items-center gap-0.5 rounded-full bg-[#1A7CFF]/10 px-1.5 text-[11px] font-semibold text-[#1A7CFF]">
          <BadgeCheck className="size-3" strokeWidth={2.25} />
          인증 파트너
        </span>
      </div>
      <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 ring-1 ring-[#1A7CFF]/20">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1A7CFF]/10 text-[#1A7CFF]">
          <BadgeCheck className="size-4" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-zinc-900">인증 파트너예요</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-zinc-600">
            공고목록에서 연봉과 소싱 가이드를 볼 수 있어요.
          </p>
        </div>
      </div>
    </div>
  )
}

const VERIFY_STEPS: Array<{ title: string; description: string; mock: ReactNode }> = [
  { title: "가입", description: "스타팅 계정으로 1분이면 가입해요", mock: <SignupMock /> },
  {
    title: "경력 인증 신청",
    description: "소속, 리크루팅 경력과 경력 확인 서류(재직증명서, 경력증명서, 명함 등)를 제출해요",
    mock: <VerifyFormMock />,
  },
  {
    title: "인증 파트너 부여",
    description: "심사가 끝나면 인증 파트너 배지가 붙고 모든 정보가 열려요",
    mock: <VerifiedMock />,
  },
]

export function PartnerLandingVerifySteps() {
  return (
    <PartnerLandingStepFlow>
      {VERIFY_STEPS.map((step, index) => (
        <PartnerLandingStepFlowItem key={step.title} connector={index === VERIFY_STEPS.length - 1 ? "none" : "next"}>
          <div className="flex flex-col gap-1.5">
            <p className="text-[17px] font-bold tracking-tight text-zinc-900">{step.title}</p>
            <p className="text-[13.5px] leading-relaxed text-zinc-500">{step.description}</p>
          </div>
          <div className="mt-auto flex min-h-[180px] flex-col justify-center rounded-2xl bg-zinc-50 p-4" aria-hidden>
            {step.mock}
          </div>
        </PartnerLandingStepFlowItem>
      ))}
    </PartnerLandingStepFlow>
  )
}
