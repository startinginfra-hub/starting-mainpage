"use client"

import { StartingWordmark } from "@/app/components/starting-wordmark"
import { jdlistContentFrameClassName } from "@/app/jdlist/components/jdlist-content-frame"
import { Button } from "@/components/ui/button"
import { APP_LOGIN_PATH, buildAppUrl } from "@/lib/intro/intro-tokens"

export function AllianceHeader() {
  return (
    <header className="sticky top-0 z-30 isolate shrink-0 border-b border-white/[0.08] bg-[#07090f]/80 backdrop-blur-xl">
      <div className={jdlistContentFrameClassName}>
        <div className="flex h-14 items-center justify-between gap-3">
          <StartingWordmark href="/alliance" tone="onDark" reloadDocument />
          <Button
            type="button"
            size="sm"
            className="h-9 rounded-xl bg-[#1A7CFF] px-3 text-xs font-medium text-white hover:bg-[#126FE3]"
            asChild
          >
            <a href={buildAppUrl(APP_LOGIN_PATH, "alliance")}>로그인</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
