"use client"

import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const steps = [
  {
    number: '1',
    title: "Enter the car's VIN number",
    description: "Every car has a unique 17-digit VIN code that lets us track its entire history. You'll find it in the V5C (logbook) or other registration documents, or directly on the vehicle.",
    link: "Where can I find the VIN?",
    color: 'from-blue-400 to-blue-600',
  },
  {
    number: '2',
    title: "We'll check verified data worldwide",
    description: "We scan 900+ data sources across 45+ countries – including insurance, police, and registration data – to reveal any hidden problems.",
    link: "Where does the data come from?",
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    number: '3',
    title: "Pay and unlock your full vehicle history report",
    description: "After payment, use your credits to see the car's history – your full report will be ready in just 55 seconds.",
    link: "How can I buy and use credits?",
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    number: '4',
    title: "Let data guide your decision",
    description: "Use the car history report to decide whether to buy the car, negotiate a better price, or keep looking.",
    link: "View sample report",
    color: 'from-purple-400 to-purple-600',
  },
]

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index])
              }, index * 150)
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-700">
            Learn what we check, how fast it happens, and what you get in return:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Vehicle inspection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Professional Verification</h3>
                <p className="text-white/90">Trusted data from 900+ global sources</p>
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern vehicle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Instant Reports</h3>
                <p className="text-white/90">Comprehensive history in 55 seconds</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index)

            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-3xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link"
                    >
                      {step.link}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -bottom-6 left-10 w-0.5 h-12 bg-gradient-to-b from-blue-200 to-transparent"></div>
                )}
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
          visibleSteps.length === steps.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Get Your Vehicle Report Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  )
}
