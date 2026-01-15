"use client"

import { useState, useEffect, useRef } from 'react'
import { Megaphone, Clock, Mail } from 'lucide-react'

const supportStats = [
  {
    icon: Megaphone,
    value: '97%',
    label: 'satisfaction rate',
    color: 'from-blue-500 to-blue-600',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'always available',
    color: 'from-yellow-400 to-yellow-500',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Mail,
    value: '12-24h',
    label: 'avg. response time',
    color: 'from-cyan-500 to-cyan-600',
    iconColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
]

const avatarImages = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
]

export default function Support() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50 to-cyan-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div
            className={`flex justify-center transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <div className="flex items-center -space-x-3">
              {avatarImages.map((image, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 delay-${(index + 1) * 100} ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <img
                      src={image}
                      alt={`Support team member ${index + 1}`}
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`space-y-4 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Got questions?
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                We&apos;re here to help 24/7
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Get the answers you need – whenever you need them.{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-4 hover:decoration-blue-700 transition-colors duration-300">
                Drop us a message
              </a>{' '}
              and we&apos;ll get back to you.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-8 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {supportStats.map((stat, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 delay-${(index + 6) * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                  <div className="relative space-y-4">
                    <div className={`inline-flex p-4 rounded-xl ${stat.bgColor} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <stat.icon className={`w-8 h-8 ${stat.iconColor}`} strokeWidth={2} />
                    </div>

                    <div className="space-y-2">
                      <div className={`text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <p className="text-gray-600 font-medium text-lg">
                        {stat.label}
                      </p>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl origin-center`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
