import { ProcessContractVis } from "@/app/intro/components/process/process-contract-vis"
import { PersonaScreenShell, type PersonaScreenProps } from "./persona-screen-shell"

export function PersonaTermsScreen({ onNext }: PersonaScreenProps) {
  return (
    <PersonaScreenShell className="flex items-center justify-center bg-[#f5f7fb]">
      <div className="w-full max-w-[520px]">
        <ProcessContractVis title="스타팅 얼라이언스 이용약관" onConfirm={onNext} loop={false} />
      </div>
    </PersonaScreenShell>
  )
}
