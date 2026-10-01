"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { FileText } from "lucide-react"
import {
  FUNNEL_PAYMENT_DEMO,
  FUNNEL_TAX_INVOICE_DEMO,
  PAYMENT_CONFIRM_DELAYS,
  PAYMENT_FUNNEL_PHASE_DELAYS,
  PAYMENT_INVOICE_DELAYS,
  PAYMENT_JOIN_DATE_DELAYS,
} from "@/app/intro/components/funnel/funnel-constants"
import { FunnelSceneNav } from "@/app/intro/components/funnel/funnel-scene-nav"
import { usePausableSequence } from "@/lib/intro/use-pausable-sequence"
import { usePrefersReducedMotion } from "@/lib/intro/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { PERSONA_PAYMENT, PERSONA_POSITION } from "../alliance-persona-content"
import { PersonaScreenShell } from "./persona-screen-shell"

const PHASES = ["stageChange", "salary", "credit"] as const
type Phase = (typeof PHASES)[number]

const labelCls = "text-[11px] font-semibold text-neutral-700 md:text-[12px]"
const inputCls =
  "flex h-9 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 text-[11px] text-foreground md:h-10 md:text-[12px]"

type Snapshot = { yesActive: boolean; salary: string; saveActive: boolean; deducted: boolean }

const SNAPSHOTS: Record<Phase, Snapshot> = {
  stageChange: { yesActive: false, salary: "", saveActive: false, deducted: false },
  salary: { yesActive: true, salary: PERSONA_PAYMENT.contractSalaryLabel, saveActive: true, deducted: false },
  credit: { yesActive: true, salary: PERSONA_PAYMENT.contractSalaryLabel, saveActive: true, deducted: true },
}

function ConfirmPanel({ yesActive }: { yesActive: boolean }) {
  return (
    <div className="fn-payment-confirm-card">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1A7CFF]">매칭리포트</p>
      <p className="mt-4 text-[15px] font-semibold leading-snug text-foreground md:text-base">최종합격 처리할까요?</p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
        {FUNNEL_PAYMENT_DEMO.applicantName} · {FUNNEL_PAYMENT_DEMO.positionTitle}
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" disabled className="fn-payment-no-btn">
          아니오
        </button>
        <button type="button" disabled className={cn("fn-payment-yes-btn", yesActive && "fn-payment-yes-btn-active")}>
          예
        </button>
      </div>
    </div>
  )
}

function SalaryPanel({ salary, saveActive }: { salary: string; saveActive: boolean }) {
  return (
    <div className="fn-payment-date-card">
      <p className="text-[15px] font-semibold leading-snug text-foreground md:text-base">계약 연봉을 입력해주세요</p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
        {FUNNEL_PAYMENT_DEMO.applicantName}님의 최종 계약 연봉을 알려주세요.
      </p>
      <div className="mt-5 space-y-1.5">
        <p className={labelCls}>
          계약 연봉
          <span className="ml-0.5 text-[#1A7CFF]">*</span>
        </p>
        <div className={inputCls}>
          <span className={cn("tabular-nums", salary ? "font-semibold" : "text-muted-foreground")}>
            {salary || "0"}
          </span>
          <span className="text-muted-foreground">만 원</span>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" disabled className={cn("fn-payment-save-btn", saveActive && "fn-payment-save-btn-active")}>
          저장
        </button>
      </div>
    </div>
  )
}

function InvoiceRow({
  label,
  value,
  strong = false,
  className,
}: {
  label: string
  value: string
  strong?: boolean
  className?: string
}) {
  return (
    <div className="fn-payment-invoice-row">
      <dt className={cn("fn-payment-invoice-label", className)}>{label}</dt>
      <dd className={cn("fn-payment-invoice-value", strong && "fn-payment-invoice-value-strong", className)}>
        {value}
      </dd>
    </div>
  )
}

