"use client"

import { useCallback, useEffect, useState } from "react"
import {
  JDLIST_BANNER_AUTOPLAY_MS,
  JDLIST_BANNER_SLIDES,
  jdlistBannerSlideKey,
  type JdListBannerSlide,
} from "./jdlist-banner-slides"
import { JdListHeroBannerAutoRegisterSlide } from "./jdlist-hero-banner-auto-register-slide"
import { JdListHeroBannerCuratedMatchingSlide } from "./jdlist-hero-banner-curated-matching-slide"
import { JdListHeroBannerQualifiedOnlySlide } from "./jdlist-hero-banner-qualified-only-slide"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

function renderJdListBannerSlide(slide: JdListBannerSlide) {
  switch (slide.id) {
    case "auto-register":
      return <JdListHeroBannerAutoRegisterSlide />
    case "curated-matching":
      return <JdListHeroBannerCuratedMatchingSlide />
    case "qualified-only":
      return <JdListHeroBannerQualifiedOnlySlide />
  }
}

export function JdListHeroBannerCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return
    setSelectedIndex(carouselApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return

    onSelect(api)
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  useEffect(() => {
    if (!api || isHovered) return

    const interval = window.setInterval(() => {
      api.scrollNext()
    }, JDLIST_BANNER_AUTOPLAY_MS)

    return () => window.clearInterval(interval)
  }, [api, isHovered])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="-ml-3">
          {JDLIST_BANNER_SLIDES.map((slide) => (
            <CarouselItem key={jdlistBannerSlideKey(slide)} className="basis-full pl-3">
              {renderJdListBannerSlide(slide)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="배너 슬라이드"
      >
        {JDLIST_BANNER_SLIDES.map((slide, index) => (
          <button
            key={jdlistBannerSlideKey(slide)}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-label={`${slide.alt}로 이동`}
            className={cn(
              "size-2 rounded-full transition-colors",
              selectedIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/70",
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
