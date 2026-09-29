import { FUNNEL_REPORT_APPLICANT } from "@/app/intro/components/funnel/funnel-constants"
import {
  ALLIANCE_CREDIT_DISCOUNT_RATE,
  ALLIANCE_FEE_RATE,
  calculateAllianceFee,
  formatRatePercent,
} from "@/lib/alliance/alliance-fee"

export const PERSONA_SALARY_MANWON = 7000

const personaFee = calculateAllianceFee(PERSONA_SALARY_MANWON)
const personaFeeManwon = personaFee.eligible ? personaFee.feeManwon : 0

export const ALLIANCE_PERSONA = {
  company: "스타팅파트너스",
  initial: "스",
} as const

export const PERSONA_POSITION = {
  title: "백엔드 리드",
  careerYears: "8년 이상",
  salaryManwon: PERSONA_SALARY_MANWON,
  salaryLabel: PERSONA_SALARY_MANWON.toLocaleString("ko-KR"),
  rateLabel: formatRatePercent(ALLIANCE_FEE_RATE),
  mainTasks: [
    "결제·정산 도메인 백엔드 아키텍처 설계 및 리딩",
    "백엔드 팀(5명) 기술 방향 수립 및 코드 리뷰",
    "대용량 트랜잭션 처리 성능·안정성 개선",
  ],
  qualifications: ["백엔드 개발 경력 8년 이상", "Java·Kotlin, Spring 기반 서비스 운영 경험"],
  preferred: ["일 100만 건 이상 대용량 트랜잭션 처리 경험", "핀테크·결제 도메인 서비스 경험"],
} as const

export const PERSONA_JOB_POSTING_URL = "https://careers.starting.kr/jobs/backend-lead"

export const PERSONA_STEPS = [
  {
    id: "terms",
    label: "약관 동의",
    labelShort: "약관",
    description: "서비스 이용 전 스타팅 얼라이언스 약관을 확인하고 온라인으로 동의해요.",
    url: "app.starting.kr/alliance/terms",
    durationMs: 5000,
  },
  {
    id: "apply",
    label: "포지션 신청",
    labelShort: "신청",
    description: "기존 채용공고 URL만 붙여넣으면 포지션 정보가 한 번에 채워져요.",
    url: "app.starting.kr/positions/new",
    durationMs: 7000,
  },
  {
    id: "report",
    label: "매칭 리포트",
    labelShort: "리포트",
    description: "이중 필터링을 거친 후보만, 조건별 근거와 함께 받아봐요.",
    url: "app.starting.kr/positions/backend-lead/report",
    durationMs: 10200,
  },
  {
    id: "interview",
    label: "면접 조율",
    labelShort: "면접",
    description: "일정을 제안하면 후보가 선택하고, 바로 확정돼요.",
    url: "app.starting.kr/positions/backend-lead/interview",
    durationMs: 7800,
  },
  {
    id: "payment",
    label: "입사 확정 · 결제",
    labelShort: "결제",
    description: "입사가 확정되면 계약 연봉 기준으로 정산하고, 크레딧 충전 시 10% 할인해 드려요.",
    url: "app.starting.kr/billing/invoices",
    durationMs: 10500,
  },
] as const

export type PersonaStepId = (typeof PERSONA_STEPS)[number]["id"]

const PERSONA_CANDIDATE_NAME = FUNNEL_REPORT_APPLICANT.name

const WON_PER_MANWON = 10000

const personaFeeWon = personaFeeManwon * WON_PER_MANWON
const personaDiscountWon = Math.round(personaFeeWon * ALLIANCE_CREDIT_DISCOUNT_RATE)
const personaTotalWon = personaFeeWon - personaDiscountWon

const formatWon = (won: number) => won.toLocaleString("ko-KR")

export const PERSONA_PAYMENT = {
  candidateName: PERSONA_CANDIDATE_NAME,
  finalStage: "최종합격",
  contractSalaryLabel: PERSONA_SALARY_MANWON.toLocaleString("ko-KR"),
  discountRateLabel: formatRatePercent(ALLIANCE_CREDIT_DISCOUNT_RATE),
  feeAmount: formatWon(personaFeeWon),
  discountAmount: formatWon(personaDiscountWon),
  totalAmount: formatWon(personaTotalWon),
  totalCredits: (personaTotalWon / WON_PER_MANWON).toLocaleString("ko-KR"),
} as const
