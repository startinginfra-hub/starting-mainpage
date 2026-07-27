"use client"

import { companyIndicators } from "@/lib/company/company-content"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import { useInView } from "@/lib/intro/use-in-view"
import { cn } from "@/lib/utils"

const ACCENT = "#3B9EFF"

export function CompanyIndicatorsSection() {
  return (
    <section
      id="indicators"
      className="relative w-full overflow-hidden border-t border-white/10 bg-[#050A14] py-20 md:py-28"
    >
      <RisingGraphBackground />

      <div className="relative z-[1] mx-auto w-full max-w-[1280px] px-5 text-center md:px-8 md:text-left">
        <IntroReveal useAppMainScrollRoot>
          <h2 className="mx-auto max-w-3xl whitespace-pre-line text-2xl font-bold tracking-tight text-white md:mx-0 md:text-4xl md:leading-snug">
            {companyIndicators.headline}
          </h2>
        </IntroReveal>
        <IntroReveal delayMs={80} useAppMainScrollRoot>
          <p
            className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed md:mx-0 md:mt-5 md:text-xl"
            style={{ color: ACCENT }}
          >
            {companyIndicators.sub}
          </p>
        </IntroReveal>

        <IntroReveal delayMs={120} useAppMainScrollRoot>
          <div className="mt-12 md:mt-16">
            <PopulationEmploymentChart />
          </div>
        </IntroReveal>

        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 lg:gap-12">
          {companyIndicators.metrics.map((metric, index) => (
            <IntroReveal key={metric.label} delayMs={160 + index * 60} useAppMainScrollRoot>
              <li
                className={cn(
                  index === 0
                    ? "md:pr-6"
                    : "border-t border-white/10 pt-8 md:border-t-0 md:border-l md:border-white/10 md:px-6 md:pt-0",
                )}
              >
                <p className="text-sm text-white/45 md:text-[15px]">{metric.label}</p>
                <p className="mt-2 whitespace-pre-line text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-none">
                  {metric.value}
                </p>
                {metric.note ? (
                  <p className="mt-2 text-xs text-white/35 md:text-sm">{metric.note}</p>
                ) : null}
              </li>
            </IntroReveal>
          ))}
        </ul>

        <div className="mt-12 space-y-1 text-xs leading-relaxed text-white/30 md:mt-16 md:text-sm">
          <p>{companyIndicators.source}</p>
          <p>{companyIndicators.sourceNote}</p>
        </div>
      </div>
    </section>
  )
}

function RisingGraphBackground() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="company-indicators-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B9EFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3B9EFF" stopOpacity="0" />
        </linearGradient>
        <filter id="company-indicators-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M0 620 C180 600 260 560 380 520 C520 460 600 430 740 360 C880 290 980 250 1120 180 C1240 120 1340 90 1440 40 L1440 720 L0 720 Z"
        fill="url(#company-indicators-fill)"
      />
      <path
        d="M0 620 C180 600 260 560 380 520 C520 460 600 430 740 360 C880 290 980 250 1120 180 C1240 120 1340 90 1440 40"
        fill="none"
        stroke="#3B9EFF"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#company-indicators-glow)"
        opacity="0.55"
      />
    </svg>
  )
}

type ChartLayout = {
  viewW: number
  viewH: number
  plotH: number
  plotTop: number
  barW: number
  colW: number
  startX: number
  padX?: number
  valueFont: [string, string]
  valueWeight: [string, string]
  valueOffsetY: [number, number]
  yearFont: string
  yearOffsetY: number
  yearFill: string
  yearWeight?: string
  barRx: string
}

/** Desktop chart geometry — keep unchanged when tuning mobile. */
function desktopChartLayout(): ChartLayout {
  return {
    viewW: 620,
    viewH: 300,
    plotH: 200,
    plotTop: 36,
    colW: 108,
    startX: 58,
    barW: 42,
    valueFont: ["11", "14"],
    valueWeight: ["600", "800"],
    valueOffsetY: [10, 14],
    yearFont: "13",
    yearOffsetY: 24,
    yearFill: "rgba(255,255,255,0.4)",
    barRx: "4",
  }
}

