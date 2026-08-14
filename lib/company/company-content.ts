export const COMPANY_META_DESCRIPTION =
  "플랫폼의 저효율·고비용 딜레마를 본질적으로 해결하는 HR Tech 스타트업"

export const COMPANY_SUPPORT_EMAIL = "support@starting.kr"
export const COMPANY_PHONE = "1688-7360"
export const COMPANY_KAKAO_CHAT_URL = "https://pf.kakao.com/_Vwqxexj/chat"
export const COMPANY_BLOG_URL = "https://blog.starting.kr/ko"

export const companyHero = {
  brand: "스타팅파트너스",
  headline: "채용의 딜레마를,",
  headlineLine2: "본질부터 바꿉니다",
  sub: "실무자급 채용 딜레마를 해결하는 AI Agent 헤드헌팅 솔루션 ‘스타팅’",
  primaryCta: { label: "서비스 보기", href: "/" },
  secondaryCta: { label: "HR 문화", href: "/company/hr" },
} as const

export const companyManifesto = {
  paragraphs: [
    {
      id: "p1",
      lines: [
        "플랫폼은 지원자를 넘치게 주지만,",
        "고르는 일은 결국 기업의 몫입니다.",
        "서치펌은 알아서 골라주지만, 그만큼 비쌉니다.",
      ],
    },
    {
      id: "p2",
      parts: [
        { text: "스타팅은 " },
        { text: "이 딜레마를 정조준", strong: true },
        { text: " 합니다." },
      ],
    },
    {
      id: "p3",
      parts: [
        { text: "채용 효율을 높이는 " },
        { text: "엔진", strong: true },
        { text: "을 만들어," },
        { text: "\n기업·인재라는 자원을 매출로 " },
        { text: "전환", strong: true },
        { text: "시킵니다." },
      ],
    },
    {
      id: "p4",
      lines: [
        "JD 자동작성부터 필터링·스크리닝·리포팅·조율까지,",
        "서치펌 이상의 정교함과 효율을 플랫폼 수준의 비용으로.",
      ],
    },
    {
      id: "p5",
      lines: [
        "어느 한 쪽을 선택해도 풀리지 않던 딜레마,",
        "리텐션으로 증명되는 놀라운 경험을 제공합니다.",
      ],
    },
  ],
} as const

export const companyMission = {
  headline: "우리가 바꾸는 채용",
  lead: "스타트업을 위한, 새로운 채용을 만들고자 합니다",
} as const

export const companyCoreValues = {
  items: [
    {
      id: "ai-agent",
      title: "AI Agent 고도화",
      body: "키워드·유사도 필터를 고도화해, 적합 인재만 골라냅니다",
    },
    {
      id: "price",
      title: "플랫폼보다 저렴한 정찰제",
      body: "공개 공고 수수료보다 부담 없는 가격으로 채용합니다",
    },
    {
      id: "precision",
      title: "헤드헌팅처럼 정교하고 편하게",
      body: "매칭부터 채용 확정까지, 정교한 헤드헌팅 경험을 그대로 제공합니다",
    },
  ],
} as const

/** @deprecated Mission에 통합됨 — 잔여 HMR 참조용 */
export const companyVision = {
  label: "Vision",
  title: "",
  paragraphs: [] as const,
} as const

export const companyIndicators = {
  label: "Growth",
  title: "우리가 바라보는 채용 시장",
  lead: "DX·AX가 가속하는 시장에서, 유료 채용을 이미 쓰는 기업을 정조준합니다.",
  headline: "청년 인구는 줄어도,\nDX·AX 채용 수요는 매년 3만 명씩 성장",
  sub: "LTV 가장 높은 B2B 필수재, 2030 신산업 실무자급 채용 시장",
  source: "출처: 통계청 산업별·연령별 취업자",
  sourceNote: "신산업 업종: 지식기반 서비스업(정보통신, 전문·과학·기술)",
  employmentLabel: "신산업 청년 취업자",
  chart: [
    { year: "2020", employmentMan: 69 },
    { year: "2021", employmentMan: 71 },
    { year: "2022", employmentMan: 75 },
    { year: "2023", employmentMan: 78 },
    { year: "2024", employmentMan: 81 },
  ],
  metrics: [
    {
      label: "DX·AX CAGR",
      value: "14.9%",
      note: null,
    },
    {
      label: "유료 채용 중개 활용",
      value: "79%",
      note: null,
    },
    {
      label: "우리의 타겟",
      value: "유료 채용\n이용 기업",
      note: null,
    },
  ],
} as const

export const companyDilemmaMerge = {
  left: {
    eyebrow: "채용 플랫폼",
    title: "저렴하지만,",
    body: "모든 걸 직접하며\nAI 추천이 정확하지 않습니다",
  },
  right: {
    eyebrow: "헤드헌팅",
    title: "정교하지만,",
    body: "헤드헌터 인건비로\n채용 수수료 비용이 비쌉니다",
  },
  result: {
    eyebrow: "플랫폼의 가격 × 헤드헌팅의 정교함",
  },
} as const

