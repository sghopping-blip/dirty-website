import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contact | Dirty',
  description: 'Get in touch with Dirty. General questions, event bookings, press and collaborations.',
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-40 pb-16 text-center">
        <div className="container-default">
          <ScrollReveal>
            <p className="text-label text-sage mb-4">Reach Out</p>
            <h1 className="font-display-italic text-display-lg text-espresso">Say hello.</h1>
            <p className="mt-6 font-sans text-body-lg text-text-secondary max-w-[480px] mx-auto">
              Whether it&apos;s a question, a collab idea, or just a hello — we&apos;re here.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pathway Split */}
      <section className="bg-white section-padding">
        <div className="container-default max-w-[900px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ScrollReveal>
              <div className="flex flex-col bg-cream rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="text-3xl mb-4">✉️</span>
                <h2 className="font-display text-display-sm text-espresso mb-3">General Questions</h2>
                <p className="font-sans text-body-md text-text-secondary leading-relaxed mb-8 flex-1">
                  For anything that isn&apos;t about booking an event — media inquiries, collabs, or just saying hi.
                </p>
                <a href="#contact-form" className="btn-ghost w-full text-center">Send a Message</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col bg-cream rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="text-3xl mb-4">📅</span>
                <h2 className="font-display text-display-sm text-espresso mb-3">Event Bookings</h2>
                <p className="font-sans text-body-md text-text-secondary leading-relaxed mb-8 flex-1">
                  Planning an event? Head to our bookings page for the full form and all the details.
                </p>
                <Link href="/events#booking" className="btn-coral w-full text-center">Go to Events Page</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="bg-blush section-padding">
        <div className="container-default max-w-[640px]">
          <ScrollReveal>
            <p className="text-label text-coral mb-4">General Inquiry</p>
            <h2 className="font-display-italic text-display-sm text-espresso mb-10">
              What&apos;s on your mind?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <form action="/api/contact" method="POST" className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-label text-text-secondary">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name"
                    className="h-[52px] rounded-lg border border-blush-dark bg-white px-4 font-sans text-base text-espresso placeholder:text-text-tertiary focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-label text-text-secondary">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@email.com"
                    className="h-[52px] rounded-lg border border-blush-dark bg-white px-4 font-sans text-base text-espresso placeholder:text-text-tertiary focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-label text-text-secondary">Subject</label>
                <select id="subject" name="subject" required
                  className="h-[52px] rounded-lg border border-blush-dark bg-white px-4 font-sans text-base text-espresso focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors appearance-none">
                  <option value="">Select one</option>
                  <option>General Question</option>
                  <option>Press & Media</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-label text-text-secondary">Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="Tell us what's on your mind."
                  className="rounded-lg border border-blush-dark bg-white px-4 py-3 font-sans text-base text-espresso placeholder:text-text-tertiary focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors resize-none" />
              </div>
              <button type="submit" className="btn-coral w-full">Send Message</button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-white section-padding-sm text-center">
        <div className="container-default max-w-[480px]">
          <ScrollReveal>
            <h2 className="font-display-italic text-display-sm text-espresso mb-8">
              The fastest way to reach us.
            </h2>
            <div className="flex flex-col gap-4">
              <a href="https://instagram.com/drinking.dirty" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 font-sans text-body-lg text-espresso hover:text-coral transition-colors">
                <span>📸</span> @drinking.dirty on Instagram
              </a>
              <a href="https://tiktok.com/@drinkingdirty" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 font-sans text-body-lg text-espresso hover:text-coral transition-colors">
                <span>🎵</span> @drinkingdirty on TikTok
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
