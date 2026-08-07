const items = [
  'Est. 1985',
  'Two mills in Faisalabad',
  'Sesame · Pulses · Rice',
  'FOB · CFR · CIF',
  'SGS / Intertek inspection',
  'Karachi Port & Port Qasim',
  'Buyer-spec processing',
  'Private-label packing',
]

function Track({ reverse = false }: { reverse?: boolean }) {
  // Four copies: the -50% translate lands on an identical frame, and the two
  // trailing copies keep the right-hand side covered on wide monitors.
  const sequence = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`flex w-max shrink-0 items-center ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      }`}
    >
      {sequence.map((item, idx) => (
        <span key={idx} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-7 font-body text-[13px] uppercase tracking-[0.22em] text-sah-charcoal/70">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 rotate-45 bg-sah-gold/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

/**
 * Two counter-scrolling bands of trade credentials. Both edges fade into the
 * page so the strip reads as continuous rather than clipped, and the whole
 * thing pauses on hover if someone wants to actually read it.
 */
export default function TrustMarquee() {
  return (
    <section
      aria-label="Trade credentials"
      className="marquee-pause relative overflow-hidden border-y border-sah-gold/15 bg-sah-cream py-5"
    >
      <div className="relative flex flex-col gap-3">
        <div className="flex">
          <Track />
        </div>
        <div className="flex opacity-45">
          <Track reverse />
        </div>
      </div>

      {/* Edge masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-sah-cream to-transparent sm:w-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-sah-cream to-transparent sm:w-40"
      />
    </section>
  )
}
