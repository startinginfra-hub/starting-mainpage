"use client"

import { IntroReveal } from "@/app/intro/components/intro-reveal"
import {
  COMPANY_KAKAO_CHAT_URL,
  COMPANY_SUPPORT_EMAIL,
  companyContact,
} from "@/lib/company/company-content"
import { CompanySectionHeading } from "../company-section"
import "./company-contact.css"

export function CompanyContactSection() {
  return (
    <section
      id="contact"
      className="company-contact relative w-full overflow-hidden border-t border-neutral-100 py-20 md:py-28"
    >
      <div aria-hidden className="company-contact-wash pointer-events-none absolute inset-0" />
      <div aria-hidden className="company-contact-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="company-contact-grid pointer-events-none absolute inset-0" />

      <div className="relative z-[1] mx-auto w-full max-w-[1280px] px-5 text-center md:px-8 md:text-left">
        <IntroReveal useAppMainScrollRoot>
          <CompanySectionHeading title={companyContact.title} />
        </IntroReveal>

        <IntroReveal delayMs={80} useAppMainScrollRoot>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500 md:mx-0 md:mt-5 md:text-lg">
            {companyContact.lead}
          </p>
        </IntroReveal>

        <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-stretch sm:gap-5">
          <IntroReveal delayMs={140} useAppMainScrollRoot className="sm:flex-1">
            <a href={`mailto:${COMPANY_SUPPORT_EMAIL}`} className="company-contact-cta group">
              <span className="company-contact-cta-label">이메일</span>
              <span className="company-contact-cta-value group-hover:text-[#1A7FE0]">
                {COMPANY_SUPPORT_EMAIL}
              </span>
            </a>
          </IntroReveal>

          <IntroReveal delayMs={200} useAppMainScrollRoot className="sm:flex-1">
            <a
              href={COMPANY_KAKAO_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="company-contact-cta group"
            >
              <span className="company-contact-cta-label">카카오톡</span>
              <span className="company-contact-cta-value group-hover:text-[#1A7FE0]">
                {companyContact.kakaoLabel}
              </span>
            </a>
          </IntroReveal>
        </div>
      </div>
    </section>
  )
}
