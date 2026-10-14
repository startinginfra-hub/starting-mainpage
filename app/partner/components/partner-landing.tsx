import type { ReactNode } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarCheck,
  ChevronDown,
  FileSearch,
  Send,
  type LucideIcon,
} from "lucide-react"
import { PartnerLandingGuidePreview } from "@/app/partner/components/partner-landing-guide-preview"
import { PartnerLandingMatchingPreview } from "@/app/partner/components/partner-landing-matching-preview"
import { PartnerLandingPostingPreview } from "@/app/partner/components/partner-landing-posting-preview"
import { PartnerLandingSendGuide } from "@/app/partner/components/partner-landing-send-guide"
import { PartnerLandingTierCompare } from "@/app/partner/components/partner-landing-tier-compare"
import { PartnerLandingVerifySteps } from "@/app/partner/components/partner-landing-verify-steps"
import {
  PartnerLandingNotificationSequence,
  type PartnerLandingNotification,
} from "@/app/partner/components/partner-landing-notifications"
import {
  PARTNER_FEE_SHARE_RATE,
  PARTNER_SIGN_ON_BONUS_MAN_WON,
  PARTNER_STANDARD_FEE_MAN_WON,
  PARTNER_WITHHOLDING_TAX_RATE,
  partnerFeeManWon,
} from "@/lib/partner/partner-fee"
import { PARTNER_LOGIN_URL } from "@/lib/intro/intro-tokens"
import { AiIcon } from "@/components/icons/ai-icon"
import { cn } from "@/lib/utils"

const PARTNER_SHARE_PERCENT = Math.round(PARTNER_FEE_SHARE_RATE * 100)
const EXAMPLE_SALARY_MAN_WON = 5000
const EXAMPLE_FEE_MAN_WON = partnerFeeManWon(EXAMPLE_SALARY_MAN_WON)
const WITHHOLDING_TAX_PERCENT = Math.round(PARTNER_WITHHOLDING_TAX_RATE * 1000) / 10
const EXAMPLE_WITHHOLDING_MAN_WON = Math.round(EXAMPLE_FEE_MAN_WON * PARTNER_WITHHOLDING_TAX_RATE)
const SIGN_ON_BONUS_WITHHOLDING_MAN_WON =
  Math.round(PARTNER_SIGN_ON_BONUS_MAN_WON * PARTNER_WITHHOLDING_TAX_RATE * 10) / 10
function manWon(value: number) {
  return `${value.toLocaleString("ko-KR")}만원`
}

const FEE_EMPHASIS = <span className="font-bold text-[#126FE3]">{manWon(EXAMPLE_FEE_MAN_WON)}</span>

const WAITING_NOTIFICATIONS: PartnerLandingNotification[] = [
  {
    time: "3개월 전",
    body: (
      <>
        추천하신 후보자가 최종 합격해 입사했어요. <span className="font-bold text-[#126FE3]">3개월 후</span> 수수료를
        정산해 드려요.
      </>
    ),
  },
  {
    time: "1분 전",
    body: (
      <>
        추천하신 후보자가 입사한 지 3개월이 되었어요. 수수료 받을 <span className="font-bold text-[#126FE3]">계좌번호</span>를 입력해
        주세요.
      </>
    ),
  },
  {
    time: "지금",
    body: <>계좌 등록이 완료됐어요. {FEE_EMPHASIS} 입금 예정이에요.</>,
  },
]

type CycleOwner = "me" | "starting" | "reward"

type CycleStep = { title: string; description: string; Icon: LucideIcon; owner: CycleOwner }

const CYCLE_STEPS: CycleStep[] = [
  { title: "후보자 추천", description: "가이드에 맞는 후보자에게 내 추천 링크를 보내요", Icon: Send, owner: "me" },
  {
    title: "적합 검토",
    description: "공고 요건과 맞는지 승인 또는 반려 처리돼요",
    Icon: FileSearch,
    owner: "starting",
  },
  { title: "기업 전달", description: "적합한 후보자를 기업에 추천해요", Icon: Building2, owner: "starting" },
  { title: "전형 관리", description: "일정 조율부터 합격 안내까지", Icon: CalendarCheck, owner: "starting" },
  { title: "최종 입사", description: "입사일부터 정산 기간 3개월이 시작돼요", Icon: BadgeCheck, owner: "starting" },
  { title: "수수료 입금", description: "입사 3개월 후 내 통장으로", Icon: Banknote, owner: "reward" },
]

