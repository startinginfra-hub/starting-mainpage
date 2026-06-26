"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { INTRO_APP_URL } from "@/lib/intro/intro-tokens"
import { JDLIST_HEADER_NAV, isJdListHeaderNavActive } from "./jdlist-nav"

const mobileMenuTriggerBtn =
  "size-10 rounded-xl border-0 bg-transparent shadow-none hover:bg-neutral-100/80"

const mobileNavLinkBase =
  "block rounded-xl px-3 py-3 text-base transition-colors hover:bg-neutral-50 hover:text-neutral-900"

export function JdListHeaderMobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={mobileMenuTriggerBtn}
          aria-label="메뉴 열기"
        >
          <Menu className="size-5 text-foreground/80" strokeWidth={1.75} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[min(100%,20rem)] flex-col gap-0 p-0">
        <SheetHeader className="border-b border-neutral-200/75 px-5 py-4">
          <SheetTitle className="text-base">메뉴</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col px-3 py-2" aria-label="모바일 헤더 메뉴">
          {JDLIST_HEADER_NAV.map((item) => {
            const isActive = isJdListHeaderNavActive(pathname, item.href)

            return (
              <SheetClose key={item.label} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    mobileNavLinkBase,
                    isActive ? "font-semibold text-neutral-900" : "font-medium text-neutral-700",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  {...("newTab" in item && item.newTab
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </Link>
              </SheetClose>
            )
          })}
        </nav>

        <div className="border-t border-neutral-200/75 p-4">
          <SheetClose asChild>
            <Button
              type="button"
              className="h-11 w-full rounded-xl bg-[#1A7CFF] text-sm font-semibold text-white hover:bg-[#126FE3]"
              asChild
            >
              <Link href={INTRO_APP_URL}>로그인</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
