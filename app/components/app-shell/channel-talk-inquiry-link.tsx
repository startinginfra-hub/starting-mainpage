"use client"

import type { ReactNode } from "react"
import { useChannelTalkPluginKey } from "@/app/components/app-shell/channel-talk-config"
import { openChannelTalkMessenger } from "@/lib/channel-talk/browser"
import { cn } from "@/lib/utils"

type ChannelTalkInquiryLinkProps = {
  className?: string
  children: ReactNode
}

export function ChannelTalkInquiryLink({ className, children }: ChannelTalkInquiryLinkProps) {
  const pluginKey = useChannelTalkPluginKey()

  const handleOpenChannelTalk = () => {
    void openChannelTalkMessenger({ pluginKey })
  }

  return (
    <button
      type="button"
      onClick={handleOpenChannelTalk}
      className={cn(className)}
    >
      {children}
    </button>
  )
}
