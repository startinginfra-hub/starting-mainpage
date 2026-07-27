import { companyHistory } from "@/lib/company/company-content"
import { cn } from "@/lib/utils"
import { CompanySection, CompanySectionHeading } from "../company-section"

export function CompanyHistorySection() {
  return (
    <CompanySection id="history" className="py-20 md:py-28">
      <CompanySectionHeading title="히스토리" />

      <ol className="mt-10 space-y-12 md:mt-14 md:space-y-16">
        {companyHistory.map((group, index) => (
          <li
            key={group.year}
            className={cn(
              "grid gap-4 md:grid-cols-[120px_1fr] md:gap-10",
              index > 0 && "border-t border-neutral-100 pt-8",
            )}
          >
            <p className="text-2xl font-bold tabular-nums text-black md:text-3xl">{group.year}</p>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-neutral-600 md:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </CompanySection>
  )
}
