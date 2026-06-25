"use client"

import { useEffect, useRef, useState } from "react"
import { Check, User } from "lucide-react"
import { motion } from "motion/react"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

export const FUNNEL_STEP_COUNT = 4
/** FIT 단계 이후 sticky 유지 구간 (segment vh 단위) — 매칭 화면 체류 스크롤 */
export const FUNNEL_HOLD_SEGMENTS = 2

const POOL_COUNT = 20
const AVATAR_STAGGER_MS = 48
const MORPH_EASE = [0.22, 1, 0.36, 1] as const
const MORPH_DURATION_S = 0.72
const MORPH_FIT_STAGGER_S = 0.055

/** 20칸 그리드 — 8명, 행·열 패턴 없이 불규칙 배치 */
const FIRST_PASS_SELECTED_INDICES = new Set([1, 3, 5, 8, 12, 14, 16, 19])

/** 히든 조건으로 추린 FIT 5명 */
const FIT_SELECTED_INDICES = new Set([3, 8, 12, 16, 19])
const FIT_MATCHED_ORDER = [...FIT_SELECTED_INDICES].sort((a, b) => a - b)

/** 직군별 키워드 1차 매칭 8명 */
const KEYWORD_MATCHED_INDICES = FIRST_PASS_SELECTED_INDICES

type ScatteredChip = {
  label: string
  className: string
}

const FILTER_1 = {
  id: "filter-1",
  title: "직군별 개인화 키워드 필터 적용",
  chips: ["인하우스 출신", "UX 중심", "B2B", "웹 서비스", "API 설계", "스타트업 경험"] as const,
  scatteredLeft: [
    { label: "인하우스 출신", className: "-left-[4.75rem] top-[4%] lg:-left-[5.75rem]" },
    { label: "API 설계", className: "-left-[4rem] top-[36%] lg:-left-[5rem]" },
    { label: "UX 중심", className: "-left-[5.5rem] top-[68%] lg:-left-[6.75rem]" },
  ] satisfies readonly ScatteredChip[],
  scatteredRight: [
    { label: "B2B", className: "-right-[3.25rem] top-[8%] lg:-right-[4.25rem]" },
    { label: "웹 서비스", className: "-right-[5rem] top-[38%] lg:-right-[6.25rem]" },
    { label: "스타트업 경험", className: "-right-[5.5rem] top-[68%] lg:-right-[6.75rem]" },
  ] satisfies readonly ScatteredChip[],
}

const FILTER_2 = {
  id: "filter-2",
  title: "히든 조건 필터",
  chips: ["인서울 대학", "경쟁사 재직 여부", "34세 이하", "성별", "잦은 이직 여부"] as const,
  scatteredLeft: [
    { label: "인서울 대학", className: "-left-[8.5rem] top-[18%] lg:-left-[10.5rem]" },
    { label: "성별", className: "-left-[8rem] top-[50%] lg:-left-[10rem]" },
    { label: "잦은 이직 여부", className: "-left-[9.5rem] top-[84%] lg:-left-[11.5rem]" },
  ] satisfies readonly ScatteredChip[],
  scatteredRight: [
    { label: "경쟁사 재직 여부", className: "-right-[8.25rem] top-[22%] lg:-right-[10.25rem]" },
    { label: "34세 이하", className: "-right-[7.75rem] top-[80%] lg:-right-[9.75rem]" },
  ] satisfies readonly ScatteredChip[],
}

type ChipVariant = "muted" | "selected" | "fit"

type ProfileVariant = "muted" | "selected" | "fit"

const PROFILE_SIZE_CLASS = {
  sm: "size-full",
  md: "size-11 md:size-14",
  lg: "size-14 md:size-[4.25rem]",
} as const

const ICON_SIZE_CLASS = {
  sm: "h-[62%] w-[44%]",
  md: "h-[72%] w-[50%]",
  lg: "h-[76%] w-[54%]",
} as const

