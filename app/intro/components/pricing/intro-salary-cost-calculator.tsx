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
} from "@/lib/intro/hiring-cost-calculator"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { IntroCalculatorRow } from "./intro-calculator-row"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

const COMPARE_CHANNELS = [
  { id: "platform", label: "채용 플랫폼", caption: "연봉 7%", featured: false },
  { id: "starting", label: "스타팅", caption: "정찰제", featured: true },
  { id: "headhunting", label: "헤드헌팅", caption: "연봉 15~30%", featured: false },
] as const

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

export function IntroSalaryCostCalculator({ className }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const [salaryInput, setSalaryInput] = useState(formatSalaryInput(DEFAULT_SALARY_MANWON))

  const costs = useMemo(() => {
    const salaryManwon = getSalaryManwonForCalculation(salaryInput)
    return calculateHiringCosts(salaryManwon)
  }, [salaryInput])

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
      <div className="relative w-full">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xs font-medium text-[#5d6a82]">
          포지션 연봉
        </span>
        <input
          id="intro-salary-cost-input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={salaryInput}
          onChange={(event) => handleSalaryChange(event.target.value)}
          onBlur={handleSalaryBlur}
          aria-label="현재 채용중인 포지션 연봉"
          className="h-10 w-full rounded-xl border border-[#e3e8f1] bg-[#fbfcfe] py-2 pr-12 pl-[5.75rem] text-right text-base font-semibold tabular-nums text-[#0b0f1c] outline-none transition-colors focus:border-[#1A7CFF] focus:ring-2 focus:ring-[#1A7CFF]/20"
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

      <div className="flex w-full flex-col gap-2">
        {sortedChannels.map((channel) => (
          <motion.div
            key={channel.id}
            layout="position"
            transition={layoutTransition}
          >
            <IntroCalculatorRow
              label={channel.label}
              caption={channel.caption}
              value={channel.amount}
              valuePrefix={CHANNEL_PRICE_PREFIX[channel.id].trim()}
              variant={channel.featured ? "featured" : "default"}
              priceRank={channelPriceRanks[channel.id]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
