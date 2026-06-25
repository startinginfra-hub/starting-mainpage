"use client"

import { useChannelTalkPluginKey } from "@/app/components/app-shell/channel-talk-config"
import { openChannelTalkMessenger } from "@/lib/channel-talk/browser"
import { cn } from "@/lib/utils"

type ProjectProposalBannerProps = {
  className?: string
}

export function ProjectProposalBanner({ className }: ProjectProposalBannerProps) {
  const pluginKey = useChannelTalkPluginKey()

  const handleOpenChannelTalk = () => {
    void openChannelTalkMessenger({ pluginKey })
  }

  return (
    <button
      type="button"
      onClick={handleOpenChannelTalk}
      className={cn(
        "group relative flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 overflow-hidden rounded-lg border border-[#6D5CE8]/35 bg-gradient-to-r from-[#5B4FE9] via-[#3F6FED] to-[#1A7CFF] px-4 py-3 text-left transition-[border-color,filter] hover:border-[#5B4FE9]/50 hover:brightness-[1.03]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A7CFF]/50 focus-visible:ring-offset-2",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -left-8 top-1/2 size-24 -translate-y-1/2 rounded-full bg-[#8B7CFF]/25 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 top-1/2 size-28 -translate-y-1/2 rounded-full bg-white/15 blur-2xl"
        aria-hidden
      />

      <p className="relative flex min-w-0 flex-wrap items-center gap-2 text-xs leading-relaxed text-white/85 sm:text-sm">
        <span className="inline-flex shrink-0 rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white sm:text-xs">
          프로젝트 제안 및 파트너십 문의
        </span>
        <span className="hidden sm:inline">
          채용·협업 프로그램 기획부터 운영까지 스타팅 팀이 함께 검토해 드려요.
        </span>
      </p>
      <span className="relative shrink-0 text-xs font-medium text-white/90 transition-colors group-hover:text-white">
        문의하기 &gt;
      </span>
    </button>
  )
}
