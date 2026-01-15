"use client"

import { useEffect } from 'react'
import { useTranslations } from '@/lib/translations'

export default function PrivacyPage() {
  const { t } = useTranslations()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white">
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Effective Date: 15-Jan-2026</p>
          <p className="text-gray-700">Allied Timber ("we", "our", or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services operated under the brand TrueAutoCheck.</p>
        </div>

        <div className="mt-10 space-y-8 max-w-3xl mx-auto text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
            <p className="mt-3">We may collect the following information from you:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Personal details such as name, email address, and payment information when you make a purchase.</li>
              <li>Usage data including pages visited, time spent on our website, and other interactions with our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
            <p className="mt-3">Your information may be used for:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Processing transactions and managing your purchases.</li>
              <li>Improving our services and website experience.</li>
              <li>Communicating important updates, including changes to our services or policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">3. Data Sharing</h2>
            <p className="mt-3">We do not sell or rent your personal data to third parties. Your data may be shared with:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>TrueAutoCheck for payment processing and refund handling.</li>
              <li>Service providers who assist Allied Timber in delivering services, under strict confidentiality agreements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">4. Cookies and Tracking</h2>
            <p className="mt-3">Our website may use cookies or similar tracking technologies to improve user experience. You can manage your cookie preferences via your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">5. Security</h2>
            <p className="mt-3">We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights</h2>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Request access to the personal information we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Opt-out of marketing communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">7. Contact Us</h2>
            <p className="mt-3">If you have questions or concerns about this Privacy Policy or your personal data, please contact us at:</p>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700"><strong>Legal Business Name:</strong> Allied Timber</p>
              <p className="text-gray-700 mt-2"><strong>Email:</strong> <a href="mailto:info@trueautocheck.com" className="text-blue-600 hover:underline">info@trueautocheck.com</a></p>
              <p className="text-gray-700 mt-2"><strong>Website:</strong> <a href="https://trueautocheck.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">trueautocheck.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
