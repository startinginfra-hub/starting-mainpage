"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useHorizontalDragScroll } from "@/lib/hooks/use-horizontal-drag-scroll"
import { cn } from "@/lib/utils"

const JdListDragScrollClickGuardContext = createContext<(() => boolean) | null>(null)

export function useJdListDragScrollClickGuard() {
  return useContext(JdListDragScrollClickGuardContext)
}

type JdListHorizontalScrollRowProps = {
  children: ReactNode
  className?: string
}

export function JdListHorizontalScrollRow({ children, className }: JdListHorizontalScrollRowProps) {
  const { containerRef, containerProps, isDragging, consumeClickSuppression } = useHorizontalDragScroll({
    allowDragOnInteractiveTargets: true,
  })

  return (
    <JdListDragScrollClickGuardContext.Provider value={consumeClickSuppression}>
      <div
        ref={containerRef}
        {...containerProps}
        className={cn(
          "flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
          className,
        )}
      >
        {children}
      </div>
    </JdListDragScrollClickGuardContext.Provider>
  )
}
