import type { ChannelTalkBootOptions, ChannelTalkClient, ChannelTalkWindow } from "@/types/channel-talk-externals"

const CHANNEL_TALK_SCRIPT_ATTR = "data-channel-talk-plugin"
const CHANNEL_TALK_BOOT_FALLBACK_MS = 3000
export const DEFAULT_CHANNEL_TALK_PLUGIN_KEY = "c9fcf001-feaf-4bbd-a760-5e89cd042f74"

let bootPromise: Promise<void> | null = null
let bootedPluginKey: string | null = null
let isBooted = false

function channelTalkWindow(): ChannelTalkWindow | null {
  if (typeof window === "undefined") return null
  return window as ChannelTalkWindow
}

export function readChannelTalkPluginKeyFromEnv(): string | null {
  const key =
    process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY?.trim() ||
    process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY?.trim() ||
    process.env.NEXT_PUBLIC_CHANNEL_IO_PLUGIN_KEY?.trim()
  return key && key.length > 0 ? key : null
}

export function resolveChannelTalkPluginKey(explicitKey?: string | null): string | null {
  const trimmed = explicitKey?.trim()
  if (trimmed) return trimmed
  return readChannelTalkPluginKeyFromEnv() ?? DEFAULT_CHANNEL_TALK_PLUGIN_KEY
}

export function hasChannelTalkPluginKey(explicitKey?: string | null): boolean {
  return resolveChannelTalkPluginKey(explicitKey) != null
}

function ensureChannelTalkStub(): ChannelTalkClient | null {
  const w = channelTalkWindow()
  if (!w) return null
  if (w.ChannelIO) return w.ChannelIO

  const ch = function (this: unknown) {
    // eslint-disable-next-line prefer-rest-params
    ch.c?.(arguments)
  } as NonNullable<ChannelTalkWindow["ChannelIO"]>
  ch.q = []
  ch.c = function (args: IArguments) {
    ch.q?.push(args)
  }
  w.ChannelIO = ch
  return ch
}

export function loadChannelTalkScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"))
  }

  const w = channelTalkWindow()
  if (!w) {
    return Promise.reject(new Error("window"))
  }

  ensureChannelTalkStub()

  if (w.ChannelIOInitialized) {
    return Promise.resolve()
  }

  const existing = document.querySelector<HTMLScriptElement>(`script[${CHANNEL_TALK_SCRIPT_ATTR}="1"]`)
  if (existing) {
    return new Promise((resolve, reject) => {
      if (w.ChannelIOInitialized) {
        resolve()
        return
      }
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("channel_talk_load")), { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.async = true
    script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"
    script.setAttribute(CHANNEL_TALK_SCRIPT_ATTR, "1")
    script.onload = () => {
      w.ChannelIOInitialized = true
      resolve()
    }
    script.onerror = () => reject(new Error("channel_talk_load"))
    document.head.appendChild(script)
  })
}

export async function bootChannelTalk(
  options: Omit<ChannelTalkBootOptions, "pluginKey"> & { pluginKey?: string | null } = {},
): Promise<void> {
  const { pluginKey: explicitKey, ...bootOptions } = options
  const pluginKey = resolveChannelTalkPluginKey(explicitKey)
  if (!pluginKey) {
    return
  }
  if (bootPromise && bootedPluginKey === pluginKey) {
    return bootPromise
  }

  const channelIO = ensureChannelTalkStub()
  if (!channelIO) return

  bootedPluginKey = pluginKey
  bootPromise = new Promise<void>((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      isBooted = true
      resolve()
    }
    const fallback = window.setTimeout(finish, CHANNEL_TALK_BOOT_FALLBACK_MS)

    channelIO(
      "boot",
      {
        pluginKey,
        language: "ko",
        ...bootOptions,
      },
      () => {
        window.clearTimeout(fallback)
        finish()
      },
    )

    void loadChannelTalkScript().catch((error) => {
      window.clearTimeout(fallback)
      bootPromise = null
      bootedPluginKey = null
      isBooted = false
      console.error("[channel-talk] failed to load script", error)
      finish()
    })
  })
  return bootPromise
}

export function showChannelTalkMessenger(): void {
  channelTalkWindow()?.ChannelIO?.("showMessenger")
}

export async function openChannelTalkMessenger(
  options: Omit<ChannelTalkBootOptions, "pluginKey"> & { pluginKey?: string | null } = {},
): Promise<void> {
  if (!isBooted) {
    await bootChannelTalk(options)
  }
  showChannelTalkMessenger()
}
