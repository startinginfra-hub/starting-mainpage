import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

type PartnerLegalPageProps = {
  title: string
  children: ReactNode
}

export function PartnerLegalPage({ title, children }: PartnerLegalPageProps) {
  return (
    <div className="overflow-x-clip bg-[#FAFAFC] text-zinc-900">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/partner"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ChevronLeft className="size-4" aria-hidden />
          파트너 홈으로
        </Link>
        <h1 className="mt-4 text-[24px] font-extrabold tracking-[-0.02em] text-zinc-900 sm:text-[30px]">
          {title}
        </h1>
        <div className="mt-6 break-keep rounded-[1.5rem] bg-white p-6 ring-1 ring-zinc-200/80 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}
