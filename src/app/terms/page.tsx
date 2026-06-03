import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Dirty',
}

export default function TermsPage() {
  return (
    <div className="bg-cream pt-40 pb-24">
      <div className="container-narrow">
        <p className="text-label text-sage mb-4">Legal</p>
        <h1 className="font-display-italic text-display-md text-espresso mb-12">Terms of Service</h1>
        <div className="font-sans text-body-md text-text-secondary leading-relaxed space-y-6">
          <p>Last updated: June 2025</p>
          <p>By accessing and using the Dirty website, you accept and agree to be bound by these Terms of Service.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">Services</h2>
          <p>Dirty provides handcrafted dirty soda beverages at pop-up locations and private events in San Luis Obispo, California. We do not offer online ordering or delivery.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">Event Bookings</h2>
          <p>All event bookings require a 25% deposit at the time of scheduling. This deposit is refundable until one week before your event. The remaining balance is due after the event.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">Loyalty Program</h2>
          <p>Our Buy 8 Get 9th Free loyalty program is subject to change at any time. Lost loyalty cards cannot be replaced or credited.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at <a href="https://instagram.com/drinking.dirty" className="text-coral hover:underline">@drinking.dirty</a> on Instagram.</p>
        </div>
        <div className="mt-12">
          <Link href="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