export const companyPricing = {
  title: "정찰제",
  headline: "경력 무관 정찰제",
  plans: [
    {
      id: "postpaid",
      name: "후불",
      price: "300만원",
      unit: "1명",
      note: null,
    },
    {
      id: "prepaid-2",
      name: "선불",
      price: "250만원",
      unit: "1명",
      note: "최대 2명 채용 / 12개월간 / 총 500만원",
    },
    {
      id: "prepaid-4",
      name: "선불",
      price: "250만원",
      unit: "1명 기준",
      note: "최대 4명 채용 / 15개월간 / 총 1,000만원",
    },
  ],
} as const

export type CompanyHistoryYear = {
  year: string
  items: readonly string[]
}

export const companyHistory: readonly CompanyHistoryYear[] = [
  {
    year: "2026",
    items: [
      "인하대학교 창업지원단 '초기창업패키지 보육기업 채용지원' 사업 수주",
      "'프로젝트에 기반한 인재 추천 방법 및 장치' 특허 등록",
      "딥테크 창업사관학교 1기 선정",
      "중소벤처기업부 기술혁신형중소기업 이노비즈 인증",
      "스타팅파트너스 주식회사 사명 변경",
    ],
  },
  {
    year: "2025",
    items: [
      "'인공지능을 이용한 직무 프로젝트 가이드 큐레이션 장치' 특허 등록",
      "KU 스타트업 펀딩업 데모데이 '대상' 수상",
      "'프로젝트 연관성 기반 채용 적합도 분석 장치 및 방법' 특허 등록",
      "강원창조경제혁신센터X더존비즈온 오픈이노베이션 사업 단독 선정",
      "중소벤처기업진흥공단 '신산업 전문인력 채용 지원' 사업 수주",
      "KU 창업 아이디어 경진대회 '최우수상' 수상",
      "강한 소상공인 성장지원사업(글로벌유형) 파트너사 선정",
    ],
  },
  {
    year: "2024",
    items: [
      "스타트업을 위한 정찰제 헤드헌팅 솔루션 '스타팅' 출시",
      "K-Unicorn Dream Show 우수제품관 전시",
      "'프로젝트 수행 내용 자동기록 방법 및 장치' 특허 등록",
      "청년창업사관학교 창업출정식 퍼포먼스 참여기업 선발",
      "경기북부 청년창업사관학교 14기 선정",
      "크몽 자회사 개발 에이전시 '똑똑한개발자' MOU",
    ],
  },
  {
    year: "2023",
    items: [
      "IT 직군을 위한 실무 해커톤 '그로스톤' 출시",
      "서울특별시 예비사회적기업 인증",
      "한동대 IT 협업 동아리 'PARD' MOU",
      "프로필 링크 서비스 위티 운영사 '잔다' MOU",
      "신용보증기금 Seed 투자 유치",
      "스낵24 운영사 '위펀' MOU",
      "사회적기업가 육성사업 창업팀 선정",
      "동서대학교 SW중심사업단 산학협력 R&D",
      "중소벤처기업부 혁신성장형 벤처기업 인증",
    ],
  },
  {
    year: "2022",
    items: [
      "IT 직군을 위한 이력서 제작 서비스 '스타팅' 출시",
      "2022 대한민국 기업대상 '서비스혁신 분야 대상' 수상",
      "하나금융그룹 소셜벤처 유니버시티 전국 우수팀 선정 및 우수상 수상",
      "과학기술정보통신부 클라우드 서비스 이용지원 우수사례 선정",
      "신용보증기금 리틀펭귄 선정",
      "광운대학교 LINC+ 산학협력 MOU",
      "소셜혁신연구소 사회적 가치 공동 실현 MOU",
      "'활동 증명서 발급 방법 및 장치' 특허 등록",
      "광운대학교 국가인적자원개발 컨소시엄 MOU",
      "중소벤처기업부 소셜벤처기업 지정",
      "중소벤처기업부 미래성과공유기업 지정",
      "NICE평가정보 기술평가우수기업 인증",
    ],
  },
  {
    year: "2021",
    items: [
      "취업준비생을 위한 모임 운영 솔루션 '모운다' 운영",
      "국민대학교 LINC+ 산학협력 MOU",
      "주식회사 모밋 설립",
    ],
  },
]

export const companyPartners = {
  title: "투자 · 지원 · 협력 파트너",
  logos: [
    // scale: 슬롯 안에서 광학적 크기를 맞추기 위한 보정 (기본 1)
    { id: "01", src: "/company/assets/partners/partner-01.svg", name: "Partner 1", scale: 0.92 },
    { id: "02", src: "/company/assets/partners/partner-02.svg", name: "Partner 2", scale: 1.2 },
    { id: "03", src: "/company/assets/partners/partner-03.svg", name: "Partner 3", scale: 1 },
    { id: "04", src: "/company/assets/partners/partner-04.svg", name: "Partner 4", scale: 1 },
    { id: "05", src: "/company/assets/partners/partner-05.svg", name: "Partner 5", scale: 1 },
    { id: "06", src: "/company/assets/partners/partner-06.svg", name: "Partner 6", scale: 0.95 },
    { id: "07", src: "/company/assets/partners/partner-07.svg", name: "Partner 7", scale: 1.15 },
    { id: "08", src: "/company/assets/partners/partner-08.svg", name: "Partner 8", scale: 1.12 },
    { id: "09", src: "/company/assets/partners/partner-09.svg", name: "Partner 9", scale: 1 },
    { id: "10", src: "/company/assets/partners/partner-10.svg", name: "Partner 10", scale: 1 },
    { id: "11", src: "/company/assets/partners/partner-11.svg", name: "Partner 11", scale: 0.88 },
    { id: "12", src: "/company/assets/partners/partner-12.png", name: "Partner 12", scale: 1.1 },
  ],
} as const