function ProfileIcon({
  variant,
  size = "sm",
}: {
  variant: ProfileVariant
  size?: keyof typeof PROFILE_SIZE_CLASS
}) {
  const variantClass =
    variant === "fit"
      ? "fn-profile-card-fit"
      : variant === "selected"
        ? "fn-profile-card-selected"
        : "fn-profile-card-muted"

  return (
    <div className={cn(PROFILE_SIZE_CLASS[size], "fn-profile-card", variantClass)}>
      <User
        className={cn(ICON_SIZE_CLASS[size], "-translate-y-[2%]")}
        strokeWidth={1.1}
        fill="currentColor"
        fillOpacity={variant === "fit" ? 0.9 : 0.45}
        aria-hidden
      />
    </div>
  )
}

function FilterChip({
  label,
  variant = "muted",
  compact = false,
  mini = false,
}: {
  label: string
  variant?: ChipVariant
  compact?: boolean
  mini?: boolean
}) {
  const showCheck = variant === "selected" || variant === "fit"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold shadow-sm transition-colors duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        showCheck && (mini ? "gap-1" : compact ? "gap-1" : "gap-1.5"),
        mini
          ? "px-2 py-0.5 text-[10px] md:px-2.5 md:py-1 md:text-[11px]"
          : compact
            ? "px-3 py-1.5 text-xs md:px-3.5 md:py-2 md:text-[13px]"
            : "px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base",
        variant === "fit"
          ? "border border-[#74acff] bg-gradient-to-br from-[#1a7cff] to-[#0b4eae] text-white shadow-[0_4px_16px_rgba(26,124,255,0.24)]"
          : variant === "selected"
            ? "border border-[#d6e8ff] bg-[#e8f2ff] text-[#3f4a60] shadow-[0_2px_12px_rgba(26,124,255,0.1)]"
            : "border border-[#e3e8f1] bg-white text-[#3f4a60] shadow-[0_2px_10px_rgba(11,15,28,0.05)]",
      )}
    >
      {showCheck ? (
        <Check
          className={cn(
            "shrink-0",
            mini ? "size-2.5" : compact ? "size-3" : "size-3.5",
            variant === "fit" ? "text-white" : "text-[#1A7CFF]",
          )}
          strokeWidth={2.5}
          aria-hidden
        />
      ) : null}
      {label}
    </span>
  )
}

function getCardVariant(index: number, step: number): ProfileVariant {
  const state = getGridState(Math.min(step, 2))

  if ("fitIndices" in state && state.fitIndices?.has(index)) {
    return "fit"
  }
  if ("selectedIndices" in state && state.selectedIndices?.has(index)) {
    return "selectedVariant" in state && state.selectedVariant === "fit" ? "fit" : "selected"
  }
  return "variant" in state ? (state.variant ?? "muted") : "muted"
}

