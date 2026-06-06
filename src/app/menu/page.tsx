import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/ScrollReveal'
import { menuItems } from '@/data/menu'

export const metadata: Metadata = {
  title: 'Menu | Dirty',
  description: 'Handcrafted dirty sodas made to order. Signatures, Bombers, Seasonal specials, and Craft Your Own.',
}

export default function MenuPage() {
  const signatures = menuItems.filter((d) => d.category === 'signature' && d.isAvailable)
  const bombers = menuItems.filter((d) => d.category === 'bomber' && d.isAvailable)
  const seasonal = menuItems.filter((d) => d.category === 'seasonal' && d.isAvailable)

  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-40 pb-16">
        <div className="container-default text-center">
          <ScrollReveal>
            <p className="text-label text-sage mb-4">San Luis Obispo, CA</p>
            <h1 className="font-display-italic text-display-lg text-espresso">The Menu</h1>
            <p className="mt-6 font-sans text-body-lg text-text-secondary max-w-[480px] mx-auto">
              Discover your Dirty.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Seasonal Featured Drink */}
      {seasonal.length > 0 && (
        <section className="bg-[#D4854A] section-padding">
          <div className="container-default">
            {seasonal.map((drink) => (
              <div key={drink.id} className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
                <ScrollReveal>
                  <p className="text-label text-cream/70 mb-3">{drink.seasonalLabel} &nbsp;·&nbsp; Limited Time</p>
                  <h2 className="font-display-italic text-display-md text-cream mb-2">{drink.name}</h2>
                  <p className="font-display-italic text-[1.1rem] text-cream/80 mb-6">
                    Spend your summer the right way. Dirty.
                  </p>
                  <p className="font-sans text-body-lg text-cream/85 leading-relaxed mb-6">
                    {drink.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {drink.flavorTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-pill px-4 py-1.5 font-sans text-label bg-cream/20 text-cream"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                    <Image
                      src="/images/drinks/golden-hour-01.jpg"
                      alt="The Golden Hour — Dirty Summer Seasonal"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Signatures */}
      <section className="bg-white section-padding">
        <div className="container-default">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="font-display text-display-sm text-espresso">Signatures</h2>
              <div className="flex-1 h-px bg-blush-dark" />
              <p className="text-label text-text-secondary shrink-0">$6.00 – $6.50</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {signatures.map((drink) => (
              <StaggerItem key={drink.id}>
                <div className="bg-cream rounded-xl p-7 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <h3 className="font-display text-[1.75rem] text-espresso mb-2">{drink.name}</h3>
                  <p className="text-label text-sage mb-4">{drink.flavorTags.join(' · ')}</p>
                  <p className="font-sans text-body-md text-text-secondary leading-relaxed">{drink.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Bombers */}
      <section className="bg-blush section-padding">
        <div className="container-default">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-4">
              <h2 className="font-display text-display-sm text-espresso">Bombers</h2>
              <div className="flex-1 h-px bg-blush-dark" />
              <p className="text-label text-text-secondary shrink-0">$7.00 – $7.50</p>
            </div>
            <p className="font-sans text-body-md text-text-secondary mb-12 max-w-[480px]">
              Red Bull base. A little extra energy, a lot more flavor.
            </p>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bombers.map((drink) => (
              <StaggerItem key={drink.id}>
                <div className="bg-white rounded-xl p-7 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <h3 className="font-display text-[1.75rem] text-espresso mb-2">{drink.name}</h3>
                  <p className="text-label text-sage mb-4">{drink.flavorTags.join(' · ')}</p>
                  <p className="font-sans text-body-md text-text-secondary leading-relaxed">{drink.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Craft Your Own */}
      <section className="bg-cream section-padding">
        <div className="container-default">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-4">
              <h2 className="font-display text-display-sm text-espresso">Craft Your Own</h2>
              <div className="flex-1 h-px bg-blush-dark" />
              <p className="text-label text-text-secondary shrink-0">From $6.00</p>
            </div>
            <p className="font-sans text-body-md text-text-secondary mb-12 max-w-[480px]">
              Start with a base, pick your syrups, add a creamer. Creamer +$0.50 &nbsp;·&nbsp; Extra syrup +$0.50
            </p>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StaggerItem>
              <div className="bg-white rounded-xl p-7">
                <p className="text-label text-coral mb-5">Base</p>
                <ul className="font-sans text-body-md text-text-secondary space-y-2">
                  {['Coca-Cola','Diet Coca-Cola','Dr. Pepper','Diet Dr. Pepper','Fresca','Orange Fanta','Root Beer','Sprite','Red Bull'].map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white rounded-xl p-7">
                <p className="text-label text-coral mb-5">Syrups</p>
                <ul className="font-sans text-body-md text-text-secondary space-y-2">
                  {['Blue Raspberry','Cherry','Coconut','Lime','Mango','Peach','Pineapple','Pomegranate','Raspberry','Sour Candy','Strawberry','Sugar Free Vanilla','Vanilla','Watermelon'].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white rounded-xl p-7">
                <p className="text-label text-coral mb-5">Creamers</p>
                <ul className="font-sans text-body-md text-text-secondary space-y-3">
                  {['Sweet & Creamy','Coconut Cream','French Vanilla'].map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* Seasonal Specials */}
      <section className="bg-white section-padding-sm">
        <div className="container-default text-center">
          <ScrollReveal>
            <p className="text-label text-coral mb-4">Seasonal Specials</p>
            <h2 className="font-display-italic text-display-sm text-espresso mb-4">
              Something new is always coming.
            </h2>
            <p className="font-sans text-body-md text-text-secondary max-w-[480px] mx-auto mb-8">
              The Golden Hour is here for summer. Fall and holiday drops are already in the works — follow us so you hear it first.
            </p>
            <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="btn-coral">
              Follow @drinking.dirty
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Ready to order */}
      <section className="bg-blush section-padding-sm">
        <div className="container-default text-center">
          <ScrollReveal>
            <h2 className="font-display-italic text-display-sm text-espresso mb-6">Ready to order?</h2>
            <p className="font-sans text-body-md text-text-secondary mb-8">
              Come find us. Every drink is made to order, fresh, in person.
            </p>
            <Link href="/find" className="btn-coral">Find Us This Week</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
