import type { Metadata } from 'next'
import SecurityPageClient from './security-client'

export const metadata: Metadata = {
  title: 'Security - TrueAutoCheck',
  description: 'Learn about TrueAutoCheck security measures protecting your vehicle history data with industry-leading encryption and privacy standards.',
  openGraph: {
    title: 'Security - TrueAutoCheck',
    description: 'Our commitment to data security and privacy.',
    url: 'https://trueautocheck.com/security',
    type: 'website',
  },
}

export default function SecurityPage() {
  return <SecurityPageClient />
}
