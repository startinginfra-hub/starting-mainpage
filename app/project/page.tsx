import type { Metadata } from "next"
import { ProjectList } from "@/app/project/components/project-list"
import { ProjectProposalBanner } from "@/app/project/components/project-proposal-banner"
import { projects } from "@/lib/project/projects"

export const metadata: Metadata = {
  title: "프로젝트",
}

export default function ProjectPage() {
  return (
    <div>
      <ProjectProposalBanner className="mb-8 md:mb-10" />

      <ProjectList projects={projects} />
    </div>
  )
}
