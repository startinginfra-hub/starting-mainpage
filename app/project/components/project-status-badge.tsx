import type { ProjectStatus } from "@/lib/project/projects"
import { cn } from "@/lib/utils"

type ProjectStatusBadgeProps = {
  status: ProjectStatus
  className?: string
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const isClosed = status === "closed"

  return (
    <span
      role="status"
      aria-label={isClosed ? "종료" : "모집 중"}
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        isClosed ? "bg-neutral-100 text-neutral-500" : "bg-[#1A7CFF]/10 text-[#1260cf]",
        className,
      )}
    >
      {isClosed ? "종료" : "모집 중"}
    </span>
  )
}
