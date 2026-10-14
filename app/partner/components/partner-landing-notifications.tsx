"use client"

import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const SWAP_INTERVAL_MS = 2400

export type PartnerLandingNotification = {
  time: string
  body: ReactNode
}

function PartnerLandingNotificationCard({
  notification,
  active = true,
}: {
  notification: PartnerLandingNotification
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-[1.1rem] bg-white px-4 py-3 transition-all duration-500 ease-out motion-reduce:transition-none",
        active
          ? "scale-100 shadow-[0_18px_40px_-14px_rgba(15,23,42,0.45)] ring-1 ring-zinc-900/5"
          : "scale-[0.97] shadow-[0_6px_16px_-10px_rgba(15,23,42,0.3)] ring-1 ring-zinc-900/5",
      )}
    >
      <div className={cn("transition-opacity duration-500", !active && "opacity-40")}>
        <div className="flex items-center gap-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- 정적 브랜드 로고 */}
          <img src="/starting-logo-sqaure.svg" alt="" width={20} height={20} className="size-5 shrink-0 rounded-[6px]" />
          <p className="flex-1 text-[13px] font-bold text-zinc-900">스타팅</p>
          <span className="text-[11px] text-zinc-400">{notification.time}</span>
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-zinc-700">{notification.body}</p>
      </div>
    </div>
  )
}

/** 추천 후 받게 되는 알림들을 순서대로 하나씩 강조한다 */
export function PartnerLandingNotificationSequence({
  notifications,
}: {
  notifications: PartnerLandingNotification[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % notifications.length),
      SWAP_INTERVAL_MS,
    )
    return () => window.clearInterval(timer)
  }, [notifications.length])

  return (
    <ol className="relative flex flex-col gap-3">
      <span
        className="pointer-events-none absolute bottom-6 left-1/2 top-6 -translate-x-1/2 border-l-2 border-dashed border-[#1A7CFF]/25"
        aria-hidden
      />
      {notifications.map((notification, index) => (
        <li key={notification.time} className="relative">
          <PartnerLandingNotificationCard notification={notification} active={index === activeIndex} />
        </li>
      ))}
    </ol>
  )
}
