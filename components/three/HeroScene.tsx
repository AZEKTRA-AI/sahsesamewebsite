'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// WebGL bundle stays out of the server render and off the critical path.
const GrainField = dynamic(() => import('./GrainField'), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Decides whether the 3D scene should run at all. Falls back to the static
 * gradient when the user prefers reduced motion, the viewport is small, or the
 * device has no usable WebGL context.
 */
export default function HeroScene() {
  const [mode, setMode] = useState<'pending' | 'on' | 'off'>('pending')
  const [count, setCount] = useState(420)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const evaluate = () => {
      if (motionQuery.matches || mobileQuery.matches || !supportsWebGL()) {
        setMode('off')
        return
      }
      // Trim the particle budget on mid-size screens.
      setCount(window.innerWidth < 1280 ? 260 : 420)
      setMode('on')
    }

    evaluate()
    motionQuery.addEventListener('change', evaluate)
    mobileQuery.addEventListener('change', evaluate)
    return () => {
      motionQuery.removeEventListener('change', evaluate)
      mobileQuery.removeEventListener('change', evaluate)
    }
  }, [])

  if (mode !== 'on') {
    // Static poster: same brand wash the scene sits on, no WebGL cost.
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(31,122,109,0.16),transparent_60%),radial-gradient(ellipse_at_75%_70%,rgba(196,163,97,0.18),transparent_55%)]"
      />
    )
  }

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <GrainField count={count} />
    </div>
  )
}
