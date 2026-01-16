import type { Metadata } from 'next'
import RefundPolicyPageClient from './refund-policy-client'

export const metadata: Metadata = {
  title: 'Refund Policy - TrueAutoCheck',
  description: 'Learn about TrueAutoCheck refund policy and how to request a refund for your vehicle history report.',
  openGraph: {
    title: 'Refund Policy - TrueAutoCheck',
    description: 'Our customer-friendly refund policy details.',
    url: 'https://trueautocheck.com/refund-policy',
    type: 'website',
  },
}

export default function RefundPolicyPage() {
  return <RefundPolicyPageClient />
}
