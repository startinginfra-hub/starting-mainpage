export const SCENE_ORDER = ["apply", "screening", "matching", "interview", "payment"] as const
export type FunnelScene = (typeof SCENE_ORDER)[number]

export const STEP_TABS = [
  { id: "apply" as const, label: "포지션 신청", labelShort: "신청" },
  { id: "screening" as const, label: "AI 스크리닝", labelShort: "AI" },
  { id: "matching" as const, label: "인재 매칭", labelShort: "매칭" },
  { id: "interview" as const, label: "면접 조율", labelShort: "면접" },
  { id: "payment" as const, label: "채용 후 결제", labelShort: "결제" },
] as const

export const SCENE_DELAYS: Record<FunnelScene, number> = {
  apply: 2800,
  screening: 4200,
  matching: 10200,
  interview: 7800,
  payment: 10500,
}

export const TAB_TO_SCENE: Record<number, FunnelScene> = {
  0: "apply",
  1: "screening",
  2: "matching",
  3: "interview",
  4: "payment",
}

export const MANUAL_FLOW_SCENES = ["apply", "screening", "matching", "interview"] as const
export type ManualFlowScene = (typeof MANUAL_FLOW_SCENES)[number]

export function isManualFlowScene(scene: FunnelScene): scene is ManualFlowScene {
  return (MANUAL_FLOW_SCENES as readonly string[]).includes(scene)
}

export function getManualFlowSceneIndex(scene: FunnelScene): number {
  return MANUAL_FLOW_SCENES.indexOf(scene as ManualFlowScene)
}

export function sceneToTab(scene: FunnelScene): number {
  return SCENE_ORDER.indexOf(scene)
}

export const APPLY_FORM_SAMPLE = {
  recruitJobTitle: "백엔드 개발자",
  minCareerYears: "3",
  maxCareerYears: "7",
  mainTasks:
    "· REST/GraphQL API 설계 및 구현\n· 서비스 아키텍처 개선 및 레거시 마이그레이션\n· 데이터 모델링 및 쿼리 성능 최적화\n· 코드 리뷰 및 팀 기술 표준 수립",
  qualifications:
    "· Node.js 또는 Java 기반 백엔드 3년 이상\n· RDBMS 설계·운영 경험 (PostgreSQL 등)\n· REST API 설계 및 운영 경험\n· Git 기반 협업 및 코드 리뷰 경험",
  preferredPoints:
    "· B2B SaaS 서비스 개발 경험\n· AWS 또는 GCP 클라우드 인프라 경험\n· 스타트업 또는 빠른 성장 환경 경험\n· 기술 블로그·오픈소스 기여 경험",
} as const

export const COORDINATOR_INTRO_SHORT =
  "담당자님, 안녕하세요. 담당 코디네이터 서윤이에요! ✋\n작성된 내용을 바탕으로 수정이 필요한 부분을 제안드릴게요."

export const SCREENING_SUMMARY =
  "전반적으로 백엔드 시니어 포지션에 맞는 방향이에요.\n다만 주요 업무는 API·데이터 모델링 중심으로 더 구체화하고, 우대 사항에는 B2B SaaS·클라우드 도메인 키워드를 넣으면 서류 합격률과 매칭 정확도가 올라갈 것 같아요."

export type ScreeningSectionStatus = "ok" | "warning" | "mismatch"

