"use client"

import { IntroClientLogo } from "../intro-client-logo"
import { IntroTestimonialsColumn } from "../intro-testimonials-column"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { getIntroClientLogo, type IntroClientLogoItem } from "@/lib/intro/intro-tokens"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const TESTIMONIALS = [
  {
    company: "오늘훈남",
    logoId: "onulhunnam",
    quote: "채용 과정이 효율적으로 바뀌었어요",
    role: "오늘훈남 CEO",
  },
  {
    company: "SECUWOW",
    logoId: "secuwow",
    quote: "정보보호 컨설팅 전문기업의 까다로운 채용 기준에 맞는 인재를 정확히 찾아주셨어요",
    role: "시큐와우 채용 담당자",
  },
  {
    company: "Terracle",
    logoId: "terracle",
    quote: "불필요한 인터뷰 없이 적합한 인재만 만나볼 수 있어 시간을 크게 아꼈어요",
    role: "테라클 CEO",
  },
  {
    company: "똑똑한 개발자",
    logoId: "toktokhan",
    quote: "매칭 리포트를 통해 인재 정보를 한눈에 볼 수 있어서 시간 단축에 큰 도움이 되었어요.",
    role: "똑똑한 개발자 HR 담당자",
  },
  {
    company: "CAREERABLE",
    quote: "원하는 기준을 충분히 갖춘 인재 중에서 고를 수 있었어요",
    role: "커리어블 CEO",
  },
  {
    company: "acrossB",
    logoId: "acrossb",
    quote: "채용 매니저분이 밀착해서 관리해주셔서 정말 마음에 들어요 이정도면 사내 인사팀 아닌가요?!",
    role: "어크로스비 HR 담당자",
  },
  {
    company: "해그로시",
    logoId: "hgrs",
    quote: "지금 바로 필요한 인재를 신속하게 채용할 수 있었어요",
    role: "해그로시 CEO",
  },
  {
    company: "PIA",
    logoId: "pia",
    quote: "채용에 들어가는 시간 획기적으로 줄일 수 있었어요",
    role: "피아스페이스 COO",
  },
] as const satisfies readonly {
  company: string
  logoId?: IntroClientLogoItem["id"]
  quote: string
  role: string
}[]

const TESTIMONIAL_COLUMN_DURATION_SEC = 60
const COLUMN_PHASE_COUNT = 3

function TestimonialCard({
  company,
  logoId,
  quote,
  role,
}: (typeof TESTIMONIALS)[number]) {
  const logo = logoId ? getIntroClientLogo(logoId) : undefined

  return (
    <article className="flex w-full max-w-sm flex-col items-start rounded-2xl border border-[#e3e8f1] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#1A7CFF]/30 hover:shadow-md md:max-w-none md:p-6">
      {logo ? (
        <IntroClientLogo
          name={logo.name}
          src={logo.src}
          cardScale={logo.cardScale}
          variant="card"
        />
      ) : (
        <span className="flex h-8 items-center text-sm font-semibold text-[#3f4a60] md:h-9">
          {company}
        </span>
      )}
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#0b0f1c]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="mt-4 text-xs text-[#5d6a82]">{role}</p>
    </article>
  )
}

function TestimonialsColumns() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div
      className={cn(
        "flex justify-center gap-6",
        reducedMotion
          ? "flex-wrap"
          : "intro-testimonials-scroll-mask max-h-[min(440px,52vh)] overflow-hidden md:max-h-[min(460px,50vh)]",
      )}
    >
      <IntroTestimonialsColumn
        items={TESTIMONIALS}
        phaseIndex={0}
        phaseCount={COLUMN_PHASE_COUNT}
        duration={TESTIMONIAL_COLUMN_DURATION_SEC}
        getItemKey={(item) => item.company}
        renderItem={(item) => <TestimonialCard {...item} />}
      />
      <IntroTestimonialsColumn
        className="hidden md:flex"
        items={TESTIMONIALS}
        phaseIndex={1}
        phaseCount={COLUMN_PHASE_COUNT}
        duration={TESTIMONIAL_COLUMN_DURATION_SEC}
        getItemKey={(item) => item.company}
        renderItem={(item) => <TestimonialCard {...item} />}
      />
      <IntroTestimonialsColumn
        className="hidden lg:flex"
        items={TESTIMONIALS}
        phaseIndex={2}
        phaseCount={COLUMN_PHASE_COUNT}
        duration={TESTIMONIAL_COLUMN_DURATION_SEC}
        getItemKey={(item) => item.company}
        renderItem={(item) => <TestimonialCard {...item} />}
      />
    </div>
  )
}

export function IntroTestimonialsSection() {
  return (
    <IntroSection>
      <IntroSectionHeading
        title="이유 있는 선택"
        subtitle="스타팅을 통해 많은 기업이 채용 효율을 올리고 있어요."
      />

      <TestimonialsColumns />
    </IntroSection>
  )
}
