import type { Metadata } from "next"
import { ProjectList } from "@/app/project/components/project-list"
import { ProjectProposalBanner } from "@/app/project/components/project-proposal-banner"
import { projects } from "@/lib/project/projects"

export const metadata: Metadata = {
  title: "프로젝트",
  description: "정부지원 채용사업부터 인재 검증 프로젝트까지, 스타팅이 함께하는 프로젝트를 확인하세요",
}

export default function ProjectPage() {
  return (
    <div>
      <ProjectProposalBanner className="mb-8 md:mb-10" />

      <ProjectList projects={projects} />
    </div>
  )
}