export const SCREENING_SECTION_REVIEWS = [
  {
    id: "mainTasks" as const,
    section: "주요 업무",
    status: "warning" as ScreeningSectionStatus,
    statusLabel: "수정 제안",
    reason:
      "채용 직군은 백엔드인데, 작성하신 업무 문구에 프론트·인프라 혼합 표현이 섞여 있어요.\n지원자 입장에서는 본인 역량과 맞는지 판단하기 어렵고, 매칭 시에도 핵심 업무 범위가 흐려질 수 있어요.",
    suggestion:
      "· REST/GraphQL API 설계·구현 및 버전 관리\n· 서비스 도메인 모델링, DB 스키마·마이그레이션 설계\n· 레거시 모듈 리팩터링 및 성능·장애 대응\n· 코드 리뷰, 기술 표준 수립 등 백엔드 중심 업무로 정리",
  },
  {
    id: "qualifications" as const,
    section: "자격 요건",
    status: "ok" as ScreeningSectionStatus,
    statusLabel: "적절",
    reason:
      "Node.js 기반 3년 이상, RDBMS·REST API 경험 등 필수 조건이 직군·경력대와 잘 맞아요.\n현재 수준으로도 1차 서류 스크리닝 기준으로는 무난하게 사용할 수 있어요.",
    suggestion:
      "· PostgreSQL/MySQL 운영·쿼리 튜닝 경험 명시\n· 대용량 트래픽·분산 환경 경험 한 줄 추가\n· Git 기반 협업·코드 리뷰 문화 경험 보강",
  },
  {
    id: "preferredPoints" as const,
    section: "우대 사항",
    status: "warning" as ScreeningSectionStatus,
    statusLabel: "수정 제안",
    reason:
      "우대 사항이 ‘성실함’, ‘커뮤니케이션’ 등 범용 표현 위주라, 실제로 어떤 경험을 가진 인재를 원하는지 드러나지 않아요.\nB2B·SaaS·클라우드 도메인 경험자와의 매칭 정확도가 떨어질 수 있어요.",
    suggestion:
      "· B2B SaaS 제품 개발·운영 경험 (구독·과금 모델 이해)\n· AWS/GCP 기반 배포·모니터링 경험\n· 스타트업·빠른 성장 환경에서의 아키텍처 의사결정\n· 기술 블로그·오픈소스 기여 등 학습·공유 경험",
  },
] as const

export const SCREENING_REVEAL_DELAYS = {
  intro: 700,
  summary: 1200,
  sectionStart: 1700,
  sectionStep: 550,
} as const

export type FunnelReportRow = {
  id: string
  requirement: string
  analysis: string
  sourceBadges: readonly string[]
  result: "충족" | "일부충족" | "미충족"
}

export const FUNNEL_REPORT_CONDITION_LABEL = "매칭 조건"

export const FUNNEL_REPORT_APPLICANT = {
  name: "김지원",
  role: "백엔드 개발자",
  email: "jiwon.kim@email.com",
  phone: "010-2345-6789",
  location: "서울 · 재택·출근 협의 가능",
  summary:
    "B2B SaaS 제품의 API·데이터 레이어를 설계·운영해 온 백엔드 개발자입니다. Node.js·PostgreSQL 기반 서비스 아키텍처 개선과 구독·과금 도메인 경험을 보유하고 있습니다.",
  matchScore: 92,
} as const

export const FUNNEL_REPORT_ROWS = [
  {
    id: "career",
    requirement: "백엔드 개발자 3년 이상",
    analysis:
      "이력서 경력란에 '(주)클라우드웍스 백엔드 개발자 2021.03~현재'로 기재되어 있습니다. Node.js·NestJS 기반 API 개발 경력이 4년 2개월로 산출되며, 기업 필수 요건을 상회합니다.",
    sourceBadges: ["이력서"],
    result: "충족",
  },
  {
    id: "rdbms",
    requirement: "RDBMS 설계·운영 경험",
    analysis:
      "주요 기술 스택에 PostgreSQL이 명시되어 있고, '스키마 설계·인덱스·쿼리 튜닝' 경험이 구체적으로 기술되어 있습니다. 운영 DB 마이그레이션·성능 개선 사례까지 포함되어 실무 역량이 확인됩니다.",
    sourceBadges: ["이력서"],
    result: "충족",
  },
  {
    id: "saas",
    requirement: "B2B SaaS 서비스 개발 경험",
    analysis:
      "프로젝트 경력에 'B2B 구독형 SaaS 결제·과금 모듈' 개발이 2년 이상 기재되어 있습니다. 구독·과금 도메인 키워드와 고객사 온보딩 API 경험이 기업 우대 조건과 일치합니다.",
    sourceBadges: ["이력서", "경력기술서"],
    result: "충족",
  },
  {
    id: "collab",
    requirement: "Git 기반 코드 리뷰·협업 경험",
    analysis:
      "협업 방식으로 Git Flow·PR 리뷰 문화가 명시되어 있으며, 주 15건 이상 코드 리뷰 참여와 릴리즈 브랜치 전략 수립 경험이 확인됩니다. 팀 협업 필수 조건을 충족합니다.",
    sourceBadges: ["경력기술서"],
    result: "충족",
  },
] as const satisfies ReadonlyArray<FunnelReportRow>

