"use client"

import type { ReactNode } from "react"
import { useEffect, useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { ChannelTalkBoot } from "@/app/components/app-shell/channel-talk-boot"
import { IntroFooter } from "@/app/intro/components/intro-footer"
import { jdlistContentFrameClassName } from "@/app/jdlist/components/jdlist-content-frame"
import { JdListFooter } from "@/app/jdlist/components/jdlist-footer"
import { JdListHeader } from "@/app/jdlist/components/jdlist-header"
import { cn } from "@/lib/utils"

type AppShellProps = {
  children: ReactNode
}

function isHomePath(pathname: string): boolean {
  return pathname === "/"
}

function isFramedPath(pathname: string): boolean {
  return pathname.startsWith("/jdlist") || pathname.startsWith("/project")
}

function isKosmeLandingPath(pathname: string): boolean {
  return pathname === "/project/kosme-2025"
}

const kosmeStickyBarOffsetClassName =
  "pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))]"

function resetMainScroll(main: HTMLElement | null) {
  if (!main) return
  main.scrollTop = 0
  main.scrollLeft = 0
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const mainRef = useRef<HTMLElement>(null)
  const home = isHomePath(pathname)
  const framed = isFramedPath(pathname)

  useLayoutEffect(() => {
    resetMainScroll(mainRef.current)
  }, [pathname])

  useEffect(() => {
    resetMainScroll(mainRef.current)
    const frame = requestAnimationFrame(() => resetMainScroll(mainRef.current))
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <div
      className={cn(
        "relative flex h-dvh max-h-dvh max-w-full flex-col overflow-hidden text-foreground",
        home && "intro-page text-[#0b0f1c]",
      )}
    >
      <ChannelTalkBoot />

      {!home ? (
        <>
          <div
            className="pointer-events-none absolute -left-24 top-16 size-88 rounded-full bg-neutral-200/45 blur-[4.5rem]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 size-104 translate-x-1/4 translate-y-1/4 rounded-full bg-stone-200/40 blur-[5rem]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/3 top-1/2 size-72 -translate-y-1/2 rounded-full bg-neutral-100/50 blur-[3.5rem]"
            aria-hidden
          />
        </>
      ) : null}

      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col",
          home ? "bg-[#fbfcfe]" : "bg-white",
        )}
      >
        <main
          ref={mainRef}
          data-app-main
          className={cn(
            "relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip overflow-y-auto [overflow-anchor:none]",
            home ? "bg-[#fbfcfe]" : "overflow-x-hidden bg-[#FBFBFB]",
            framed && pathname.startsWith("/project") && "bg-white",
          )}
        >
          <JdListHeader />
          {framed ? (
            <div className={cn(jdlistContentFrameClassName, "py-4 md:py-5")}>
              {children}
              <JdListFooter
                className={cn(
                  "mt-10 md:mt-12",
                  isKosmeLandingPath(pathname) && kosmeStickyBarOffsetClassName,
                )}
              />
            </div>
          ) : (
            <>
              {children}
              {home ? <IntroFooter /> : null}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
