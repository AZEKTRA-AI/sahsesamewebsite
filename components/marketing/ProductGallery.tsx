'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface GalleryImage {
  id: string
  url: string
  alt: string | null
}

const FALLBACK =
  'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg'

export default function ProductGallery({
  images,
  productName,
  fallbackImage = FALLBACK,
}: {
  images: GalleryImage[]
  productName: string
  fallbackImage?: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 })
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (images.length === 0) {
    return (
      <div className="relative h-80 overflow-hidden rounded-panel bg-sah-cream shadow-lift sm:h-[26rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fallbackImage} alt={productName} className="h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-sah-earth/20" />
      </div>
    )
  }

  return (
    <div className="group/gallery space-y-3">
      <div className="relative overflow-hidden rounded-panel bg-sah-cream shadow-lift">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((image) => (
              <div key={image.id} className="min-w-0 flex-[0_0_100%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.alt || productName}
                  className="h-80 w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover/gallery:scale-[1.03] sm:h-[26rem]"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <GalleryArrow
              direction="prev"
              onClick={() => emblaApi?.scrollPrev()}
              className="left-3"
            />
            <GalleryArrow
              direction="next"
              onClick={() => emblaApi?.scrollNext()}
              className="right-3"
            />
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === selected}
              className={`h-2 rounded-full transition-[background-color,width] duration-200 ease-out-expo active:scale-90 ${
                index === selected
                  ? 'w-7 bg-sah-gold'
                  : 'w-2 bg-sah-charcoal/20 hover:bg-sah-charcoal/35'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function GalleryArrow({
  direction,
  onClick,
  className = '',
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
      className={`glass absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-sah-charcoal opacity-0 transition-[opacity,transform] duration-200 ease-out-expo hover:text-sah-gold focus-visible:opacity-100 active:scale-90 group-hover/gallery:opacity-100 ${className}`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        />
      </svg>
    </button>
  )
}
