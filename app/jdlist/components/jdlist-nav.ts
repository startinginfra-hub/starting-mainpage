export const JDLIST_HEADER_NAV = [
  { href: "/", label: "솔루션 소개" },
  { href: "/jdlist", label: "채용공고" },
  { href: "/project", label: "프로젝트" },
  { href: "https://blog.starting.kr/starting/ko", label: "블로그", newTab: true },
] as const

export function isJdListHeaderNavActive(pathname: string, href: string): boolean {
  if (href.startsWith("http")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}