export const companyContact = {
  title: "제휴·제안·문의",
  lead: "파트너십, 채용 제안, 그 외 궁금한 점이 있으면 편하게 연락해 주세요.",
  kakaoLabel: "카톡으로 문의하기",
} as const

export const companyLegal = {
  name: "스타팅파트너스(주)",
  lines: [
    "대표이사 : 김홍찬 | 사업자등록번호 : 313-88-02066 | 통신판매번호 : 2025-서울광진-0701",
    "직업정보제공번호 : 서울동부 제 2026-6 호 | 유료직업소개번호 : 제 2025-3040234-14-5-00005 호",
    "본사 : 서울특별시 광진구 능동로 81, 3층 | 지사/연구소 : 서울특별시 중구 퇴계로 15, 5층",
  ],
} as const

export const companyHrHero = {
  label: "Environment · Motive",
  title: "일하고 싶은 이유를 제공합니다",
  sub: "일할 맛 나는 환경에서 같은 목표를 향해",
  images: [
    {
      src: "/company/assets/office/office-04.jpg",
      alt: "스타팅파트너스 오피스 전경",
      flex: "md:flex-[1.5]" as const,
    },
    {
      src: "/company/assets/office/office-01.jpeg",
      alt: "스타팅파트너스 오피스",
      flex: "md:flex-1" as const,
    },
  ],
} as const

export const companyHrCulture = {
  title: "스타팅 문화",
  lines: [
    { before: "안 될 이유보단 ", accent: "될 방법", after: "을 찾고" },
    { before: "자율 속에서 성과를 ", accent: "주도적", after: "으로 만들며" },
    { before: "성과 보상은 ", accent: "명확", after: "하게 설계하고 분배합니다." },
  ],
  points: [
    {
      title: "될 방법을 먼저 찾아요",
      body: "안 될 이유 찾는 건 누구나 할 수 있답니다",
    },
    {
      title: "주도적으로 성과를 위해 일해요",
      body: "성과를 달성하기 위해 해야 할 일을 스스로 찾습니다",
    },
    {
      title: "자율과 책임 확실히 보장해요",
      body: "스스로 판단하고 효율적으로 성과를 책임집니다",
    },
    {
      title: "성과 보상 명확하게 나눠요",
      body: "수치로 계산 가능한 성과 보상 설계를 같이 세웁니다",
    },
  ],
} as const

export type CompanyHrBenefitItem = {
  id: string
  title: string
  body: string
}

export const companyHrBenefits = {
  title: "스타팅 복지",
  items: [
    {
      id: "flex-hours",
      title: "오전 09시 ~ 11시 자율 출근",
      body: "매일 달라지는 컨디션에 따라 유연하게 출근합니다.",
    },
    {
      id: "friday",
      title: "금요일은 6시간만 근무",
      body: "억지로 버티는 시간 없이 오후 4시에 집에 갑니다.",
    },
    {
      id: "reward",
      title: "성장과 성과보상은 함께",
      body: "목표 KPI를 설정하고 성과보상을 공유해요. 연봉인상, 성과급, 스톡옵션 등 각자 원하는대로.",
    },
    {
      id: "founders",
      title: "창업자 출신 팀원들과 함께",
      body: "효율적인 문제 해결에 최적화된 특수부대입니다. 안되거나 못하는 거 없는 커리어 성장을 보장합니다.",
    },
    {
      id: "office",
      title: "출근과 업무가 즐거운 사무실 환경",
      body: "서울역 7번 출구 1분 거리에 있어요. 스파크플러스 프리미엄 공간에서 일해요.",
    },
    {
      id: "leave",
      title: "쉬고 싶을 때 쉬는건 당연한 것",
      body: "자유롭게 연차를 사용할 수 있어요. 하루 전, 당일 전혀 문제 없어요.",
    },
  ] as const satisfies readonly CompanyHrBenefitItem[],
} as const

export const companyHrOffice = {
  images: [
    {
      src: "/company/assets/office/office-02.jpg",
      alt: "스타팅파트너스 업무 공간",
    },
    {
      src: "/company/assets/office/office-03.jpg",
      alt: "스타팅파트너스 미팅 공간",
    },
    {
      src: "/company/assets/office/office-05.jpg",
      alt: "스타팅파트너스 협업 공간",
    },
  ],
} as const
