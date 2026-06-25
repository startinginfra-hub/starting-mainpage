import { ChannelTalkConfigProvider } from "@/app/components/app-shell/channel-talk-config"
import { IntroShell } from "@/app/intro/components/intro-shell"
import { resolveChannelTalkPluginKey } from "@/lib/channel-talk/browser"
import "@/app/intro/intro.css"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const channelTalkPluginKey = resolveChannelTalkPluginKey()

  return (
    <ChannelTalkConfigProvider pluginKey={channelTalkPluginKey}>
      <IntroShell>{children}</IntroShell>
    </ChannelTalkConfigProvider>
  )
}
