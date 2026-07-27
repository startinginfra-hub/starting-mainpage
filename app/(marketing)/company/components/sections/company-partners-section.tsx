import Image from "next/image"
import { companyPartners } from "@/lib/company/company-content"
import { CompanySection, CompanySectionHeading } from "../company-section"

export function CompanyPartnersSection() {
  return (
    <CompanySection id="partners" className="border-t border-neutral-100 bg-neutral-50 py-20 md:py-28">
      <CompanySectionHeading title={companyPartners.title} />

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:mt-14 md:grid-cols-6 md:gap-x-6 md:gap-y-12">
        {companyPartners.logos.map((logo) => (
          <li key={logo.id} className="flex items-center justify-center">
            <div className="relative flex h-11 w-full max-w-[9.5rem] items-center justify-center md:h-12">
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={48}
                className="h-auto max-h-full w-auto max-w-full object-contain object-center"
                style={{ transform: `scale(${logo.scale})` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </CompanySection>
  )
}
