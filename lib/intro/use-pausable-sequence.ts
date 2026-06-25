"use client"

import { useEffect, useRef } from "react"

export type PausableSequenceStep = {
  /** Absolute delay from sequence start (ms). */
  at: number
  run: () => void
}

type UsePausableSequenceOptions = {
  /** Whether the owning scene/layer is active. */
  active: boolean
  /** When false, pending timers are cleared and elapsed time pauses. */
  enabled: boolean
  steps: PausableSequenceStep[]
  /** Called when `active` becomes false — reset local demo state here. */
  onReset?: () => void
}

function clearTimeoutList(ids: ReturnType<typeof setTimeout>[]) {
  ids.forEach(clearTimeout)
}

export function usePausableSequence({
  active,
  enabled,
  steps,
  onReset,
}: UsePausableSequenceOptions) {
  const completedRef = useRef<Set<number>>(new Set())
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const sequenceStartRef = useRef(0)
  const pausedAtRef = useRef<number | null>(null)
  const accumulatedPauseMsRef = useRef(0)
  const stepsRef = useRef(steps)
  stepsRef.current = steps
  const onResetRef = useRef(onReset)
  onResetRef.current = onReset

  useEffect(() => {
    const clearTimeouts = () => {
      clearTimeoutList(timeoutIdsRef.current)
      timeoutIdsRef.current = []
    }

    const getElapsed = () => {
      const now = Date.now()
      const pausedExtra = pausedAtRef.current != null ? now - pausedAtRef.current : 0
      return now - sequenceStartRef.current - accumulatedPauseMsRef.current - pausedExtra
    }

    const scheduleRemaining = () => {
      clearTimeouts()
      if (!active || !enabled) return

      const elapsed = getElapsed()

      stepsRef.current.forEach((step, index) => {
        if (completedRef.current.has(index)) return

        const fire = () => {
          if (!active || !enabled || completedRef.current.has(index)) return
          completedRef.current.add(index)
          step.run()
        }

        const remaining = step.at - elapsed
        if (remaining <= 0) {
          fire()
        } else {
          const id = setTimeout(fire, remaining)
          timeoutIdsRef.current.push(id)
        }
      })
    }

    if (!active) {
      clearTimeouts()
      completedRef.current.clear()
      sequenceStartRef.current = 0
      pausedAtRef.current = null
      accumulatedPauseMsRef.current = 0
      onResetRef.current?.()
      return clearTimeouts
    }

    if (sequenceStartRef.current === 0) {
      completedRef.current.clear()
      sequenceStartRef.current = Date.now()
      pausedAtRef.current = null
      accumulatedPauseMsRef.current = 0
    }

    if (!enabled) {
      clearTimeouts()
      if (pausedAtRef.current == null) {
        pausedAtRef.current = Date.now()
      }
      return clearTimeouts
    }

    if (pausedAtRef.current != null) {
      accumulatedPauseMsRef.current += Date.now() - pausedAtRef.current
      pausedAtRef.current = null
    }

    scheduleRemaining()
    return clearTimeouts
  }, [active, enabled, steps])
}

type UsePausableDelayOptions = {
  active: boolean
  enabled: boolean
  delay: number
  onFire: () => void
}

/** Single delayed callback with the same pause/resume semantics as `usePausableSequence`. */
export function usePausableDelay({ active, enabled, delay, onFire }: UsePausableDelayOptions) {
  const onFireRef = useRef(onFire)
  onFireRef.current = onFire

  usePausableSequence({
    active,
    enabled,
    steps: [{ at: delay, run: () => onFireRef.current() }],
  })
}
