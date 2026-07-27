import type { ReactNode } from "react"
import { CompanyLayoutShell } from "./components/company-layout-shell"

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return <CompanyLayoutShell>{children}</CompanyLayoutShell>
}
