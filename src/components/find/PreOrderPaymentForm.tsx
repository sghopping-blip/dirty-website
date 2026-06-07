'use client'

import { useEffect, useRef, useState } from 'react'

interface Drink {
  name: string
  qty: number
  price: number
}

interface PreOrderPaymentFormProps {
  drinks: Drink[]
  eventTitle: string
  eventDate: string
  pickupTime: string
  customerName: string
  customerEmail: string
  customerPhone: string
  onSuccess: (paymentId: string) => void
  onBack: () => void
}

const TIP_OPTIONS = [
  { label: 'No tip', value: 0 },
  { label: '10%', value: 0.10 },
  { label: '15%', value: 0.15 },
  { label: '20%', value: 0.20 },
]

declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<{
        card: () => Promise<{
          attach: (selector: string) => Promise<void>
          tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>
        }>
      }>
    }
  }
}

export default function PreOrderPaymentForm({
  drinks,
  eventTitle,
  eventDate,
  pickupTime,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onBack,
}: PreOrderPaymentFormProps) {
  const [tipOption, setTipOption] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [squareReady, setSquareReady] = useState(false)
  const cardRef = useRef<{ tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }> } | null>(null)

  const subtotal = drinks.reduce((s, d) => s + d.price * d.qty, 0)
  const tipAmount = subtotal * tipOption
  const total = subtotal + tipAmount

  const appId      = process.env.NEXT_PUBLIC_SQUARE_APP_ID || ''
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ''

  // Load Square Web Payments SDK
  useEffect(() => {
    if (!appId || !locationId) return

    const script = document.createElement('script')
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js' // swap to production URL when live
    script.onload = async () => {
      if (!window.Square) return
      try {
        const payments = await window.Square.payments(appId, locationId)
        const card = await payments.card()
        await card.attach('#square-card-container')
        cardRef.current = card
        setSquareReady(true)
      } catch (e) {
        console.error('Square init error:', e)
        setError('Payment form failed to load. Please refresh and try again.')
      }
    }
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [appId, locationId])

  async function handlePay() {
    if (!cardRef.current) return
    setLoading(true)
    setError('')

    try {
      // Tokenize the card
      const result = await cardRef.current.tokenize()
      if (result.status !== 'OK' || !result.token) {
        setError(result.errors?.[0]?.message || 'Card tokenization failed.')
        setLoading(false)
        return
      }

      const idempotencyKey = `dirty-${customerEmail}-${Date.now()}`

      // Create order
      const orderRes = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal, idempotencyKey }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) { setError(orderData.error || 'Order failed.'); setLoading(false); return }

      // Complete payment
      const payRes = await fetch('/api/complete-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: result.token,
          orderId: orderData.orderId,
          amount: subtotal,
          tip: tipAmount,
          customerName,
          customerEmail,
          customerPhone,
          eventTitle,
          eventDate,
          pickupTime,
          drinks,
          idempotencyKey,
        }),
      })
      const payData = await payRes.json()
      if (!payRes.ok) { setError(payData.error || 'Payment failed.'); setLoading(false); return }

      onSuccess(payData.paymentId)
    } catch (e) {
      console.error('Payment error:', e)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // If Square keys not configured, show a placeholder
  if (!appId || !locationId) {
    return (
      <div className="p-6 bg-blush rounded-xl text-center">
        <p className="font-display-italic text-display-sm text-espresso mb-2">Payment Coming Soon</p>
        <p className="font-sans text-sm text-text-secondary">
          Online payment will be available shortly. Pre-orders are currently confirmed without payment.
        </p>
        <button onClick={onBack} className="mt-4 btn-ghost">Go Back</button>
      </div>
    )
  }

  return (
    <div>
      {/* Order summary */}
      <div className="bg-blush rounded-xl p-5 mb-6">
        <p className="text-label text-coral mb-3">Order Summary</p>
        {drinks.map((d) => (
          <div key={d.name} className="flex justify-between font-sans text-sm text-espresso mb-1">
            <span>{d.qty}× {d.name}</span>
            <span>${(d.price * d.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="h-px bg-blush-dark my-3" />
        <div className="flex justify-between font-sans text-sm text-espresso mb-1">
          <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
        </div>
        {tipAmount > 0 && (
          <div className="flex justify-between font-sans text-sm text-espresso mb-1">
            <span>Tip</span><span>${tipAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-display-italic text-[1.1rem] text-espresso mt-2">
          <span>Total</span><span className="text-coral">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Tip selector */}
      <div className="mb-6">
        <p className="font-sans text-xs font-bold tracking-widest uppercase text-text-secondary mb-3">Add a Tip</p>
        <div className="grid grid-cols-4 gap-2">
          {TIP_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTipOption(t.value)}
              className={`rounded-pill py-2 font-sans text-sm font-medium transition-all duration-200 ${
                tipOption === t.value
                  ? 'bg-coral text-cream'
                  : 'bg-blush text-espresso hover:bg-blush-dark'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Square card form */}
      <div className="mb-6">
        <p className="font-sans text-xs font-bold tracking-widest uppercase text-text-secondary mb-3">Card Details</p>
        <div
          id="square-card-container"
          className="rounded-xl border border-blush-dark overflow-hidden"
          style={{ minHeight: '89px' }}
        />
        {!squareReady && (
          <p className="font-sans text-xs text-text-secondary mt-2 text-center">Loading payment form...</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <p className="font-sans text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={loading || !squareReady}
        className="btn-coral w-full text-center mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>

      <button
        onClick={onBack}
        className="w-full text-center font-sans text-sm text-text-secondary hover:text-espresso transition-colors"
      >
        ← Back to order
      </button>

      <p className="font-sans text-xs text-text-secondary text-center mt-4">
        Secured by Square. Your card info is never stored on our servers.
      </p>
    </div>
  )
}
