import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Loyalty Program | Dirty',
  description: 'Buy 8 Dirty drinks and your 9th is completely free. Pick up a loyalty card at any Dirty location.',
}

export default function LoyaltyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-40 pb-16 text-center">
        <div className="container-default">
          <ScrollReveal>
            <p className="text-label text-gold mb-4">The Regulars Club</p>
            <h1 className="font-display-italic text-display-lg text-espresso">Come back for more.</h1>
            <p className="mt-6 font-sans text-body-lg text-text-secondary max-w-[480px] mx-auto">
              The more you drink, the better it gets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Card Section */}
      <section className="bg-espresso section-padding">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
            {/* Card Visual */}
            <ScrollReveal>
              <div className="relative mx-auto max-w-[400px]">
                <div className="bg-cream rounded-2xl p-10 shadow-deep">
                  <div className="flex items-center justify-between mb-8">
                    <img src="/images/logo/dirty-logo.png" alt="Dirty" className="h-16 w-16 object-contain" />
                    <p className="font-display-italic text-2xl text-espresso">Loyalty Card</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`aspect-square rounded-full border-2 flex items-center justify-center ${i < 8 ? 'border-blush-dark' : 'border-coral bg-coral'}`}>
                        {i === 8 && <span className="text-cream text-lg">★</span>}
                      </div>
                    ))}
                  </div>
                  <p className="font-display-italic text-center text-espresso">Buy 8, your 9th is on us.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal delay={0.1}>
              <p className="text-label text-gold mb-4">Buy 8, Get Your 9th Free</p>
              <h2 className="font-display-italic text-display-md text-cream mb-6">
                The world&apos;s easiest rewards program.
              </h2>
              <p className="font-sans text-body-lg text-cream/80 leading-relaxed mb-6">
                Every time you order a Dirty, ask for a punch on your loyalty card. Fill the card and your next drink is completely on us.
              </p>
              <p className="font-sans text-body-md text-cream/60">
                No app. No account. Just a card and good taste.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream section-padding">
        <div className="container-default">
          <ScrollReveal>
            <h2 className="font-display-italic text-display-md text-espresso text-center mb-16">
              Three steps. That&apos;s it.
            </h2>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { number: '01', icon: '🎴', title: 'Get Your Card', desc: 'Pick up a free loyalty card at any Dirty location. Just ask when you order — no sign-up required.' },
              { number: '02', icon: '✓', title: 'Collect Your Punches', desc: 'Every drink gets you one punch. Ask your server each time you order.' },
              { number: '03', icon: '★', title: 'Drink #9 is Free', desc: 'When your card is full, your next drink is completely on us. No catches.' },
            ].map((step) => (
              <StaggerItem key={step.number}>
                <div className="text-center">
                  <p className="font-display-italic text-[5rem] leading-none text-blush-dark mb-2">{step.number}</p>
                  <h3 className="font-display text-display-sm text-espresso mb-3">{step.title}</h3>
                  <p className="font-sans text-body-md text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Where to Get */}
      <section className="bg-blush section-padding-sm text-center">
        <div className="container-default max-w-[600px]">
          <ScrollReveal>
            <h2 className="font-display-italic text-display-sm text-espresso mb-4">
              Cards are free. Find us to grab yours.
            </h2>
            <p className="font-sans text-body-md text-text-secondary mb-8">
              We don&apos;t mail cards or offer digital versions. Visit us at any Dirty location and ask — we&apos;ll hand you one with your first drink.
            </p>
            <Link href="/find" className="btn-coral">See This Week&apos;s Locations</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing quote */}
      <section className="bg-cream section-padding-sm text-center">
        <div className="container-default">
          <ScrollReveal>
            <p className="font-display-italic text-display-sm text-espresso max-w-[600px] mx-auto">
              &ldquo;Our best customers are the ones who come back. You know who you are.&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
