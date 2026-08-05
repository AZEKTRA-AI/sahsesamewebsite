import Image from 'next/image'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  image: string
  imageAlt: string
}) {
  return (
    <section className="relative bg-sah-earth overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sah-earth via-sah-earth/70 to-sah-earth/50" />
      </div>

      <div className="relative container-wide py-20 sm:py-28 md:py-32 text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-sah-gold mb-6">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-white leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
