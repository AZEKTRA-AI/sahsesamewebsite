'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface GalleryImage {
  id: string
  url: string
  alt: string | null
}

export default function ProductGallery({
  images,
  productName,
  fallbackImage = 'https://res.cloudinary.com/pjhvvbam/image/upload/v1785958258/sah-marketing/hero-sesame.jpg',
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
      <div className="relative rounded-lg overflow-hidden h-72 sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackImage}
          alt={productName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-sah-earth/30" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg bg-sah-cream" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div key={image.id} className="min-w-0 flex-[0_0_100%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt || productName}
                className="h-72 sm:h-96 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === selected}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === selected ? 'bg-sah-gold' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
