"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CompanyHeader } from "./company-header"
import { CompanySiteFooter } from "./company-site-footer"

export function CompanyLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const darkTopBleed = pathname === "/company"

  return (
    <div
      className={cn(
        "max-w-full overflow-x-clip text-black",
        darkTopBleed ? "bg-[#050A14]" : "bg-white",
      )}
    >
      <CompanyHeader />
      {children}
      <CompanySiteFooter />
    </div>
  )
}
