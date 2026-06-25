export const kosmeLandingContent = {
  hero: {
    titleLine1: "채용 수수료 전액 지원",
    titleLine2: "파격 지원사업",
    subtitle: "IT·SW·AI 분야 채용을 희망하는 중소기업을 위한 공공 연계 지원사업",
    ctaBarText: "2025년 신산업 전문인력 채용 지원 사업 참여기업 모집",
    noticeBanner: "지원대상 : 비수도권 IT, SW, AI 분야 채용 희망 중소기업",
  },
  overview: {
    title: "어떤 지원사업인가요?",
    items: [
      { label: "사업명", value: "신산업 전문인력 채용 지원 사업" },
      { label: "지원 내용", value: "채용 수수료 전액 지원" },
      { label: "지원 대상", value: "비수도권 IT·SW·AI 분야 채용 희망 중소기업" },
      { label: "참가 규모", value: "17개 기업" },
      { label: "지원 방식", value: "스타팅 서비스를 통한 채용(결제 금액 차감)" },
      { label: "사업 문의", value: "스타팅 고객센터 1688-7360" },
    ],
  },
  cost: {
    title: "한푼도 들지 않는",
    titleHighlight: "진짜 수수료 무료",
    steps: [
      { label: "7년 이하", amount: "2,000,000원" },
      { label: "7년 이상", amount: "4,000,000원" },
    ],
    supportLabel: "중소벤처기업진흥공단 지원",
    finalLabel: "최종 수수료 0원(무료)",
  },
  participants: {
    title: "참여 기업",
    subtitle: "중진공 지원사업에 참여한 기업이에요.",
    items: [
      { name: "피아스페이스", logoSrc: "/project/kosme/participants/piaspace.png" },
      { name: "에브리심", logoSrc: "/project/kosme/participants/everysim.png" },
      { name: "프레쉬아워", logoSrc: "/project/kosme/participants/freshour.png" },
      { name: "주식회사 위에이드", logoSrc: "/project/kosme/participants/weaid.png" },
      { name: "주식회사 윙스", logoSrc: "/project/kosme/participants/wings.png" },
      { name: "(주)드림테크", logoSrc: "/project/kosme/participants/dreamtech.png" },
      { name: "디엔지니어", logoSrc: "/project/kosme/participants/dengineer.png" },
      { name: "딥아이", logoSrc: "/project/kosme/participants/deepi.png" },
      { name: "메가웍스", logoSrc: "/project/kosme/participants/megaworks.png" },
      { name: "스콥정보통신(주)", logoSrc: "/project/kosme/participants/scope.png" },
      { name: "에스티엔아이", logoSrc: "/project/kosme/participants/stni.png" },
      { name: "오늘의이야기", logoSrc: "/project/kosme/participants/today-story.png" },
      { name: "오션스바이오", logoSrc: "/project/kosme/participants/oceansbio.png" },
      { name: "주식회사 블루노멀", logoSrc: "/project/kosme/participants/bluenormal.png" },
      { name: "창의융합과학(주)", logoSrc: "/project/kosme/participants/creative-convergence-science.png" },
      { name: "고려오트론", logoSrc: null, variant: "text" as const },
    ],
  },
  results: {
    title: "프로젝트 성과",
    subtitle: "중진공, 참여기업과 함께 만들어낸 성과에요.",
    metrics: [
      { label: "제안 수", target: 700, suffix: "명 +", icon: "send" as const },
      { label: "제안 수락", target: 74, suffix: "명", icon: "userCheck" as const },
      { label: "매칭 수", target: 43, suffix: "명", icon: "users" as const },
      { label: "최종 합격", target: 9, suffix: "명", icon: "trophy" as const },
    ],
  },
  faqCta: {
    title: "채용 수수료 전액 지원 기회",
    subtitle: "중소벤처기업진흥공단 × 스타팅",
    faqItems: [
      {
        id: "01",
        question: "어떤 기업이 지원 대상인가요?",
        answer: "비수도권 IT·SW·AI 분야 인재 채용을 희망하는 중소기업이 지원 대상이에요.",
      },
      {
        id: "02",
        question: "지원 범위는 어디까지인가요?",
        answer: "스타팅 플랫폼을 통한 채용 수수료가 전액 지원돼요.",
      },
      {
        id: "03",
        question: "채용 프로세스는 어떻게 진행되나요?",
        answer: "공고 등록 → 후보 매칭 → 면접 → 채용 확정 순으로 진행돼요.",
      },
      {
        id: "04",
        question: "모집이 종료되면 어떻게 되나요?",
        answer: "현재 본 사업은 모집이 종료됐어요. 추후 유사 사업 공지 시 안내해 드릴게요.",
      },
      {
        id: "05",
        question: "문의는 어디로 하면 되나요?",
        answer: "스타팅 고객센터(1688-7360) 또는 채널톡으로 문의해 주세요.",
      },
    ],
  },
} as const
