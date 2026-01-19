"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

const footerLinks = [
  { key: 'footer_privacy', href: '/privacy' },
  { key: 'footer_terms', href: '/terms' },
  { key: 'footer_refund', href: '/refund-policy' },
]

const socialLinks = [
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useTranslations()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <div className="border-b border-gray-800 pb-4 sm:pb-5">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <p className="text-center text-gray-400 text-xs sm:text-xs md:text-sm lg:text-sm leading-tight sm:leading-relaxed" style={{ fontSize: '11px' }}>
              <span className="block mb-1.5 sm:mb-2 md:mb-0 md:inline">Grace Globals LTD VIN Reports. All Rights Reserved. {new Date().getFullYear()} © TrueAutoCheck. Use of this Website constitutes acceptance of{' '}</span>
          
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
               <u>Terms & Conditions</u>
              </Link>
              {', '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
               <u>Privacy Policy</u>
              </Link>
              {', '}
              <Link href="/refund-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
               <u>Refund Policy</u>
              </Link>
              <span className="block md:inline md:mx-1">.</span>
              <span className="block md:inline">This site is owned and operated by Grace Globals LTD - an approved NMVTIS data provider. <u>Email: Info@trueautocheck.com</u></span>
            </p>

        
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-3 sm:mt-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">
              <img src="/paypal-icon.svg" alt="PayPal" className="h-5 sm:h-6 md:h-7 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/master-card-icon.svg" alt="MasterCard" className="h-5 sm:h-6 md:h-7 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/visa-icon.svg" alt="Visa" className="h-5 sm:h-6 md:h-7 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/norton-extra-text-icon.svg" alt="Norton" className="h-5 sm:h-6 md:h-7 w-auto opacity-80 hover:opacity-100 transition-opacity" />

            </div>  
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </footer>
  )
}
