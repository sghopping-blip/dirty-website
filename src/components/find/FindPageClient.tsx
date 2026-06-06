'use client'
import { useState } from 'react'
import PreOrderModal from './PreOrderModal'
import type { DirtyEvent } from '@/types/events'

interface EventWithPreOrder extends DirtyEvent {
  preOrderEnabled: boolean
}

function formatDate(dateStr: string): { weekday: string; month: string; day: string } {
  const date = new Date(dateStr + 'T12:00:00')
  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    month: date.toLocaleDateString('en-US', { month: 'long' }),
    day: date.getDate().toString(),
  }
}

const eventTypeLabels: Record<string, string> = {
  'farmers-market': 'Farmers Market',
  'slo-ranch': 'SLO Ranch',
  'cal-poly': 'Cal Poly',
  'pop-up': 'Pop-Up',
  'private': 'Private Event',
}

export default function FindPageClient({ events }: { events: EventWithPreOrder[] }) {
  const [activeEvent, setActiveEvent] = useState<EventWithPreOrder | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {events.map((event) => {
          const { weekday, month, day } = formatDate(event.date)
          return (
            <div key={event.id} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <p className="text-label text-coral mb-4">
                {event.isRecurring && event.recurringLabel ? event.recurringLabel : eventTypeLabels[event.type]}
              </p>
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display text-[4rem] leading-none text-espresso">{day}</span>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold text-text-secondary tracking-widest uppercase">{weekday}</span>
                  <span className="font-sans text-sm font-semibold text-text-secondary tracking-widest uppercase">{month}</span>
                </div>
              </div>
              <div className="h-px bg-blush-dark mb-5" />
              <h3 className="font-display text-[1.5rem] text-espresso mb-1">{event.locationName}</h3>
              <p className="font-sans text-sm text-text-secondary mb-1">{event.address}</p>
              <p className="font-sans text-sm text-coral font-semibold mb-6">{event.startTime} – {event.endTime}</p>
              <div className="flex gap-3 mt-auto">
                {event.preOrderEnabled && (
                  <button onClick={() => setActiveEvent(event)} className="btn-coral flex-1 text-center">
                    Pre-Order
                  </button>
                )}
                <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-center">
                  Directions
                </a>
              </div>
            </div>
          )
        })}
      </div>
      {activeEvent && (
        <PreOrderModal
          isOpen={!!activeEvent}
          onClose={() => setActiveEvent(null)}
          eventId={activeEvent.id}
          eventTitle={activeEvent.title}
          eventDate={activeEvent.date}
          startTime={activeEvent.startTime}
          endTime={activeEvent.endTime}
        />
      )}
    </>
  )
}
