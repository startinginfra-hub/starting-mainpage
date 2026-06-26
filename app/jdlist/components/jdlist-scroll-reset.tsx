"use client"

import { useLayoutEffect } from "react"

export function JdListScrollReset({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const main = document.querySelector("main[data-app-main]")
    if (main instanceof HTMLElement) {
      main.scrollTop = 0
      main.scrollLeft = 0
    }
  }, [])

  return children
}
