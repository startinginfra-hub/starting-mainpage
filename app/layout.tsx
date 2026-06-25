import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://starting.kr"),
  title: {
    default: "스타팅",
    template: "%s | 스타팅",
  },
  description:
    "채용 플랫폼을 대체하는 AI Agent 헤드헌팅 솔루션, 정확히 필터링된 인재를 부담없는 정찰제로",
  robots: { index: true, follow: true },
  icons: {
    icon: "/uploads/favicon.png",
    apple: "/uploads/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "스타팅",
    url: "https://starting.kr/",
    images: [{ url: "/uploads/og-image.png", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/uploads/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
