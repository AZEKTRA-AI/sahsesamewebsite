'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Hairline gold bar under the header showing how far through the page you are.
 * Spring-smoothed so it glides rather than snapping frame to frame.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[41] h-[2px] origin-left bg-gradient-to-r from-sah-gold/40 via-sah-gold to-sah-gold-soft"
      initial={false}
    />
  )
}
