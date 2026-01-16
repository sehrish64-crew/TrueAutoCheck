import type { Metadata } from 'next'
import PrivacyPageClient from './privacy-client'

export const metadata: Metadata = {
  title: 'Privacy Policy - TrueAutoCheck',
  description: 'Read our privacy policy to understand how TrueAutoCheck collects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy - TrueAutoCheck',
    description: 'Our commitment to protecting your personal information and privacy.',
    url: 'https://trueautocheck.com/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
