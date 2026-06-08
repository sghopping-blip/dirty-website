'use client'

import { useState, useEffect } from 'react'

export default function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('dirty_popup_dismissed')
    if (dismissed) return

    function show() {
      setVisible(true)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(fallback)
    }

    function onScroll() {
      if (window.scrollY > 100) show()
    }

    // Show on scroll OR after 8 seconds, whichever comes first
    const fallback = setTimeout(show, 8000)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(fallback)
    }
  }, [])

  function dismiss() {
    localStorage.setItem('dirty_popup_dismissed', '1')
    setVisible(false)
  }

  async function handleSubmit() {
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubmitted(true)
      localStorage.setItem('dirty_popup_dismissed', '1')
      setTimeout(() => setVisible(false), 2500)
    } catch {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[500] flex items-end justify-center md:items-center px-4 pb-6 md:pb-0">
      <div
        className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[420px] bg-coral rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-cream hover:bg-white/30 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="px-8 py-8">
          {!submitted ? (
            <>
              <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-cream/70 mb-3">
                ✦ &nbsp; Never Miss a Drop &nbsp; ✦
              </p>
              <h2 className="font-display-italic text-[2rem] leading-tight text-cream mb-3">
                Get Dirty before everyone else.
              </h2>
              <p className="font-sans text-sm text-cream/80 mb-6 leading-relaxed">
                New pop-up locations every Monday. Seasonal drops before they sell out. Be first in line.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="your@email.com"
                  className="flex-1 rounded-pill px-4 py-3 font-sans text-sm text-espresso bg-white outline-none placeholder:text-espresso/40"
                  autoComplete="email"
                  inputMode="email"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="shrink-0 rounded-pill px-5 py-3 font-sans text-sm font-bold bg-espresso text-cream hover:bg-[#3D2318] transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : "I'm In"}
                </button>
              </div>
              <button
                onClick={dismiss}
                className="block w-full text-center font-sans text-xs text-cream/50 mt-4 hover:text-cream transition-colors"
              >
                No thanks
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-2xl mb-3">✦</p>
              <h3 className="font-display-italic text-[1.8rem] text-cream mb-2">You&apos;re in.</h3>
              <p className="font-sans text-sm text-cream/80">First location drop coming Monday.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
