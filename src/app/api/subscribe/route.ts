import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    }

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.OWNER_EMAIL!,
      subject: `New Email Subscriber — ${email}`,
      html: `
        <h2>New Location Drop Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Add this person to your weekly location drop list.</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