export const FUNNEL_RESUME_SECTIONS = [
  {
    title: "프로필 요약",
    items: [
      {
        evidenceIndex: null,
        primary:
          "B2B SaaS 제품의 API·데이터 레이어를 설계·운영해 온 백엔드 개발자입니다. 구독·과금 도메인과 대용량 트래픽 환경에서의 성능·안정성 개선 경험이 있습니다.",
        secondary: null,
        bullets: null,
      },
    ],
  },
  {
    title: "경력",
    items: [
      {
        evidenceIndex: 0,
        primary: "(주)클라우드웍스 | 백엔드 개발자 | 2021.03 – 현재 (4년 2개월)",
        secondary: "B2B SaaS 플랫폼팀 · 정규직 · 팀원 8명",
        bullets: [
          "Node.js·NestJS 기반 REST/GraphQL API 설계·구현 및 버전 관리",
          "서비스 도메인 모델링, DB 스키마·마이그레이션 설계 및 레거시 모듈 리팩터링",
          "일 평균 120만 req 처리 구간의 API 응답 지연 38% 개선 (캐싱·쿼리 튜닝)",
          "장애 대응 runbook 정비 및 온콜 로테이션 참여",
        ],
      },
      {
        evidenceIndex: null,
        primary: "(주)테크스타트 | 주니어 백엔드 | 2019.06 – 2021.02 (1년 9개월)",
        secondary: "인하우스 서비스팀 · 정규직",
        bullets: [
          "Express.js 기반 내부 어드민·배치 API 개발",
          "MySQL 스키마 설계 및 CRUD·리포트 API 구현",
          "Docker Compose 기반 로컬 개발 환경 표준화",
        ],
      },
    ],
  },
  {
    title: "기술",
    items: [
      {
        evidenceIndex: 1,
        primary:
          "PostgreSQL 스키마 설계, 인덱스·쿼리 튜닝 (3년+) · 대용량 테이블 파티셔닝·슬로우 쿼리 개선",
        secondary: "운영 DB 마이그레이션·replica 구성 경험",
        bullets: [
          "Redis 캐싱, Flyway 마이그레이션, 읽기 전용 replica 운영",
          "EXPLAIN ANALYZE 기반 슬로우 쿼리 40건+ 개선",
          "월 1.2억 row 규모 이벤트 로그 테이블 파티셔닝 적용",
        ],
      },
      {
        evidenceIndex: null,
        primary: "Language / Framework",
        secondary: "Node.js, TypeScript, NestJS, Express, GraphQL, Jest",
        bullets: null,
      },
      {
        evidenceIndex: null,
        primary: "Infra / DevOps",
        secondary: "Docker, AWS (ECS, RDS, S3, CloudWatch), GitHub Actions, Datadog",
        bullets: null,
      },
    ],
  },
  {
    title: "프로젝트",
    items: [
      {
        evidenceIndex: 2,
        primary:
          "B2B 구독형 SaaS 결제·과금 모듈 개발 (2022–2024) · 월 ARR 12억 규모 고객사 온보딩 API",
        secondary: "결제·빌링 도메인 리드 (기여도 60%)",
        bullets: [
          "Stripe·국내 PG 연동, 구독 플랜·좌석 과금 정책 설계 및 운영",
          "청구서·세금계산서 발행 배치, 미납·해지 워크플로우 API 구현",
          "고객사 셀프 온보딩 API 12개 엔드포인트 설계 (평균 온보딩 3일 → 4시간 단축)",
        ],
      },
      {
        evidenceIndex: null,
        primary: "멀티테넌시 권한·조직 관리 API (2023)",
        secondary: "플랫폼팀 내부 프로젝트",
        bullets: [
          "테넌트·워크스페이스·역할(RBAC) 모델 설계",
          "조직 초대·권한 위임 API 및 감사 로그 저장",
        ],
      },
      {
        evidenceIndex: null,
        primary: "레거시 모놀리스 API 분리 (2024)",
        secondary: "점진적 strangler fig 패턴 적용",
        bullets: [
          "주문·정산 bounded context 분리, 이벤트 기반 동기화",
          "Feature flag 기반 트래픽 전환 및 롤백 전략 수립",
        ],
      },
    ],
  },
  {
    title: "협업",
    items: [
      {
        evidenceIndex: 3,
        primary:
          "Git Flow 기반 PR 리뷰 (주 15건+) · trunk-based 전환 및 릴리즈 브랜치 전략 수립",
        secondary: "2023년 하반기 팀 Git 전략 개선 TF 참여",
        bullets: [
          "Confluence·Jira 기반 2주 스프린트 운영",
          "신규 입사자 온보딩 가이드·API 문서(Swagger) 정비",
          "코드 리뷰 체크리스트 도입 및 PR 템플릿 표준화",
        ],
      },
    ],
  },
  {
    title: "학력",
    items: [
      {
        evidenceIndex: null,
        primary: "한국대학교 컴퓨터공학과 학사 (2015.03 – 2019.02)",
        secondary: "졸업 · 학점 3.8/4.5",
        bullets: ["졸업 논문: REST API 기반 마이크로서비스 모니터링 시스템 설계"],
      },
    ],
  },
  {
    title: "기타",
    items: [
      {
        evidenceIndex: null,
        primary: "AWS Certified Developer – Associate (2023)",
        secondary: null,
        bullets: null,
      },
      {
        evidenceIndex: null,
        primary: "기술 블로그 · GitHub 오픈소스 (NestJS 미들웨어 유틸, ★ 120+)",
        secondary: "https://github.com/jiwon-kim · 월 1회 기술 글 발행",
        bullets: null,
      },
    ],
  },
] as const

