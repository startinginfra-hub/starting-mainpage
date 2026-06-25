export const introTokens = {
  pageBg: "#fbfcfe",
  sectionAlt: "#f5f7fb",
  surface: "#ffffff",
  text: "#0b0f1c",
  textMuted: "#3f4a60",
  caption: "#5d6a82",
  border: "#e3e8f1",
  primary: "#1A7CFF",
  primaryHover: "#0e62db",
  primarySoft: "#e8f2ff",
  heroGradientEnd: "#0b4eae",
  gridLine: "#d4dbe7",
  profileBg: "#eef1f7",
  profileIcon: "#b2bccb",
} as const

export const INTRO_CONTENT_MAX = "max-w-[1180px]"

export const INTRO_APP_URL = "https://app.starting.kr/"
export const INTRO_SUPPORT_EMAIL = "support@starting.kr"

export type IntroClientLogoItem = {
  id: string
  name: string
  src: string
  /** 후기 카드 — 여백 제거 로고가 상대적으로 크게 보일 때 */
  cardScale?: number
}

export const INTRO_CLIENT_LOGOS = [
  { id: "secuwow", name: "SECUWOW", src: "/logos/secuwow.png" },
  { id: "wavbor", name: "Wavbor", src: "/logos/wavbor.png" },
  { id: "ponbi", name: "폰비", src: "/logos/ponbi.png" },
  { id: "parity", name: "parity", src: "/logos/parity.png" },
  { id: "easy", name: "easy", src: "/logos/easy.png" },
  { id: "gpters", name: "GPTers", src: "/logos/gpters.png" },
  { id: "wishes", name: "Wishes", src: "/logos/wishes.png" },
  { id: "thera", name: "씨테라수면연구소", src: "/logos/thera.png" },
  { id: "graygo", name: "GRAYGO", src: "/logos/graygo.png" },
  { id: "onulhunnam", name: "오늘훈남", src: "/logos/onulhunnam.png" },
  { id: "acrossb", name: "acrossB", src: "/logos/acrossb.png" },
  { id: "terracle", name: "Terracle", src: "/logos/terracle.png" },
  { id: "pia", name: "PIA", src: "/logos/pia.png", cardScale: 0.8 },
  { id: "hgrs", name: "해그로시", src: "/logos/hgrs.png", cardScale: 0.8 },
  { id: "toktokhan", name: "똑똑한 개발자", src: "/logos/toktokhan.png", cardScale: 0.8 },
] as const satisfies readonly IntroClientLogoItem[]

export function getIntroClientLogo(id: IntroClientLogoItem["id"]) {
  return INTRO_CLIENT_LOGOS.find((logo) => logo.id === id)
}
