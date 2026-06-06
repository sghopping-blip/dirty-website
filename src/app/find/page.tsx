import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getUpcomingEvents } from '@/data/events'
import { preOrderConfig } from '@/data/preorder'
import FindPageClient from '@/components/find/FindPageClient'

export const metadata: Metadata = {
  title: 'Find Dirty | Dirty',
  description: 'Find Dirty at SLO Thursday Night Farmers Market, SLO Ranch pop-ups, and private events. Updated every week.',
}

export default function FindPage() {
  const events = getUpcomingEvents()

  const eventsWithPreOrder = events.map((e, index) => ({
    ...e,
    preOrderEnabled: index === 0 && (preOrderConfig[e.id] ?? true),
  }))

  return (
    <>
      {/* Hero with background image */}
      <section className="relative overflow-hidden" style={{ minHeight: '55vh' }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/og-image.jpg"
            alt="Find Dirty — San Luis Obispo"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(44,26,18,0.35) 0%, rgba(44,26,18,0.65) 100%)',
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-end px-5 pb-16 container-default" style={{ minHeight: '55vh' }}>
          <ScrollReveal>
            <p className="text-label text-cream/75 mb-4">We Come to You</p>
            <h1 className="font-display-italic text-display-lg text-cream">Find Dirty.</h1>
            <p className="mt-4 font-sans text-body-lg text-cream/80 max-w-[520px]">
              No storefront. We show up where the good things happen — updated every week.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-cream section-padding">
        <div className="container-default max-w-[860px]">
          <ScrollReveal>
            <p className="text-label text-coral mb-3">Upcoming Locations</p>
            <h2 className="font-display-italic text-display-md text-espresso mb-4">Where to find us.</h2>
            <p className="font-sans text-body-md text-text-secondary mb-12">
              Schedule updated every Monday. Follow{' '}
              <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
                @drinking.dirty
              </a>{' '}
              for same-day updates and surprise pop-ups.
            </p>
          </ScrollReveal>

          {eventsWithPreOrder.length > 0 ? (
            <FindPageClient events={eventsWithPreOrder} />
          ) : (
            <div className="text-center py-20">
              <p className="font-display-italic text-display-sm text-text-secondary mb-4">
                Nothing public scheduled right now.
              </p>
              <p className="font-sans text-body-md text-text-secondary mb-8">
                Follow us on Instagram for last-minute pop-ups and surprise locations.
              </p>
              <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="btn-coral">
                Follow @drinking.dirty
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-blush section-padding-sm">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <ScrollReveal>
              <h2 className="font-display-italic text-display-sm text-espresso">
                For same-day updates and surprise pop-ups...
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex flex-col gap-4">
              <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="font-display-italic text-display-sm text-coral">
                @drinking.dirty
              </a>
              <p className="font-sans text-body-md text-text-secondary">
                We post stories when we&apos;re live. Turn on notifications so you never miss us.
              </p>
              <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="btn-ghost w-fit">
                Follow on Instagram
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-cream section-padding-sm">
        <div className="container-default text-center max-w-[560px]">
          <ScrollReveal>
            <p className="text-label text-coral mb-4">Never Miss a Drop</p>
            <h2 className="font-display-italic text-display-sm text-espresso mb-4">
              Get Monday&apos;s location drop first.
            </h2>
            <p className="font-sans text-body-md text-text-secondary mb-8">
              Weekly schedule delivered to your inbox before it goes public.
            </p>
            <Link href="/" className="btn-coral">Sign Up for Location Drops</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
