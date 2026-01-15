"use client"

import { useState, useEffect } from 'react'
import { Shield, Users, Globe2, TrendingUp, CheckCircle2, Database, Clock, Award, Building2, Heart, Zap, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const stats = [
  { value: 900, suffix: '+', label: 'Global Databases', icon: Database },
  { value: 5, suffix: 'M+', label: 'Reports Generated', icon: CheckCircle2 },
  { value: 50, suffix: '+', label: 'Countries Covered', icon: Globe2 },
  { value: 24, suffix: '/7', label: 'Support Available', icon: Clock }
]

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Every report we generate is backed by data from verified sources across 900+ global databases, ensuring accuracy and reliability.'
  },
  {
    icon: Users,
    title: 'Customer Excellence',
    description: 'We place your needs at the forefront, providing exceptional support and guidance throughout your vehicle history journey.'
  },
  {
    icon: Eye,
    title: 'Complete Visibility',
    description: 'Comprehensive insights into vehicle history, from accident records to ownership changes, giving you the full picture.'
  },
  {
    icon: Zap,
    title: 'Innovation Driven',
    description: 'Leveraging cutting-edge technology and blockchain to revolutionize how vehicle history information is accessed and verified.'
  }
]

const timeline = [
  { year: '2017', title: 'Foundation', description: 'TrueAutoCheck was founded with a vision to bring transparency to the automotive market.' },
  { year: '2018', title: 'Blockchain Integration', description: 'Pioneered blockchain technology to ensure tamper-proof vehicle history records.' },
  { year: '2020', title: 'Global Expansion', description: 'Expanded our database network to cover over 50 countries across multiple continents.' },
  { year: '2023', title: 'Industry Leader', description: 'Became a trusted partner for millions of car buyers and sellers worldwide.' }
]

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState([0, 0, 0, 0])

  useEffect(() => {
    setIsVisible(true)

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const timers = stats.map((stat, index) => {
      let currentValue = 0
      const increment = stat.value / steps

      return setInterval(() => {
        currentValue += increment
        if (currentValue >= stat.value) {
          currentValue = stat.value
          clearInterval(timers[index])
        }
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = Math.floor(currentValue)
          return newCounters
        })
      }, interval)
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [])

  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative container mx-auto px-6 py-20 md:py-32">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">About TrueAutoCheck</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Driving Transparency in the Automotive Industry
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We empower millions of buyers and sellers with comprehensive vehicle history reports, making every transaction safer and more transparent.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto transform transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="container mx-auto px-6">
          <div className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-semibold text-blue-900">Our Story</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Building Trust Through Technology
                </h2>

                <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Founded in 2026, TrueAutoCheck emerged from a simple yet powerful vision: to eliminate information asymmetry in the used car market. We recognized that buyers were making one of their most significant purchases without access to complete vehicle histories.
                  </p>
                  <p>
                    Today, we've built the world's most comprehensive vehicle history platform, aggregating data from over 900 sources including national registries, insurance databases, and service records. Our blockchain-based approach ensures data integrity while protecting user privacy.
                  </p>
                  <p>
                    With over 5 million reports generated and operations spanning 50+ countries, we've become the trusted partner for individuals, dealerships, and automotive professionals worldwide who demand accuracy and transparency.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Industry Leader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Customer Trusted</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To create a transparent automotive marketplace where every buyer has access to complete, verified vehicle history information before making a purchase decision.
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                      <p className="text-gray-700 leading-relaxed">
                        A world where vehicle fraud is eliminated and every car transaction is built on trust, transparency, and verified data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className={`max-w-6xl mx-auto space-y-12 transform transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <value.icon className="w-7 h-7 text-blue-600" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <div className={`max-w-5xl mx-auto space-y-12 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Journey</h2>
              <p className="text-xl text-gray-600">Key milestones in our growth</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/3803517/pexels-photo-3803517.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Technology innovation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">Innovation First</h3>
                    <p className="text-white/90 text-sm">Blockchain-powered verification</p>
                  </div>
                </div>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Vehicle technology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">Global Coverage</h3>
                    <p className="text-white/90 text-sm">50+ countries worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-600 hidden md:block"></div>

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative md:pl-20 bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute left-5 top-8 w-7 h-7 rounded-full bg-blue-600 border-4 border-white shadow-lg hidden md:flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-bold text-blue-600 uppercase tracking-wider">{item.year}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className={`relative container mx-auto px-6 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Make an Informed Decision?
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join millions of satisfied customers who trust TrueAutoCheck for comprehensive vehicle history reports. Start your journey with confidence today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                Get Your Report
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