const CYCLE_STARTING_STEPS = CYCLE_STEPS.filter((step) => step.owner === "starting")
const CYCLE_STARTING_FIRST_INDEX = CYCLE_STEPS.findIndex((step) => step.owner === "starting")

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "누가 인증 파트너가 될 수 있나요?",
    answer:
      "헤드헌터·리크루터 경력이 있는 분이라면 신청할 수 있어요. 가입 후 소속과 리크루팅 경력, 경력 확인 서류(건강보험자격득실확인서, 재직증명서, 경력증명서, 명함 등)를 제출하면 심사를 거쳐 인증 파트너가 돼요.",
  },
  {
    question: "인증 전에도 추천할 수 있나요?",
    answer:
      "네. 인증 전에는 일반 파트너로 공고를 보고 추천할 수 있어요. 다만 연봉 범위와 소싱 가이드(기업 인재상, 세부 조건, 탈락 사유 히스토리)는 인증 파트너에게만 공개돼요.",
  },
  {
    question: "소싱 가이드는 누가 만드나요?",
    answer:
      "스타팅 소속 헤드헌터가 기업과 직접 소통하고 실제 스크리닝을 진행하며 정리해요. 기업 인재상, 세부 조건, 지금까지의 탈락 사유까지 담겨 있어 적합한 후보자만 골라 추천할 수 있어요.",
  },
  {
    question: "추천한 뒤에 제가 따로 할 일이 있나요?",
    answer: "없어요. 기업과의 소통부터 면접 일정, 채용 전형 관리까지 스타팅 헤드헌터가 모두 맡아요.",
  },
  {
    question: "추천하면 모두 기업에 전달되나요?",
    answer:
      "아니요. 스타팅 헤드헌터가 공고 요건과 맞는지 먼저 검토하고, 적합하다고 판단된 후보자만 기업에 전달해요. 그래서 기업도 추천 후보자를 더 믿고 검토해요. 수수료는 추천한 후보자가 최종 입사했을 때만 발생해요.",
  },
  {
    question: "수수료는 언제 받나요?",
    answer:
      "추천한 후보자가 입사 후 90일 동안 재직하면 수수료가 확정돼요. 매월 말일까지 확정된 수수료는 다음 달 15일에 지급해요. 진행 상황은 로그인 후 매칭현황에서 확인할 수 있어요.",
  },
  {
    question: "세금은 어떻게 처리되나요?",
    answer: `수수료와 후보자의 이직 축하금 모두 소득세법에 따라 기타소득세 ${WITHHOLDING_TAX_PERCENT}%를 원천징수한 뒤 지급해요. 예를 들어 수수료가 ${manWon(EXAMPLE_FEE_MAN_WON)}이면 ${manWon(EXAMPLE_WITHHOLDING_MAN_WON)}을 제외한 ${manWon(EXAMPLE_FEE_MAN_WON - EXAMPLE_WITHHOLDING_MAN_WON)}을, 이직 축하금 ${manWon(PARTNER_SIGN_ON_BONUS_MAN_WON)}은 ${manWon(SIGN_ON_BONUS_WITHHOLDING_MAN_WON)}을 제외한 ${manWon(PARTNER_SIGN_ON_BONUS_MAN_WON - SIGN_ON_BONUS_WITHHOLDING_MAN_WON)}을 받아요.`,
  },
  {
    question: "후보자가 꼭 제 링크로 지원해야 하나요?",
    answer:
      "네. 내 추천 링크로 들어와 지원하면 자동으로 내 추천으로 기록돼요. 링크 없이 지원하면 추천으로 인정되지 않을 수 있으니 링크로 지원하도록 안내해 주세요.",
  },
  {
    question: "제 링크로 제가 직접 지원해도 되나요?",
    answer: "아니요. 본인 추천은 인정되지 않아요. 내 계정이나 내 연락처로 들어온 지원은 추천에서 자동으로 제외돼요.",
  },
]

