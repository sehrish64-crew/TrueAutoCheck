/* Client-side helper for initializing Paddle and opening checkout.
   Uses the CDN-loaded window.Paddle if available, otherwise falls back
   to the installed `@paddle/paddle-js` package when running in the browser.

   Note: This module must only be imported/used on the client.
*/
import type { Paddle as PaddleType } from '@paddle/paddle-js';
import * as PaddlePkg from '@paddle/paddle-js';

let paddleInstance: any = null;

function getWindowPaddle(): any {
  if (typeof window === 'undefined') return null;
  return (window as any).Paddle || null;
}

export function initializePaddle(opts?: { token?: string; env?: string }) {
  if (typeof window === 'undefined') return null;

  const env = opts?.env || (process.env.NEXT_PUBLIC_PADDLE_ENV ?? 'sandbox');
  const token = opts?.token ?? process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  const wp = getWindowPaddle();
  if (wp) {
    try {
      if (wp.Environment && typeof wp.Environment.set === 'function') wp.Environment.set(env as any);
      if (token && typeof wp.Setup === 'function') wp.Setup({ token });
      paddleInstance = wp;
      return paddleInstance;
    } catch (err) {
      console.error('initializePaddle (window.Paddle) error:', err);
    }
  }

  // Fallback to the package (works only in the browser)
  try {
    const PaddleCtor: any = (PaddlePkg as any).default || PaddlePkg;
    const inst: PaddleType = new PaddleCtor();
    if (inst.Environment && typeof inst.Environment.set === 'function') inst.Environment.set(env as any);
    if (token && typeof inst.Setup === 'function') inst.Setup({ token });
    paddleInstance = inst;
    return paddleInstance;
  } catch (err) {
    console.warn('initializePaddle: @paddle/paddle-js not usable or failed to init:', err);
    return null;
  }
}

export function openCheckout(opts: { product?: number | string; price?: string; items?: any[]; [k: string]: any }) {
  const inst = paddleInstance || getWindowPaddle();
  if (!inst || !inst.Checkout || typeof inst.Checkout.open !== 'function') {
    throw new Error('Paddle is not initialized or Checkout.open not available');
  }

  // Prefer items if provided (price token flow), otherwise product id
  if (opts.items || opts.price) {
    const payload: any = { ...(opts.items ? { items: opts.items } : { items: [{ price: opts.price }] }) };
    // merge other options
    Object.assign(payload, opts);
    return inst.Checkout.open(payload);
  }

  return inst.Checkout.open(opts);
}

export function getPaddleInstance() {
  return paddleInstance || getWindowPaddle();
}

export default initializePaddle;
