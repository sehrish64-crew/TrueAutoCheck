import { NextRequest, NextResponse } from 'next/server'
import { insertOrder } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customer_email,
      vehicle_type,
      identification_type,
      identification_value,
      vin_number,
      package_type,
      country_code,
      currency,
      amount,
      paymentProvider,
    } = body

    if (!customer_email || !vehicle_type || !identification_type || !identification_value || !package_type || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await insertOrder({
      customer_email,
      vehicle_type,
      identification_type,
      identification_value,
      vin_number: vin_number || null,
      package_type,
      country_code: country_code || 'US',
      currency: currency || 'USD',
      amount,
      payment_provider: paymentProvider || undefined,
    })

    // Notify admin about the new order (payment pending) and send confirmation to customer
    try {
      const bothResp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'order_both',
          orderId: order.id,
          orderNumber: order.order_number,
          customerEmail: customer_email,
          vehicleType: vehicle_type,
          identificationType: identification_type,
          identificationValue: identification_value || vin_number || null,
          packageType: package_type,
          amount: parseFloat(amount),
          currency: currency || 'USD',
          paymentStatus: 'pending',
        }),
      })

      try {
        const bothJson = await bothResp.json()
        if (!bothResp.ok || bothJson?.success === false) {
          console.error('Order email (both) failed:', bothResp.status, bothJson)
        }
      } catch (e) {
        const text = await bothResp.text().catch(() => null)
        console.error('Failed to parse send-email response for order_both:', bothResp.status, text)
      }
    } catch (err) {
      console.error('Error while sending new order notification/confirmation emails:', err)
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
