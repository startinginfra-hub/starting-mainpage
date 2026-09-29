import type { ReactNode } from "react"

type AllianceLegalPageProps = {
  title: string
  children: ReactNode
}

export function AllianceLegalPage({ title, children }: AllianceLegalPageProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h1>
      <div className="alliance-legal">{children}</div>
    </div>
  )
}
