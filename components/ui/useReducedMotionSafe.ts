'use client'

import { useEffect, useState } from 'react'

/**
 * Like framer-motion's `useReducedMotion`, but safe to branch rendered output
 * on. That hook reads the media query during the first client render while the
 * server always sees `false`, so using it to pick styles or elements desyncs
 * the two HTML trees and React reports a hydration failure.
 *
 * This returns `false` on the server and on the first client render, then
 * settles to the real preference in an effect — after hydration has matched.
 * Use it wherever the preference changes what is rendered; framer's own hook is
 * fine for values that only affect behaviour (durations, effects, handlers).
 */
export default function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
