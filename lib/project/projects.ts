export type ProjectStatus = "closed" | "open"

export type ProjectCategory = "support-program" | "hackathon"

export type ProjectBrandLogo = {
  src: string
  alt: string
  height?: number
}

export type ProjectItem = {
  id: string
  href: string
  title: string
  description: string
  status: ProjectStatus
  category: ProjectCategory
  /** Starting 로고는 컴포넌트에서 렌더 — 파트너 로고만 포함 */
  partnerLogos?: ProjectBrandLogo[]
  bannerSrc: string
  bannerAlt: string
  bannerClassName?: string
  /** true면 카드 호버 스타일·링크 동작 없음 */
  disableHover?: boolean
}

const GROWTHTON_DESCRIPTION =
  "기획·개발·디자인·마케팅 분야 주니어가 기업 IT 프로젝트에 참여하는 4주 해커톤형 실무 협업 프로그램이에요."

export const projects: ProjectItem[] = [
  {
    id: "kosme-2025",
    href: "/project/kosme-2025",
    title: "중소벤처기업진흥공단과 함께하는 채용 수수료 전액 지원사업",
    description:
      "IT·SW·AI 인재 채용을 지원하는 중소기업을 대상으로, 채용 수수료 전액을 지원하는 공공 연계 프로젝트예요.",
    status: "closed",
    category: "support-program",
    partnerLogos: [{ src: "/project/logos/kosme.png", alt: "KOSME", height: 18 }],
    bannerSrc: "/project/banners/kosme-2025.png",
    bannerAlt: "중소벤처기업진흥공단 채용 수수료 전액 지원사업 배너",
    bannerClassName: "bg-[#edf3fa]",
  },
  {
    id: "growthton-3",
    href: "#",
    title: "실무 협업 프로젝트 그로스톤 3기",
    description: GROWTHTON_DESCRIPTION,
    status: "closed",
    category: "hackathon",
    bannerSrc: "/project/banners/growthton.png",
    bannerAlt: "그로스톤 3기 배너",
    bannerClassName: "bg-black",
    disableHover: true,
  },
  {
    id: "growthton-2",
    href: "#",
    title: "실무 협업 프로젝트 그로스톤 2기",
    description: GROWTHTON_DESCRIPTION,
    status: "closed",
    category: "hackathon",
    bannerSrc: "/project/banners/growthton.png",
    bannerAlt: "그로스톤 2기 배너",
    bannerClassName: "bg-black",
    disableHover: true,
  },
  {
    id: "growthton-1",
    href: "#",
    title: "실무 협업 프로젝트 그로스톤 1기",
    description: GROWTHTON_DESCRIPTION,
    status: "closed",
    category: "hackathon",
    bannerSrc: "/project/banners/growthton.png",
    bannerAlt: "그로스톤 1기 배너",
    bannerClassName: "bg-black",
    disableHover: true,
  },
]
