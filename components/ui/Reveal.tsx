'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.23, 1, 0.32, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered entrance. Elements come in with a short travel, a fade and
 * a touch of blur — the blur bridges the gap between "not there" and "there"
 * so the eye reads one object arriving instead of two states crossfading.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  blur = true,
  className,
  once = true,
}: {
  children: ReactNode
  delay?: number
  direction?: Direction
  duration?: number
  blur?: boolean
  className?: string
  once?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const { x, y } = offset[direction]

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parent for staggered children. Wrap each child in <RevealItem> — the
 * cascade is orchestrated here so the delays stay consistent across sections.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  once = true,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  once?: boolean
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE },
  },
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
