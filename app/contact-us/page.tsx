import type { Metadata } from 'next'
import ContactUsClient from './contact-us-client'

export const metadata: Metadata = {
  title: 'Contact TrueAutoCheck - Customer Support',
  description: 'Get in touch with TrueAutoCheck for any inquiries, support, or sales questions. Available 24/7 to help you.',
  openGraph: {
    title: 'Contact TrueAutoCheck',
    description: 'Reach out to our customer support team for assistance with vehicle history reports.',
    url: 'https://trueautocheck.com/contact-us',
    type: 'website',
  },
}

export default function ContactUsPage() {
  return <ContactUsClient />
}
