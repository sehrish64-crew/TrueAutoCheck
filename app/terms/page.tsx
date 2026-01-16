import type { Metadata } from 'next'
import TermsPageClient from './terms-client'

export const metadata: Metadata = {
  title: 'Terms and Conditions - TrueAutoCheck',
  description: 'Read the terms and conditions for using TrueAutoCheck services. Understand your rights and responsibilities.',
  openGraph: {
    title: 'Terms and Conditions - TrueAutoCheck',
    description: 'Our terms explain the rules for using TrueAutoCheck vehicle history reports.',
    url: 'https://trueautocheck.com/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
