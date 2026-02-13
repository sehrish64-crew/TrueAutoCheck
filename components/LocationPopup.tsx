"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCountry, countries } from '@/contexts/CountryContext'
import { X, MapPin, Search, Globe, Zap } from 'lucide-react'

export default function LocationPopup() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [isHydrated, setIsHydrated] = useState(false)

  // Check if this is the user's first visit (client-side only)
  useEffect(() => {
    setIsHydrated(true)
    
    // Allow forcing the popup open with ?showLocationPopup=true for testing
    const forceShow = searchParams?.get('showLocationPopup') === 'true'
    
    // Only check localStorage after hydration
    if (typeof window !== 'undefined') {
      const hasVisited = localStorage.getItem('locationPopupShown')
      
      // Debug logging
      console.log('[LocationPopup] Hydrated - checking first visit...')
      console.log('[LocationPopup] hasVisited:', hasVisited)
      console.log('[LocationPopup] forceShow:', forceShow)
      
      if (!hasVisited || forceShow) {
        // Show popup on first visit or if forced
        console.log('[LocationPopup] Showing popup')
        setIsOpen(true)
        if (!forceShow) {
          localStorage.setItem('locationPopupShown', 'true')
          console.log('[LocationPopup] Set locationPopupShown flag')
        }
      } else {
        console.log('[LocationPopup] User has already visited, skipping popup')
      }
    }
  }, [searchParams])

  // Filter countries based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredCountries(
        countries.filter(country =>
          country.name.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query) ||
          country.currency.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery])

  const handleSelectCountry = (country: typeof countries[0]) => {
    setSelectedCountry(country)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in scale-in duration-300">
        {/* Animated Header Background */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 opacity-90"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
          
          {/* Header Content */}
          <div className="relative p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Choose Your Region</h2>
                <p className="text-indigo-100 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Instant currency & language adjustment
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Box with Enhanced Styling */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-indigo-400 group-focus-within:text-indigo-600 transition duration-200" />
            <input
              type="text"
              placeholder="Search countries, codes, or currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>

        {/* Countries Grid with Enhanced Empty State */}
        <div className="overflow-y-auto flex-1 bg-white">
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`group p-4 rounded-xl transition-all duration-200 text-left border-2 ${
                    selectedCountry.code === country.code
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg scale-105'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-transparent hover:border-indigo-200 hover:shadow-md hover:scale-102'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold text-lg">{country.name}</div>
                    {selectedCountry.code === country.code && (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-white/30 rounded-full">
                        <Zap className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-semibold mb-1 ${selectedCountry.code === country.code ? 'text-indigo-100' : 'text-indigo-600'}`}>
                    {country.currency}
                  </div>
                  <div className={`text-xs ${selectedCountry.code === country.code ? 'text-indigo-200' : 'text-gray-500'}`}>
                    One Time Payment
                  </div>
                  <div className={`text-xs mt-2 font-semibold ${selectedCountry.code === country.code ? 'text-indigo-200' : 'text-gray-600'}`}>
                    {country.code}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <Globe className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-600">No countries found</p>
              <p className="text-sm text-gray-500 mt-1">Try searching with a different term</p>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Currently Selected</p>
            <p className="text-lg font-bold text-gray-900">{selectedCountry.name} ({selectedCountry.code})</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2 group"
          >
            <span>Continue</span>
            <Zap className="w-4 h-4 group-hover:rotate-12 transition duration-200" />
          </button>
        </div>
      </div>
    </div>
  )
}
