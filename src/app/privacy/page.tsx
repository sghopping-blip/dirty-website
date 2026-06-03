import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dirty',
}

export default function PrivacyPage() {
  return (
    <div className="bg-cream pt-40 pb-24">
      <div className="container-narrow">
        <p className="text-label text-sage mb-4">Legal</p>
        <h1 className="font-display-italic text-display-md text-espresso mb-12">Privacy Policy</h1>
        <div className="font-sans text-body-md text-text-secondary leading-relaxed space-y-6">
          <p>Last updated: June 2025</p>
          <p>Dirty ("we", "us", or "our") operates the dirty-website.vercel.app website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out our booking inquiry form or sign up for our email list. This may include your name, email address, phone number, and event details.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">How We Use Your Information</h2>
          <p>We use the information we collect to respond to your booking inquiries, send you our weekly location drops if you've signed up, and communicate with you about our services.</p>
          <h2 className="font-display text-display-sm text-espresso mt-8">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="https://instagram.com/drinking.dirty" className="text-coral hover:underline">@drinking.dirty</a> on Instagram.</p>
        </div>
        <div className="mt-12">
          <Link href="/" className="btn-ghost">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
