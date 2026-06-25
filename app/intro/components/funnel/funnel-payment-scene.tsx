"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Check, Banknote, FileText } from "lucide-react"
import {
  FUNNEL_PAYMENT_DEMO,
  FUNNEL_TAX_INVOICE_DEMO,
  PAYMENT_CONFIRM_DELAYS,
  PAYMENT_FUNNEL_PHASE_DELAYS,
  PAYMENT_FUNNEL_PHASES,
  PAYMENT_INVOICE_DELAYS,
  PAYMENT_JOIN_DATE_DELAYS,
  type PaymentFunnelPhase,
} from "./funnel-constants"
import { FunnelSceneNav } from "./funnel-scene-nav"
import { usePausableSequence, type PausableSequenceStep } from "@/lib/intro/use-pausable-sequence"
import { cn } from "@/lib/utils"

type Props = {
  active: boolean
  animate: boolean
  paused?: boolean
  previewMode?: boolean
}

const labelCls = "text-[11px] font-semibold text-neutral-700 md:text-[12px]"
const inputCls =
  "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[11px] text-foreground md:h-10 md:text-[12px]"

type PhaseSnapshot = {
  yesActive: boolean
  joinDate: string
  saveActive: boolean
  dateSaved: boolean
  invoiceIssued: boolean
}

function getPhaseSnapshot(target: PaymentFunnelPhase): PhaseSnapshot {
  const demo = FUNNEL_PAYMENT_DEMO

  if (target === "stageChange") {
    return {
      yesActive: false,
      joinDate: "",
      saveActive: false,
      dateSaved: false,
      invoiceIssued: false,
    }
  }
  if (target === "joinDate") {
    return {
      yesActive: true,
      joinDate: demo.joinDateDisplay,
      saveActive: true,
      dateSaved: true,
      invoiceIssued: false,
    }
  }
  return {
    yesActive: true,
    joinDate: demo.joinDateDisplay,
    saveActive: true,
    dateSaved: true,
    invoiceIssued: true,
  }
}

function applyPhaseSnapshot(
  target: PaymentFunnelPhase,
  setters: {
    setYesActive: (value: boolean) => void
    setJoinDate: (value: string) => void
    setSaveActive: (value: boolean) => void
    setDateSaved: (value: boolean) => void
    setInvoiceIssued: (value: boolean) => void
  },
) {
  const snapshot = getPhaseSnapshot(target)
  setters.setYesActive(snapshot.yesActive)
  setters.setJoinDate(snapshot.joinDate)
  setters.setSaveActive(snapshot.saveActive)
  setters.setDateSaved(snapshot.dateSaved)
  setters.setInvoiceIssued(snapshot.invoiceIssued)
}

function buildPaymentAutoSteps(
  setPhase: (value: PaymentFunnelPhase) => void,
  setJoinDate: (value: string) => void,
  setSaveActive: (value: boolean) => void,
  setDateSaved: (value: boolean) => void,
  setInvoiceIssued: (value: boolean) => void,
): PausableSequenceStep[] {
  const demo = FUNNEL_PAYMENT_DEMO

  return [
    {
      at: PAYMENT_FUNNEL_PHASE_DELAYS.joinDate,
      run: () => setPhase("joinDate"),
    },
    {
      at: PAYMENT_JOIN_DATE_DELAYS.fieldFill,
      run: () => setJoinDate(demo.joinDateDisplay),
    },
    {
      at: PAYMENT_JOIN_DATE_DELAYS.saveActive,
      run: () => {
        setSaveActive(true)
        setDateSaved(true)
      },
    },
    {
      at: PAYMENT_FUNNEL_PHASE_DELAYS.invoice,
      run: () => setPhase("invoice"),
    },
    {
      at: PAYMENT_INVOICE_DELAYS.issued,
      run: () => setInvoiceIssued(true),
    },
  ]
}

