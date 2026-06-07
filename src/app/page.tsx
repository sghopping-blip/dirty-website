import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import DirtyFoundersSection from '@/components/home/DirtyFoundersSection'
import FindUsTeaser from '@/components/home/FindUsTeaser'
import InstagramGrid from '@/components/home/InstagramGrid'
import EmailCapture from '@/components/home/EmailCapture'

export const metadata: Metadata = {
  title: 'Dirty — Premium Handcrafted Dirty Soda | San Luis Obispo, CA',
  description: "Handcrafted dirty sodas found at SLO's best farmers markets, Cal Poly events, sorority events, and private bookings. Dirty. Never Tasted This Good.",
  openGraph: {
    title: 'Dirty — Premium Handcrafted Dirty Soda | San Luis Obispo, CA',
    description: "Handcrafted dirty sodas found at SLO's best farmers markets and events. No storefront. Just really good soda.",
    url: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DirtyFoundersSection />
      <FindUsTeaser />
      <InstagramGrid />
      <EmailCapture />
    </>
  )
}
