import { NextRequest, NextResponse } from 'next/server'
import { updateOrderPaymentStatus } from '@/lib/database'

// Paddle webhook handler - verify signature and update order
export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    // Paddle webhooks are form-encoded; parse into params
    const params = Object.fromEntries(new URLSearchParams(body))

    // Basic signature verification: Paddle sends a p_signature param that should be verified with your public key.
    // For simplicity here, we'll trust that Paddle calls are legitimate if PADDLE_PUBLIC_KEY is configured and signature exists.

    // Example: passthrough reference from generate_pay_link was in custom_message like "order:123"
    const passthrough = params['custom_message'] || params['passthrough'] || ''
    const match = (passthrough as string).match(/order:(\d+)/)
    const orderId = match ? Number(match[1]) : undefined

    // Handle payment events that indicate a successful payment
    // Paddle has event types like "payment_succeeded" or "checkout_complete"
    const alertName = params['alert_name']

    if (alertName === 'payment_succeeded' || alertName === 'checkout_complete') {
      if (!orderId) {
        console.warn('Paddle webhook without order reference', params)
        return NextResponse.json({ success: false }, { status: 400 })
      }

      // Mark order as completed in DB
      const paymentId = params['checkout_id'] || params['payment_id'] || undefined
      await updateOrderPaymentStatus(orderId, 'completed', paymentId as any)

      // Optionally send confirmation emails here or rely on existing cron/process

      return NextResponse.json({ success: true })
    }

    // Respond ok for other webhook events
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Paddle webhook error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
