"use client"

import { useMemo, useState } from "react"
import { motion } from "motion/react"
import {
  calculateHiringCosts,
  DEFAULT_SALARY_MANWON,
  formatManwon,
  formatManwonRange,
  formatSalaryInput,
  extractSalaryDigits,
  getSalaryManwonForCalculation,
  MIN_SALARY_MANWON,
  MAX_SALARY_MANWON,
  normalizeSalaryInput,
  parseSalaryInput,
  type HiringCostBreakdown,
  type StartingPlanId,
} from "@/lib/intro/hiring-cost-calculator"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

const COMPARE_CHANNELS = [
  { id: "platform", label: "채용 플랫폼", caption: "연봉 7%", featured: false },
  { id: "starting", label: "스타팅", caption: "정찰제", featured: true },
  { id: "headhunting", label: "헤드헌팅", caption: "연봉 15~30%", featured: false },
] as const

const PRICE_BADGE_BASE =
  "inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-semibold leading-none md:text-[11px]"

const CHEAP_BADGE_CLASS = "border-[#1A7CFF] bg-[#1A7CFF] text-white shadow-sm"

const EXPENSIVE_BADGE_CLASS = "border-[#f5caca] bg-[#fef2f2] text-[#d94848] shadow-none"

const STARTING_PLAN_OPTIONS: ReadonlyArray<{ id: StartingPlanId; label: string }> = [
  { id: "prepaid", label: "선불" },
  { id: "postpaid", label: "후불" },
]

type ChannelId = (typeof COMPARE_CHANNELS)[number]["id"]

const CHANNEL_PRICE_PREFIX: Record<ChannelId, string> = {
  platform: "모든걸 직접하고 ",
  starting: "대행 맡기고 ",
  headhunting: "대행 맡기고 ",
}

const CHANNEL_TIE_ORDER: Record<ChannelId, number> = {
  platform: 0,
  starting: 1,
  headhunting: 2,
}

type PriceRank = "cheapest" | "most_expensive" | null

function getChannelPriceRange(
  id: ChannelId,
  costs: HiringCostBreakdown,
): { min: number; max: number } {
  switch (id) {
    case "platform":
      return { min: costs.platformFee, max: costs.platformFee }
    case "starting":
      return { min: costs.startingFee, max: costs.startingFee }
    case "headhunting":
      return { min: costs.headhuntingMin, max: costs.headhuntingMax }
  }
}

function getChannelPriceRanks(costs: HiringCostBreakdown): Record<ChannelId, PriceRank> {
  const ranges = COMPARE_CHANNELS.map((channel) => ({
    id: channel.id,
    ...getChannelPriceRange(channel.id, costs),
  }))
  const minVal = Math.min(...ranges.map((entry) => entry.min))
  const maxVal = Math.max(...ranges.map((entry) => entry.max))

  const ranks: Record<ChannelId, PriceRank> = {
    platform: null,
    starting: null,
    headhunting: null,
  }

  if (minVal === maxVal) return ranks

  for (const entry of ranges) {
    if (entry.min === minVal) ranks[entry.id] = "cheapest"
    else if (entry.max === maxVal) ranks[entry.id] = "most_expensive"
  }

  return ranks
}

function getChannelSortValue(id: ChannelId, costs: HiringCostBreakdown): number {
  return getChannelPriceRange(id, costs).min
}

function buildSortedChannels(costs: HiringCostBreakdown) {
  return [...COMPARE_CHANNELS]
    .map((channel) => ({
      ...channel,
      amount:
        channel.id === "platform"
          ? formatManwon(costs.platformFee)
          : channel.id === "starting"
            ? formatManwon(costs.startingFee)
            : formatManwonRange(costs.headhuntingMin, costs.headhuntingMax),
      sortValue: getChannelSortValue(channel.id, costs),
    }))
    .sort((a, b) => {
      if (a.sortValue !== b.sortValue) return a.sortValue - b.sortValue
      return CHANNEL_TIE_ORDER[a.id] - CHANNEL_TIE_ORDER[b.id]
    })
}

