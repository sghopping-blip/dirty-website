import Link from 'next/link'
import { getNextEvents } from '@/data/events'

function formatBannerDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function NextEventBanner() {
  const next = getNextEvents(1)[0]
  if (!next) return null

  return (
    <div className="bg-espresso py-3 px-5">
      <div className="container-default flex items-center justify-between gap-4 flex-wrap">
        <p className="font-sans text-sm text-cream/80">
          <span className="text-coral font-semibold">Next up:</span>
          {' '}{next.locationName}
          {' · '}{formatBannerDate(next.date)}
          {' · '}{next.startTime} – {next.endTime}
        </p>
        <Link
          href="/find"
          className="font-sans text-xs font-bold tracking-widest uppercase text-cream/60 hover:text-cream transition-colors whitespace-nowrap"
        >
          Pre-Order →
        </Link>
      </div>
    </div>
  )
}
