import { cn } from "@/lib/utils"

const TERMS_IMAGE_SRC = "/legal/starting-service-standard-contract.png"

type TermsOfServiceLinkProps = {
  className?: string
  children?: React.ReactNode
}

export function TermsOfServiceLink({ className, children = "이용약관" }: TermsOfServiceLinkProps) {
  return (
    <a
      href={TERMS_IMAGE_SRC}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("transition-colors", className)}
    >
      {children}
    </a>
  )
}
