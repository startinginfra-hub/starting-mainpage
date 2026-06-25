import { ChannelTalkConfigProvider } from "@/app/components/app-shell/channel-talk-config"
import { JdListShell } from "@/app/jdlist/components/jdlist-shell"
import { resolveChannelTalkPluginKey } from "@/lib/channel-talk/browser"

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const channelTalkPluginKey = resolveChannelTalkPluginKey()

  return (
    <ChannelTalkConfigProvider pluginKey={channelTalkPluginKey}>
      <JdListShell mainClassName="bg-white">{children}</JdListShell>
    </ChannelTalkConfigProvider>
  )
}
