"use client"

import { useEffect, useRef, useState } from "react"

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
  /** Observe visibility inside `main[data-app-main]` instead of the viewport. */
  useAppMainScrollRoot?: boolean
}

export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px",
  once = false,
  useAppMainScrollRoot = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const root = useAppMainScrollRoot
      ? (node.closest("[data-app-main]") as Element | null)
      : null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin, root },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold, useAppMainScrollRoot])

  return { ref, inView }
}
