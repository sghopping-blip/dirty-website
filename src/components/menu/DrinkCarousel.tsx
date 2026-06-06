'use client'

import Image from 'next/image'
import { useRef } from 'react'
import type { DrinkItem } from '@/types/menu'

interface DrinkCarouselProps {
  drinks: DrinkItem[]
  label: string
  priceRange: string
}

export default function DrinkCarousel({ drinks, label, priceRange }: DrinkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div className="container-default">
        <div className="flex items-center gap-6 mb-8">
          <h2 className="font-display text-display-sm text-espresso">{label}</h2>
          <div className="flex-1 h-px bg-blush-dark" />
          <p className="text-label text-text-secondary shrink-0">{priceRange}</p>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-[max(24px,calc((100vw-980px)/2))] scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {drinks.map((drink) => {
          const isPng = drink.id === 'island-time'
          const imgSrc = '/images/drinks/' + drink.id + (isPng ? '.png' : '.jpg')
          return (
          <div key={drink.id} className="flex-shrink-0 w-[300px] md:w-[340px] flex flex-col">
            <div
              className={`relative overflow-hidden mb-4 ${isPng ? '' : 'bg-cream rounded-2xl'}`}
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={imgSrc}
                alt={drink.name}
                fill
                className="object-contain object-center"
                sizes="340px"
              />
            </div>
            <div className="px-1">
              <h3 className="font-display text-[1.35rem] text-espresso mb-1">{drink.name}</h3>
              <p className="text-label text-sage mb-2">{drink.flavorTags.join(' · ')}</p>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">{drink.description}</p>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
