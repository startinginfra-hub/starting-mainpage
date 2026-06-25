/** 채널톡 웹 메신저 (런타임 스크립트) */

export type ChannelTalkBootOptions = {
  pluginKey: string
  hideChannelButtonOnBoot?: boolean
  memberId?: string
  profile?: Record<string, string | number | boolean | null | undefined>
}

export type ChannelTalkWindow = Window &
  typeof globalThis & {
    ChannelIO?: ChannelTalkClient
    ChannelIOInitialized?: boolean
  }

export type ChannelTalkClient = ((command: "boot", options: ChannelTalkBootOptions, callback?: () => void) => void) &
  ((command: "shutdown") => void) &
  ((command: "showMessenger") => void) &
  ((command: "hideMessenger") => void) &
  ((command: "onShowMessenger", callback: () => void) => void) &
  ((command: "onHideMessenger", callback: () => void) => void) &
  ((command: string, ...args: unknown[]) => void) & {
    q?: unknown[]
    c?: (args: IArguments) => void
  }
