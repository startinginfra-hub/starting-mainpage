"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/** Morph animation (~720ms) finishes before the next scroll step is accepted. */
const STEP_LOCK_MS = 720
const SNAP_TOLERANCE_PX = 4
/** Absorb scroll momentum after entering the pinned zone. */
const ENTRY_SETTLE_MS = 200
const ENTRY_LOCK_MAX_MS = 1100

type UseStickyScrollScrubOptions = {
  stepCount: number
  /** Extra scroll segments after the last step while the final frame stays pinned. */
  holdSegments?: number
  stickyTop?: number
  reducedMotion?: boolean
}

type TrackMetrics = {
  start: number
  end: number
  segmentHeight: number
  isPinned: boolean
}

function getScrollRoot(track: HTMLElement): HTMLElement | Window {
  return (track.closest("[data-app-main]") as HTMLElement | null) ?? window
}

function getScrollTop(scrollRoot: HTMLElement | Window) {
  return scrollRoot instanceof Window ? scrollRoot.scrollY : scrollRoot.scrollTop
}

function setScrollTop(scrollRoot: HTMLElement | Window, top: number) {
  if (scrollRoot instanceof Window) {
    scrollRoot.scrollTo({ top, behavior: "auto" })
    return
  }

  scrollRoot.scrollTop = top
}

function getViewportHeight(scrollRoot: HTMLElement | Window) {
  return scrollRoot instanceof Window ? scrollRoot.innerHeight : scrollRoot.clientHeight
}

function getTrackTopInScroll(track: HTMLElement, scrollRoot: HTMLElement | Window, scrollTop: number) {
  if (scrollRoot instanceof Window) {
    return scrollTop + track.getBoundingClientRect().top
  }

  const trackRect = track.getBoundingClientRect()
  const rootRect = scrollRoot.getBoundingClientRect()
  return scrollTop + (trackRect.top - rootRect.top)
}

function getTrackMetrics(
  track: HTMLElement,
  scrollRoot: HTMLElement | Window,
  stepCount: number,
  holdSegments: number,
  stickyTop: number,
): TrackMetrics {
  const scrollTop = getScrollTop(scrollRoot)
  const viewportHeight = getViewportHeight(scrollRoot)
  const trackTop = getTrackTopInScroll(track, scrollRoot, scrollTop)
  const trackHeight = track.offsetHeight
  const totalSegments = stepCount + holdSegments
  const scrollableRange = Math.max(trackHeight - viewportHeight, 0)
  const segmentHeight =
    totalSegments > 1 ? scrollableRange / (totalSegments - 1) : scrollableRange

  const start = trackTop - stickyTop
  const end = trackTop + trackHeight - viewportHeight
  const isPinned = scrollTop >= start - SNAP_TOLERANCE_PX && scrollTop <= end + SNAP_TOLERANCE_PX

  return { start, end, segmentHeight, isPinned }
}

function getStepScrollTop(metrics: TrackMetrics, step: number) {
  return metrics.start + metrics.segmentHeight * step
}

