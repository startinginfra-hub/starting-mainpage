import type { CSSProperties, ReactNode } from "react"
import { Check, CheckCircle2, Link2 } from "lucide-react"
import { AiIcon } from "@/components/icons/ai-icon"
import { cn } from "@/lib/utils"
import { PERSONA_JOB_POSTING_URL, PERSONA_POSITION } from "../alliance-persona-content"
import { PersonaScreenShell, type PersonaScreenProps } from "./persona-screen-shell"

const TIMELINE = {
  pasteHint: 300,
  pasteHintOut: 1100,
  paste: 600,
  press: 1000,
  analyze: 1050,
  analyzeOut: 1950,
  loaded: 1950,
  title: 2050,
  career: 2200,
  salary: 2350,
  tier: 2650,
  tasks: 2500,
  qualifications: 2800,
  preferred: 3000,
  done: 3500,
} as const

const FILLED_FIELD_COUNT = 6

function delay(ms: number, outMs?: number): CSSProperties {
  return { "--d": `${ms}ms`, ...(outMs ? { "--d-out": `${outMs}ms` } : {}) } as CSSProperties
}

function FilledField({
  label,
  delayMs,
  className,
  children,
}: {
  label: string
  delayMs: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <p className="mb-1 text-[10.5px] font-medium text-[#5d6a82]">{label}</p>
      <div
        className="persona-apply-field-flash flex h-8 items-center justify-between rounded-lg border border-[#e3e8f1] bg-white px-2.5"
        style={delay(delayMs)}
      >
        <span className="persona-apply-in truncate text-[12.5px] font-semibold text-[#0b0f1c]" style={delay(delayMs)}>
          {children}
        </span>
        <Check
          className="persona-apply-in size-3.5 shrink-0 text-[#1a8a4f]"
          strokeWidth={3}
          style={delay(delayMs + 150)}
          aria-hidden
        />
      </div>
    </div>
  )
}

function FilledList({
  label,
  items,
  delayMs,
  className,
}: {
  label: string
  items: readonly string[]
  delayMs: number
  className?: string
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-1 text-[10.5px] font-medium text-[#5d6a82]">{label}</p>
      <ul
        className="persona-apply-field-flash space-y-0.5 rounded-lg border border-[#e3e8f1] bg-white px-2.5 py-2 text-[11.5px] leading-relaxed text-[#3f4a60]"
        style={delay(delayMs)}
      >
        {items.map((item, index) => (
          <li key={item} className="persona-apply-in truncate" style={delay(delayMs + index * 120)}>
            · {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PersonaApplyScreen({ onNext }: PersonaScreenProps) {
  return (
    <PersonaScreenShell className="flex flex-col gap-3">
      <div className="relative rounded-xl border-2 border-[#1A7CFF]/70 bg-white p-3 shadow-[0_8px_24px_-12px_rgba(26,124,255,0.45)]">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0b0f1c]">
            <AiIcon size={14} />
            채용공고 불러오기
          </p>
          <span className="relative h-4 text-[10.5px] font-semibold">
            <span
              className="persona-apply-transient absolute right-0 whitespace-nowrap text-[#1A7CFF]"
              style={delay(TIMELINE.analyze, TIMELINE.analyzeOut)}
            >
              공고 분석 중…
            </span>
            <span
              className="persona-apply-in absolute right-0 flex items-center gap-1 whitespace-nowrap text-[#1a8a4f]"
              style={delay(TIMELINE.loaded)}
            >
              <CheckCircle2 className="size-3" strokeWidth={2.5} aria-hidden />
              불러오기 완료
            </span>
          </span>
        </div>

        <div className="relative mt-2 flex items-center gap-2">
          <div className="relative flex h-9 min-w-0 flex-1 items-center gap-1.5 overflow-hidden rounded-lg border border-[#d4dbe7] bg-[#fbfcfe] px-2.5">
            <Link2 className="size-3.5 shrink-0 text-[#9aa5b8]" strokeWidth={2} aria-hidden />
            <span
              className="persona-apply-paste truncate rounded-sm text-[12px] font-medium text-[#0b0f1c]"
              style={delay(TIMELINE.paste)}
            >
              {PERSONA_JOB_POSTING_URL}
            </span>
            <span
              className="persona-apply-progress absolute inset-x-0 bottom-0 h-0.5 bg-[#1A7CFF]"
              style={delay(TIMELINE.analyze, TIMELINE.analyzeOut + 50)}
              aria-hidden
            />
          </div>
          <span
            className="persona-apply-press shrink-0 rounded-lg bg-[#1A7CFF] px-3 py-2 text-[12px] font-semibold text-white"
            style={delay(TIMELINE.press)}
          >
            불러오기
          </span>

          <span
            className="persona-apply-transient pointer-events-none absolute -top-3 left-8 flex items-center gap-1 rounded-md bg-[#0b0f1c] px-1.5 py-1 text-[10px] font-semibold text-white shadow-lg"
            style={delay(TIMELINE.pasteHint, TIMELINE.pasteHintOut)}
            aria-hidden
          >
            <kbd className="rounded bg-white/15 px-1 font-sans">⌘</kbd>
            <kbd className="rounded bg-white/15 px-1 font-sans">V</kbd>
            붙여넣기
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-[#e3e8f1] bg-white p-3">
        <div className="grid gap-2.5 sm:grid-cols-3">
          <FilledField label="채용 직군" delayMs={TIMELINE.title}>
            {PERSONA_POSITION.title}
          </FilledField>
          <FilledField label="경력" delayMs={TIMELINE.career}>
            {PERSONA_POSITION.careerYears}
          </FilledField>
          <FilledField label="제시 연봉" delayMs={TIMELINE.salary}>
            {PERSONA_POSITION.salaryLabel}
            <span className="ml-1 font-normal text-[#5d6a82]">만 원</span>
          </FilledField>
        </div>

        <div
          className="persona-apply-in mt-2 flex items-center gap-1.5 rounded-lg bg-[#fbf6ea] px-2.5 py-1.5 text-[10.5px] font-medium text-[#8a6a2c]"
          style={delay(TIMELINE.tier)}
        >
          <CheckCircle2 className="size-3.5 shrink-0 text-[#b8934f]" strokeWidth={2.25} aria-hidden />
          얼라이언스 이용 가능 · 연봉 4,000만 원 이상 · 수수료 {PERSONA_POSITION.rateLabel}
        </div>

        <FilledList
          label="주요 업무"
          items={PERSONA_POSITION.mainTasks}
          delayMs={TIMELINE.tasks}
          className="mt-2.5"
        />
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          <FilledList
            label="자격 요건"
            items={PERSONA_POSITION.qualifications}
            delayMs={TIMELINE.qualifications}
          />
          <FilledList label="우대 사항" items={PERSONA_POSITION.preferred} delayMs={TIMELINE.preferred} />
        </div>
      </div>

      <div
        className="persona-apply-in flex items-center justify-between gap-2 rounded-lg bg-[#0b0f1c] px-3 py-2 text-[11.5px] text-white"
        style={delay(TIMELINE.done)}
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="size-3.5 shrink-0 text-[#4ade80]" strokeWidth={2.25} aria-hidden />
          공고에서 {FILLED_FIELD_COUNT}개 항목을 자동으로 입력했어요
        </span>
        <button
          type="button"
          onClick={onNext}
          className="shrink-0 cursor-pointer rounded-md px-1.5 py-0.5 font-semibold text-[#74acff] transition-colors hover:bg-white/10 hover:text-[#a3c8ff]"
        >
          매칭 시작 →
        </button>
      </div>
    </PersonaScreenShell>
  )
}
