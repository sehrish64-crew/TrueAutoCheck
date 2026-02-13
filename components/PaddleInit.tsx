"use client";
import { useEffect } from "react";
import initializePaddle from '@/lib/paddleCheckout';

export default function PaddleInit(): null {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const tryInit = () => {
      try {
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        const env = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox';
        console.log('PaddleInit: initializing with env=', env, ' tokenExists=', !!token);
        const inst = initializePaddle({ token, env });
        if (!inst) {
          // If the CDN script hasn't loaded yet, retry shortly
          return false;
        }
        console.log('PaddleInit: initialized', !!inst);
        return true;
      } catch (err) {
        console.error('PaddleInit error', err);
        return false;
      }
    };

    let attempts = 0;
    const maxAttempts = 40;
    const handle = setInterval(() => {
      if (cancelled) return;
      attempts++;
      const ok = tryInit();
      if (ok || attempts >= maxAttempts) {
        clearInterval(handle);
        if (!ok) console.error('PaddleInit: failed to initialize after retries');
      }
    }, 250);

    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);

  return null;
}
