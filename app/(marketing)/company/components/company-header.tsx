"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
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
import { COMPANY_BLOG_URL } from "@/lib/company/company-content"
import { cn } from "@/lib/utils"

const TABS = [
  { href: "/company", label: "PR", external: false },
  { href: "/company/hr", label: "HR", external: false },
  { href: COMPANY_BLOG_URL, label: "Blog", external: true },
] as const

const SCROLL_THRESHOLD_PX = 12

const mobileNavLinkBase =
  "block rounded-xl px-3 py-3 text-base transition-colors hover:bg-neutral-50 hover:text-neutral-900"

function isTabActive(pathname: string, href: string) {
  return href === "/company" ? pathname === "/company" : pathname.startsWith(href)
}

export function CompanyHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const overDarkHero = pathname === "/company" && !scrolled

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-app-main]")
    if (!root) return

    const onScroll = () => {
      setScrolled(root.scrollTop > SCROLL_THRESHOLD_PX)
    }

    onScroll()
    root.addEventListener("scroll", onScroll, { passive: true })
    return () => root.removeEventListener("scroll", onScroll)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 isolate transition-[background-color,border-color,backdrop-filter] duration-300",
        overDarkHero
          ? "border-b border-transparent bg-transparent"
          : scrolled
            ? "border-b border-neutral-200 bg-white/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:h-16 md:px-8">
        <Link
          href="/company"
          className={cn(
            "inline-flex shrink-0 items-center outline-none focus-visible:ring-2",
            overDarkHero ? "focus-visible:ring-white/40" : "focus-visible:ring-neutral-400",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Starting Partners 워드마크 */}
          <img
            src={
              overDarkHero
                ? "/company/assets/company-partners-wordmark-white.png"
                : "/company/assets/company-partners-wordmark-black.png"
            }
            alt="Starting Partners"
            width={300}
            height={39}
            className="pointer-events-none h-5 w-auto select-none md:h-6"
            decoding="async"
          />
        </Link>

        <nav aria-label="회사 페이지" className="hidden items-center gap-1 md:flex">
          {TABS.map((tab) => {
            const linkClass = cn(
              "px-3 py-2 text-sm font-medium transition-colors",
              overDarkHero ? "text-white/55 hover:text-white" : "text-neutral-400 hover:text-black",
            )

            if (tab.external) {
              return (
                <a
                  key={tab.href}
                  href={tab.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {tab.label}
                </a>
              )
            }

            const active = isTabActive(pathname, tab.href)

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  linkClass,
                  overDarkHero ? active && "text-white" : active && "text-black",
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "size-10 rounded-xl border-0 bg-transparent shadow-none md:hidden",
                overDarkHero ? "hover:bg-white/10" : "hover:bg-neutral-100/80",
              )}
              aria-label="메뉴 열기"
            >
              <Menu
                className={cn("size-5", overDarkHero ? "text-white" : "text-foreground/80")}
                strokeWidth={1.75}
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[min(100%,20rem)] flex-col gap-0 p-0">
            <SheetHeader className="border-b border-neutral-200/75 px-5 py-4">
              <SheetTitle className="text-base">메뉴</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-1 flex-col px-3 py-2" aria-label="모바일 헤더 메뉴">
              {TABS.map((tab) => {
                if (tab.external) {
                  return (
                    <SheetClose key={tab.href} asChild>
                      <a
                        href={tab.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(mobileNavLinkBase, "font-medium text-neutral-700")}
                      >
                        {tab.label}
                      </a>
                    </SheetClose>
                  )
                }

                const active = isTabActive(pathname, tab.href)

                return (
                  <SheetClose key={tab.href} asChild>
                    <Link
                      href={tab.href}
                      className={cn(
                        mobileNavLinkBase,
                        active ? "font-semibold text-neutral-900" : "font-medium text-neutral-700",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {tab.label}
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