export function useStickyScrollScrub({
  stepCount,
  holdSegments = 0,
  stickyTop = 0,
  reducedMotion = false,
}: UseStickyScrollScrubOptions) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const activeStepRef = useRef(0)
  const lockedRef = useRef(false)
  const lockTimerRef = useRef<number | null>(null)
  const wasPinnedRef = useRef(false)
  const entryLockRef = useRef(false)
  const entrySettleTimerRef = useRef<number | null>(null)
  const entryMaxTimerRef = useRef<number | null>(null)
  const prevScrollTopRef = useRef(0)

  const clearStepLock = useCallback(() => {
    if (lockTimerRef.current != null) {
      window.clearTimeout(lockTimerRef.current)
      lockTimerRef.current = null
    }
    lockedRef.current = false
  }, [])

  const clearEntryLock = useCallback(() => {
    if (entrySettleTimerRef.current != null) {
      window.clearTimeout(entrySettleTimerRef.current)
      entrySettleTimerRef.current = null
    }
    if (entryMaxTimerRef.current != null) {
      window.clearTimeout(entryMaxTimerRef.current)
      entryMaxTimerRef.current = null
    }
    entryLockRef.current = false
  }, [])

  const reset = useCallback(() => {
    clearStepLock()
    clearEntryLock()
    wasPinnedRef.current = false
    activeStepRef.current = 0
    setActiveStep(0)
  }, [clearEntryLock, clearStepLock])

  const snapToStep = useCallback(
    (step: number) => {
      const track = trackRef.current
      if (!track) return

      const scrollRoot = getScrollRoot(track)
      const metrics = getTrackMetrics(track, scrollRoot, stepCount, holdSegments, stickyTop)
      setScrollTop(scrollRoot, getStepScrollTop(metrics, step))
    },
    [holdSegments, stepCount, stickyTop],
  )

  const setStep = useCallback((step: number) => {
    activeStepRef.current = step
    setActiveStep(step)
    snapToStep(step)
  }, [snapToStep])

  const scheduleEntryRelease = useCallback(() => {
    if (entrySettleTimerRef.current != null) {
      window.clearTimeout(entrySettleTimerRef.current)
    }

    entrySettleTimerRef.current = window.setTimeout(() => {
      entryLockRef.current = false
      entrySettleTimerRef.current = null
      if (entryMaxTimerRef.current != null) {
        window.clearTimeout(entryMaxTimerRef.current)
        entryMaxTimerRef.current = null
      }
    }, ENTRY_SETTLE_MS)
  }, [])

  const beginEntryLock = useCallback(
    (scrollDirection: "down" | "up") => {
      clearStepLock()
      entryLockRef.current = true

      if (scrollDirection === "down") {
        setStep(0)
      } else {
        setStep(stepCount - 1)
      }

      scheduleEntryRelease()

      if (entryMaxTimerRef.current != null) {
        window.clearTimeout(entryMaxTimerRef.current)
      }

      entryMaxTimerRef.current = window.setTimeout(() => {
        entryLockRef.current = false
        entryMaxTimerRef.current = null
        if (entrySettleTimerRef.current != null) {
          window.clearTimeout(entrySettleTimerRef.current)
          entrySettleTimerRef.current = null
        }
      }, ENTRY_LOCK_MAX_MS)
    },
    [clearStepLock, scheduleEntryRelease, setStep, stepCount],
  )

  const enforceSnap = useCallback(
    (metrics: TrackMetrics, scrollRoot: HTMLElement | Window) => {
      const expected = getStepScrollTop(metrics, activeStepRef.current)
      const scrollTop = getScrollTop(scrollRoot)

      if (Math.abs(scrollTop - expected) > SNAP_TOLERANCE_PX) {
        setScrollTop(scrollRoot, expected)
      }
    },
    [],
  )

  const advanceStep = useCallback(
    (direction: 1 | -1) => {
      if (lockedRef.current || entryLockRef.current) return false

      const nextStep = activeStepRef.current + direction
      if (nextStep < 0 || nextStep >= stepCount) return false

      activeStepRef.current = nextStep
      setActiveStep(nextStep)
      lockedRef.current = true

      if (lockTimerRef.current != null) {
        window.clearTimeout(lockTimerRef.current)
      }

      lockTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false
        lockTimerRef.current = null
      }, STEP_LOCK_MS)

      snapToStep(nextStep)
      return true
    },
    [snapToStep, stepCount],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track || reducedMotion) return

    const scrollRoot = getScrollRoot(track)
    prevScrollTopRef.current = getScrollTop(scrollRoot)

    const onWheel = (event: WheelEvent) => {
      const metrics = getTrackMetrics(track, scrollRoot, stepCount, holdSegments, stickyTop)
      if (!metrics.isPinned) return

      if (entryLockRef.current) {
        event.preventDefault()
        return
      }

      if (Math.abs(event.deltaY) < 1) return

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1

      if (direction === 1 && activeStepRef.current >= stepCount - 1) return
      if (direction === -1 && activeStepRef.current <= 0) return

      if (lockedRef.current) {
        event.preventDefault()
        return
      }

      if (advanceStep(direction)) {
        event.preventDefault()
      }
    }

    const onScroll = () => {
      const scrollTop = getScrollTop(scrollRoot)
      const scrollDirection: "down" | "up" =
        scrollTop >= prevScrollTopRef.current ? "down" : "up"
      prevScrollTopRef.current = scrollTop

      const metrics = getTrackMetrics(track, scrollRoot, stepCount, holdSegments, stickyTop)

      if (metrics.isPinned && !wasPinnedRef.current) {
        wasPinnedRef.current = true
        beginEntryLock(scrollDirection)
        return
      }

      if (!metrics.isPinned) {
        if (
          wasPinnedRef.current &&
          scrollDirection === "down" &&
          scrollTop > metrics.end + SNAP_TOLERANCE_PX &&
          activeStepRef.current < stepCount - 1
        ) {
          clearStepLock()
          clearEntryLock()
          setStep(activeStepRef.current + 1)
          wasPinnedRef.current = true
          return
        }

        if (
          wasPinnedRef.current &&
          scrollDirection === "up" &&
          scrollTop < metrics.start - SNAP_TOLERANCE_PX &&
          activeStepRef.current > 0
        ) {
          clearStepLock()
          clearEntryLock()
          setStep(activeStepRef.current - 1)
          wasPinnedRef.current = true
          return
        }

        wasPinnedRef.current = false
        return
      }

      const expected = getStepScrollTop(metrics, activeStepRef.current)
      const exitingUpward =
        scrollDirection === "up" &&
        activeStepRef.current <= 0 &&
        scrollTop < expected - SNAP_TOLERANCE_PX
      const exitingDownward =
        scrollDirection === "down" &&
        activeStepRef.current >= stepCount - 1 &&
        scrollTop > expected + SNAP_TOLERANCE_PX

      if (entryLockRef.current) {
        if (exitingUpward || exitingDownward) {
          clearEntryLock()
          return
        }
        enforceSnap(metrics, scrollRoot)
        scheduleEntryRelease()
        return
      }

      if (lockedRef.current) {
        if (exitingUpward || exitingDownward) {
          clearStepLock()
          return
        }
        enforceSnap(metrics, scrollRoot)
        return
      }

      const delta = scrollTop - expected

      if (Math.abs(delta) <= SNAP_TOLERANCE_PX) return

      const direction: 1 | -1 = delta > 0 ? 1 : -1

      if (direction === -1 && activeStepRef.current <= 0) return
      if (direction === 1 && activeStepRef.current >= stepCount - 1) return

      if (advanceStep(direction)) return

      enforceSnap(metrics, scrollRoot)
    }

    scrollRoot.addEventListener("wheel", onWheel, { passive: false })
    scrollRoot.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      scrollRoot.removeEventListener("wheel", onWheel)
      scrollRoot.removeEventListener("scroll", onScroll)
      clearStepLock()
      clearEntryLock()
    }
  }, [
    advanceStep,
    beginEntryLock,
    clearEntryLock,
    clearStepLock,
    enforceSnap,
    holdSegments,
    reducedMotion,
    scheduleEntryRelease,
    setStep,
    stepCount,
    stickyTop,
  ])

  useEffect(() => {
    if (reducedMotion) {
      activeStepRef.current = stepCount - 1
      setActiveStep(stepCount - 1)
    }
  }, [reducedMotion, stepCount])

  return { trackRef, activeStep, reset }
}
