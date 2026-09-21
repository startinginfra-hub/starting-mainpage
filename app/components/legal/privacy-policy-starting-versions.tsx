"use client"

import { useState } from "react"
import { PrivacyPolicyContentCurrent } from "@/app/components/legal/privacy-policy-content-current"
import { PrivacyPolicyContent20250619 } from "@/app/components/legal/privacy-policy-content"
import { cn } from "@/lib/utils"

const PRIVACY_POLICY_VERSIONS = [
  {
    id: "current",
    label: "2026.08.24 (개정)",
    Content: PrivacyPolicyContentCurrent,
  },
  {
    id: "2025-06-19",
    label: "2025.06.19",
    Content: PrivacyPolicyContent20250619,
  },
] as const

type PrivacyPolicyVersionId = (typeof PRIVACY_POLICY_VERSIONS)[number]["id"]

export function PrivacyPolicyStartingVersions() {
  const [activeId, setActiveId] = useState<PrivacyPolicyVersionId>("current")
  const activeVersion = PRIVACY_POLICY_VERSIONS.find((version) => version.id === activeId) ?? PRIVACY_POLICY_VERSIONS[0]
  const Content = activeVersion.Content

  return (
    <div className="space-y-6">
      <nav aria-label="스타팅 개인정보처리방침 버전">
        <ul className="flex flex-wrap gap-2" role="tablist">
          {PRIVACY_POLICY_VERSIONS.map((version) => {
            const isActive = version.id === activeId
            return (
              <li key={version.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(version.id)}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#1A7CFF] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900",
                  )}
                >
                  {version.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div role="tabpanel">
        <Content key={activeId} />
      </div>
    </div>
  )
}