function PartnerLandingCta({
  className,
  variant = "primary",
  label = "리크루팅 파트너 시작하기",
}: {
  className?: string
  variant?: "primary" | "inverse"
  label?: string
}) {
  return (
    <a
      href={PARTNER_LOGIN_URL}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl px-6 text-[15px] font-semibold transition-all",
        variant === "primary"
          ? "bg-[#1A7CFF] text-white shadow-[0_8px_24px_-8px_rgba(26,124,255,0.6)] hover:bg-[#126FE3]"
          : "bg-white text-[#126FE3] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] hover:bg-blue-50",
        className,
      )}
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden />
    </a>
  )
}

function CycleIcon({ step, className }: { step: CycleStep; className?: string }) {
  return (
    <span
      className={cn(
        "relative flex size-12 shrink-0 items-center justify-center rounded-full text-white ring-4 ring-white",
        step.owner === "me" && "bg-zinc-900",
        step.owner === "starting" && "bg-[#1A7CFF]",
        step.owner === "reward" && "bg-gradient-to-br from-[#1A7CFF] to-[#6B5CFF]",
        className,
      )}
    >
      <step.Icon className="size-5" strokeWidth={2.2} aria-hidden />
    </span>
  )
}

function CycleText({ step, align }: { step: CycleStep; align: "center" | "left" }) {
  return (
    <div className={cn("flex flex-col gap-1", align === "center" ? "items-center text-center" : "items-start")}>
      <p
        className={cn(
          "text-[15px] font-bold",
          step.owner === "me" ? "text-zinc-900" : step.owner === "reward" ? "text-[#126FE3]" : "text-zinc-800",
        )}
      >
        {step.title}
      </p>
      <p className="whitespace-pre-line text-[13px] leading-snug text-zinc-500">{step.description}</p>
    </div>
  )
}

function CycleOwnerLabel({ owner, children }: { owner: CycleOwner; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center self-start rounded-full px-3 py-1 text-[12px] font-bold lg:self-auto",
        owner === "me" && "bg-zinc-900 text-white",
        owner === "starting" && "bg-[#1A7CFF] text-white",
        owner === "reward" && "bg-gradient-to-r from-[#1A7CFF] to-[#6B5CFF] text-white",
      )}
    >
      {children}
    </span>
  )
}

const CYCLE_OWNER_LABEL: Record<CycleOwner, string> = {
  me: "나 · 인증 파트너",
  starting: "스타팅 헤드헌터가 진행",
  reward: "내 통장",
}

