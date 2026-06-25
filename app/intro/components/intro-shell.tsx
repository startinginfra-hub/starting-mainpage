"use client"

import type { ReactNode } from "react"
import { ChannelTalkBoot } from "@/app/components/app-shell/channel-talk-boot"
import { JdListHeader } from "@/app/jdlist/components/jdlist-header"
import { IntroFooter } from "./intro-footer"

type IntroShellProps = {
  children: ReactNode
}

export function IntroShell({ children }: IntroShellProps) {
  return (
    <div className="intro-page relative flex h-dvh max-h-dvh max-w-full flex-col overflow-hidden text-[#0b0f1c]">
      <ChannelTalkBoot />
      <div className="relative flex min-h-0 flex-1 flex-col bg-[#fbfcfe]">
        <JdListHeader />
        <main
          data-app-main
          className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip overflow-y-auto bg-[#fbfcfe]"
        >
          {children}
          <IntroFooter />
        </main>
      </div>
    </div>
  )
}
