"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Search, Eye, Trash , Trash2, CircleCheck as CheckCircle } from 'lucide-react'
import { parseJsonSafe } from '@/lib/utils'
import EditOrderForm from '@/components/admin/EditOrderForm'

import { Order } from '@/types/order'

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    case 'failed':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const getReportStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
    case 'processing':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    case 'failed':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function OrderRow({ order, onStatusChange, onDelete, onView, onEdit }: {
  order: Order
  onStatusChange: (id: number, status: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
  onView: (order: Order) => void
  onEdit: (order: Order) => void
}) {
  const [status, setStatus] = useState(order.status)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setStatus(order.status)
  }, [order.status])


  const handleUpdate = async () => {
    setIsUpdating(true)
    await onStatusChange(order.id, status)
    setIsUpdating(false)
  }

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-white text-gray-900 border-gray-300'
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">{order.order_number}</td>
      <td className="px-4 py-3 whitespace-nowrap">{order.customer_email}</td>
      <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">{order.package_type}</td>
      <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">{order.currency} {order.amount.toFixed(2)}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border min-w-[130px] ${getStatusColor(status)}`}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
          {status !== order.status && (
            <Button size="sm" onClick={handleUpdate} disabled={isUpdating} className="h-8 px-2 text-xs">
              Update
            </Button>
          )}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="text-xs text-gray-500">{formatTimeAgo(order.created_at)}</span>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(order)}>
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(order)}
            className="h-8 px-2 text-xs"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(order.id)}
            className="h-8 px-2 text-xs"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [editOrder, setEditOrder] = useState<Order | null>(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)


  // Filters
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)
  const [currencyFilter, setCurrencyFilter] = useState<string | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = orders.filter(order =>
        order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.vehicle_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.package_type && order.package_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.order_number && order.order_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.vin_number && order.vin_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.identification_value && order.identification_value.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredOrders(filtered)
    } else {
      setFilteredOrders(orders)
    }
  }, [searchQuery, orders])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
      const params = new URLSearchParams()
      if (startDate) params.set('startDate', startDate)
      if (endDate) params.set('endDate', endDate)
      if (statusFilter) params.set('status', statusFilter)
      if (currencyFilter) params.set('currency', currencyFilter)
      if (searchQuery) params.set('q', searchQuery)
      const res = await fetch(`/api/admin/orders?${params.toString()}`, { headers })
      let data: any
      try {
        data = await parseJsonSafe(res)
      } catch (err) {
        console.error('Failed to parse orders response:', err)
        if (res.status === 401) {
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
          return
        }
        throw new Error('Failed to fetch orders (invalid response)')
      }
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
          return
        }
        throw new Error(data.error || 'Failed to fetch orders')
      }
      setOrders(data.orders)
      setFilteredOrders(data.orders) 
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    // Keep a copy of previous state for rollback
    const previousOrders = [...orders]
    // Optimistic update locally so user sees immediate feedback
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o))

    try {
      const token = localStorage.getItem('admin_token')
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
      headers['Content-Type'] = 'application/json'
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ reportStatus: newStatus }),
      })
      let data: any
      try {
        data = await parseJsonSafe(res)
      } catch (err) {
        console.error('Failed to parse status update response:', err)
        if (res.status === 401) {
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
          return
        }
        // Revert and notify
        const { toast } = await import('@/hooks/use-toast')
        const t = (await import('@/hooks/use-toast')).toast
        t({ title: 'Update failed', description: 'Failed to update status (invalid response)', variant: 'destructive' })
        setOrders(previousOrders)
        return
      }
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
          return
        }
        // Show server message if present
        const { toast } = await import('@/hooks/use-toast')
        const t = (await import('@/hooks/use-toast')).toast
        t({ title: 'Update failed', description: data.error || 'Failed to update status', variant: 'destructive' })
        // Revert optimistic update
        setOrders(previousOrders)
        return
      }

      // Success: update the single order locally with the server's returned data
      if (data.order) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, ...data.order } : o))
      }

      // Show confirmation toast
      const { toast } = await import('@/hooks/use-toast')
      const t = (await import('@/hooks/use-toast')).toast
      t({ title: 'Status updated', description: `Order ${orderId} set to ${newStatus}` })

      // Refresh lists and counts in background
      loadOrders().catch((e) => console.warn('Background loadOrders failed after status update', e))
      window.dispatchEvent(new Event('admin:counts:refresh'))
    } catch (error) {
      console.error('Error updating status:', error)
      // Use toast instead of alert for nicer UX
      const { toast } = await import('@/hooks/use-toast')
      const t = (await import('@/hooks/use-toast')).toast
      t({ title: 'Update failed', description: 'Failed to update status', variant: 'destructive' })
      // Revert optimistic update on error
      setOrders(previousOrders)
    }
  }

  const handleDelete = async (orderId: number) => {
    const confirmOk = window.confirm('Delete this order? This action cannot be undone.')
    if (!confirmOk) return

    const previousOrders = [...orders]

    // Validate id before optimistic update
    const numericId = Number(orderId)
    if (isNaN(numericId) || numericId <= 0) {
      console.warn('Attempted to delete order with invalid id:', orderId)
      // Use toast for friendly UX
      const { toast } = await import('@/hooks/use-toast')
      const t = (await import('@/hooks/use-toast')).toast
      t({ title: 'Invalid order id', description: 'Cannot delete order: invalid id', variant: 'destructive' })
      return
    }

    setOrders(orders.filter(o => o.id !== orderId))

    try {
      const token = localStorage.getItem('admin_token')
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}
      const res = await fetch(`/api/admin/orders/${numericId}`, {
        method: 'DELETE',
        headers,
      })
      let data
      try {
        data = await parseJsonSafe(res)
      } catch (err) {
        console.error('Failed to parse delete order response:', err)
        if (res.status === 401) {
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
          return
        }
        // Show a friendly toast and revert optimistic update
        const { toast } = await import('@/hooks/use-toast')
        const t = (await import('@/hooks/use-toast')).toast
        t({ title: 'Delete failed', description: 'Failed to delete order (invalid response)', variant: 'destructive' })
        setOrders(previousOrders)
        return
      }
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
          return
        }
        // Show server message if present
        const { toast } = await import('@/hooks/use-toast')
        const t = (await import('@/hooks/use-toast')).toast
        t({ title: 'Delete failed', description: data.error || 'Failed to delete order', variant: 'destructive' })
        // Revert optimistic update
        setOrders(previousOrders)
        return
      }
      await loadOrders()
      window.dispatchEvent(new Event('admin:counts:refresh'))
    } catch (error) {
      console.error('Error deleting order:', error)
      // Use toast instead of alert for nicer UX
      const { toast } = await import('@/hooks/use-toast')
      const t = (await import('@/hooks/use-toast')).toast
      t({ title: 'Delete failed', description: 'Failed to delete order', variant: 'destructive' })
      // Revert optimistic update on error
      setOrders(previousOrders)
    }
  }

  // Removed handleMarkAsCompleted - use status select & update button

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600">Manage vehicle report orders and payment status</p>
        </div>
        <div className="flex gap-2">
          <a href="/admin/settings?section=orders" className="inline-block"><button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded">Settings</button></a>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by email, vehicle type, or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input type="date" value={startDate || ''} onChange={(e) => setStartDate(e.target.value || undefined)} className="border rounded-md p-2" />
          <input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value || undefined)} className="border rounded-md p-2" />
          <select value={statusFilter || ''} onChange={(e) => setStatusFilter(e.target.value || undefined)} className="border rounded-md p-2">
            <option value="">Any status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex gap-2">
            <select value={currencyFilter || ''} onChange={(e) => setCurrencyFilter(e.target.value || undefined)} className="border rounded-md p-2">
              <option value="">Any currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <Button onClick={loadOrders} className="h-10">Filter</Button>
          </div>
        </div>
      </Card>

      <Card className="p-4 overflow-x-auto">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No orders found</div>
        ) : (
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">Order #</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">Customer</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">Package</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap hidden sm:table-cell">Package</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">Status</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap hidden md:table-cell">Date Received</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onView={setSelectedOrder}
                  onEdit={setEditOrder}
                />
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {selectedOrder && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[80]"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[90] rounded-2xl shadow-2xl w-[95%] md:w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedOrder.customer_email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Vehicle Type</label>
                    <p className="text-gray-900">{selectedOrder.vehicle_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">VIN Number</label>
                    <p className="text-gray-900 font-mono">{selectedOrder.vin_number || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Package</label>
                    <p className="text-gray-900">{selectedOrder.package_type || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Amount</label>
                    <p className="text-gray-900 font-semibold">
                      {selectedOrder.currency} {selectedOrder.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Country</label>
                    <p className="text-gray-900">{selectedOrder.country_code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Payment Status</label>
                    <div className="mt-1">{getPaymentStatusBadge(selectedOrder.payment_status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Report Status</label>
                    <div className="mt-1">{getReportStatusBadge(selectedOrder.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Created At</label>
                    <p className="text-gray-900">
                      {new Date(selectedOrder.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Last Updated</label>
                    <p className="text-gray-900">
                      {new Date(selectedOrder.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {selectedOrder.payment_id && (
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Payment ID</label>
                    <p className="text-gray-900 font-mono text-sm">{selectedOrder.payment_id}</p>
                  </div>
                )}

                {selectedOrder.report_url && (
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Report URL</label>
                    <a
                      href={selectedOrder.report_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedOrder.report_url}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditOrder(selectedOrder)
                    setSelectedOrder(null)
                  }}
                >
                  Edit Order
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit order modal */}
      {editOrder && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[80]" onClick={() => setEditOrder(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[90] rounded-2xl shadow-2xl w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Order #{editOrder.order_number}</h2>

              <EditOrderForm order={editOrder} onClose={() => setEditOrder(null)} onUpdated={(updatedOrder: Order) => {
                // Update locally and refresh counts
                setOrders(orders.map(o => o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o))
                setEditOrder(null)
                import('@/hooks/use-toast').then(mod => mod.toast({ title: 'Order updated', description: `Order ${updatedOrder.order_number} saved.` }))
                loadOrders().catch((e) => console.warn('Background loadOrders failed after edit update', e))
                window.dispatchEvent(new Event('admin:counts:refresh'))
              }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
