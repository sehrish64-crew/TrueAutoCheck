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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-6 lg:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                onMouseEnter={() => setHoveredLink(link.key)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="relative z-10">{t(link.key)}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ${
                    hoveredLink === link.key ? 'w-full' : 'w-0'
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="relative group"
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>

                <div className="relative w-11 h-11 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>

                <div
                  className={`absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 -z-10 transition-opacity duration-300 ${
                    hoveredSocial === social.label ? 'opacity-20' : 'opacity-0'
                  }`}
                ></div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            {t('copyright').replace('{{year}}', String(new Date().getFullYear()))}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </footer>
  )
}
