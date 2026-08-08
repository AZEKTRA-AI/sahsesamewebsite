'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import useReducedMotionSafe from './useReducedMotionSafe'

/**
 * Image that drifts against the scroll inside its frame. The inner picture is
 * oversized by `overscan` so the drift never exposes an empty edge.
 */
export default function ParallaxImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  sizes = '100vw',
  distance = 60,
  overscan = 18,
  priority = false,
  children,
}: {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  sizes?: string
  distance?: number
  overscan?: number
  priority?: boolean
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotionSafe()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* The inner frame is always present and always positioned the same way;
          only the drift value is dropped when motion is reduced. */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: reduceMotion ? 0 : y,
          top: `-${overscan}%`,
          bottom: `-${overscan}%`,
          height: 'auto',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
      {children}
    </div>
  )
}
