'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generatePickupWindows, menuOptions, baseOptions, syrupOptions, creamerOptions } from '@/data/preorder'
import type { DrinkOrder } from '@/types/preorder'

interface PreOrderModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: string
  eventTitle: string
  eventDate: string
  startTime: string
  endTime: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

const emptyDrink = (): DrinkOrder => ({
  type: 'menu',
  menuItem: '',
  base: '',
  syrups: [],
  creamer: 'None',
  notes: '',
})

export default function PreOrderModal({
  isOpen, onClose, eventId, eventTitle, eventDate, startTime, endTime
}: PreOrderModalProps) {
  const [state, setState] = useState<FormState>('idle')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [pickupWindow, setPickupWindow] = useState('')
  const [drinks, setDrinks] = useState<DrinkOrder[]>([emptyDrink()])

  const windows = generatePickupWindows(startTime, endTime)

  function addDrink() {
    if (drinks.length < 3) setDrinks([...drinks, emptyDrink()])
  }

  function removeDrink(i: number) {
    setDrinks(drinks.filter((_, idx) => idx !== i))
  }

  function updateDrink(i: number, updates: Partial<DrinkOrder>) {
    setDrinks(drinks.map((d, idx) => idx === i ? { ...d, ...updates } : d))
  }

  function toggleSyrup(drinkIndex: number, syrup: string) {
    const drink = drinks[drinkIndex]
    const current = drinks[drinkIndex]?.syrups ?? []
    if (current.includes(syrup)) {
      updateDrink(drinkIndex, { syrups: current.filter(s => s !== syrup) })
    } else if (current.length < 4) {
      updateDrink(drinkIndex, { syrups: [...current, syrup] })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')

    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId, eventTitle, eventDate,
          pickupWindow, customerName, customerEmail, drinks,
        }),
      })
      if (res.ok) setState('success')
      else setState('error')
    } catch {
      setState('error')
    }
  }

  const inputClass = "h-[48px] w-full rounded-lg border border-blush-dark bg-white px-4 font-sans text-base text-espresso placeholder:text-text-tertiary focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors"
  const selectClass = "h-[48px] w-full rounded-lg border border-blush-dark bg-white px-4 font-sans text-base text-espresso focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 transition-colors appearance-none"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-espresso/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-[160] mx-auto max-w-[640px] overflow-y-auto rounded-2xl bg-cream shadow-deep"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-label text-coral mb-1">Pre-Order</p>
                  <h2 className="font-display text-display-sm text-espresso">{eventTitle}</h2>
                  <p className="font-sans text-sm text-text-secondary mt-1">{eventDate}</p>
                </div>
                <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush transition-colors">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="#2C1A12" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {state === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-coral/10 mb-6">
                    <span className="text-3xl text-coral">✓</span>
                  </div>
                  <h3 className="font-display-italic text-display-sm text-espresso mb-3">Order received!</h3>
                  <p className="font-sans text-body-md text-text-secondary mb-2">
                    Check your email for your confirmation.
                  </p>
                  <p className="font-sans text-body-md text-text-secondary mb-8">
                    Your pickup window: <strong>{pickupWindow}</strong>
                  </p>
                  <button onClick={onClose} className="btn-coral">Done</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-label text-text-secondary">Your Name</label>
                      <input
                        type="text" required placeholder="First name"
                        value={customerName} onChange={e => setCustomerName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label text-text-secondary">Email</label>
                      <input
                        type="email" required placeholder="for confirmation"
                        value={customerEmail} onChange={e => setCustomerEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Pickup Window */}
                  <div className="flex flex-col gap-2">
                    <label className="text-label text-text-secondary">Pickup Window</label>
                    <select
                      required value={pickupWindow}
                      onChange={e => setPickupWindow(e.target.value)}
                      className={selectClass}
                    >
                      <option value="">Select a time</option>
                      {windows.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>

                  {/* Drinks */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <label className="text-label text-text-secondary">Your Drinks (max 3)</label>
                      {drinks.length < 3 && (
                        <button type="button" onClick={addDrink}
                          className="font-sans text-sm text-coral hover:underline">
                          + Add drink
                        </button>
                      )}
                    </div>

                    {drinks.map((drink, i) => (
                      <div key={i} className="rounded-xl border border-blush-dark bg-white p-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <p className="font-sans font-medium text-espresso">Drink {i + 1}</p>
                          {drinks.length > 1 && (
                            <button type="button" onClick={() => removeDrink(i)}
                              className="font-sans text-sm text-text-secondary hover:text-coral">
                              Remove
                            </button>
                          )}
                        </div>

                        {/* Menu or Custom toggle */}
                        <div className="flex gap-3">
                          <button type="button"
                            onClick={() => updateDrink(i, { type: 'menu' })}
                            className={`flex-1 rounded-pill py-2 font-sans text-sm font-medium transition-all ${drink.type === 'menu' ? 'bg-coral text-cream' : 'border border-blush-dark text-text-secondary'}`}>
                            From Menu
                          </button>
                          <button type="button"
                            onClick={() => updateDrink(i, { type: 'custom' })}
                            className={`flex-1 rounded-pill py-2 font-sans text-sm font-medium transition-all ${drink.type === 'custom' ? 'bg-coral text-cream' : 'border border-blush-dark text-text-secondary'}`}>
                            Build My Own
                          </button>
                        </div>

                        {drink.type === 'menu' ? (
                          <select
                            required value={drink.menuItem}
                            onChange={e => updateDrink(i, { menuItem: e.target.value })}
                            className={selectClass}
                          >
                            <option value="">Select a drink</option>
                            {menuOptions.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {/* Base */}
                            <div className="flex flex-col gap-2">
                              <label className="text-label text-text-secondary">Base</label>
                              <select
                                required value={drink.base}
                                onChange={e => updateDrink(i, { base: e.target.value })}
                                className={selectClass}
                              >
                                <option value="">Select a base</option>
                                {baseOptions.map(b => <option key={b} value={b}>{b}</option>)}
                              </select>
                            </div>

                            {/* Syrups */}
                            <div className="flex flex-col gap-2">
                              <label className="text-label text-text-secondary">
                                Syrups <span className="text-text-tertiary normal-case font-normal">(up to 4)</span>
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {syrupOptions.map(s => {
                                  const selected = drink.syrups?.includes(s)
                                  const maxed = (drink.syrups?.length ?? 0) >= 4 && !selected
                                  return (
                                    <button
                                      key={s} type="button"
                                      disabled={maxed}
                                      onClick={() => toggleSyrup(i, s)}
                                      className={`rounded-pill px-3 py-1 font-sans text-xs transition-all ${selected ? 'bg-coral text-cream' : 'border border-blush-dark text-text-secondary'} ${maxed ? 'opacity-40 cursor-not-allowed' : 'hover:border-coral'}`}
                                    >
                                      {s}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Creamer */}
                            <div className="flex flex-col gap-2">
                              <label className="text-label text-text-secondary">Creamer</label>
                              <select
                                value={drink.creamer}
                                onChange={e => updateDrink(i, { creamer: e.target.value })}
                                className={selectClass}
                              >
                                {creamerOptions.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        <div className="flex flex-col gap-2">
                          <label className="text-label text-text-secondary">
                            Special requests <span className="text-text-tertiary normal-case font-normal">(optional)</span>
                          </label>
                          <input
                            type="text" placeholder="e.g. light ice, extra sweet"
                            value={drink.notes}
                            onChange={e => updateDrink(i, { notes: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {state === 'error' && (
                    <p className="font-sans text-sm text-coral">Something went wrong. Please try again or DM us on Instagram.</p>
                  )}

                  <button type="submit" disabled={state === 'loading'}
                    className="btn-coral w-full disabled:opacity-60 disabled:cursor-not-allowed">
                    {state === 'loading' ? 'Placing Order...' : 'Place My Pre-Order'}
                  </button>

                  <p className="font-sans text-caption text-text-tertiary text-center">
                    Pay in person at pickup. Orders close 1 hour before the event ends.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
