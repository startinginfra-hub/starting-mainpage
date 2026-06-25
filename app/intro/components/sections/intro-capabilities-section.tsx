import type { ReactNode } from "react"
import {
  CalendarClock,
  FileSearch,
  FileText,
  Handshake,
  Kanban,
  Layers,
  Mail,
  MessageSquare,
  NotebookPen,
  Receipt,
  ScanSearch,
  Sparkles,
  Tags,
  UserRoundCheck,
  UserSearch,
  type LucideIcon,
} from "lucide-react"
import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { cn } from "@/lib/utils"

type CapabilityKind = "기능" | "특징"

const KIND_BADGE_CLASS: Record<CapabilityKind, string> = {
  기능: "bg-[#eef5ff] text-[#1A7CFF]",
  특징: "bg-[#f3e8ff] text-[#7C3AED]",
}

const STATUS_BADGE_CLASS = "bg-[#eef1f7] text-[#5d6a82]"

const BADGE_BASE_CLASS =
  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold md:text-[11px]"

const ICON_ACCENT_CLASS: Record<CapabilityKind, { wrap: string; icon: string }> = {
  기능: { wrap: "bg-[#eef5ff]", icon: "text-[#1A7CFF]" },
  특징: { wrap: "bg-[#f3e8ff]", icon: "text-[#7C3AED]" },
}

const DEFAULT_ICON_ACCENT = ICON_ACCENT_CLASS.기능

// 특징(서비스 순) → 기능(포지션 준비 → 매칭 → 채용 마무리)
const CAPABILITIES: ReadonlyArray<{
  icon: LucideIcon
  title: string
  description: ReactNode
  kind?: CapabilityKind
  status?: "제공 예정"
}> = [
  {
    icon: UserRoundCheck,
    title: "담당 헤드헌터 배정",
    kind: "특징",
    description: "전담 헤드헌터가 소싱·검토·채용 전략 등 서포트해요.",
  },
  {
    icon: UserSearch,
    title: "다이렉트 소싱",
    kind: "특징",
    description: "담당 헤드헌터 및 리쿠르터가 조건에 맞는 인재를 찾아 직접 제안하고, 지원까지 유도해요.",
  },
  {
    icon: Layers,
    title: "이중 필터링 추천",
    kind: "특징",
    description: "AI가 1차로 걸러낸 후보를 헤드헌터가 한 번 더 검토해, 핏한 소수만 추천해요.",
  },
  {
    icon: Handshake,
    title: "처우 협의 서포트",
    kind: "특징",
    description: "연봉·입사 조건 등 처우 협의 과정에서 막힘이 있다면 함께 도와드려요.",
  },
  {
    icon: Receipt,
    title: "입사 후 정찰제 결제",
    kind: "특징",
    description: "연봉과 무관하게 채용 1명당 정찰제로, 입사 확인 후 결제해요.",
  },
  {
    icon: FileText,
    title: "자동 공고 생성",
    kind: "기능",
    description: "채용 조건만 입력하면 채용 공고(JD)가 자동으로 완성돼요.",
  },
  {
    icon: Sparkles,
    title: "AI 공고 스크리닝",
    kind: "기능",
    description: "입력한 채용공고를 검토하고, 매칭 정확도를 높이는 수정을 제안해요.",
  },
  {
    icon: MessageSquare,
    title: "사전 질문 맞춤 설정",
    kind: "기능",
    description: "사전 질문으로 지원자의 경험과 의지를 미리 확인할 수 있어요.",
  },
  {
    icon: Tags,
    title: "직군별 키워드 매칭",
    kind: "기능",
    description: (
      <>
        JD에서 직군별 핵심 키워드를 추출하고,
        <br />
        인재의 프로젝트 경험과 연결해요.
      </>
    ),
  },
  {
    icon: FileSearch,
    title: "조건 분석 매칭리포트",
    kind: "기능",
    description: "이력서·경력기술서 근거와 함께 항목별 적합도를 정리해 드려요.",
  },
  {
    icon: ScanSearch,
    title: "분석 근거 하이라이트",
    kind: "기능",
    description: "조건 분석 근거를 PDF에 하이라이트해서 빠르게 서류검토할 수 있어요.",
  },
  {
    icon: Kanban,
    title: "전형관리",
    kind: "기능",
    description: "채용 전형에 맞춰 후보 단계를 기록하고 변경할 수 있어요.",
  },
  {
    icon: NotebookPen,
    title: "평가 메모",
    kind: "기능",
    description: "대표·인사담당자가 후보별 평가를 메모로 남기고 함께 검토해요.",
  },
  {
    icon: CalendarClock,
    title: "면접 일정 조율",
    kind: "기능",
    description: "면접조율 기능을 통해 직접할 수 있고, 조율 대행도 가능해요.",
  },
  {
    icon: Mail,
    title: "이메일 발송",
    status: "제공 예정",
    description: "지원자에게 이메일을 커스텀해서 발송할 수 있어요.",
  },
]

