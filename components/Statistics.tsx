"use client"

import { useState, useEffect, useRef } from 'react'
import { ShieldCheck, Gauge, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

const buildStats = (t: (key: string) => string) => ([
  {
    icon: ShieldCheck,
    value: 3700000,
    label: t('stats_vehicles_checked'),
    prefix: '+',
    suffix: '',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Gauge,
    value: 115453,
    label: t('stats_clocked_found'),
    prefix: '',
    suffix: '',
    color: 'from-cyan-400 to-cyan-600',
    bgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    icon: AlertCircle,
    value: 1574512,
    label: t('stats_damaged_detected'),
    prefix: '',
    suffix: '',
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
])

function useCountUp(end: number, duration: number = 2000, isVisible: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [end, duration, isVisible])

  return count
}

export default function Statistics() {
  const { t } = useTranslations()
  const stats = buildStats(t)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-cyan-50/30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {t('stats_title')}
          </h2>
          <p className={`text-lg text-gray-700 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {t('stats_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const displayValue = useCountUp(stat.value, 2500, isVisible)
            const formattedValue = displayValue.toLocaleString()

            return (
              <div
                key={index}
                className={`group text-center transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="relative inline-block mb-6">
                  <div className={`absolute inset-0 ${stat.bgColor} rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse`}></div>

                  <div className={`relative ${stat.bgColor} rounded-full p-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                    <Icon className={`w-12 h-12 md:w-16 md:h-16 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} strokeWidth={2} />
                  </div>

                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                </div>

                <div className="space-y-2">
                  <div className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                    {stat.prefix}{formattedValue}{stat.suffix}
                  </div>
                  <p className="text-base md:text-lg text-gray-700 font-medium">
                    {stat.label}
                  </p>
                </div>

                <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-blue-500 transition-all duration-500"></div>
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                    i === 0 ? 'from-blue-400 to-blue-600' : i === 1 ? 'from-cyan-400 to-cyan-600' : 'from-indigo-400 to-indigo-600'
                  } border-2 border-white`}
                ></div>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Trusted by <span className="text-blue-600">3.7M+</span> car buyers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