function CycleTimelineDesktop() {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-rows-[auto_auto]" style={{ gridTemplateColumns: `repeat(${CYCLE_STEPS.length}, minmax(0, 1fr))` }}>
        <div
          className="row-span-2 row-start-1 rounded-2xl bg-[#1A7CFF]/[0.06] ring-1 ring-[#1A7CFF]/15"
          style={{ gridColumn: `${CYCLE_STARTING_FIRST_INDEX + 1} / span ${CYCLE_STARTING_STEPS.length}` }}
        />
        {CYCLE_STEPS.map((step, index) =>
          step.owner === "starting" && index !== CYCLE_STARTING_FIRST_INDEX ? null : (
            <div
              key={step.owner}
              className="row-start-1 flex justify-center pb-5 pt-4"
              style={{
                gridColumn:
                  step.owner === "starting"
                    ? `${index + 1} / span ${CYCLE_STARTING_STEPS.length}`
                    : `${index + 1} / span 1`,
              }}
            >
              <CycleOwnerLabel owner={step.owner}>{CYCLE_OWNER_LABEL[step.owner]}</CycleOwnerLabel>
            </div>
          ),
        )}

        {CYCLE_STEPS.map((step, index) => (
          <div
            key={step.title}
            className="relative row-start-2 flex flex-col items-center gap-4 px-2 pb-6"
            style={{ gridColumnStart: index + 1 }}
          >
            {index > 0 ? <span className="absolute left-0 right-1/2 top-6 h-0.5 bg-[#1A7CFF]/30" /> : null}
            {index < CYCLE_STEPS.length - 1 ? (
              <span className="absolute left-1/2 right-0 top-6 h-0.5 bg-[#1A7CFF]/30" />
            ) : null}
            <CycleIcon step={step} />
            <CycleText step={step} align="center" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CycleTimelineMobile() {
  return (
    <ol className="relative flex flex-col gap-3 lg:hidden">
      <span className="pointer-events-none absolute bottom-9 left-9 top-9 w-0.5 -translate-x-1/2 bg-[#1A7CFF]/25" />
      {CYCLE_STEPS.map((step) => (
        <li
          key={step.title}
          className={cn(
            "relative flex items-start gap-3 rounded-2xl p-4 ring-1",
            step.owner === "starting" ? "bg-[#EEF5FF] ring-[#1A7CFF]/20" : "bg-white ring-zinc-200/80",
          )}
        >
          <CycleIcon step={step} className="size-10 ring-0 [&>svg]:size-4" />
          <CycleText step={step} align="left" />
          {step.owner === "starting" ? (
            <span className="absolute right-4 top-4 rounded-full bg-[#1A7CFF] px-2 py-0.5 text-[11px] font-bold text-white">
              {CYCLE_OWNER_LABEL.starting}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

function SectionHeading({ title }: { title: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-zinc-900 sm:text-[30px]">{title}</h2>
    </div>
  )
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[400px]" aria-hidden>
      <div className="absolute -inset-x-2 -inset-y-6 rounded-[2rem] sm:-inset-6 bg-[#1A7CFF]/20 blur-3xl" />

      <PartnerLandingGuidePreview />
    </div>
  )
}

export function PartnerLanding() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 break-keep pb-6 sm:gap-36">
      <section className="relative py-8 sm:py-12">
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] xl:gap-16">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#126FE3] shadow-sm ring-1 ring-[#1A7CFF]/15">
              헤드헌터·리크루터 전용
            </span>
            <h1 className="text-[30px] font-extrabold leading-[1.25] tracking-[-0.03em] text-zinc-900 sm:text-[44px]">
              기업 영업, 소통 없이
              <br />
              후보자 추천만 하고{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-[#1A7CFF] to-[#6B5CFF] bg-clip-text text-transparent">
                채용 수수료의 {PARTNER_SHARE_PERCENT}% 정산
              </span>
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-zinc-600 sm:text-[16px] lg:max-w-none">
              매칭 조건부터 소싱 가이드가 정리된 공고에
              <br className="lg:hidden" />{" "}
              <strong className="font-bold text-zinc-900">후보자만 추천하면 돼요.</strong>
            </p>
            <PartnerLandingCta className="mt-1" />
          </div>
          <HeroPreview />
        </div>
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading title="가입하고 인증받으면 바로 시작" />
          <p className="text-center text-[14px] text-zinc-500 sm:text-[15px]">
            헤드헌터·리크루터 경력을 확인하고 인증 파트너를 부여해요.
          </p>
        </div>
        <PartnerLandingVerifySteps />
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading title="인증 파트너만 받는 정보" />
          <p className="text-center text-[14px] text-zinc-500 sm:text-[15px]">
            기업 인재상부터 탈락 사유까지, 적합한 후보자만 추천할 수 있도록 정리해 드려요.
          </p>
        </div>
        <PartnerLandingTierCompare />
      </section>

      <section className="flex w-full flex-col gap-8">
        <SectionHeading title="추천만 하면, 이후는 스타팅 헤드헌터가 관리해요" />
        <CycleTimelineDesktop />
        <CycleTimelineMobile />
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading
            title={
              <>
                내가 한 일은 추천 한 번,{" "}
                <span className="whitespace-nowrap bg-gradient-to-r from-[#1A7CFF] to-[#6B5CFF] bg-clip-text text-transparent">
                  수수료는 확실하게
                </span>
              </>
            }
          />
          <p className="text-center text-[14px] text-zinc-500 sm:text-[15px]">
            연봉이 높은 공고일수록 정산 수수료도 커져요. 최소 {manWon(PARTNER_STANDARD_FEE_MAN_WON)}부터 시작해요.
          </p>
        </div>

        <PartnerLandingPostingPreview />

        <div className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-zinc-200/80 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 flex-col justify-center p-6">
            <p className="text-[16px] font-bold tracking-tight text-zinc-900">후보자도 이직 축하금을 챙겨가요</p>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
              수수료와 별개로 스타팅이 입사한 후보자에게 지급해요. 제안이 훨씬 쉬워져요.
            </p>
          </div>
          <div className="relative flex items-center justify-between gap-1 border-t-2 border-dashed border-[#1A7CFF]/20 bg-[#EEF5FF] px-6 py-4 sm:w-60 sm:flex-col sm:items-start sm:justify-center sm:border-l-2 sm:border-t-0 sm:py-6">
            <span
              className="absolute -left-3 -top-3 size-6 rounded-full bg-[#FAFAFC] ring-1 ring-zinc-200/80"
              aria-hidden
            />
            <span
              className="absolute -right-3 -top-3 size-6 rounded-full bg-[#FAFAFC] ring-1 ring-zinc-200/80 sm:-bottom-3 sm:-left-3 sm:right-auto sm:top-auto"
              aria-hidden
            />
            <span className="text-[12.5px] font-semibold text-[#126FE3]">이직 축하금</span>
            <span className="bg-gradient-to-r from-[#1A7CFF] to-[#6B5CFF] bg-clip-text text-[30px] font-extrabold tracking-tight text-transparent tabular-nums">
              {manWon(PARTNER_SIGN_ON_BONUS_MAN_WON)}
            </span>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading title="추천 이후도 한눈에" />
          <p className="text-center text-[14px] text-zinc-500 sm:text-[15px]">
            스타팅 검토부터 면접, 입사, 정산까지 단계별로 한눈에 보여요.
          </p>
        </div>
        <PartnerLandingMatchingPreview />
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <SectionHeading title="내가 할 일은 이게 전부예요" />
          <p className="text-center text-[14px] text-zinc-500 sm:text-[15px]">
            가이드를 보고 맞는 후보자에게 링크만 보내면 끝이에요.
          </p>
        </div>
        <PartnerLandingSendGuide />

        <div className="-mt-2 grid items-center gap-5 rounded-[1.5rem] bg-white p-5 ring-1 ring-zinc-200/80 md:-mt-1 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[17px] font-bold tracking-tight text-zinc-900">계좌번호 입력</h3>
            <p className="text-[13.5px] leading-relaxed text-zinc-500">
              내가 추천한 후보자가 입사 후 3개월이 지나면 스타팅에서 계좌입력 요청을 드려요. 이때 계좌번호를
              입력하면 끝나요.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-50 p-4 sm:p-6">
            <PartnerLandingNotificationSequence notifications={WAITING_NOTIFICATIONS} />
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col gap-6">
        <h2 className="text-center text-[24px] font-extrabold tracking-[-0.02em] text-zinc-900 sm:text-[30px]">
          자주 묻는 질문
        </h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-white px-5 ring-1 ring-zinc-200/80 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-zinc-900">
                <span className="flex min-w-0 items-center gap-2.5">
                  <AiIcon size={16} className="shrink-0" />
                  {item.question}
                </span>
                <ChevronDown
                  className="size-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="pb-5 text-[14px] leading-relaxed text-zinc-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative w-full overflow-hidden rounded-[2rem] bg-zinc-900 px-6 py-14 text-center sm:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A7CFF]/40 blur-3xl" />
        <div className="relative flex flex-col items-center gap-4">
          <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-white sm:text-[32px]">
            정리된 가이드로, 추천에만 집중하세요
          </h2>
          <p className="text-[14px] text-zinc-400 sm:text-[15px]">검증된 공고와 연봉 정보를 인증 파트너로 받아보세요.</p>
          <PartnerLandingCta variant="inverse" className="mt-3" />
        </div>
      </section>
    </div>
  )
}
