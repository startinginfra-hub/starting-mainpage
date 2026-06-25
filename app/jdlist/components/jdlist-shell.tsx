"use client"

import type { ReactNode } from "react"
import { ChannelTalkBoot } from "@/app/components/app-shell/channel-talk-boot"
import { cn } from "@/lib/utils"
import { jdlistContentFrameClassName } from "./jdlist-content-frame"
import { JdListFooter } from "./jdlist-footer"
import { JdListHeader } from "./jdlist-header"

type JdListShellProps = {
  children: ReactNode
  mainClassName?: string
}

export function JdListShell({ children, mainClassName }: JdListShellProps) {
  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden text-foreground">
      <ChannelTalkBoot />
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

      <div className="relative flex min-h-0 flex-1 flex-col bg-white">
        <JdListHeader />
        <main
          data-app-main
          className={cn(
            "relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-[#FBFBFB]",
            mainClassName,
          )}
        >
          <div className={cn(jdlistContentFrameClassName, "py-4 md:py-5")}>
            {children}
            <JdListFooter className="mt-10 md:mt-12" />
          </div>
        </main>
      </div>
    </div>
  )
}
