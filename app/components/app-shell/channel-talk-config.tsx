"use client"

import * as React from "react"

const ChannelTalkConfigContext = React.createContext<string | null>(null)

export function ChannelTalkConfigProvider({
  pluginKey,
  children,
}: {
  pluginKey: string | null
  children: React.ReactNode
}) {
  return <ChannelTalkConfigContext.Provider value={pluginKey}>{children}</ChannelTalkConfigContext.Provider>
}

export function useChannelTalkPluginKey(): string | null {
  return React.useContext(ChannelTalkConfigContext)
}