function CapabilityBadge({ children, className }: { children: ReactNode; className: string }) {
  return <span className={cn(BADGE_BASE_CLASS, className)}>{children}</span>
}

function IntroCapabilityItem({
  icon: Icon,
  title,
  description,
  kind,
  status,
}: {
  icon: LucideIcon
  title: string
  description: ReactNode
  kind?: CapabilityKind
  status?: "제공 예정"
}) {
  const iconAccent = kind ? ICON_ACCENT_CLASS[kind] : DEFAULT_ICON_ACCENT

  return (
    <article
      className={cn(
        "intro-capability-card flex h-full flex-col",
        "rounded-xl border border-[#e8ecf4] bg-white p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]",
        "md:flex-row md:gap-4 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none",
      )}
    >
      <div className="flex items-start justify-between gap-2 md:contents">
        <div
          className={cn(
            "intro-capability-icon flex size-10 shrink-0 items-center justify-center rounded-xl md:size-12",
            iconAccent.wrap,
          )}
          aria-hidden
        >
          <Icon className={cn("size-[18px] md:size-[22px]", iconAccent.icon)} strokeWidth={2} />
        </div>
        {kind || status ? (
          <div className="flex shrink-0 items-center gap-1 md:hidden">
            {kind ? <CapabilityBadge className={KIND_BADGE_CLASS[kind]}>{kind}</CapabilityBadge> : null}
            {status ? <CapabilityBadge className={STATUS_BADGE_CLASS}>{status}</CapabilityBadge> : null}
          </div>
        ) : null}
      </div>
      <div className="mt-3.5 min-w-0 w-full flex-1 md:mt-0 md:pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 font-semibold leading-snug text-[#0b0f1c] line-clamp-2 max-md:text-[15px] md:text-base md:line-clamp-none">
            {title}
          </h3>
          {kind || status ? (
            <div className="hidden shrink-0 items-center gap-1 md:flex">
              {kind ? <CapabilityBadge className={KIND_BADGE_CLASS[kind]}>{kind}</CapabilityBadge> : null}
              {status ? <CapabilityBadge className={STATUS_BADGE_CLASS}>{status}</CapabilityBadge> : null}
            </div>
          ) : null}
        </div>
        <p className="intro-capability-description mt-1.5 text-sm leading-relaxed text-[#3f4a60] max-md:text-xs">
          {description}
        </p>
      </div>
    </article>
  )
}

export function IntroCapabilitiesSection() {
  return (
    <IntroSection id="capabilities" className="bg-white">
      <IntroSectionHeading
        title="스타팅을 한눈에 확인해요"
        subtitle="인재 매칭뿐만 아니라 편의 기능까지 제공"
      />

      <IntroReveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
          {CAPABILITIES.map((item) => (
            <IntroCapabilityItem key={item.title} {...item} />
          ))}
        </div>
      </IntroReveal>
    </IntroSection>
  )
}
