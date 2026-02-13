import { getOrderById, getOrderByNumber } from '@/lib/database'
import CheckoutClient from '@/components/CheckoutClient'

export default async function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  // In Next.js 13+, params is now a Promise
  const resolvedParams = await params
  const rawId = resolvedParams?.orderId

  // Support numeric ids or order_number strings
  let order = null
  const numeric = Number(rawId)
  if (!isNaN(numeric)) {
    order = await getOrderById(numeric)
  } else if (typeof rawId === 'string') {
    // fallback: try by order number via db util
    order = await getOrderByNumber(rawId)
  }

  if (!order) {
    // Attempted lookups for debugging
    const numericVal = isNaN(numeric) ? null : numeric
    let byId = null
    let byNumber = null
    try {
      if (numericVal !== null) byId = await getOrderById(numericVal)
    } catch (e) {
      // ignore
    }
    try {
      const { getOrderByNumber } = await import('@/lib/database')
      byNumber = await getOrderByNumber(rawId)
    } catch (e) {
      // ignore
    }

    return (
      <div className="p-6">
        <div className="text-red-600 font-semibold mb-2">Order not found</div>
        <div className="mb-2">Tried raw param: <code>{String(rawId)}</code></div>
        <div className="mb-2">Numeric parse: <code>{String(numeric)}</code></div>
        <div className="mb-2">Lookup by numeric id result: <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{JSON.stringify(byId || null, null, 2)}</pre></div>
        <div className="mb-2">Lookup by order number result: <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{JSON.stringify(byNumber || null, null, 2)}</pre></div>
        <div className="text-sm text-gray-600 mt-4">If these are both null, confirm the order exists in your database and that the dev server is connected to the correct DB.</div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout — Order #{order.order_number}</h1>
      <CheckoutClient order={order} />
    </div>
  )
}