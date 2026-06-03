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
      <div className="flex flex-col divide-y divide-blush-dark">
        {events.map((event) => {
          const { weekday, month, day } = formatDate(event.date)
          return (
            <div key={event.id} className="group flex flex-col gap-4 py-8 md:flex-row md:items-center hover:bg-blush/30 -mx-6 px-6 rounded-xl transition-colors duration-200">
              {/* Date */}
              <div className="flex items-baseline gap-3 md:w-32 shrink-0">
                <span className="font-display text-[3.5rem] leading-none text-espresso">{day}</span>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-text-secondary tracking-widest uppercase">{weekday.slice(0, 3)}</span>
                  <span className="font-sans text-xs font-semibold text-text-secondary tracking-widest uppercase">{month.slice(0, 3)}</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-16 bg-blush-dark mx-8 shrink-0" />

              {/* Content */}
              <div className="flex-1">
                <p className="text-label text-coral mb-1">
                  {event.isRecurring && event.recurringLabel ? event.recurringLabel : eventTypeLabels[event.type]}
                </p>
                <h3 className="font-sans font-medium text-xl text-espresso">{event.locationName}</h3>
                <p className="font-sans text-sm text-text-secondary mt-1">{event.address}</p>
                <p className="font-sans text-sm text-text-secondary mt-0.5">{event.startTime} – {event.endTime}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 shrink-0">
                {event.preOrderEnabled && (
                  <button
                    onClick={() => setActiveEvent(event)}
                    className="btn-coral text-center"
                  >
                    Pre-Order
                  </button>
                )}
                <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-text-arrow text-sm text-center">
                  Get Directions
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
