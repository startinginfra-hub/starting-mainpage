import { companyLegal } from "@/lib/company/company-content"

export function CompanySiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-[1280px] space-y-1 px-5 py-10 text-xs leading-relaxed text-neutral-500 md:px-8 md:py-12">
        <p className="font-medium text-neutral-700">{companyLegal.name}</p>
        {companyLegal.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </footer>
  )
}
