'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'

/**
 * Card whose border illuminates under the cursor. The pointer position is
 * written straight to CSS custom properties on the element (not on a shared
 * parent) so moving the mouse never triggers a style recalc on siblings.
 */
export default function SpotlightCard({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}) {
  const ref = useRef<HTMLElement | null>(null)

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      className={`spotlight ${className}`}
    >
      {children}
    </Tag>
  )
}
