'use client'

import { useEffect } from 'react'
import { useTranslations } from '@/lib/translations'

export default function TermsPageClient() {
  const { t } = useTranslations()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="text-gray-600 text-lg">These Terms and Conditions explain the rules and responsibilities for using our services. By accessing or using the site, you agree to these terms.</p>
        </div>

        <div className="mt-10 space-y-8 max-w-3xl mx-auto text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="mt-3">Welcome to TrueAutoCheck, a service operated by Allied Timber ("we", "our", or "us"). By accessing our website www.trueautocheck.com and using our services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of our website and services immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">2. Services</h2>
            <p className="mt-3">TrueAutoCheck provides digital vehicle history reports sourced from verified third-party data providers. While we strive to ensure the information is accurate and current at the time of request, data is obtained from multiple external sources. Therefore, Allied Timber and TrueAutoCheck do not guarantee that all records are complete, error-free, or fully comprehensive.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">3. User Responsibilities</h2>
            <p className="mt-3">By using our services, you agree that:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>You will use TrueAutoCheck only for lawful and legitimate purposes.</li>
              <li>All information provided by you during ordering or usage is accurate and truthful.</li>
              <li>You are responsible for maintaining the confidentiality of your order details and preventing unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">4. Payments and Refund Policy</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>All payments are securely processed through TrueAutoCheck, the authorized reseller and payment processor for services operated by Allied Timber.</li>
              <li>Your receipt and transaction confirmation will list TrueAutoCheck as the merchant of record.</li>
              <li>TrueAutoCheck operates on a one-time purchase model only. There are no subscriptions or recurring charges.</li>
              <li>Vehicle reports are typically delivered via email within 2 to 6 hours after successful payment. In rare cases, delivery may take up to 12 hours due to data availability or system load.</li>
              <li>If a delivery delay occurs beyond the standard timeframe, our support team will notify you via email.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">5. Limitation of Liability</h2>
            <p className="mt-3">To the maximum extent permitted by law, Allied Timber and TrueAutoCheck shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or reports. All reports are provided "as is", based on data available at the time of request.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">6. Intellectual Property</h2>
            <p className="mt-3">All website content, including text, graphics, logos, and data, is the exclusive property of trueautocheck.com and/or Allied Timber and is protected by applicable copyright and intellectual property laws. Unauthorized reproduction, distribution, or use is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">7. Privacy Policy</h2>
            <p className="mt-3">Allied Timber respects your privacy. Personal data is collected and processed in accordance with our Privacy Policy. By using our services, you consent to such processing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">8. Changes to Terms and Conditions</h2>
            <p className="mt-3">Allied Timber reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website or services constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">9. Contact Information</h2>
            <p className="mt-3">For support, billing, or refund inquiries, please contact us at:</p>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:info@trueautocheck.com" className="text-blue-600 hover:underline">info@trueautocheck.com</a></p>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <p className="text-sm text-gray-700">By using TrueAutoCheck or placing an order, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
