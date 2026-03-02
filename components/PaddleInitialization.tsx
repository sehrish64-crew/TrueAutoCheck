'use client'

import Script from 'next/script'

export default function PaddleInitialization() {
  const env = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox'
  const isLive = env === 'production' || env === 'live'
  
  const token = isLive 
    ? process.env.NEXT_PUBLIC_LIVE_PADDLE_CLIENT_TOKEN 
    : (process.env.NEXT_PUBLIC_PADDLE_BILLING_TOKEN || process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN)

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as any
        if (w.PADDLE_INITIALIZED) return;
        if (w.Paddle && token) {
          console.log('[Paddle] Global Initialization with token:', token.substring(0, 10) + '...')
          
          if (w.Paddle.Environment) {
            const env = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox'
            w.Paddle.Environment.set(env === 'production' || env === 'live' ? 'production' : 'sandbox');
          }

          w.Paddle.Initialize({ 
            token: token.trim()
          })

          w.PADDLE_INITIALIZED = true;
          console.log('[Paddle] Initialization complete');
        }
      }}
    />
  )
}
