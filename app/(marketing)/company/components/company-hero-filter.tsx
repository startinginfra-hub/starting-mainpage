"use client"

import type { CSSProperties } from "react"
import "./company-hero-filter.css"

/**
 * Real service keyword-analysis chips.
 * Desktop (`--d-*`): bias to center–right so the left headline stays clear.
 * Mobile (`--m-*`): left/right alternating scatter across the full viewport.
 */
const KEYWORDS = [
  {
    label: "AI/데이터",
    top: "12%",
    left: "58%",
    mobileTop: "8%",
    mobileLeft: "6%",
    pulse: true,
    pulseDelay: "0s",
    floatDelay: "0.3s",
    compact: false,
  },
  {
    label: "B2B",
    top: "14%",
    left: "82%",
    mobileTop: "7%",
    mobileLeft: "72%",
    pulse: true,
    pulseDelay: "1.0s",
    floatDelay: "0.8s",
    compact: false,
  },
  {
    label: "SaaS",
    top: "25%",
    left: "69%",
    mobileTop: "18%",
    mobileLeft: "70%",
    pulse: true,
    pulseDelay: "2.1s",
    floatDelay: "1.4s",
    compact: false,
  },
  {
    label: "모빌리티/물류",
    top: "29%",
    left: "88%",
    mobileTop: "24%",
    mobileLeft: "58%",
    pulse: false,
    pulseDelay: "0s",
    floatDelay: "0.6s",
    compact: true,
  },
  {
    label: "콘텐츠/미디어",
    top: "39%",
    left: "54%",
    mobileTop: "22%",
    mobileLeft: "8%",
    pulse: true,
    pulseDelay: "3.2s",
    floatDelay: "1.1s",
    compact: true,
  },
  {
    label: "B2B2C",
    top: "43%",
    left: "78%",
    mobileTop: "36%",
    mobileLeft: "78%",
    pulse: true,
    pulseDelay: "0.7s",
    floatDelay: "1.9s",
    compact: false,
  },
  {
    label: "플랫폼/마켓플레이스",
    top: "55%",
    left: "61%",
    mobileTop: "40%",
    mobileLeft: "4%",
    pulse: true,
    pulseDelay: "2.8s",
    floatDelay: "0.4s",
    compact: true,
  },
  {
    label: "블록체인/Web3",
    top: "57%",
    left: "86%",
    mobileTop: "56%",
    mobileLeft: "62%",
    pulse: true,
    pulseDelay: "4.0s",
    floatDelay: "1.6s",
    compact: true,
  },
  {
    label: "커머스",
    top: "68%",
    left: "72%",
    mobileTop: "64%",
    mobileLeft: "10%",
    pulse: true,
    pulseDelay: "1.5s",
    floatDelay: "0.9s",
    compact: false,
  },
  {
    label: "웹 서비스",
    top: "76%",
    left: "54%",
    mobileTop: "72%",
    mobileLeft: "55%",
    pulse: false,
    pulseDelay: "0s",
    floatDelay: "2.0s",
    compact: false,
  },
  {
    label: "Jira",
    top: "79%",
    left: "84%",
    mobileTop: "80%",
    mobileLeft: "78%",
    pulse: true,
    pulseDelay: "2.6s",
    floatDelay: "1.2s",
    compact: false,
  },
  {
    label: "모바일 앱 (iOS)",
    top: "88%",
    left: "67%",
    mobileTop: "88%",
    mobileLeft: "18%",
    pulse: true,
    pulseDelay: "3.8s",
    floatDelay: "0.5s",
    compact: true,
  },
] as const

export function CompanyHeroFilterAnimation() {
  return (
    <div className="company-hero-filter" aria-hidden>
      {KEYWORDS.map((keyword) => (
        <span
          key={keyword.label}
          className={[
            keyword.pulse ? "company-hero-filter-keyword" : "company-hero-filter-keyword is-static",
            keyword.compact ? "is-compact" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            {
              "--d-top": keyword.top,
              "--d-left": keyword.left,
              "--m-top": keyword.mobileTop,
              "--m-left": keyword.mobileLeft,
              animationDelay: keyword.pulse
                ? `${keyword.floatDelay}, ${keyword.pulseDelay}`
                : keyword.floatDelay,
            } as CSSProperties
          }
        >
          {keyword.label}
        </span>
      ))}
    </div>
  )
}
