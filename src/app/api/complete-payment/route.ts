import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, FROM_EMAIL, OWNER_EMAIL } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const {
      sourceId,        // Square payment token from frontend
      orderId,         // Square order ID from create-payment
      amount,          // total in dollars
      tip,             // tip in dollars
      customerName,
      customerEmail,
      customerPhone,
      eventTitle,
      eventDate,
      pickupTime,
      drinks,
      idempotencyKey,
    } = await req.json()

    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    const locationId  = process.env.SQUARE_LOCATION_ID

    if (!accessToken || !locationId) {
      return NextResponse.json({ error: 'Square not configured' }, { status: 503 })
    }

    const totalCents = Math.round((amount + (tip || 0)) * 100)

    // Complete the payment
    const paymentRes = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-01-18',
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey + '-pay',
        source_id: sourceId,
        amount_money: {
          amount: totalCents,
          currency: 'USD',
        },
        order_id: orderId,
        location_id: locationId,
        buyer_email_address: customerEmail,
        note: `Dirty Pre-Order — ${eventTitle} — ${pickupTime}`,
      }),
    })

    const paymentData = await paymentRes.json()

    if (!paymentRes.ok) {
      console.error('Square payment error:', paymentData)
      return NextResponse.json(
        { error: paymentData.errors?.[0]?.detail || 'Payment failed' },
        { status: 400 }
      )
    }

    const paymentId = paymentData.payment.id
    const drinkList = drinks.map((d: { name: string; qty: number }) => `${d.qty}x ${d.name}`).join(', ')
    const tipLine   = tip > 0 ? `<p><strong>Tip:</strong> $${tip.toFixed(2)}</p>` : ''

    // Send confirmation to customer
    await sendEmail({
      to: customerEmail,
      subject: `Your Dirty pre-order is confirmed — ${eventTitle}`,
      html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#FAF7F2;padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
          <div style="background:#E8523A;padding:28px 32px;">
            <p style="font-family:Georgia,serif;font-style:italic;font-size:28px;color:#FAF7F2;margin:0;">Dirty.</p>
          </div>
          <div style="padding:32px;">
            <h2 style="font-family:Georgia,serif;font-style:italic;color:#2C1A12;margin:0 0 16px;">You're locked in.</h2>
            <p style="color:#6B5248;line-height:1.7;">Hi ${customerName} — your pre-order is confirmed and paid. See you at ${pickupTime}.</p>
            <div style="background:#FAF7F2;border-radius:12px;padding:20px;margin:20px 0;">
              <p><strong>Event:</strong> ${eventTitle}</p>
              <p><strong>Date:</strong> ${eventDate}</p>
              <p><strong>Pickup:</strong> ${pickupTime}</p>
              <p><strong>Drinks:</strong> ${drinkList}</p>
              <p><strong>Total paid:</strong> $${amount.toFixed(2)}</p>
              ${tipLine}
              <p style="color:#A8916A;font-size:12px;margin-top:8px;">Payment ID: ${paymentId}</p>
            </div>
            <p style="color:#6B5248;font-size:13px;">Questions? Reply to this email or find us on Instagram @drinking.dirty</p>
          </div>
          <div style="background:#2C1A12;padding:20px 32px;text-align:center;">
            <p style="font-family:Georgia,serif;font-style:italic;color:#FAF7F2;margin:0;">Never Tasted This Good.</p>
          </div>
        </div>
      </body></html>`,
    })

    // Notify owner
    await sendEmail({
      to: OWNER_EMAIL,
      subject: `New paid pre-order — ${customerName} — ${eventTitle}`,
      html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:32px;">
        <h2>New Paid Pre-Order</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
        <p><strong>Event:</strong> ${eventTitle} — ${eventDate}</p>
        <p><strong>Pickup:</strong> ${pickupTime}</p>
        <p><strong>Drinks:</strong> ${drinkList}</p>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Tip:</strong> $${(tip || 0).toFixed(2)}</p>
        <p><strong>Total:</strong> $${(amount + (tip || 0)).toFixed(2)}</p>
        <p><strong>Square Payment ID:</strong> ${paymentId}</p>
      </body></html>`,
    })

    return NextResponse.json({ success: true, paymentId })
  } catch (err) {
    console.error('complete-payment error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
