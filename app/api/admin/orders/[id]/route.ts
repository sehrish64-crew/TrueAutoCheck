import { NextRequest, NextResponse } from 'next/server'
import { deleteOrder, updateOrderDetails } from '@/lib/database'
import { validateToken } from '@/lib/auth'

export async function DELETE(request: NextRequest, context: any) {
  try {
    const { params } = (context as any) || {}
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !(await validateToken(token))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const id = Number(params?.id)
    if (isNaN(id)) {
      console.warn('Invalid order id received in DELETE:', params?.id)
      return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })
    }

    await deleteOrder(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to delete order:', err)
    return NextResponse.json({ success: false, error: 'Failed to delete order' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, context: any) {
  try {
    const { params } = (context as any) || {}
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !(await validateToken(token))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const id = Number(params?.id)
    if (isNaN(id)) {
      console.warn('Invalid order id received in PATCH:', params?.id)
      return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })
    }

    const body = await request.json()
    // Only allow specific fields to be updated
    const allowed: any = {}
    const keys = ['customer_email','vehicle_type','package_type','vin_number','country_code','currency','amount','report_url','payment_status']
    for (const k of keys) {
      if (Object.prototype.hasOwnProperty.call(body, k)) {
        allowed[k] = body[k]
      }
    }

    const updated = await updateOrderDetails(id, allowed)
    return NextResponse.json({ success: true, order: updated })
  } catch (err) {
    console.error('Failed to update order:', err)
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 })
  }
} 