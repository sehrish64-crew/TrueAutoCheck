'use client'

import { useEffect } from 'react'
import { useTranslations } from '@/lib/translations'

export default function RefundPolicyPageClient() {
  const { t } = useTranslations()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          <p className="text-gray-600 text-lg">Last Updated: January 1st, 2026</p>
        </div>

        <div className="mt-10 space-y-8 max-w-3xl mx-auto text-gray-700">
          <section>
            <p className="text-lg font-semibold text-gray-900 mb-4">At Grace Global Ltd (trueautocheck.com), we are committed to customer satisfaction. This Refund Policy outlines the circumstances under which refunds may be issued for our vehicle history reports and related services.</p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700"><strong>Quick Summary:</strong> We offer refunds within 14 days of purchase if the report contains no data or if there was a technical error preventing access to your report.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">1. Refund Eligibility</h2>
            <p className="mt-3">You may be eligible for a full refund under the following circumstances:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong>No Data Available:</strong> If the vehicle history report contains no data or is unable to locate information for the VIN or license plate you provided.</li>
              <li><strong>Technical Issues:</strong> If you experience technical problems that prevent you from accessing or downloading your purchased report, and our support team is unable to resolve the issue.</li>
              <li><strong>Duplicate Purchase:</strong> If you accidentally purchased the same report multiple times.</li>
              <li><strong>Incorrect VIN Entry:</strong> If you entered an incorrect VIN number and contact us within 24 hours of purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">2. Non-Refundable Situations</h2>
            <p className="mt-3">Refunds will NOT be issued in the following cases:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>If the report was successfully delivered and contains available data, even if the information is not what you expected or hoped for.</li>
              <li>If you are dissatisfied with the content of the report after reviewing it.</li>
              <li>If you decide you no longer need the report after it has been generated and accessed.</li>
              <li>If the report shows negative information about the vehicle (accidents, damage, etc.).</li>
              <li>If you purchased the wrong type of report or package after accessing it.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">3. Refund Request Timeframe</h2>
            <p className="mt-3">Refund requests must be submitted within 14 days of the original purchase date. Requests made after this period will not be considered.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">4. How to Request a Refund</h2>
            <p className="mt-3">To request a refund, please follow these steps:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Contact our customer support team at <a href="mailto:info@trueautocheck.com" className="text-blue-600 hover:underline">info@trueautocheck.com</a></li>
              <li>Include your order number or transaction ID</li>
              <li>Provide the VIN or license plate number used for the report</li>
              <li>Clearly explain the reason for your refund request</li>
              <li>Include any relevant screenshots or documentation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">5. Refund Processing</h2>
            <p className="mt-3">Once your refund request is approved:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Refunds will be processed within 3-5 business days</li>
              <li>The refund will be issued to the original payment method used for the purchase</li>
              <li>Depending on your bank or payment provider, it may take an additional 5-10 business days for the refund to appear in your account</li>
              <li>You will receive a confirmation email once the refund has been processed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">6. Subscription Services</h2>
            <p className="mt-3">For subscription-based services:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>You may cancel your subscription at any time</li>
              <li>Cancellations will take effect at the end of the current billing period</li>
              <li>No refunds will be issued for partial subscription periods</li>
              <li>You will retain access to the service until the end of the paid period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">7. Chargebacks</h2>
            <p className="mt-3">If you initiate a chargeback or payment dispute with your bank or credit card company without first contacting us, we reserve the right to permanently ban your account and may dispute the chargeback. Please contact us directly so we can resolve any issues before taking such action.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">8. Partial Refunds</h2>
            <p className="mt-3">In certain situations, Grace Global Ltd may offer partial refunds at its discretion. This may apply when:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>The report contains some data but is incomplete</li>
              <li>There was a minor technical issue that caused inconvenience</li>
              <li>Other circumstances deemed appropriate by our customer service team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">9. Modifications to Refund Policy</h2>
            <p className="mt-3">Grace Global Ltd reserves the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">10. Contact Information</h2>
            <p className="mt-3">For refund requests or questions about this policy, please contact:</p>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
              <p className="text-gray-700"><strong>Grace Global Ltd Customer Support</strong></p>
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:info@trueautocheck.com" className="text-blue-600 hover:underline">info@trueautocheck.com</a></p>
              <p className="text-gray-700"><strong>Website:</strong> <a href="https://trueautocheck.com" className="text-blue-600 hover:underline">https://trueautocheck.com</a></p>
            </div>
            <p className="mt-4">We aim to respond to all refund requests within 24-48 hours during business days.</p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
            <p className="text-sm text-gray-700">This Refund Policy is effective as of December 22, 2025. Grace Global Ltd values customer satisfaction and is committed to resolving any issues promptly and fairly.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
