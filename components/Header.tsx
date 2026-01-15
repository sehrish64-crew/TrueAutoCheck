"use client"

import { useState } from 'react'
import Link from 'next/link'
import { X, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useCountry, countries } from '@/contexts/CountryContext'
import { useTranslations } from '@/lib/translations'
import TranslateButton from '@/components/TranslateButton'

export default function Header() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const { t } = useTranslations()
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">True<span className="font-normal">AutoCheck</span></span>
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

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
              >
                <img
                  src={`https://flagcdn.com/w40/${selectedCountry?.countryCode}.png`}
                  alt={selectedCountry?.name}
                  className="w-6 h-4 rounded object-cover"
                />
                <span className="font-semibold">{selectedCountry?.code}</span>
              </button>

              <TranslateButton />
            </div>
          </div>
        </div>
      </header>

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
