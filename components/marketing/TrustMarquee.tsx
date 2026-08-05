'use client'

import { useEffect, useState } from 'react'

export default function TrustMarquee() {
  const marqueeText = [
    'Est. 1985',
    'Faisalabad Mills',
    'Sesame · Pulses · Rice',
    'FOB · CFR · CIF',
    '37 Years Heritage',
    'Global Export',
  ]

  const repeatedText = [...marqueeText, ...marqueeText, ...marqueeText]

  return (
    <section className="relative bg-white py-8 overflow-hidden border-y border-sah-gold/10">
      <div className="relative flex animate-marquee whitespace-nowrap">
        {repeatedText.map((text, idx) => (
          <div
            key={idx}
            className="font-body text-sm uppercase tracking-[0.2em] text-sah-charcoal mx-8 flex-shrink-0"
          >
            {text}
            {idx < repeatedText.length - 1 && <span className="mx-6 text-sah-gold">·</span>}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 60s linear infinite;
        }

        section:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
