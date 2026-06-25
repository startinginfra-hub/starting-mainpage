import { ChannelTalkConfigProvider } from "@/app/components/app-shell/channel-talk-config"
import { IntroShell } from "@/app/intro/components/intro-shell"
import { readChannelTalkPluginKeyFromEnv } from "@/lib/channel-talk/browser"
import "@/app/intro/intro.css"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const channelTalkPluginKey = readChannelTalkPluginKeyFromEnv()

  return (
    <ChannelTalkConfigProvider pluginKey={channelTalkPluginKey}>
      <IntroShell>{children}</IntroShell>
    </ChannelTalkConfigProvider>
  )
}
