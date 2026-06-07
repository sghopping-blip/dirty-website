'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const founders = [
  {
    name: 'Madison Andrade',
    role: 'Co-Founder',
    photoSrc: '/images/story/madison-01.jpg',
    bio: "Ag Business with a Minor in Entrepreneurship — which feels appropriate. I'm from Visalia, grew up dancing and showing cattle, and came to Cal Poly with a goal to build something of my own. I didn't expect it to happen this fast or to taste this good.",
  },
  {
    name: 'Delainee Fernandes',
    role: 'Co-Founder',
    photoSrc: '/images/story/delainee-01.jpg',
    bio: "Ag Business, fourth year, Tulare girl. I grew up dancing, showing dairy cattle in FFA, and doing anything competitive I could find. At Cal Poly I ran membership recruitment for AOII — which, it turns out, is basically a crash course in sales. Dirty is the thing I'm most proud of building.",
  },
]

export default function DirtyFoundersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      {/* Wave: cream into coral */}
      <div style={{ display:'block', width:'100%', overflow:'hidden', lineHeight:0, marginBottom:'-2px' }}>
        <svg viewBox="0 0 1440 108" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%' }}>
          <path d="M0,0 L1440,0 L1440,32 C1140,92 840,8 560,52 C280,96 120,12 0,48 Z" fill="#FAF7F2" />
          <path d="M0,48 C120,12 280,96 560,52 C840,8 1140,92 1440,32 L1440,108 L0,108 Z" fill="#E8523A" />
        </svg>
      </div>

      {/* Coral section */}
      <section
        ref={sectionRef}
        className="bg-coral"
        style={{ padding: '0 0 88px' }}
      >
        <div
          className="max-w-[860px] mx-auto px-6 md:px-8"
          style={{
            paddingTop: '72px',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#B33D28] text-center mb-4">
            Our Story
          </p>

          <h2
            className="font-display-italic text-center text-espresso mb-8"
            style={{ fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.05 }}
          >
            We made the first one<br />
            for{' '}
            <span className="text-cream" style={{ textShadow: '0 2px 12px rgba(200,70,45,0.3)' }}>
              ourselves.
            </span>
          </h2>

          <p className="font-sans text-center text-espresso max-w-[620px] mx-auto mb-4 leading-relaxed" style={{ fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300 }}>
            We&apos;ve done pretty much everything together —{' '}
            <strong className="font-medium">competitive dance, dairy cattle shows, sorority rush, the same internship.</strong>{' '}
            So it tracks that we ended up starting a business together too.
          </p>

          <p className="font-sans text-center text-espresso max-w-[620px] mx-auto mb-4 leading-relaxed" style={{ fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300 }}>
            It started in the break room — dirty sodas just to have something to look forward to.
            Then our coworkers wanted one. Then we couldn&apos;t stop thinking about it on the drive home.
          </p>

          <p className="font-sans text-center text-espresso max-w-[620px] mx-auto mb-0 leading-relaxed" style={{ fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 300 }}>
            Madison said it first:{' '}
            <strong className="font-medium">what if we actually did this?</strong>{' '}
            We&apos;ve been running ever since.
          </p>

          {/* Founder cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-14">
            {founders.map((f) => (
              <div
                key={f.name}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-250 hover:-translate-y-1"
                style={{ boxShadow: '0 4px 20px rgba(200,70,45,0.13)' }}
              >
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={f.photoSrc}
                    alt={f.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#B33D28] mb-1 flex items-center gap-2">
                    {f.role}
                    <span className="flex-1 h-px bg-coral opacity-60" />
                  </p>
                  <h3 className="font-display text-[1.3rem] text-espresso mb-3">{f.name}</h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed" style={{ fontWeight: 300 }}>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="/find"
              className="rounded-pill px-7 py-3 font-sans text-sm font-medium tracking-wide bg-espresso text-cream hover:bg-[#2e2a27] transition-all duration-200 hover:-translate-y-px"
            >
              Find Us This Week
            </Link>
            <Link
              href="/story"
              className="font-sans text-sm font-medium text-[#B33D28] hover:text-espresso transition-colors"
            >
              Full story →
            </Link>
          </div>
        </div>
      </section>

      {/* Wave: coral into cream */}
      <div style={{ display:'block', width:'100%', overflow:'hidden', lineHeight:0, marginTop:'-2px' }}>
        <svg viewBox="0 0 1440 108" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%' }}>
          <path d="M0,0 L1440,0 L1440,58 C1180,8 880,98 580,48 C280,0 120,88 0,40 Z" fill="#E8523A" />
          <path d="M0,40 C120,88 280,0 580,48 C880,98 1180,8 1440,58 L1440,108 L0,108 Z" fill="#FAF7F2" />
        </svg>
      </div>
    </div>
  )
}
