export type JdListBannerSlide =
  | { kind: "custom"; id: "auto-register" | "curated-matching" | "qualified-only"; alt: string }

export const JDLIST_BANNER_SLIDES: JdListBannerSlide[] = [
  {
    kind: "custom",
    id: "curated-matching",
    alt: "100명 검토할 시간에 3명만 보세요. 핏 맞는 인재, 검토해서 매칭해드려요.",
  },
  { kind: "custom", id: "auto-register", alt: "매칭신청하면 자동으로 공고가 완성돼요. 기업 브랜딩까지 생각한 UI를 만나보세요." },
  {
    kind: "custom",
    id: "qualified-only",
    alt: "안 맞는 후보 거르느라 지치셨나요? 합격할 인재만 보여드립니다.",
  },
]

export const JDLIST_BANNER_AUTOPLAY_MS = 5000

export const jdlistBannerFrameClassName =
  "relative w-full max-h-[330px] min-h-[9rem] overflow-hidden rounded-2xl aspect-[2/1] md:min-h-[11rem] md:aspect-[21/9] bg-neutral-100"

export function jdlistBannerSlideKey(slide: JdListBannerSlide): string {
  return slide.id
}
