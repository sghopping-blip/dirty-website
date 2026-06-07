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
    <div className="relative">
      {/* Fixed background image behind entire page */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/hero/find-hero-01.jpg"
          alt="Find Dirty — San Luis Obispo"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(44,26,18,0.72)' }}
          aria-hidden="true"
        />
      </div>

      {/* All page content sits above the fixed background */}
      <div className="relative z-10">

        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-5 pt-48 pb-24">
          <ScrollReveal>
            <p className="text-label text-cream/70 mb-4">We Come to You</p>
            <h1 className="font-display-italic text-display-lg text-cream">Find Dirty.</h1>
          </ScrollReveal>
        </section>

        {/* Upcoming Events */}
        <section className="section-padding">
          <div className="container-default max-w-[860px]">
            <ScrollReveal>
              <p className="text-label text-coral mb-3">Upcoming Locations</p>
              <h2 className="font-display-italic text-display-md text-cream mb-4">Where to find us.</h2>
              <p className="font-sans text-body-md text-cream/60 mb-12">
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
                <p className="font-display-italic text-display-sm text-cream/60 mb-4">
                  Nothing public scheduled right now.
                </p>
                <p className="font-sans text-body-md text-cream/60 mb-8">
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
        <section className="section-padding-sm">
          <div className="container-default">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <ScrollReveal>
                <h2 className="font-display-italic text-display-sm text-cream">
                  For same-day updates and surprise pop-ups...
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className="flex flex-col gap-4">
                <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="font-display-italic text-display-sm text-coral">
                  @drinking.dirty
                </a>
                <p className="font-sans text-body-md text-cream/60">
                  We post stories when we&apos;re live. Turn on notifications so you never miss us.
                </p>
                <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="btn-ghost-inverse w-fit">
                  Follow on Instagram
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Email signup */}
        <section className="section-padding-sm">
          <div className="container-default text-center max-w-[560px]">
            <ScrollReveal>
              <p className="text-label text-coral mb-4">Never Miss a Drop</p>
              <h2 className="font-display-italic text-display-sm text-cream mb-4">
                Get Monday&apos;s location drop first.
              </h2>
              <p className="font-sans text-body-md text-cream/60 mb-8">
                Weekly schedule delivered to your inbox before it goes public.
              </p>
              <Link href="/" className="btn-coral">Sign Up for Location Drops</Link>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  )
}