function PaymentConfirmPanel({ yesActive }: { yesActive: boolean }) {
  const demo = FUNNEL_PAYMENT_DEMO

  return (
    <div className="fn-payment-confirm-card">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1A7CFF]">매칭리포트</p>
      <p className="mt-4 text-[15px] font-semibold leading-snug text-foreground md:text-base">
        최종합격 처리할까요?
      </p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
        {demo.applicantName} · {demo.positionTitle}
      </p>

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" disabled className="fn-payment-no-btn">
          아니오
        </button>
        <button
          type="button"
          disabled
          className={cn("fn-payment-yes-btn", yesActive && "fn-payment-yes-btn-active")}
        >
          예
        </button>
      </div>
    </div>
  )
}

function PaymentJoinDatePanel({
  joinDate,
  saveActive,
}: {
  joinDate: string
  saveActive: boolean
}) {
  const demo = FUNNEL_PAYMENT_DEMO

  return (
    <div className="fn-payment-date-card">
      <p className="text-[15px] font-semibold leading-snug text-foreground md:text-base">입사일을 입력해주세요</p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
        {demo.applicantName}님의 입사 예정일을 알려주세요.
      </p>

      <div className="mt-5 space-y-1.5">
        <label htmlFor="fn-payment-join-date" className={labelCls}>
          입사일
          <span className="ml-0.5 text-[#1A7CFF]">*</span>
        </label>
        <input
          id="fn-payment-join-date"
          type="text"
          readOnly
          value={joinDate}
          placeholder="YYYY. MM. DD"
          className={cn(inputCls, "pointer-events-none cursor-default select-none caret-transparent")}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          disabled
          className={cn("fn-payment-save-btn", saveActive && "fn-payment-save-btn-active")}
        >
          저장
        </button>
      </div>
    </div>
  )
}

function InvoiceRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="fn-payment-invoice-row">
      <dt className="fn-payment-invoice-label">{label}</dt>
      <dd className={cn("fn-payment-invoice-value", strong && "fn-payment-invoice-value-strong")}>{value}</dd>
    </div>
  )
}

