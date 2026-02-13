"use client"

import { useState } from 'react'
import Link from 'next/link'
import { X, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useCountry, countries } from '@/contexts/CountryContext'
import { useTranslations } from '@/lib/translations'

export default function Header() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const { t } = useTranslations()
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[40]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="TrueAutoCheck" className="h-8 sm:h-10 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-semibold">
                {t('nav_home')}
              </Link>

              <Link href="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors font-semibold">
                {t('nav_pricing')}
              </Link>

              <Link href="/contact-us" className="text-gray-700 hover:text-gray-900 transition-colors font-semibold">
                {t('nav_contact')}
              </Link>

              <Link href="/about-us" className="text-gray-700 hover:text-gray-900 transition-colors font-semibold">
                {t('nav_about')}
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Visual Damage Detection Button */}
              <Link 
                href="/visual-damage" 
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-xs md:text-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12 7V6" />
                </svg>
                Damage Detection
              </Link>

              <button
                suppressHydrationWarning
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              >
                <img
                  src={`https://flagcdn.com/w40/${selectedCountry?.countryCode}.png`}
                  alt={selectedCountry?.name}
                  className="w-6 h-4 rounded object-cover"
                />
                <span className="font-semibold">{selectedCountry?.code}</span>
              </button>

              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors z-[60]"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[40] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[100] md:hidden overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2">
                  <img src="/logo.png" alt="TrueAutoCheck" className="h-8 w-auto" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <nav className="space-y-2">
                <Link 
                  href="/" 
                  className="block text-lg text-gray-700 hover:text-blue-600 transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_home')}
                </Link>

                <Link 
                  href="/register-vehicle" 
                  className="block text-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all font-semibold py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register Vehicle
                </Link>

                <Link 
                  href="/pricing" 
                  className="block text-lg text-gray-700 hover:text-blue-600 transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_pricing')}
                </Link>

                <Link 
                  href="/contact-us" 
                  className="block text-lg text-gray-700 hover:text-blue-600 transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_contact')}
                </Link>

                <Link 
                  href="/about-us" 
                  className="block text-lg text-gray-700 hover:text-blue-600 transition-colors font-semibold py-3 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav_about')}
                </Link>
              </nav>

              <div className="border-t border-gray-200 pt-6">
                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setIsCountryDropdownOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 border border-gray-200"
                >
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountry?.countryCode}.png`}
                    alt={selectedCountry?.name}
                    className="w-6 h-4 rounded object-cover"
                  />
                  <span className="font-semibold text-lg">{selectedCountry?.name}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isCountryDropdownOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setIsCountryDropdownOpen(false)}
          />

          <div className="fixed top-0 left-0 right-0 bg-white z-[70] shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-6 py-8 max-w-5xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('select_country')}</h2>
                <button
                  onClick={() => setIsCountryDropdownOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 h-14 text-base border-gray-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:bg-blue-50 hover:border-blue-300 border-2 ${
                      selectedCountry?.code === country.code
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w80/${country.countryCode}.png`}
                      alt={country.name}
                      className="w-8 h-6 rounded object-cover"
                    />
                    <span className="font-semibold text-gray-900">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
