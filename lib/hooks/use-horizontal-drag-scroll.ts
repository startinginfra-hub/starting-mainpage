"use client"

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"

const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, label, [role="combobox"], [role="listbox"], [role="option"], [data-radix-collection-item]'

const DEFAULT_DRAG_THRESHOLD_PX = 5

type DragState = {
  pointerId: number
  startX: number
  startScrollLeft: number
  moved: boolean
}

type UseHorizontalDragScrollOptions = {
  threshold?: number
  mouseOnly?: boolean
  /** 링크·버튼 등 interactive 요소 위에서도 드래그 스크롤 허용 */
  allowDragOnInteractiveTargets?: boolean
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  return Boolean(target.closest(INTERACTIVE_SELECTOR))
}

export function useHorizontalDragScroll(options: UseHorizontalDragScrollOptions = {}) {
  const {
    threshold = DEFAULT_DRAG_THRESHOLD_PX,
    mouseOnly = true,
    allowDragOnInteractiveTargets = false,
  } = options
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const suppressClickRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const endDrag = useCallback((event: PointerEvent, moved: boolean) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    const container = containerRef.current
    if (container?.hasPointerCapture?.(event.pointerId)) {
      container.releasePointerCapture(event.pointerId)
    }

    dragStateRef.current = null
    setIsDragging(false)

    if (moved) {
      suppressClickRef.current = true
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const container = containerRef.current
      const dragState = dragStateRef.current
      if (!container || !dragState || dragState.pointerId !== event.pointerId) return

      const deltaX = event.clientX - dragState.startX
      if (!dragState.moved && Math.abs(deltaX) >= threshold) {
        dragState.moved = true
        setIsDragging(true)
        if (container.hasPointerCapture?.(event.pointerId) === false) {
          container.setPointerCapture(event.pointerId)
        }
      }

      if (!dragState.moved) return

      event.preventDefault()
      container.scrollLeft = dragState.startScrollLeft - deltaX
    }

    const handlePointerEnd = (event: PointerEvent) => {
      const dragState = dragStateRef.current
      if (!dragState || dragState.pointerId !== event.pointerId) return
      endDrag(event, dragState.moved)
    }

    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerEnd)
    document.addEventListener("pointercancel", handlePointerEnd)

    return () => {
      document.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerup", handlePointerEnd)
      document.removeEventListener("pointercancel", handlePointerEnd)
    }
  }, [endDrag, threshold])

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = containerRef.current
      if (!container || event.button !== 0) return
      if (mouseOnly && event.pointerType !== "mouse") return
      if (!allowDragOnInteractiveTargets && isInteractiveTarget(event.target)) return

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollLeft: container.scrollLeft,
        moved: false,
      }
    },
    [allowDragOnInteractiveTargets, mouseOnly],
  )

  const consumeClickSuppression = useCallback(() => {
    if (!suppressClickRef.current) return false
    suppressClickRef.current = false
    return true
  }, [])

  return {
    containerRef,
    containerProps: {
      onPointerDownCapture: handlePointerDown,
    },
    isDragging,
    consumeClickSuppression,
  }
}
