"use client"

import React from 'react'

const packages = [
  { key: 'basic', name: 'Basic Plan' },
  { key: 'standard', name: 'Standard Plan' },
  { key: 'premium', name: 'Premium Plan' },
]

export default function SubscribeButtons() {
  const createLinkAndOpen = async (pkgKey: string) => {
    try {
      const res = await fetch('/api/payments/paddle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageKey: pkgKey }),
      })
      const data = await res.json()
      if (!res.ok || !data.checkout_url) {
        console.error('Failed to create Paddle checkout link', data)
        alert('Failed to start checkout. Check console for details.')
        return
      }
      window.open(data.checkout_url, '_blank')
    } catch (err) {
      console.error('Error creating Paddle checkout link', err)
      alert('Failed to start checkout. Check console for details.')
    }
  }

  return (
    <div className="flex gap-3">
      {packages.map((pkg) => (
        <button
          key={pkg.key}
          onClick={() => createLinkAndOpen(pkg.key)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Subscribe to {pkg.name}
        </button>
      ))}
    </div>
  )
}
