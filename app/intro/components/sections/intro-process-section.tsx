"use client"

import { Check } from "lucide-react"
import { IntroReveal } from "../intro-reveal"
import { IntroSection, IntroSectionHeading } from "../intro-section"
import { ProcessContractVis } from "../process/process-contract-vis"
import { ProcessFunnelPreview } from "../process/process-funnel-preview"
import { cn } from "@/lib/utils"

const PROCESS_STEPS = [
  {
    id: "01",
    title: "약관 동의",
    body: (
      <>
        서비스 이용 전 온라인으로 약관을 확인하고 동의해요.
        <br />
        <strong className="font-semibold text-[#0b0f1c]">이용, 지불방식, 환불 등</strong> 자세한 내용을
        확인할 수 있어요.
      </>
    ),
    vis: "contract",
  },
  {
    id: "02",
    title: "포지션 신청",
    body: (
      <>
        채용 직군·경력·주요 업무 등{" "}
        <strong className="font-semibold text-[#0b0f1c]">포지션 정보를 입력</strong>하면
        <br />
        공고(JD)가 자동으로 생성되고 본격적인 인재 소싱을 시작해요.
      </>
    ),
    vis: "apply",
  },
  {
    id: "03",
    title: "조건 분석 상세 매칭 리포트 발행",
    body: (
      <>
        지원자별로 <strong className="font-semibold text-[#0b0f1c]">키워드 분석·조건별 적합도</strong>를
        분석한
        <br />
        상세 매칭 리포트를 발행해드려요.
      </>
    ),
    vis: "report",
  },
  {
    id: "04",
    title: "합격 후 크레딧 차감",
    body: (
      <>
        <strong className="font-semibold text-[#0b0f1c]">입사일 예정일</strong>에 크레딧이
        차감돼요.
        <br />
        연봉과 무관하게 1명당 300 크레딧이에요.
      </>
    ),
    vis: "payment",
  },
] as const

const REPORT_ROWS = [
  {
    id: "career",
    category: "경력",
    req: "백엔드 개발자 3년 이상",
    analysis: "클라우드웍스 4년 2개월, Node.js API 개발",
    result: "충족",
  },
  {
    id: "rdbms",
    category: "기술",
    req: "RDBMS 설계·운영 경험",
    analysis: "PostgreSQL 스키마·인덱스·튜닝·마이그레이션",
    result: "충족",
  },
  {
    id: "saas",
    category: "도메인",
    req: "B2B SaaS 서비스 개발",
    analysis: "구독·과금 2년+, 온보딩 API 프로젝트",
    result: "충족",
  },
  {
    id: "collab",
    category: "협업",
    req: "Git 기반 코드 리뷰·협업",
    analysis: "Git Flow·PR 리뷰 주 15건+, 릴리즈 브랜치 전략 수립",
    result: "충족",
  },
  {
    id: "cloud",
    category: "우대",
    req: "AWS·클라우드 인프라 경험",
    analysis: "EC2·RDS 운영, Docker 기반 배포·장애 대응 이력",
    result: "충족",
  },
] as const

const REQ_SKELETON_WIDTHS = ["w-[82%]", "w-[76%]", "w-[78%]", "w-[74%]", "w-[80%]"] as const

const ANALYSIS_SKELETON_WIDTHS = [
  ["w-[86%]", "w-[62%]"],
  ["w-[84%]", "w-[58%]"],
  ["w-[82%]", "w-[60%]"],
  ["w-[80%]", "w-[64%]"],
  ["w-[78%]", "w-[56%]"],
] as const

function ReportSkeletonCell({
  variant,
  rowIndex,
}: {
  variant: "req" | "analysis"
  rowIndex: number
}) {
  if (variant === "req") {
    const width = REQ_SKELETON_WIDTHS[rowIndex % REQ_SKELETON_WIDTHS.length]
    return (
      <div className="md:hidden" aria-hidden>
        <div className={cn("fn-skeleton-line h-2.5 rounded", width)} />
      </div>
    )
  }

  const lines = ANALYSIS_SKELETON_WIDTHS[rowIndex % ANALYSIS_SKELETON_WIDTHS.length]

  return (
    <div className="space-y-1.5 md:hidden" aria-hidden>
      {lines.map((width, lineIndex) => (
        <div
          key={lineIndex}
          className={cn("fn-skeleton-line h-2.5 rounded", width)}
          style={{ animationDelay: `${lineIndex * 0.1}s` }}
        />
      ))}
    </div>
  )
}

