"use client"

import { useEffect } from "react"
import { useChannelTalkPluginKey } from "@/app/components/app-shell/channel-talk-config"
import { bootChannelTalk } from "@/lib/channel-talk/browser"

export function ChannelTalkBoot() {
  const pluginKey = useChannelTalkPluginKey()

  useEffect(() => {
    if (!pluginKey) return
    void bootChannelTalk({ pluginKey })
  }, [pluginKey])

  return null
}
