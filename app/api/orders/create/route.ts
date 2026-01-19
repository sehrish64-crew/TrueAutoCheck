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

    console.log('\n📝 Creating order with data:', { 
      customer_email, 
      vehicle_type, 
      package_type,
      amount,
      currency 
    })

    if (!customer_email || !vehicle_type || !identification_type || !identification_value || !package_type || !amount) {
      console.error('❌ Missing required fields:', { 
        customer_email: !!customer_email,
        vehicle_type: !!vehicle_type,
        identification_type: !!identification_type,
        identification_value: !!identification_value,
        package_type: !!package_type,
        amount: !!amount,
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('✓ All required fields present, inserting order...')
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

    console.log('✅ Order created successfully:', { orderId: order.id, orderNumber: order.order_number })

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
          console.warn('⚠️ Order email notification failed (non-critical):', bothResp.status)
        } else {
          console.log('✓ Order emails sent successfully')
        }
      } catch (e) {
        const text = await bothResp.text().catch(() => null)
        console.warn('⚠️ Failed to parse send-email response (non-critical):', bothResp.status)
      }
    } catch (err) {
      console.warn('⚠️ Error sending order emails (non-critical):', err instanceof Error ? err.message : String(err))
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('❌ Error creating order:', errorMsg)
    console.error('Full error:', error)
    return NextResponse.json(
      { error: 'Failed to create order: ' + errorMsg },
      { status: 500 }
    )
  }
}