/** Mobile-only denser chart (narrower viewBox → larger bars/type). */
function mobileChartLayout(pointCount: number): ChartLayout {
  const viewW = 400
  const padX = 10
  const colW = (viewW - padX * 2) / pointCount
  const barW = Math.min(58, colW * 0.58)
  return {
    viewW,
    viewH: 340,
    plotH: 230,
    plotTop: 48,
    padX,
    colW,
    barW,
    startX: padX + (colW - barW) / 2,
    valueFont: ["15", "18"],
    valueWeight: ["700", "800"],
    valueOffsetY: [12, 16],
    yearFont: "15",
    yearOffsetY: 28,
    yearFill: "rgba(255,255,255,0.45)",
    yearWeight: "600",
    barRx: "5",
  }
}

function PopulationEmploymentChart() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    once: true,
    useAppMainScrollRoot: true,
  })

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
      <div className="mx-auto w-full max-w-4xl overflow-hidden px-2 py-5 sm:px-4 md:hidden">
        <EmploymentBarsSvg
          layout={mobileChartLayout(companyIndicators.chart.length)}
          inView={inView}
        />
        <ChartLegend className="mt-3 text-base" swatchClassName="h-3 w-3" />
      </div>

      <div className="mx-auto hidden min-w-[560px] max-w-3xl overflow-x-auto px-3 py-6 md:block md:px-6 md:py-8">
        <EmploymentBarsSvg layout={desktopChartLayout()} inView={inView} />
        <ChartLegend className="mt-4 text-sm" swatchClassName="h-2.5 w-2.5" />
      </div>
    </div>
  )
}

function ChartLegend({
  className,
  swatchClassName,
}: {
  className?: string
  swatchClassName?: string
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <span className="inline-flex items-center gap-2 font-bold" style={{ color: ACCENT }}>
        <span className={cn("inline-block rounded-sm bg-[#3B9EFF]", swatchClassName)} aria-hidden />
        {companyIndicators.employmentLabel} ↑
      </span>
    </div>
  )
}

function EmploymentBarsSvg({ layout, inView }: { layout: ChartLayout; inView: boolean }) {
  const chart = companyIndicators.chart
  const minEmployment = 60
  const maxEmployment = 85
  const plotBottom = layout.plotTop + layout.plotH
  const {
    viewW,
    viewH,
    barW,
    colW,
    startX,
    padX,
    valueFont,
    valueWeight,
    valueOffsetY,
    yearFont,
    yearOffsetY,
    yearFill,
    yearWeight,
    barRx,
  } = layout

  const employmentY = (v: number) =>
    plotBottom - ((v - minEmployment) / (maxEmployment - minEmployment)) * layout.plotH

  const axisX1 = padX ?? startX
  const axisX2 = padX != null ? viewW - padX : startX + (chart.length - 1) * colW + barW

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="h-auto w-full"
      role="img"
      aria-label="신산업 청년 취업자가 증가하는 추세"
    >
      {chart.map((d, i) => {
        const empX = startX + i * colW
        const empY = employmentY(d.employmentMan)
        const empH = plotBottom - empY
        const isLast = i === chart.length - 1

        return (
          <g key={d.year}>
            <rect
              x={empX}
              y={empY}
              width={barW}
              height={empH}
              rx={barRx}
              fill={ACCENT}
              style={{
                transformOrigin: `${empX + barW / 2}px ${plotBottom}px`,
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) ${i * 80}ms`,
              }}
            />
            <text
              x={empX + barW / 2}
              y={empY - (isLast ? valueOffsetY[1] : valueOffsetY[0])}
              fill={ACCENT}
              fontSize={isLast ? valueFont[1] : valueFont[0]}
              fontWeight={isLast ? valueWeight[1] : valueWeight[0]}
              textAnchor="middle"
              className={cn(
                "transition-opacity duration-500",
                inView ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: `${280 + i * 80}ms` }}
            >
              {d.employmentMan}만
            </text>

            <text
              x={empX + barW / 2}
              y={plotBottom + yearOffsetY}
              fill={yearFill}
              fontSize={yearFont}
              fontWeight={yearWeight}
              textAnchor="middle"
            >
              {d.year}
            </text>
          </g>
        )
      })}

      <line
        x1={axisX1}
        y1={plotBottom}
        x2={axisX2}
        y2={plotBottom}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />
    </svg>
  )
}
