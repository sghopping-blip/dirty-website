import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'USD', idempotencyKey } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    const locationId  = process.env.SQUARE_LOCATION_ID

    if (!accessToken || !locationId) {
      return NextResponse.json({ error: 'Square not configured' }, { status: 503 })
    }

    // Create a Square payment link / order
    const response = await fetch('https://connect.squareup.com/v2/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-01-18',
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        order: {
          location_id: locationId,
          line_items: [
            {
              name: 'Dirty Soda Pre-Order',
              quantity: '1',
              base_price_money: {
                amount: Math.round(amount * 100), // cents
                currency,
              },
            },
          ],
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Square order error:', data)
      return NextResponse.json({ error: data.errors?.[0]?.detail || 'Order creation failed' }, { status: 400 })
    }

    return NextResponse.json({ orderId: data.order.id })
  } catch (err) {
    console.error('create-payment error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