function MorphingProfileGrid({
  step,
  staggerEnter = false,
}: {
  step: number
  staggerEnter?: boolean
}) {
  const reducedMotion = usePrefersReducedMotion()
  const isMatched = step === 3
  const shouldStagger = staggerEnter && !reducedMotion

  return (
    <motion.div
      layout={!reducedMotion && !isMatched}
      className={cn(
        "intro-filter-avatar-grid relative w-full shrink-0",
        isMatched && "intro-filter-avatar-grid-matched",
      )}
      transition={{
        layout: { duration: MORPH_DURATION_S, ease: MORPH_EASE },
      }}
    >
      {Array.from({ length: POOL_COUNT }, (_, index) => {
        const isFit = FIT_SELECTED_INDICES.has(index)
        const fitOrder = FIT_MATCHED_ORDER.indexOf(index)
        const cardVariant = getCardVariant(index, step)

        if (isMatched && !isFit) {
          return null
        }

        return (
          <motion.div
            key={index}
            layout={!reducedMotion ? "position" : false}
            className={cn("fn-avatar-cell", shouldStagger && "fn-avatar-pop")}
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              visibility: "visible",
            }}
            transition={{
              layout: {
                duration: MORPH_DURATION_S,
                ease: MORPH_EASE,
                delay: isMatched && isFit && fitOrder >= 0 ? fitOrder * MORPH_FIT_STAGGER_S : 0,
              },
              opacity: { duration: 0 },
              y: { duration: isMatched ? MORPH_DURATION_S : 0, ease: MORPH_EASE },
              scale: { duration: isMatched ? 0.55 : 0, ease: MORPH_EASE },
            }}
            style={{
              zIndex: isFit ? 2 : 1,
              ...(shouldStagger ? { animationDelay: `${index * AVATAR_STAGGER_MS}ms` } : {}),
            }}
          >
            <ProfileIcon variant={cardVariant} />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function StageLabel({ children }: { children: string }) {
  return (
    <p className="intro-funnel-stage-label text-center text-sm font-semibold text-[#3f4a60] md:text-[15px]">
      {children}
    </p>
  )
}

function getStageLabel(step: number) {
  switch (step) {
    case 0:
      return "다수 지원자"
    case 1:
      return FILTER_1.title
    case 2:
      return FILTER_2.title
    case 3:
      return "조건을 충족한 인재만 매칭"
    default:
      return "다수 지원자"
  }
}

type VisibleFilterBadge = {
  filter: typeof FILTER_1 | typeof FILTER_2
  variant: ChipVariant
  layer: "primary" | "secondary"
}

function getVisibleFilterBadges(step: number): VisibleFilterBadge[] {
  if (step < 1) return []

  if (step === 1) {
    return [{ filter: FILTER_1, variant: "selected", layer: "primary" }]
  }

  return [
    { filter: FILTER_1, variant: "selected", layer: "primary" },
    { filter: FILTER_2, variant: "fit", layer: "secondary" },
  ]
}

function getGridState(step: number) {
  if (step === 2) {
    return {
      selectedIndices: KEYWORD_MATCHED_INDICES,
      fitIndices: FIT_SELECTED_INDICES,
    }
  }

  if (step === 1) {
    return {
      selectedIndices: KEYWORD_MATCHED_INDICES,
      selectedVariant: "selected" as const,
    }
  }

  return { variant: "muted" as const }
}

function ScatteredFilterBadges({
  filter,
  chipVariant,
  layer = "primary",
}: {
  filter: typeof FILTER_1 | typeof FILTER_2
  chipVariant: ChipVariant
  layer?: "primary" | "secondary"
}) {
  const { scatteredLeft, scatteredRight } = filter
  const flankLayerClass =
    layer === "secondary" ? "intro-funnel-badge-flank-secondary" : "intro-funnel-badge-flank-primary"
  const flankZIndex = layer === "secondary" ? "z-[11]" : "z-10"

  return (
    <>
      {scatteredLeft.map((chip, index) => (
        <div
          key={`${filter.id}-left-${chip.label}`}
          className={cn(
            "intro-funnel-badge-chip intro-funnel-badge-flank-left absolute hidden whitespace-nowrap md:block",
            flankLayerClass,
            flankZIndex,
            chip.className,
          )}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <FilterChip label={chip.label} variant={chipVariant} compact />
        </div>
      ))}
      {scatteredRight.map((chip, index) => (
        <div
          key={`${filter.id}-right-${chip.label}`}
          className={cn(
            "intro-funnel-badge-chip intro-funnel-badge-flank-right absolute hidden whitespace-nowrap md:block",
            flankLayerClass,
            flankZIndex,
            chip.className,
          )}
          style={{ animationDelay: `${index * 70 + 40}ms` }}
        >
          <FilterChip label={chip.label} variant={chipVariant} compact />
        </div>
      ))}
    </>
  )
}

function FilterBadgeMobile({
  filter,
  chipVariant,
}: {
  filter: typeof FILTER_1 | typeof FILTER_2
  chipVariant: ChipVariant
}) {
  return (
    <div className="intro-funnel-badge-mobile flex w-full flex-wrap items-center justify-center gap-2 md:hidden">
      {filter.chips.map((chip) => (
        <FilterChip key={chip} label={chip} variant={chipVariant} compact />
      ))}
    </div>
  )
}

function MatchedFilterBadges({ visibleBadges }: { visibleBadges: VisibleFilterBadge[] }) {
  const reducedMotion = usePrefersReducedMotion()
  let chipIndex = 0

  return (
    <div className="intro-funnel-matched-badges flex w-full flex-col items-center">
      {visibleBadges.map(({ filter, variant }, rowIndex) => (
        <div
          key={filter.id}
          className="intro-funnel-matched-badge-row flex flex-wrap items-center justify-center"
        >
          {filter.chips.map((chip, indexInRow) => {
            const delay = chipIndex * 0.05
            const rowCenter = (filter.chips.length - 1) / 2
            const xSpread = (indexInRow - rowCenter) * 20
            chipIndex += 1

            return (
              <motion.span
                key={`${filter.id}-${chip}`}
                className="inline-flex shrink-0"
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: xSpread * 1.35,
                        y: rowIndex === 0 ? -16 : 16,
                        scale: 0.88,
                      }
                }
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{
                  delay,
                  duration: 0.52,
                  ease: MORPH_EASE,
                }}
              >
                <FilterChip label={chip} variant={variant} mini />
              </motion.span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function CumulativeFunnelScene({
  activeStep,
  replayToken = 0,
}: {
  activeStep: number
  replayToken?: number
}) {
  const step = Math.min(Math.max(activeStep, 0), FUNNEL_STEP_COUNT - 1)
  const visibleBadges = getVisibleFilterBadges(step)
  const isMatchedStep = step === 3
  const isPoolStep = step === 0
  const prevStepRef = useRef<number | null>(null)
  const [poolEnterKey, setPoolEnterKey] = useState(0)

  useEffect(() => {
    const prev = prevStepRef.current
    if (isPoolStep && prev != null && prev !== 0) {
      setPoolEnterKey((key) => key + 1)
    }
    prevStepRef.current = step
  }, [isPoolStep, step])

  const poolGridKey = `pool-${replayToken}-${poolEnterKey}`
  const morphGridKey = isPoolStep ? poolGridKey : "filtered-morph"

  return (
    <div className="intro-funnel-cumulative flex w-full flex-col items-center gap-3 md:gap-4">
      {visibleBadges.length > 0 && !isMatchedStep ? (
        <div className="flex w-full flex-col items-center gap-2 md:hidden">
          {visibleBadges.map(({ filter, variant }) => (
            <FilterBadgeMobile key={filter.id} filter={filter} chipVariant={variant} />
          ))}
        </div>
      ) : null}

      <div
        className={cn(
          "intro-funnel-badge-stage relative mx-auto w-full",
          isMatchedStep ? "intro-funnel-badge-stage-matched" : "max-w-[24rem] md:max-w-[28rem]",
        )}
      >
        {visibleBadges.length > 0 && isMatchedStep ? (
          <MatchedFilterBadges visibleBadges={visibleBadges} />
        ) : (
          visibleBadges.map(({ filter, variant, layer }) => (
            <ScatteredFilterBadges
              key={filter.id}
              filter={filter}
              chipVariant={variant}
              layer={layer}
            />
          ))
        )}
        <MorphingProfileGrid
          key={isPoolStep ? poolGridKey : morphGridKey}
          step={step}
          staggerEnter={isPoolStep}
        />
      </div>

      <StageLabel key={step}>{getStageLabel(step)}</StageLabel>
    </div>
  )
}

export function FunnelContent({
  activeStep = 0,
  replayToken = 0,
}: {
  activeStep?: number
  replayToken?: number
}) {
  return (
    <div
      className="relative mx-auto min-h-[26rem] w-full max-w-md overflow-visible md:max-w-3xl md:min-h-[30rem]"
      aria-hidden
    >
      <CumulativeFunnelScene activeStep={activeStep} replayToken={replayToken} />
    </div>
  )
}

export function StaticFunnel() {
  return (
    <div className="mx-auto w-full max-w-md overflow-visible md:max-w-3xl" aria-hidden>
      <CumulativeFunnelScene activeStep={FUNNEL_STEP_COUNT - 1} />
    </div>
  )
}

export function IntroFilterFunnel({ activeStep }: { activeStep: number }) {
  return <FunnelContent activeStep={activeStep} />
}
