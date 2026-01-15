import { NextRequest, NextResponse } from 'next/server'
// node fetch is not required in modern Node runtimes; use global fetch
import { validateToken } from '@/lib/auth'
import { getOrderById } from '@/lib/database'

// Create a Paddle checkout link using Paddle APIs
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    // Optional: allow unauthenticated create but require validation on complete

    const body = await request.json()
    const { orderId, amount, currency, productName } = body
    if (!orderId || !amount) {
      return NextResponse.json({ success: false, error: 'Missing orderId or amount' }, { status: 400 })
    }

    const order = await getOrderById(Number(orderId))

    // Create a simple checkout via Paddle Vendor API
    const PADDLE_VENDOR_ID = process.env.PADDLE_VENDOR_ID
    const PADDLE_API_KEY = process.env.PADDLE_API_KEY

    if (!PADDLE_VENDOR_ID || !PADDLE_API_KEY) {
      return NextResponse.json({ success: false, error: 'Paddle not configured' }, { status: 500 })
    }

    // Paddle checkout link API (https://developer.paddle.com/api-reference/product-api/products/create_pay_link)
    const payload = new URLSearchParams()
    payload.set('vendor_id', PADDLE_VENDOR_ID)
    payload.set('vendor_auth_code', PADDLE_API_KEY)
    payload.set('title', productName || 'Vehicle Report')
    payload.set('webhook_url', `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/payments/paddle/webhook`)
    payload.set('price', String(amount))
    if (currency) payload.set('currency', currency)
    // Optional: pass through reference so we can map in webhook
    payload.set('custom_message', `order:${orderId}`)

    const resp = await fetch('https://vendors.paddle.com/api/2.0/product/generate_pay_link', {
      method: 'POST',
      body: payload,
    })

    const json = await resp.json()

    if (!resp.ok || json?.success === false) {
      console.error('Paddle pay link error', json)
      return NextResponse.json({ success: false, error: json?.error?.message || 'Failed to create paddle link' }, { status: 500 })
    }

    const checkoutUrl = json?.response?.url

    return NextResponse.json({ success: true, checkout_url: checkoutUrl })
  } catch (err) {
    console.error('Error creating paddle checkout:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
