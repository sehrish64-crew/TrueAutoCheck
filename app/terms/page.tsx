import type { Metadata } from 'next'
import TermsPageClient from './terms-client'

export const metadata: Metadata = {
  title: 'Terms and Conditions - Auto Facts Check',
  description: 'Read the terms and conditions for using Auto Facts Check services. Understand your rights and responsibilities.',
  openGraph: {
    title: 'Terms and Conditions - Auto Facts Check',
    description: 'Our terms explain the rules for using Auto Facts Check Digital pdf reports.',
    url: 'https://trueautocheck.com/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
