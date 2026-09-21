import Link from "next/link"
import { TermsOfServiceContent } from "@/app/components/legal/terms-of-service-content"
import { TermsOfServiceContentAlliance } from "@/app/components/legal/terms-of-service-content-alliance"
import { cn } from "@/lib/utils"

const TERMS_TABS = [
  {
    id: "starting",
    label: "스타팅",
    href: "/tos",
    Content: TermsOfServiceContent,
  },
  {
    id: "alliance",
    label: "스타팅 얼라이언스",
    href: "/tos/alliance",
    Content: TermsOfServiceContentAlliance,
  },
] as const

export type TermsOfServiceTabId = (typeof TERMS_TABS)[number]["id"]

type TermsOfServiceViewerProps = {
  activeId: TermsOfServiceTabId
}

export function TermsOfServiceViewer({ activeId }: TermsOfServiceViewerProps) {
  const activeTab = TERMS_TABS.find((tab) => tab.id === activeId) ?? TERMS_TABS[0]
  const Content = activeTab.Content

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
      <nav aria-label="이용약관 구분" className="md:sticky md:top-24 md:w-48 md:shrink-0">
        <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1.5" role="tablist">
          {TERMS_TABS.map((tab) => {
            const isActive = tab.id === activeId
            return (
              <li key={tab.id}>
                <Link
                  href={tab.href}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    "block w-full rounded-lg px-3.5 py-2 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#1A7CFF] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900",
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="min-w-0 flex-1" role="tabpanel">
        <Content />
      </div>
    </div>
  )
}