function PaymentTaxInvoicePanel({
  animateIn,
  issued,
}: {
  animateIn: boolean
  issued: boolean
}) {
  const invoice = FUNNEL_TAX_INVOICE_DEMO

  return (
    <div className="fn-interview-email fn-payment-invoice-phase">
      <div className="fn-interview-email-wrap">
        <p className="fn-interview-email-notice fn-payment-invoice-headline max-md:!hidden">
          <Banknote className="fn-interview-email-notice-icon" aria-hidden />
          <span>{invoice.cardHeadline}</span>
        </p>
        <article
          className={cn(
            "fn-payment-invoice-card",
            animateIn && "intro-pop-in",
          )}
        >
          <div className="fn-payment-invoice-header">
            <div className="flex items-start gap-2.5">
              <div className="fn-payment-invoice-icon-wrap">
                <FileText className="size-4 text-[#1A7CFF]" strokeWidth={2.25} />
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-[#0b0f1c] md:text-base">{invoice.title}</h3>
              </div>
            </div>
            <span
              className={cn(
                "fn-payment-invoice-status",
                issued && "fn-payment-invoice-status-issued",
              )}
            >
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
                <p className="fn-payment-invoice-item-name">{invoice.itemName}</p>
                <p className="fn-payment-invoice-item-detail">{invoice.itemDetail}</p>
              </div>
              <span className="fn-payment-invoice-item-amount max-md:!hidden tabular-nums">{invoice.supplyAmount}</span>
              <span className="fn-payment-invoice-item-amount max-md:!hidden tabular-nums">{invoice.vatAmount}</span>
            </div>
          </div>

          <dl className="fn-payment-invoice-summary">
            <InvoiceRow label="공급가액" value={`${invoice.supplyAmount}원`} />
            <InvoiceRow label="부가세" value={`${invoice.vatAmount}원`} />
            <InvoiceRow label="합계" value={`${invoice.totalAmount}원`} strong />
          </dl>

          <p className="fn-payment-invoice-notice">{invoice.notice}</p>
        </article>
      </div>
    </div>
  )
}

function PhaseNav({
  phaseIndex,
  onPrev,
  onNext,
}: {
  phaseIndex: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <FunnelSceneNav
      className="fn-interview-phase-nav"
      index={phaseIndex}
      total={PAYMENT_FUNNEL_PHASES.length}
      onPrev={onPrev}
      onNext={onNext}
    />
  )
}

export function FunnelPaymentScene({ active, animate, paused = false, previewMode = false }: Props) {
  const [phase, setPhase] = useState<PaymentFunnelPhase>("stageChange")
  const [yesActive, setYesActive] = useState(false)
  const [joinDate, setJoinDate] = useState("")
  const [saveActive, setSaveActive] = useState(false)
  const [dateSaved, setDateSaved] = useState(false)
  const [invoiceIssued, setInvoiceIssued] = useState(false)
  const [autoCancelled, setAutoCancelled] = useState(false)

  const setters = {
    setYesActive,
    setJoinDate,
    setSaveActive,
    setDateSaved,
    setInvoiceIssued,
  }

  const resetDemo = useCallback(() => {
    setPhase("stageChange")
    setYesActive(false)
    setJoinDate("")
    setSaveActive(false)
    setDateSaved(false)
    setInvoiceIssued(false)
    setAutoCancelled(false)
  }, [])

  useEffect(() => {
    if (!active) return
    if (!animate) {
      setPhase("invoice")
      applyPhaseSnapshot("invoice", setters)
      return
    }
    resetDemo()
  }, [active, animate, resetDemo])

  const steps = useMemo(
    () =>
      buildPaymentAutoSteps(
        setPhase,
        setJoinDate,
        setSaveActive,
        setDateSaved,
        setInvoiceIssued,
      ),
    [],
  )

  usePausableSequence({
    active: active && animate,
    enabled: !paused && !autoCancelled,
    steps: [
      {
        at: PAYMENT_CONFIRM_DELAYS.yesActive,
        run: () => setYesActive(true),
      },
      ...steps,
    ],
    onReset: resetDemo,
  })

  const goToPhase = useCallback((target: PaymentFunnelPhase) => {
    setAutoCancelled(true)
    setPhase(target)
    applyPhaseSnapshot(target, setters)
  }, [])

  const phaseIndex = PAYMENT_FUNNEL_PHASES.indexOf(phase)

  const goPrev = useCallback(() => {
    if (phaseIndex <= 0) return
    goToPhase(PAYMENT_FUNNEL_PHASES[phaseIndex - 1])
  }, [goToPhase, phaseIndex])

  const goNext = useCallback(() => {
    if (phaseIndex >= PAYMENT_FUNNEL_PHASES.length - 1) return
    goToPhase(PAYMENT_FUNNEL_PHASES[phaseIndex + 1])
  }, [goToPhase, phaseIndex])

  return (
    <div className={cn("fn-interview-scene", previewMode && "fn-payment-scene-preview")}>
      {PAYMENT_FUNNEL_PHASES.map((layerPhase) => {
        const isActive = layerPhase === phase

        return (
          <div
            key={layerPhase}
            className={cn(
              "fn-interview-layer",
              layerPhase === "invoice" && "fn-interview-layer-invoice",
              isActive && "fn-interview-layer-active",
            )}
            aria-hidden={!isActive}
          >
            {layerPhase === "stageChange" ? (
              <PaymentConfirmPanel yesActive={yesActive && isActive} />
            ) : null}
            {layerPhase === "joinDate" ? (
              <PaymentJoinDatePanel
                joinDate={joinDate}
                saveActive={saveActive && isActive}
              />
            ) : null}
            {layerPhase === "invoice" ? (
              <PaymentTaxInvoicePanel
                animateIn={active && animate && isActive && !previewMode}
                issued={(invoiceIssued && isActive) || previewMode}
              />
            ) : null}
          </div>
        )
      })}

      {active && !previewMode ? (
        <PhaseNav phaseIndex={phaseIndex} onPrev={goPrev} onNext={goNext} />
      ) : null}
    </div>
  )
}

export type { PaymentFunnelPhase }
