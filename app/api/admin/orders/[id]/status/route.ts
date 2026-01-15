import { NextRequest, NextResponse } from 'next/server'
import { updateOrderReportStatus } from '@/lib/database'
import { validateToken } from '@/lib/auth'

const ALLOWED_STATUSES = ['pending', 'processing', 'completed', 'cancelled', 'refunded']

export async function PUT(request: NextRequest, context: any) {
  try {
    const { params } = (context as any) || {}
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !(await validateToken(token))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const id = Number(params?.id)
    const body = await request.json()
    const { reportStatus, reportUrl } = body
    if (!reportStatus) {
      return NextResponse.json({ success: false, error: 'reportStatus is required' }, { status: 400 })
    }
    if (!ALLOWED_STATUSES.includes(reportStatus)) {
      return NextResponse.json({ success: false, error: 'Invalid reportStatus' }, { status: 400 })
    }
    const updated = await updateOrderReportStatus(id, reportStatus as any, reportUrl || undefined)
    console.log(`Order ${id} report status updated to ${reportStatus}`)
    return NextResponse.json({ success: true, order: updated })
  } catch (err: any) {
    console.error('Failed to update order status:', err)
    const msg = (process.env.NODE_ENV !== 'production') ? (err?.message || String(err)) : 'Failed to update order'
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
} 
