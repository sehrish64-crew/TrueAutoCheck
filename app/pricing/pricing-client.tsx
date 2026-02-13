"use client"

import { useState, useEffect, useRef } from 'react'
import { Check, Sparkles, Zap, Crown, Shield, TrendingUp, Clock } from 'lucide-react'
import Image from 'next/image'
import { useCountry } from '@/contexts/CountryContext'
import { useTranslations } from '@/lib/translations'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import GetReportForm from '@/components/GetReportForm'

import { PRICING_MAP, CURRENCY_SYMBOLS, formatCurrency } from '@/lib/prices'

const basePricingPlans = [
  {
    name: 'Premium',
    badge: 'GOLD',
    badgeColor: 'bg-yellow-400',
    priceKey: 'premium' as const,
    icon: Crown,
    popular: false,
    borderColor: 'border-yellow-400',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    features: [
      'All Premium Features',
      'Accident Records',
      'Theft Records',
      'Salvage Records',
      'Open Recalls',
      'Odometer Readings',
      'Loan Details',
      'Possible Market Value',
      'Additional Specification',
    ],
    buttonText: 'Select plan',
  },
  {
    name: 'Basic',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-blue-600',
    priceKey: 'basic' as const,
    icon: Zap,
    popular: true,
    borderColor: 'border-blue-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    features: [
      'All Basic Features',
      'Accident Records',
      'Theft Records',
      'Salvage Records',
      'Open Recalls',
      'Lease Records',
    ],
    buttonText: 'Select plan',
  },
  {
    name: 'Standard',
    badge: 'DIAMOND',
    badgeColor: 'bg-cyan-500',
    priceKey: 'standard' as const,
    icon: Sparkles,
    popular: false,
    borderColor: 'border-cyan-500',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    features: [
      'All Standard Features',
      'Accident Records',
      'Theft Records',
      'Salvage Records',
      'Open Recalls',
      'Odometer Readings',
      'Loan Details',
      'Possible Market Value',
    ],
    buttonText: 'Select plan',
  },
]

export default function PricingClient() {
  const { selectedCountry } = useCountry()
  const { t } = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const sectionRef = useRef<HTMLDivElement>(null)

  const currencySymbol = CURRENCY_SYMBOLS[selectedCountry.currency] || '$'
  const pricing = PRICING_MAP[selectedCountry.currency] || PRICING_MAP['USD']

  const pricingPlans = basePricingPlans.map(plan => ({
    ...plan,
    price: formatCurrency(
      pricing[plan.priceKey],
      selectedCountry.currency,
      `${selectedCountry.language}-${selectedCountry.code}`
    ),
    currency: currencySymbol,
  }))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => sectionRef.current && observer.unobserve(sectionRef.current)
  }, [])

  const handleSelectPlan = (planKey: string) => {
    setSelectedPlan(planKey)
    setIsFormOpen(true)
  }

  return (
    <>
      <div ref={sectionRef} className="bg-white">
        <div className="container mx-auto px-4 py-16 space-y-12">

          {/* ✅ ONE-TIME PAYMENT NOTICE (TOP) */}
          <p className="text-center text-sm sm:text-base text-gray-600 font-medium">
            All plans are charged as a <strong>one-time payment</strong>. No monthly or recurring fees.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`border-2 rounded-2xl p-6 transition-all ${
                  hoveredPlan === index ? 'shadow-2xl scale-105' : 'shadow-md'
                } ${plan.borderColor}`}
              >
                <h3 className="text-2xl font-bold text-center">{plan.name}</h3>

                <div className="mt-6 text-center">
                  <span className="text-xl font-bold">{plan.currency}</span>
                  <span className="text-5xl font-bold ml-1">{plan.price}</span>

                  {/* ✅ ONE-TIME LABEL UNDER PRICE */}
                  <p className="text-sm text-gray-500 mt-2">
                    One-time payment • No subscription
                  </p>
                </div>

                <ul className="mt-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.priceKey)}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold ${
                    plan.popular
                      ? 'bg-blue-600 text-white'
                      : 'bg-yellow-400 text-gray-900'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* ✅ FOOTER NOTES */}
          <div className="text-center space-y-3">
            <p className="font-semibold text-gray-600">
              All prices are one-time payments. No subscriptions or recurring charges apply.
            </p>
            <p className="font-semibold text-gray-600">
              Digital service only. No physical goods included.
            </p>
          </div>
        </div>
      </div>

      <GetReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        preselectedPackage={selectedPlan}
      />

      <HowItWorks />
      <Testimonials />
    </>
  )
}
