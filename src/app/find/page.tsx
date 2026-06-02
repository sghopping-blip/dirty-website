import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/ScrollReveal'
import { getUpcomingEvents, eventTypeLabels } from '@/data/events'

export const metadata: Metadata = {
  title: 'Find Dirty | Dirty',
  description: 'Find Dirty at SLO Thursday Night Farmers Market, SLO Ranch pop-ups, and private events. Updated every week.',
}

function formatDate(dateStr: string): { weekday: string; month: string; day: string } {
  const date = new Date(dateStr + 'T12:00:00')
  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    month: date.toLocaleDateString('en-US', { month: 'long' }),
    day: date.getDate().toString(),
  }
}

export default function FindPage() {
  const events = getUpcomingEvents()

  return (
    <>
      <section className="bg-cream pt-40 pb-16">
        <div className="container-default text-center">
          <ScrollReveal>
            <p className="text-label text-coral mb-4">We Come to You</p>
            <h1 className="font-display-italic text-display-lg text-espresso">Find Dirty.</h1>
            <p className="mt-6 font-sans text-body-lg text-text-secondary max-w-[520px] mx-auto">
              No storefront. No drive-through. We show up where the good things happen — updated every week.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-default max-w-[860px]">
          <ScrollReveal>
            <h2 className="font-display text-display-sm text-espresso mb-2">Upcoming Locations</h2>
            <p className="font-sans text-body-md text-text-secondary mb-12">
              Schedule updated every Monday. Follow{' '}
              <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
                @drinking.dirty
              </a>{' '}
              for same-day updates and surprise pop-ups.
            </p>
          </ScrollReveal>

          {events.length > 0 ? (
            <StaggerGroup className="flex flex-col divide-y divide-blush-dark">
              {events.map((event) => {
                const { weekday, month, day } = formatDate(event.date)
                return (
                  <StaggerItem key={event.id}>
                    <div className="group flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-0 hover:bg-blush/30 -mx-6 px-6 rounded-xl transition-colors duration-200">
                      <div className="flex items-baseline gap-3 md:w-32 shrink-0">
                        <span className="font-display text-[3.5rem] leading-none text-espresso">{day}</span>
                        <div className="flex flex-col">
                          <span className="font-sans text-xs font-semibold text-text-secondary tracking-widest uppercase">{weekday.slice(0, 3)}</span>
                          <span className="font-sans text-xs font-semibold text-text-secondary tracking-widest uppercase">{month.slice(0, 3)}</span>
                        </div>
                      </div>
                      <div className="hidden md:block w-px h-16 bg-blush-dark mx-8 shrink-0" />
                      <div className="flex-1">
                        <p className="text-label text-coral mb-1">
                          {event.isRecurring && event.recurringLabel ? event.recurringLabel : eventTypeLabels[event.type]}
                        </p>
                        <h3 className="font-sans font-medium text-xl text-espresso">{event.locationName}</h3>
                        <p className="font-sans text-sm text-text-secondary mt-1">{event.address}</p>
                        <p className="font-sans text-sm text-text-secondary mt-0.5">{event.startTime} – {event.endTime}</p>
                      </div>
                      <div className="shrink-0">
                        <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-text-arrow text-sm">
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
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
