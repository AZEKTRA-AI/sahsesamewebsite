'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Word-by-word mask reveal for display headlines. Each word sits in a clipped
 * box and slides up from below it, so the type appears to be uncovered rather
 * than faded in. Whitespace is preserved for correct wrapping.
 *
 * The same markup renders whether or not motion is reduced — only the
 * transition duration changes. Swapping the tree on `useReducedMotion` would
 * desync server and client HTML for anyone with the preference set.
 */
export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = 'h2',
  trigger = 'inView',
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  trigger?: 'inView' | 'mount'
}) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  const animationProps =
    trigger === 'mount'
      ? { animate: 'show' as const }
      : { whileInView: 'show' as const, viewport: { once: true, margin: '-60px' } }

  const wordTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: EASE }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        variants={{
          hidden: {},
          show: {
            transition: reduceMotion
              ? { staggerChildren: 0, delayChildren: 0 }
              : { staggerChildren: stagger, delayChildren: delay },
          },
        }}
        {...animationProps}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span
              className="inline-block overflow-hidden align-bottom"
              // Descenders on italic serif type get clipped without the extra room.
              style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '110%' },
                  show: { y: '0%', transition: wordTransition },
                }}
              >
                {word}
              </motion.span>
            </span>
            {/* The space stays outside the clip box: a trailing space inside an
                inline-block collapses and the words run together. */}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
