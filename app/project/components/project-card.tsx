"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { ProjectItem } from "@/lib/project/projects"
import { cn } from "@/lib/utils"
import { ProjectStatusBadge } from "./project-status-badge"

/** 배너 원본 비율 (832×563) — 모바일은 더 낮은 비율로 카드 높이 축소 */
const BANNER_ASPECT_CLASS = "aspect-[2/1] sm:aspect-[832/563]"

type ProjectCardProps = {
  project: ProjectItem
  className?: string
}

function ProjectBanner({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-neutral-400">
        {alt}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain object-center sm:object-cover sm:object-center"
      sizes="(max-width: 640px) 100vw, 30vw"
      onError={() => setHasError(true)}
    />
  )
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const cardClassName = cn(
    "flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white sm:rounded-2xl sm:flex-row sm:items-stretch",
    !project.disableHover && "group transition-[border-color] hover:border-[#1A7CFF]/25",
    project.disableHover && "cursor-default",
    className,
  )

  const content = (
    <>
      <div className="order-2 flex min-w-0 flex-1 flex-col gap-2 p-3 sm:order-1 sm:gap-4 sm:p-5 sm:pr-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="flex flex-1 flex-col gap-1 sm:gap-2">
          <h2
            className={cn(
              "line-clamp-2 text-sm font-bold leading-snug tracking-tight text-foreground sm:text-base",
              !project.disableHover && "group-hover:text-[#126FE3]",
            )}
          >
            {project.title}
          </h2>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-sm">{project.description}</p>
        </div>

        {!project.disableHover ? (
          <p className="text-[11px] text-neutral-500 sm:text-xs">자세히보기 &gt;</p>
        ) : null}
      </div>

      <div className="order-1 flex shrink-0 items-stretch sm:order-2 sm:min-h-[200px]">
        <div
          className={cn(
            "relative h-auto w-full max-w-full overflow-hidden rounded-t-xl sm:h-full sm:w-auto sm:rounded-t-none sm:rounded-l-2xl sm:rounded-r-2xl",
            BANNER_ASPECT_CLASS,
            project.bannerClassName ?? "bg-neutral-100",
          )}
        >
          <ProjectBanner src={project.bannerSrc} alt={project.bannerAlt} />
        </div>
      </div>
    </>
  )

  if (project.disableHover) {
    return <div className={cardClassName}>{content}</div>
  }

  return (
    <Link href={project.href} className={cardClassName}>
      {content}
    </Link>
  )
}
