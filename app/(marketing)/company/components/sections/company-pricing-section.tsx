import { companyPricing } from "@/lib/company/company-content"
import { CompanySection, CompanySectionHeading } from "../company-section"

export function CompanyPricingSection() {
  return (
    <CompanySection id="pricing" className="border-t border-neutral-100 bg-neutral-50 py-20 md:py-28">
      <CompanySectionHeading title={companyPricing.title} />
      <p className="max-w-2xl text-2xl font-bold tracking-tight text-black md:text-3xl md:leading-snug">
        {companyPricing.headline}
      </p>

      <ul className="mt-12 grid gap-8 sm:grid-cols-3 md:mt-16">
        {companyPricing.plans.map((plan) => (
          <li key={plan.id} className="border-t border-neutral-200 pt-5">
            <p className="text-sm text-neutral-500">
              {plan.name} · {plan.unit}
            </p>
            <p className="mt-2 text-2xl font-bold text-black md:text-3xl">{plan.price}</p>
            {plan.note ? (
              <p className="mt-2 text-xs leading-relaxed text-neutral-400 md:text-sm">{plan.note}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </CompanySection>
  )
}
