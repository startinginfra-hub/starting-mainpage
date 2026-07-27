"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { useInView } from "@/lib/intro/use-in-view"
import { cn } from "@/lib/utils"

export type CompanyStickyPanelItem = {
  id: string
  navLabel: string
  title: string
  body: string
  imageSrc?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
}

type CompanyStickyPanelsProps = {
  sectionId: string
  title: string
  lead?: string
  items: readonly CompanyStickyPanelItem[]
  className?: string
  beforePanels?: ReactNode
}

const HEADER_OFFSET_PX = 72

function getScrollRoot(node: Element | null): Element | null {
  return node?.closest("[data-app-main]") ?? null
}

export function CompanyStickyPanels({
  sectionId,
  title,
  lead,
  items,
  className,
  beforePanels,
}: CompanyStickyPanelsProps) {
  const panelRefs = useRef<Map<string, HTMLElement>>(new Map())
  const ratiosRef = useRef<Map<string, number>>(new Map())
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")

  const updateActive = useCallback(() => {
    let bestId = items[0]?.id ?? ""
    let bestRatio = -1
    for (const item of items) {
      const ratio = ratiosRef.current.get(item.id) ?? 0
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = item.id
      }
    }
    if (bestRatio > 0) setActiveId(bestId)
  }, [items])

  const registerPanel = useCallback(
    (id: string, node: HTMLElement | null) => {
      const prev = panelRefs.current.get(id)
      if (node) panelRefs.current.set(id, node)
      else panelRefs.current.delete(id)

      if (prev) {
        /* observer cleanup handled in StickyPanel */
      }
    },
    [],
  )

  const onPanelRatio = useCallback(
    (id: string, ratio: number) => {
      ratiosRef.current.set(id, ratio)
      updateActive()
    },
    [updateActive],
  )

  const scrollToPanel = useCallback((id: string) => {
    const el = panelRefs.current.get(id)
    if (!el) return

    const root = getScrollRoot(el)
    if (root instanceof HTMLElement) {
      const rootRect = root.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const nextTop = root.scrollTop + (elRect.top - rootRect.top) - HEADER_OFFSET_PX
      root.scrollTo({ top: nextTop, behavior: "smooth" })
      return
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <section id={sectionId} className={cn("relative w-full bg-white py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <p className="text-sm font-semibold tracking-tight text-neutral-400 md:text-base">{title}</p>
        {lead ? (
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-black md:mt-5 md:text-4xl md:leading-snug">
            {lead}
          </h2>
        ) : null}
        {beforePanels}

        <nav
          aria-label={title}
          className="mt-10 -mx-5 flex gap-1 overflow-x-auto px-5 pb-2 md:hidden"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToPanel(item.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                activeId === item.id
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-500 hover:text-black",
              )}
            >
              {item.navLabel}
            </button>
          ))}
        </nav>

        <div className="mt-8 grid gap-10 md:mt-16 md:grid-cols-[200px_1fr] md:gap-16 lg:grid-cols-[220px_1fr]">
          <nav aria-label={title} className="hidden md:block">
            <ul className="sticky top-20 space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToPanel(item.id)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-colors",
                      activeId === item.id
                        ? "bg-neutral-100 text-black"
                        : "text-neutral-400 hover:text-black",
                    )}
                  >
                    {item.navLabel}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16 md:space-y-24">
            {items.map((item, index) => (
              <StickyPanel
                key={item.id}
                sectionId={sectionId}
                item={item}
                priority={index === 0}
                registerPanel={registerPanel}
                onRatio={onPanelRatio}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StickyPanel({
  sectionId,
  item,
  priority,
  registerPanel,
  onRatio,
}: {
  sectionId: string
  item: CompanyStickyPanelItem
  priority?: boolean
  registerPanel: (id: string, node: HTMLElement | null) => void
  onRatio: (id: string, ratio: number) => void
}) {
  const articleRef = useRef<HTMLElement | null>(null)
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.12,
    once: true,
    useAppMainScrollRoot: true,
  })

  useEffect(() => {
    const node = articleRef.current
    if (!node) return

    registerPanel(item.id, node)
    const root = getScrollRoot(node)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        onRatio(item.id, entry.isIntersecting ? entry.intersectionRatio : 0)
      },
      {
        root,
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -35% 0px`,
      },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      registerPanel(item.id, null)
      onRatio(item.id, 0)
    }
  }, [item.id, onRatio, registerPanel])

  return (
    <article
      id={`${sectionId}-${item.id}`}
      ref={articleRef}
      className="scroll-mt-24"
    >
      <div
        ref={revealRef}
        className={cn("intro-reveal intro-reveal-y24", inView && "intro-reveal-visible")}
      >
        <PanelVisual item={item} priority={priority} />
        <h3 className="mt-8 text-2xl font-bold tracking-tight text-black md:text-3xl md:leading-snug">
          {item.title}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
          {item.body}
        </p>
        {item.ctaLabel && item.ctaHref ? (
          <Link
            href={item.ctaHref}
            className="mt-6 inline-flex text-sm font-semibold text-black underline underline-offset-4 hover:text-neutral-600"
          >
            {item.ctaLabel}
          </Link>
        ) : null}
      </div>
    </article>
  )
}

function PanelVisual({
  item,
  priority,
}: {
  item: CompanyStickyPanelItem
  priority?: boolean
}) {
  if (item.imageSrc) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt ?? item.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    )
  }

  return (
    <div className="flex aspect-[16/10] w-full items-end bg-neutral-50 px-6 py-8 md:px-10 md:py-12">
      <p className="max-w-md text-3xl font-bold tracking-tight text-neutral-300 md:text-5xl md:leading-tight">
        {item.navLabel}
      </p>
    </div>
  )
}
