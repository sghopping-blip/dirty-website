import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { StaggerGroup, StaggerItem } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Our Story | Dirty',
  description: 'Meet Delainee and Madison — two Cal Poly students who turned a break room experiment into SLO\'s favorite dirty soda brand.',
}

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/story/founders-hero-01.jpg"
            alt="Delainee and Madison — Co-Founders of Dirty"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,26,18,0.15) 0%, rgba(44,26,18,0.50) 100%)' }} />
        </div>
        <div className="relative z-10 flex min-h-[70vh] flex-col items-start justify-end px-5 pb-16 container-default">
          <ScrollReveal>
            <p className="text-label text-cream/75 mb-4">Our Story</p>
            <h1 className="font-display-italic text-display-lg text-cream max-w-[600px]">
              From best friends<br />to Co-Founders.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-white section-padding">
        <div className="container-narrow">
          <ScrollReveal>
            <p className="text-label text-sage mb-4">How It Started</p>
            <h2 className="font-display text-display-sm text-espresso mb-8">
              We made the first one for ourselves.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="font-sans text-body-lg text-text-secondary leading-relaxed space-y-5">
              <p>
                We&apos;ve done pretty much everything together — competitive dance, dairy cattle shows, sorority rush, the same internship. So it tracks that we ended up starting a business together too.
              </p>
              <p>
                It started in the break room. We were making dirty sodas for ourselves — just something to look forward to in the middle of the day. Then our coworkers wanted one. Then we couldn&apos;t stop thinking about it on the drive home.
              </p>
              <p>
                Madison said it first: what if we actually did this? We&apos;ve been running ever since.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-14">
            <div className="relative overflow-hidden rounded-2xl aspect-[16/9] w-full">
              <Image
                src="/images/story/founders-aprons-01.jpg"
                alt="Delainee and Madison in their Dirty aprons"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 760px"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-blush section-padding">
        <div className="container-default">
          <ScrollReveal>
            <p className="text-label text-coral mb-4 text-center">Meet the Founders</p>
            <h2 className="font-display-italic text-display-md text-espresso text-center mb-16">
              The girls behind the drinks.
            </h2>
          </ScrollReveal>

          <StaggerGroup className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Delainee */}
            <StaggerItem>
              <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/story/delainee-01.jpg"
                    alt="Delainee Fernandes — Co-Founder of Dirty"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <p className="text-label text-coral mb-2">Co-Founder</p>
                  <h3 className="font-display text-display-sm text-espresso mb-4">Delainee Fernandes</h3>
                  <p className="font-sans text-body-md text-text-secondary leading-relaxed">
                    Ag Business, fourth year, Tulare girl. I grew up dancing, showing dairy cattle in FFA, and doing anything competitive I could find. At Cal Poly I ran membership recruitment for AOII — which, it turns out, is basically a crash course in sales. Dirty is the thing I&apos;m most proud of building.
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Madison */}
            <StaggerItem>
              <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/story/madison-01.jpg"
                    alt="Madison Andrade — Co-Founder of Dirty"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <p className="text-label text-coral mb-2">Co-Founder</p>
                  <h3 className="font-display text-display-sm text-espresso mb-4">Madison Andrade</h3>
                  <p className="font-sans text-body-md text-text-secondary leading-relaxed">
                    Ag Business with a Minor in Entrepreneurship — which feels appropriate. I&apos;m from Visalia, grew up dancing and showing cattle, and came to Cal Poly with a goal to build something of my own. I didn&apos;t expect it to happen this fast or to taste this good.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* The Dirty Difference */}
      <section className="bg-cream section-padding">
        <div className="container-default">
          <ScrollReveal>
            <p className="text-label text-coral mb-4 text-center">What we&apos;re built on.</p>
            <h2 className="font-display-italic text-display-md text-espresso text-center mb-16">
              Three things we&apos;ve never cut corners on.
            </h2>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { number: '01', title: 'Made to Order', body: 'You order it, we make it. Right then. No batches sitting around, no shortcuts. Every drink is the first one.' },
              { number: '02', title: 'Community First', body: 'We&apos;re at the Thursday market every week. We show up for bid days, ranch pop-ups, backyard parties. If something is happening in SLO, we want to be there.' },
              { number: '03', title: 'Every Drink, an Experience', body: 'The cream top matters. The cup matters. The way it looks when you hold it up matters. We care about the whole thing, not just the flavor.' },
            ].map((item) => (
              <StaggerItem key={item.number}>
                <div className="text-center md:text-left">
                  <p className="font-display-italic text-[5rem] leading-none text-blush-dark mb-4">{item.number}</p>
                  <h3 className="font-display text-display-sm text-espresso mb-3">{item.title}</h3>
                  <p className="font-sans text-body-md text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA Row */}
      <section className="bg-espresso section-padding-sm">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:divide-x md:divide-cream/10">
            <ScrollReveal className="text-center md:text-left md:pr-10">
              <h3 className="font-display-italic text-display-sm text-cream mb-6">See where we&apos;ll be this week.</h3>
              <Link href="/find" className="btn-ghost-inverse">Find Dirty</Link>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="text-center md:text-left md:pl-10">
              <h3 className="font-display-italic text-display-sm text-cream mb-6">Planning an event?</h3>
              <Link href="/events" className="btn-coral">Book an Event</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
