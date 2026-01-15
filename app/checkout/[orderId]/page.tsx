"use client"

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from '@/lib/translations'
import { parseJsonSafe } from '@/lib/utils'
import { getPrice, formatCurrency } from '@/lib/prices'

export default function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params)
  const [order, setOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslations()
  const router = useRouter()

  // Client-side validation: if the orderId is not a number, show a clear message immediately
  const numericOrderId = Number(orderId)
  if (isNaN(numericOrderId)) {
    return <div className="p-6 text-red-600">Invalid order ID</div>
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/orders/${orderId}`)
        const data = await parseJsonSafe(res)
        if (!res.ok) throw new Error(data?.error || 'Failed to fetch order')
        setOrder(data.order)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [orderId])

  const pollForCompletion = async () => {
    try {
      for (let i = 0; i < 20; i++) {
        await new Promise((r) => setTimeout(r, 3000))
        const r = await fetch(`/api/orders/${orderId}`)
        const j = await r.json()
        if (r.ok && j?.order?.status === 'completed') {
          // Payment completed — redirect to success (or show message)
          router.push(`/order/${orderId}/success`)
          return
        }
      }
    } catch (err) {
      console.error('Poll for completion failed', err)
    }
  }

  const startPaddle = async () => {
    if (!order) return
    try {
      setProcessing(true)

      // Fire off admin + customer emails immediately when user continues to payment.
      // Do not block payment flow if email sending fails.
      const sendOrderEmails = async () => {
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'order_both',
              orderId: order.id,
              orderNumber: order.order_number,
              customerEmail: order.customer_email,
              vehicleType: order.vehicle_type,
              identificationType: order.identification_type,
              identificationValue: order.identification_value || order.vin_number || null,
              packageType: order.package_type,
              amount: parseFloat(order.amount),
              currency: order.currency,
              paymentStatus: order.payment_status || 'pending',
            }),
          })
        } catch (emailErr) {
          console.error('Failed to send order emails on payment start:', emailErr)
        }
      }
      // fire-and-forget
      void sendOrderEmails()

      const resp = await fetch('/api/payments/paddle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          productName: order.package_type || 'Vehicle Report',
        }),
      })
      const data = await parseJsonSafe(resp)
      if (!resp.ok || !data.checkout_url) throw new Error(data?.error || 'Failed to create checkout')
      window.open(data.checkout_url, '_blank')
      pollForCompletion()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start payment')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) return <div className="p-6">Loading…</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!order) return <div className="p-6">Order not found</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout — Order #{order.order_number}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Package</h2>
          <div className="text-lg font-bold mb-3">{order.package_type}</div>
          <div className="text-sm text-gray-600">{formatCurrency(order.amount, order.currency)}</div>

          <h3 className="mt-4 font-semibold">Vehicle</h3>
          <div className="text-sm text-gray-700">{order.identification_type.toUpperCase()}: {order.identification_value}</div>

          <h3 className="mt-4 font-semibold">Email</h3>
          <div className="text-sm text-gray-700">{order.customer_email}</div>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Payment</h2>
          <div className="mb-4">
            <div className="text-sm text-gray-600">Amount</div>
            <div className="text-xl font-bold">{formatCurrency(order.amount, order.currency)}</div>
          </div>

          <div className="space-y-3">
            <button onClick={startPaddle} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold" disabled={processing}>Pay with Paddle</button>
          </div>

          <p className="text-xs text-gray-500 mt-4">After completing payment, this page will detect the payment and redirect you to the order success page.</p>
        </div>
      </div>
    </div>
  )
}