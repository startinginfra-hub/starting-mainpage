import type { ProjectCategory, ProjectItem } from "@/lib/project/projects"
import { cn } from "@/lib/utils"
import { ProjectCard } from "./project-card"
import { ProjectCategoryBadge } from "./project-category-badge"
import { ProjectComingSoonCard } from "./project-coming-soon-card"

const CATEGORY_ORDER: ProjectCategory[] = ["support-program", "hackathon"]

type ProjectListProps = {
  projects: ProjectItem[]
  className?: string
}

export function ProjectList({ projects, className }: ProjectListProps) {
  return (
    <div className={cn("flex flex-col gap-8 sm:gap-10", className)}>
      {CATEGORY_ORDER.map((category) => {
        const items = projects.filter((project) => project.category === category)
        const showComingSoon = category === "support-program"

        if (items.length === 0 && !showComingSoon) {
          return null
        }

        return (
          <section key={category} className="flex flex-col gap-3 sm:gap-4">
            <ProjectCategoryBadge category={category} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {showComingSoon ? <ProjectComingSoonCard /> : null}
            </div>
          </section>
        )
      })}
    </div>
  )
}