export const MATCHING_FUNNEL_PHASES = ["arrival", "report"] as const
export type MatchingFunnelPhase = (typeof MATCHING_FUNNEL_PHASES)[number]

export const MATCHING_FUNNEL_PHASE_DELAYS = {
  report: 2200,
} as const

export const MATCHING_ARRIVAL_DELAYS = {
  ctaActive: 1200,
} as const

export const MATCHING_REPORT_DEMO_DELAYS = {
  firstSelect: MATCHING_FUNNEL_PHASE_DELAYS.report + 900,
  step: 1600,
} as const

export const INTERVIEW_FUNNEL_PHASES = ["proposal", "email", "confirm"] as const
export type InterviewFunnelPhase = (typeof INTERVIEW_FUNNEL_PHASES)[number]

export const INTERVIEW_FUNNEL_PHASE_LABELS: Record<InterviewFunnelPhase, string> = {
  proposal: "제안",
  email: "메일",
  confirm: "확정",
}

export const FUNNEL_INTERVIEW_DEMO = {
  applicantName: "김지원",
  applicantEmail: "jiwon.kim@email.com",
  companyName: "스타팅파트너스(주)",
  positionTitle: "시니어 백엔드 엔지니어 채용",
  scheduleName: "1차 면접",
  screeningStage: "1차 면접",
  interviewType: "대면",
  location: "서울 강남구 테헤란로 123, 15층 회의실 A",
  contactPhone: "010-1234-5678",
  responseDeadline: "2025년 6월 11일(수) 18:00",
  proposedSlots: [
    { id: "slot-1", label: "2025. 06. 12 (목) 14:00 ~ 15:00", durationMin: 60 },
    { id: "slot-2", label: "2025. 06. 13 (금) 10:00 ~ 11:00", durationMin: 60 },
  ],
  selectedSlotIndex: 0,
  companyConfirmMessage: "인재가 일정을 선택했어요",
} as const

