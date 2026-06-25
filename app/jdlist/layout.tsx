import { ChannelTalkConfigProvider } from "@/app/components/app-shell/channel-talk-config"
import { readChannelTalkPluginKeyFromEnv } from "@/lib/channel-talk/browser"
import { JdListShell } from "./components/jdlist-shell"
import "./jdlist.css"

export default function JdListLayout({ children }: { children: React.ReactNode }) {
  const channelTalkPluginKey = readChannelTalkPluginKeyFromEnv()

  return (
    <ChannelTalkConfigProvider pluginKey={channelTalkPluginKey}>
      <JdListShell>{children}</JdListShell>
    </ChannelTalkConfigProvider>
  )
}
