import type { Metadata } from 'next'
import SecurityPageClient from './security-client'

export const metadata: Metadata = {
  title: 'Security - Auto Facts Check',
  description: 'Learn about Auto Facts Check security measures protecting your vehicle history data with industry-leading encryption and privacy standards.',
  openGraph: {
    title: 'Security - Auto Facts Check',
    description: 'Our commitment to data security and privacy.',
    url: 'https://trueautocheck.com/security',
    type: 'website',
  },
}

export default function SecurityPage() {
  return <SecurityPageClient />
}
