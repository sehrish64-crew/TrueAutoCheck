import { NextRequest, NextResponse } from 'next/server'
import { getOrderById } from '@/lib/database'

export async function GET(request: NextRequest, context: any) {
  try {
    const { params } = (context as any) || {}
    const id = Number(params?.id)
    if (isNaN(id)) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })

    const order = await getOrderById(id)
    if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })

    return NextResponse.json({ success: true, order })
  } catch (err) {
    console.error('Failed to fetch order:', err)
    return NextResponse.json({ success: false, error: 'Failed to fetch order' }, { status: 500 })
  }
} 