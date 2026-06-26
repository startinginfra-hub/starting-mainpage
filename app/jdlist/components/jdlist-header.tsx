"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { StartingWordmark } from "@/app/components/starting-wordmark"
import { Button } from "@/components/ui/button"
import { INTRO_APP_URL } from "@/lib/intro/intro-tokens"
import { cn } from "@/lib/utils"
import { jdlistContentFrameClassName } from "./jdlist-content-frame"
import { JdListHeaderMobileMenu } from "./jdlist-header-mobile-menu"
import { JDLIST_HEADER_NAV, isJdListHeaderNavActive } from "./jdlist-nav"

const headerClass =
  "sticky top-0 z-30 isolate shrink-0 border-b border-neutral-200/75 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"

const headerOutlineBtn =
  "border border-neutral-200/75 bg-white/45 shadow-none backdrop-blur-md hover:bg-white/70"

const headerNavLinkBase = "text-sm transition-colors hover:text-neutral-900"

export function JdListHeader() {
  const pathname = usePathname()

  return (
    <header className={headerClass}>
      <div className={jdlistContentFrameClassName}>
        <div
          className={cn(
            "hidden h-14 min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-3 md:grid",
          )}
        >
          <StartingWordmark href="/" />

          <nav className="flex items-center gap-4 sm:gap-6" aria-label="헤더 메뉴">
            {JDLIST_HEADER_NAV.map((item) => {
              const isActive = isJdListHeaderNavActive(pathname, item.href)

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    headerNavLinkBase,
                    isActive ? "font-semibold text-neutral-900" : "font-medium text-neutral-600",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  {...("newTab" in item && item.newTab
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn("h-9 rounded-xl px-3 text-xs font-medium", headerOutlineBtn)}
              asChild
            >
              <Link href={INTRO_APP_URL}>로그인</Link>
            </Button>
          </div>
        </div>

        <div className="flex h-14 items-center justify-between md:hidden">
          <StartingWordmark href="/" />
          <JdListHeaderMobileMenu />
        </div>
      </div>
    </header>
  )
}
