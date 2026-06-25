import { cn } from "@/lib/utils"

export const COORDINATOR_AVATAR_SRC = "/matching/coordinator-seoyun.png"

type CoordinatorAvatarProps = {
  size?: number
  alt?: string
  className?: string
}

export function CoordinatorAvatar({
  size = 40,
  alt = "",
  className,
}: CoordinatorAvatarProps) {
  return (
    // Local static asset — plain img avoids Next/Image optimizer 404 on /matching/*
    <img
      src={COORDINATOR_AVATAR_SRC}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full object-cover object-top", className)}
      loading="lazy"
      decoding="async"
    />
  )
}