export const INTERVIEW_FUNNEL_PHASE_DELAYS = {
  email: 3800,
  confirm: 5800,
} as const

export const INTERVIEW_PROPOSAL_FIELD_DELAYS = {
  start: 400,
  step: 400,
} as const

export const INTERVIEW_CONFIRM_DELAYS = {
  buttonActive: 800,
} as const

export const PAYMENT_FUNNEL_PHASES = ["stageChange", "joinDate", "invoice"] as const
export type PaymentFunnelPhase = (typeof PAYMENT_FUNNEL_PHASES)[number]

export const FUNNEL_PAYMENT_DEMO = {
  applicantName: FUNNEL_REPORT_APPLICANT.name,
  positionTitle: FUNNEL_INTERVIEW_DEMO.positionTitle,
  companyName: FUNNEL_INTERVIEW_DEMO.companyName,
  previousStage: "2차 면접",
  finalStage: "최종합격",
  joinDate: "2025-07-01",
  joinDateDisplay: "2025. 07. 01",
} as const

export const FUNNEL_TAX_INVOICE_DEMO = {
  cardHeadline: "미리 결제 하지 않아요, 입사 후 결제해요",
  title: "전자세금계산서",
  statusLabel: "발행 완료",
  issuerName: "스타팅파트너스(주)",
  issuerBizNo: "123-45-67890",
  buyerName: "에이비씨기업",
  buyerBizNo: "987-65-43210",
  itemName: "채용 성공 수수료 (헤드헌팅)",
  itemDetail: "시니어 백엔드 엔지니어 채용 · 1명",
  supplyAmount: "3,000,000",
  vatAmount: "300,000",
  totalAmount: "3,300,000",
  notice: "연봉 상관 없이 정찰제 비용이 적용돼요",
} as const

export const PAYMENT_FUNNEL_PHASE_DELAYS = {
  joinDate: 2200,
  invoice: 4300,
} as const

export const PAYMENT_CONFIRM_DELAYS = {
  yesActive: 700,
} as const

export const PAYMENT_JOIN_DATE_DELAYS = {
  fieldFill: PAYMENT_FUNNEL_PHASE_DELAYS.joinDate + 700,
  saveActive: PAYMENT_FUNNEL_PHASE_DELAYS.joinDate + 1500,
} as const

export const PAYMENT_INVOICE_DELAYS = {
  issued: PAYMENT_FUNNEL_PHASE_DELAYS.invoice + 700,
} as const

export const PAYMENT_PLAN = {
  title: "합격 후 결제",
  price: "₩300만 원",
  meta: "VAT 별도 · 입사 이후 결제",
  perUnit: "1명 기준",
  features: [
    "기업 내부 조건에 맞는 인재 프리미엄 매칭",
    "신속한 서류 검토 · 유사도 분석 리포트 제공",
    "면접 일정 조율 및 처우 협의 서포트",
  ],
  total: "300만 원 (VAT 별도)",
} as const

export type SceneAction = { type: "next" } | { type: "set"; scene: FunnelScene }

export function sceneReducer(state: FunnelScene, action: SceneAction): FunnelScene {
  if (action.type === "set") return action.scene
  const idx = SCENE_ORDER.indexOf(state)
  if (idx >= SCENE_ORDER.length - 1) return SCENE_ORDER[0]
  return SCENE_ORDER[idx + 1]
}
