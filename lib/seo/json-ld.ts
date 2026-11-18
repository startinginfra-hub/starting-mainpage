export const SITE_ORIGIN = "https://starting.kr"
export const SITE_NAME = "스타팅"
/** 네이버 연관채널용 카카오톡 채널 (문의 CTA의 /chat URL과 분리) */
export const COMPANY_KAKAO_CHANNEL_URL = "https://pf.kakao.com/_Vwqxexj"

export type JsonLd = Record<string, unknown>

export type BreadcrumbItem = {
  name: string
  path: string
}

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`
}

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    sameAs: [COMPANY_KAKAO_CHANNEL_URL],
  }
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
