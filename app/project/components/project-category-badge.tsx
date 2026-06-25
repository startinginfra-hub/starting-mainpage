import type { ProjectCategory } from "@/lib/project/projects"
import { cn } from "@/lib/utils"

type ProjectCategoryBadgeProps = {
  category: ProjectCategory
  className?: string
}

const CATEGORY_CONFIG: Record<
  ProjectCategory,
  { label: string; className: string }
> = {
  "support-program": {
    label: "지원사업",
    className: "bg-[#1A7CFF]/10 text-[#1260cf]",
  },
  hackathon: {
    label: "헤커톤",
    className: "bg-violet-100 text-violet-700",
  },
}

export function ProjectCategoryBadge({ category, className }: ProjectCategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category]

  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
