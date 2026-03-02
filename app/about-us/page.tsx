import { Metadata } from 'next'
import AboutUsClient from './about-us-client'

export const metadata: Metadata = {
  title: 'About TrueAutoCheck - Vehicle History Transparency',
  description:
    'Learn how TrueAutoCheck is driving transparency in the automotive industry with blockchain-powered vehicle history reports from 900+ global databases.',
  openGraph: {
    title: 'About TrueAutoCheck - Vehicle History Transparency',
    description:
      'Learn how TrueAutoCheck is driving transparency in the automotive industry with blockchain-powered vehicle history reports from 900+ global databases.',
    url: 'https://trueautocheck.com/about-us',
    type: 'website',
  },
}

export default function AboutUs() {
  return <AboutUsClient />
}
