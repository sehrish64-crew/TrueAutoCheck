"use client"

import { useEffect } from 'react'
import { useTranslations } from '@/lib/translations'

export default function RefundPolicyPage() {
  const { t } = useTranslations()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          <p className="text-gray-600 text-lg">Effective Date: 15-Jan-2026</p>
          <p className="text-gray-700">Allied Timber ("we", "our", or "us"), operating under the brand TrueAutoCheck, values its customers and aims to ensure satisfaction with every purchase. All transactions on our website are processed through TrueAutoCheck via Paddle, and refunds are handled in accordance with Paddle's policies and this Refund Policy.</p>
        </div>

        <div className="mt-10 space-y-8 max-w-3xl mx-auto text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">1. Refund Eligibility</h2>
            <p className="mt-3">Refunds are provided at the discretion of TrueAutoCheck, Allied Timber, and Paddle. Refund requests may be denied in cases involving fraud, abuse, chargebacks, or misuse of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">2. How to Request a Refund</h2>
            <p className="mt-3">To request a refund, you may:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Use the refund link provided in your TrueAutoCheck purchase confirmation email.</li>
              <li>Contact TrueAutoCheck support at <a href="mailto:info@trueautocheck.com" className="text-blue-600 hover:underline">info@trueautocheck.com</a> with your order details and reason for the request.</li>
              <li>Request a refund through Paddle's support portal, where applicable.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">Refunds are typically processed within a few business days after approval.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">3. Refund Window & Limits</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Card payments: Refunds are generally eligible up to 120 days after purchase.</li>
              <li>PayPal payments: Refunds are generally eligible up to 179 days after purchase.</li>
              <li>Eligibility is subject to Paddle's payment processing rules and internal review.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">4. Refund Processing</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Approved refunds are issued to the original payment method used at checkout.</li>
              <li>Small refunds on verified accounts may be automatically approved.</li>
              <li>Larger or more complex refund requests may require additional review and processing time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">5. Reasons Refunds May Be Denied</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside ml-2">
              <li>Fraud, abuse, or misuse of the product or service.</li>
              <li>Chargebacks initiated before contacting customer support.</li>
              <li>Requests that do not comply with Paddle's policies or TrueAutoCheck's refund criteria.</li>
            </ul>
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-700"><strong className="text-green-900">EU Consumer Rights:</strong> Consumers located in the European Union generally have a 14-day right to cancel under applicable consumer protection laws. This right typically applies only to initial purchases and may not apply to renewals or fully delivered digital services.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">6. Questions or Issues</h2>
            <p className="mt-3">If you have any questions about refund eligibility or experience issues requesting a refund, please contact us for assistance:</p>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700"><strong>Legal Business Name:</strong> Allied Timber</p>
              <p className="text-gray-700 mt-2"><strong>Brand:</strong> TrueAutoCheck</p>
              <p className="text-gray-700 mt-2"><strong>Email:</strong> <a href="mailto:info@trueautocheck.com" className="text-blue-600 hover:underline">info@trueautocheck.com</a></p>
              <p className="text-gray-700 mt-2"><strong>Website:</strong> <a href="https://trueautocheck.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">trueautocheck.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
