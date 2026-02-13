"use client";
import React, { useEffect, useState } from "react";
import { openCheckout } from '@/lib/paddleCheckout';

type BuyButtonProps = {
  priceId?: string;
  quantity?: number;
  children?: React.ReactNode;
};

export default function BuyButton({
  priceId = "pri_TEST123",
  quantity = 1,
  children,
}: BuyButtonProps) {
  const [paddleReady, setPaddleReady] = useState(false);

  // Ensure Paddle.Setup is called once on mount
  useEffect(() => {
    const initPaddle = () => {
      const Paddle = (window as any).Paddle;
      if (!Paddle) {
        console.log("⏳ Paddle not yet available, retrying...");
        setTimeout(initPaddle, 250);
        return;
      }

      try {
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        const env = process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox";

        console.log("🎣 Setting up Paddle with environment:", env);

        // Set environment first
        if (Paddle.Environment && typeof Paddle.Environment.set === "function") {
          Paddle.Environment.set(env);
        }

        // Then call Setup with token
        if (typeof Paddle.Setup === "function") {
          Paddle.Setup({ token });
          console.log("✅ Paddle.Setup completed");
          setPaddleReady(true);
        }
      } catch (err) {
        console.error("❌ Paddle setup error:", err);
      }
    };

    initPaddle();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const Paddle = (window as any).Paddle;
    
    console.log("🎯 BuyButton clicked - priceId:", priceId, "quantity:", quantity);
    
    if (!Paddle) {
      console.error("❌ Paddle not defined on window");
      alert("Paddle SDK not loaded. Please refresh the page.");
      return;
    }
    
    if (!paddleReady) {
      console.error("❌ Paddle not yet ready");
      alert("Paddle is still initializing. Please try again.");
      return;
    }
    
    if (!Paddle.Checkout || typeof Paddle.Checkout.open !== "function") {
      console.error("❌ Paddle.Checkout.open not available");
      alert("Paddle Checkout not available. Check client configuration.");
      return;
    }

    // Use shared helper to open checkout
    console.log("🚀 Opening Paddle checkout with:", { priceId, quantity });
    try {
      openCheckout({ items: [{ price: priceId, quantity }], successCallback(data: any) {
        console.log('✅ Paddle success callback:', data);
        try {
          const orderId = data?.order?.id || data?.order_id || data?.checkout_id || data?.transactionId || data?.transaction_id || null;
          if (!orderId) {
            console.warn('Paddle success callback returned no order id', data);
            return;
          }
          void fetch('/api/paddle/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
          }).catch((err) => console.error('Failed to POST paddle transaction to server', err));
        } catch (e) {
          console.error('Error handling Paddle success callback', e);
        }
      }, onError(err: any) {
        console.error('🔴 Paddle Checkout error:', err);
        alert(`Paddle error: ${err?.message || JSON.stringify(err)}`);
      } });
    } catch (e) {
      console.error('🔴 Error opening Paddle Checkout:', e);
      alert(`Failed to open Paddle Checkout: ${e}`);
    }
  };

  return (
    <button type="button" onClick={handleClick} className="paddle-buy-button">
      {children ?? `Buy — ${priceId}`}
    </button>
  );
}