function CompareChannelRow({
  channelId,
  label,
  caption,
  amount,
  featured,
  priceRank,
}: {
  channelId: ChannelId
  label: string
  caption: string
  amount: string
  featured: boolean
  priceRank: PriceRank
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        featured
          ? "border-[#1A7CFF]/35 bg-gradient-to-r from-[#f0f6ff] to-[#f8fbff] shadow-[0_4px_16px_rgba(26,124,255,0.06)]"
          : "border-[#e3e8f1] bg-white",
        "max-[380px]:flex max-[380px]:flex-col max-[380px]:gap-2",
        "min-[381px]:grid min-[381px]:grid-cols-[minmax(0,1fr)_auto] min-[381px]:items-center min-[381px]:gap-x-3 min-[381px]:gap-y-0.5",
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <p
            className={cn(
              "text-sm font-semibold md:text-[15px]",
              featured ? "text-[#1A7CFF]" : "text-[#0b0f1c]",
            )}
          >
            {label}
          </p>
          {priceRank === "cheapest" ? (
            <span className={cn(PRICE_BADGE_BASE, CHEAP_BADGE_CLASS)}>가장 저렴</span>
          ) : null}
          {priceRank === "most_expensive" ? (
            <span className={cn(PRICE_BADGE_BASE, EXPENSIVE_BADGE_CLASS)}>가장 비쌈</span>
          ) : null}
        </div>
        <p className="mt-0.5 text-[10px] text-[#5d6a82] md:text-[11px]">{caption}</p>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-1 text-right max-[380px]:w-full max-[380px]:justify-between min-[381px]:whitespace-nowrap">
        <span className="text-[10px] font-bold leading-tight text-[#3f4a60] md:text-[11px]">
          {CHANNEL_PRICE_PREFIX[channelId].trim()}
        </span>
        <span
          className={cn(
            "text-sm font-bold leading-tight tabular-nums text-[#0b0f1c] md:text-[15px]",
            featured && "text-[#1A7CFF]",
          )}
        >
          {amount}
        </span>
      </div>
    </div>
  )
}

export function IntroSalaryCostCalculator({ className }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const [salaryInput, setSalaryInput] = useState(formatSalaryInput(DEFAULT_SALARY_MANWON))
  const [startingPlan, setStartingPlan] = useState<StartingPlanId>("prepaid")

  const costs = useMemo(() => {
    const salaryManwon = getSalaryManwonForCalculation(salaryInput)
    return calculateHiringCosts(salaryManwon, startingPlan)
  }, [salaryInput, startingPlan])

  const sortedChannels = useMemo(() => buildSortedChannels(costs), [costs])
  const channelPriceRanks = useMemo(() => getChannelPriceRanks(costs), [costs])

  const layoutTransition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.85 }

  const handleSalaryChange = (raw: string) => {
    if (!extractSalaryDigits(raw)) {
      setSalaryInput("")
      return
    }
    setSalaryInput(normalizeSalaryInput(raw))
  }

  const handleSalaryBlur = () => {
    if (!salaryInput.trim()) {
      setSalaryInput(formatSalaryInput(DEFAULT_SALARY_MANWON))
      return
    }
    setSalaryInput(formatSalaryInput(parseSalaryInput(salaryInput)))
  }

  return (
    <div className={cn("mx-auto flex w-full max-w-md flex-col items-center gap-8 md:max-w-lg", className)}>
      <div className="flex w-full items-center gap-2 md:gap-3">
        <div
          className="flex h-10 shrink-0 rounded-xl border border-[#e3e8f1] bg-[#f5f7fb] p-0.5"
          role="group"
          aria-label="스타팅 요금제 선택"
        >
          {STARTING_PLAN_OPTIONS.map((option) => {
            const active = startingPlan === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setStartingPlan(option.id)}
                className={cn(
                  "flex h-full items-center rounded-[10px] px-3 text-[11px] font-semibold transition-colors md:px-3.5 md:text-xs",
                  active
                    ? "bg-[#1A7CFF] text-white shadow-sm"
                    : "text-[#5d6a82] hover:text-[#0b0f1c]",
                )}
                aria-pressed={active}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <div className="relative min-w-0 flex-1">
          <input
            id="intro-salary-cost-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={salaryInput}
            onChange={(event) => handleSalaryChange(event.target.value)}
            onBlur={handleSalaryBlur}
            aria-label="현재 채용중인 포지션 연봉"
            className="h-10 w-full rounded-xl border border-[#e3e8f1] bg-[#fbfcfe] py-2 pr-12 pl-4 text-right text-base font-semibold tabular-nums text-[#0b0f1c] outline-none transition-colors focus:border-[#1A7CFF] focus:ring-2 focus:ring-[#1A7CFF]/20"
            aria-describedby="intro-salary-cost-unit"
            aria-valuemin={MIN_SALARY_MANWON}
            aria-valuemax={MAX_SALARY_MANWON}
          />
          <span
            id="intro-salary-cost-unit"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-[#5d6a82]"
          >
            만 원
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        {sortedChannels.map((channel) => (
          <motion.div
            key={channel.id}
            layout="position"
            transition={layoutTransition}
          >
            <CompareChannelRow
              channelId={channel.id}
              label={channel.label}
              caption={channel.caption}
              amount={channel.amount}
              featured={channel.featured}
              priceRank={channelPriceRanks[channel.id]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
