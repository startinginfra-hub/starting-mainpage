"use client"

import { Check } from "lucide-react"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import { ProcessContractVis } from "@/app/intro/components/process/process-contract-vis"
import { ProcessFunnelPreview } from "@/app/intro/components/process/process-funnel-preview"
import { cn } from "@/lib/utils"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"
import { InvoicePanel } from "../persona/screens/persona-payment-screen"

const strongCls = "font-semibold text-white"

const PROCESS_STEPS = [
  {
    id: "01",
    title: "약관 동의",
    body: (
      <>
        서비스 이용 전 온라인으로 스타팅 얼라이언스 약관을 확인하고 동의해요.
        <br />
        <strong className={strongCls}>이용, 지불방식, 환불 등</strong> 자세한 내용을 확인할 수 있어요.
      </>
    ),
    vis: "contract",
  },
  {
    id: "02",
    title: "포지션 신청",
    body: (
      <>
        <strong className={strongCls}>연봉 4,000만 원 이상</strong> 포지션만 신청할 수 있어요.
        <br />
        채용공고를 불러오면 입력이 자동으로 완료되고, AI 스크리닝과 전담 헤드헌터가 함께 검토해요.
      </>
    ),
    vis: "apply",
  },
  {
    id: "03",
    title: "조건 분석 상세 매칭 리포트 발행",
    body: (
      <>
        AI 필터링과 헤드헌터 검증, <strong className={strongCls}>이중 필터링</strong>을 거친 후보만
        <br />
        조건별 근거와 함께 상세 매칭 리포트로 받아봐요.
      </>
    ),
    vis: "report",
  },
  {
    id: "04",
    title: "입사 후 크레딧 차감",
    body: (
      <>
        입사가 확정되면 <strong className={strongCls}>계약 연봉 기준 20%</strong>로 크레딧이 차감돼요.
        <br />
        크레딧 충전 시 10% 할인된 금액으로 결제할 수 있어요.
      </>
    ),
    vis: "payment",
  },
] as const

const REPORT_ROWS = [
  { id: "career", req: "백엔드 경력 8년 이상", analysis: "백엔드 11년, 테크리드 4년" },
  { id: "lead", req: "5명 이상 팀 리딩 경험", analysis: "백엔드 7명 팀 리딩, 채용·평가 참여" },
  { id: "domain", req: "결제·정산 아키텍처 설계", analysis: "PG 연동 정산 시스템 설계 리드" },
  { id: "msa", req: "레거시 MSA 전환 리딩", analysis: "모놀리식 → 12개 서비스 분리 주도" },
  { id: "oncall", req: "장애 대응 프로세스 수립", analysis: "온콜 체계·포스트모템 문화 도입" },
] as const

function ReportVis() {
  const cellCls = "px-2 py-2.5 align-middle text-[10px] leading-snug md:px-3 md:py-3.5 md:leading-none"
  const resultCellCls = "w-9 px-1 py-2.5 align-middle text-center md:px-1.5 md:py-3.5"

  return (
    <div className="max-w-full overflow-hidden rounded-xl border border-[#e3e8f1] bg-white">
      <table className="w-full table-fixed border-separate border-spacing-0 text-[10px] leading-snug md:leading-none">
        <colgroup>
          <col className="w-[40%] md:w-[36%]" />
          <col />
          <col className="w-9" />
        </colgroup>
        <thead className="bg-[#f5f7fb] text-[#5d6a82]">
          <tr>
            <th className={cn(cellCls, "rounded-tl-xl text-left font-medium")}>기업 조건</th>
            <th className={cn(cellCls, "text-left font-medium")}>인재 분석</th>
            <th className={cn(resultCellCls, "rounded-tr-xl text-[10px] font-medium")}>결과</th>
          </tr>
        </thead>
        <tbody>
          {REPORT_ROWS.map((row) => (
            <tr key={row.id}>
              <td className={cn(cellCls, "border-t border-[#e3e8f1] font-medium text-[#0b0f1c]")}>{row.req}</td>
              <td className={cn(cellCls, "border-t border-[#e3e8f1] text-[#3f4a60]")}>{row.analysis}</td>
              <td className={cn(resultCellCls, "border-t border-[#e3e8f1]")}>
                <span
                  className="inline-flex items-center justify-center rounded-full bg-[#e8f2ff] p-1 text-[#1A7CFF]"
                  aria-label="충족"
                >
                  <Check className="size-2.5" strokeWidth={3} aria-hidden />
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
      return <ProcessContractVis title="스타팅 얼라이언스 이용약관" />
    case "apply":
      return <ProcessFunnelPreview variant="apply" />
    case "report":
      return <ReportVis />
    case "payment":
      return (
        <div className="fn">
          <InvoicePanel animateIn={false} issued />
        </div>
      )
  }
}

export function AllianceProcessSection() {
  return (
    <AllianceSection id="process" className="border-t border-white/[0.06]">
      <AllianceSectionHeading
        title="서비스 이용 순서"
        subtitle="약관 동의부터 포지션 신청, 인재 검토, 입사 후 크레딧 차감까지"
      />

      <div className="space-y-6 md:space-y-8">
        {PROCESS_STEPS.map((step, index) => (
          <IntroReveal key={step.id} yOffset="24">
            <div
              className={cn(
                "rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-8",
                "flex flex-col gap-6 md:flex-row md:items-center md:gap-12",
                index % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              <div className="flex-1">
                <span className="text-xs font-bold text-[#d9b877]">STEP {step.id}</span>
                <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">{step.body}</p>
              </div>
              <div className="min-w-0 flex-1 rounded-2xl bg-[#f5f7fb] p-3 text-[#0b0f1c] [color-scheme:light] md:p-5">
                <ProcessVis type={step.vis} />
              </div>
            </div>
          </IntroReveal>
        ))}
      </div>
    </AllianceSection>
  )
}
