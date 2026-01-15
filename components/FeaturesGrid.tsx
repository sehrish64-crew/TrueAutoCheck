"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FileText, TrendingUp, Settings, DollarSign, AlertTriangle, Shield, Cloud } from 'lucide-react'

// We build the feature text from translations so everything is localizable
const buildFeatures = (t: (key: string) => string) => ([
  {
    icon: AlertTriangle,
    title: t('feature_spot_damage_title'),
    description: t('feature_spot_damage_desc'),
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: TrendingUp,
    title: t('feature_verify_mileage_title'),
    description: t('feature_verify_mileage_desc'),
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    image: 'https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Settings,
    title: t('feature_specs_title'),
    description: t('feature_specs_desc'),
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: DollarSign,
    title: t('feature_value_title'),
    description: t('feature_value_desc'),
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    image: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: FileText,
    title: t('feature_avoid_hidden_title'),
    description: t('feature_avoid_hidden_desc'),
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Shield,
    title: t('feature_safety_title'),
    description: t('feature_safety_desc'),
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
    image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Cloud,
    title: t('feature_disasters_title'),
    description: t('feature_disasters_desc'),
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
])

import { useTranslations } from '@/lib/translations'

export default function FeaturesGrid() {
  const { t } = useTranslations()
  const features = buildFeatures(t)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 100)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('features_title')}
          </h2>
          <p className="text-lg text-gray-700">
            {t('features_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                  <div className={`${feature.color} p-6 transition-all duration-300 relative overflow-hidden`}>
                    <div className="relative h-48 rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg z-10">
                        <Icon className={`w-5 h-5 ${feature.iconColor}`} strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