function ReportVis() {
  const cellCls =
    "px-2 py-2.5 align-middle text-[10px] leading-snug md:px-3 md:py-3.5 md:leading-none"
  const resultCellCls =
    "w-9 px-1 py-2.5 align-middle text-center text-[10px] leading-none md:w-9 md:px-1.5 md:py-3.5"

  return (
    <div className="max-w-full overflow-hidden rounded-xl border border-[#e3e8f1] bg-white">
      <table className="w-full table-fixed border-separate border-spacing-0 text-[10px] leading-snug max-md:min-w-0 md:min-w-[24rem] md:leading-none">
        <colgroup>
          <col className="w-[36%] md:w-[30%]" />
          <col />
          <col className="w-9" />
        </colgroup>
        <thead className="bg-[#f5f7fb] text-[10px] leading-snug text-[#5d6a82] md:leading-none">
          <tr>
            <th className={cn(cellCls, "rounded-tl-xl text-left font-medium md:whitespace-nowrap")}>
              기업 조건
            </th>
            <th className={cn(cellCls, "text-left font-medium")}>인재 분석</th>
            <th className={cn(resultCellCls, "rounded-tr-xl font-medium")}>결과</th>
          </tr>
        </thead>
        <tbody>
          {REPORT_ROWS.map((row, rowIndex) => (
            <tr key={row.id} className="border-t border-[#e3e8f1]">
              <td className={cn(cellCls, "font-medium text-[#0b0f1c] md:whitespace-nowrap")}>
                <span className="hidden md:inline">{row.req}</span>
                <ReportSkeletonCell variant="req" rowIndex={rowIndex} />
              </td>
              <td className={cn(cellCls, "text-[#3f4a60]")}>
                <span className="hidden md:inline">{row.analysis}</span>
                <ReportSkeletonCell variant="analysis" rowIndex={rowIndex} />
              </td>
              <td className={resultCellCls}>
                <span
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#e8f2ff] p-1 text-[#1A7CFF]"
                  aria-label={row.result}
                >
                  <Check className="size-2.5 shrink-0" strokeWidth={3} aria-hidden />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProcessVis({ type }: { type: (typeof PROCESS_STEPS)[number]["vis"] }) {
  switch (type) {
    case "contract":
      return <ProcessContractVis />
    case "apply":
      return <ProcessFunnelPreview variant="apply" />
    case "report":
      return <ReportVis />
    case "payment":
      return <ProcessFunnelPreview variant="payment" />
  }
}

export function IntroProcessSection() {
  return (
    <IntroSection id="process" className="bg-white">
      <IntroSectionHeading
        title="서비스 이용 순서"
        subtitle="계약부터 포지션 등록, 인재 검토, 입사 후 크레딧 차감까지"
      />

      <div className="space-y-6 md:space-y-8">
        {PROCESS_STEPS.map((step, index) => (
          <IntroReveal key={step.id} yOffset="24">
            <div
              className={cn(
                "rounded-2xl border border-[#e8ecf4] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] md:p-8",
                "flex flex-col gap-6 md:flex-row md:items-center md:gap-12",
                index % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              <div className="flex-1">
                <span className="text-xs font-bold text-[#1A7CFF]">STEP {step.id}</span>
                <h3 className="mt-2 text-xl font-semibold text-[#0b0f1c] md:text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#3f4a60] md:text-base">{step.body}</p>
              </div>
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-[#f5f7fb] to-[#eef1f7] p-3 md:p-5">
                <ProcessVis type={step.vis} />
              </div>
            </div>
          </IntroReveal>
        ))}
      </div>
    </IntroSection>
  )
}