export function InvoicePanel({ animateIn, issued }: { animateIn: boolean; issued: boolean }) {
  const invoice = FUNNEL_TAX_INVOICE_DEMO

  return (
    <div className="fn-interview-email fn-payment-invoice-phase">
      <div className="fn-interview-email-wrap">
        <article className={cn("fn-payment-invoice-card", animateIn && "intro-pop-in")}>
          <div className="fn-payment-invoice-header">
            <div className="flex items-start gap-2.5">
              <div className="fn-payment-invoice-icon-wrap">
                <FileText className="size-4 text-[#1A7CFF]" strokeWidth={2.25} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0b0f1c] md:text-base">{invoice.title}</h3>
            </div>
            <span className={cn("fn-payment-invoice-status", issued && "fn-payment-invoice-status-issued")}>
              {issued ? invoice.statusLabel : "발행 중"}
            </span>
          </div>

          <div className="fn-payment-invoice-parties">
            <div className="fn-payment-invoice-party">
              <p className="fn-payment-invoice-party-title">공급자</p>
              <p className="fn-payment-invoice-party-name">{invoice.issuerName}</p>
              <p className="fn-payment-invoice-party-meta">{invoice.issuerBizNo}</p>
            </div>
            <div className="fn-payment-invoice-party">
              <p className="fn-payment-invoice-party-title">공급받는자</p>
              <p className="fn-payment-invoice-party-name">{invoice.buyerName}</p>
              <p className="fn-payment-invoice-party-meta">{invoice.buyerBizNo}</p>
            </div>
          </div>

          <div className="fn-payment-invoice-items">
            <div className="fn-payment-invoice-item-head max-md:!hidden">
              <span>품목</span>
              <span>공급가액</span>
              <span>세액</span>
            </div>
            <div className="fn-payment-invoice-item-row">
              <div className="min-w-0">
                <p className="fn-payment-invoice-item-name">채용 성공 수수료 (스타팅 얼라이언스)</p>
                <p className="fn-payment-invoice-item-detail">
                  계약 연봉 {PERSONA_PAYMENT.contractSalaryLabel}만 원 × {PERSONA_POSITION.rateLabel} · 1명
                </p>
              </div>
              <span className="fn-payment-invoice-item-amount max-md:!hidden tabular-nums">
                {PERSONA_PAYMENT.feeAmount}
              </span>
              <span className="fn-payment-invoice-item-amount max-md:!hidden tabular-nums">
                {PERSONA_PAYMENT.vatAmount}
              </span>
            </div>
          </div>

          <dl className="fn-payment-invoice-summary">
            <InvoiceRow label="공급가액" value={`${PERSONA_PAYMENT.feeAmount}원`} />
            <InvoiceRow label="세액" value={`${PERSONA_PAYMENT.vatAmount}원`} />
            <InvoiceRow label="합계" value={`${PERSONA_PAYMENT.totalAmount}원`} strong />
          </dl>
        </article>
      </div>
    </div>
  )
}

export function PersonaPaymentScreen() {
  const reducedMotion = usePrefersReducedMotion()
  const animate = !reducedMotion
  const [phase, setPhase] = useState<Phase>("stageChange")
  const [snapshot, setSnapshot] = useState<Snapshot>(SNAPSHOTS.stageChange)
  const [autoCancelled, setAutoCancelled] = useState(false)

  const resetDemo = useCallback(() => {
    setPhase("stageChange")
    setSnapshot(SNAPSHOTS.stageChange)
    setAutoCancelled(false)
  }, [])

  useEffect(() => {
    if (animate) {
      resetDemo()
      return
    }
    setPhase("credit")
    setSnapshot(SNAPSHOTS.credit)
  }, [animate, resetDemo])

  const steps = useMemo(
    () => [
      { at: PAYMENT_CONFIRM_DELAYS.yesActive, run: () => setSnapshot((s) => ({ ...s, yesActive: true })) },
      { at: PAYMENT_FUNNEL_PHASE_DELAYS.joinDate, run: () => setPhase("salary") },
      {
        at: PAYMENT_JOIN_DATE_DELAYS.fieldFill,
        run: () => setSnapshot((s) => ({ ...s, salary: PERSONA_PAYMENT.contractSalaryLabel })),
      },
      { at: PAYMENT_JOIN_DATE_DELAYS.saveActive, run: () => setSnapshot((s) => ({ ...s, saveActive: true })) },
      { at: PAYMENT_FUNNEL_PHASE_DELAYS.invoice, run: () => setPhase("credit") },
      { at: PAYMENT_INVOICE_DELAYS.issued, run: () => setSnapshot((s) => ({ ...s, deducted: true })) },
    ],
    [],
  )

  usePausableSequence({
    active: animate,
    enabled: !autoCancelled,
    steps,
    onReset: resetDemo,
  })

  const goToPhase = useCallback((target: Phase) => {
    setAutoCancelled(true)
    setPhase(target)
    setSnapshot(SNAPSHOTS[target])
  }, [])

  const phaseIndex = PHASES.indexOf(phase)

  return (
    <PersonaScreenShell className="p-0 md:p-0">
      <div className="fn fn-preview-panel-interview relative h-full w-full">
        <div className="fn-scene-layer fn-scene-layer-active items-stretch !p-0">
          <div className="fn-interview-scene">
            {PHASES.map((layerPhase) => {
              const isActive = layerPhase === phase
              return (
                <div
                  key={layerPhase}
                  className={cn(
                    "fn-interview-layer",
                    layerPhase === "credit" && "fn-interview-layer-invoice",
                    isActive && "fn-interview-layer-active",
                  )}
                  aria-hidden={!isActive}
                >
                  {layerPhase === "stageChange" ? <ConfirmPanel yesActive={snapshot.yesActive && isActive} /> : null}
                  {layerPhase === "salary" ? (
                    <SalaryPanel salary={snapshot.salary} saveActive={snapshot.saveActive && isActive} />
                  ) : null}
                  {layerPhase === "credit" ? (
                    <InvoicePanel animateIn={animate && isActive} issued={snapshot.deducted && isActive} />
                  ) : null}
                </div>
              )
            })}
            <FunnelSceneNav
              className="fn-interview-phase-nav"
              index={phaseIndex}
              total={PHASES.length}
              onPrev={() => phaseIndex > 0 && goToPhase(PHASES[phaseIndex - 1])}
              onNext={() => phaseIndex < PHASES.length - 1 && goToPhase(PHASES[phaseIndex + 1])}
            />
          </div>
        </div>
      </div>
    </PersonaScreenShell>
  )
}
