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
          <div className="relative p-4 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="p-2 md:p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-1">Choose Your Region</h2>
                <p className="text-indigo-100 text-xs md:text-sm flex items-center gap-2">
                  <Zap className="w-3 h-3 md:w-4 md:h-4" />
                  Instant currency & language adjustment
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 text-white hover:scale-110 flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Search Box with Enhanced Styling */}
        <div className="p-3 md:p-6 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          <div className="relative group">
            <Search className="absolute left-3 md:left-4 top-2.5 md:top-3.5 w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-focus-within:text-indigo-600 transition duration-200" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 md:pr-6 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-sm md:text-base text-gray-800 placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>

        {/* Countries Grid with Enhanced Empty State */}
        <div className="overflow-y-auto flex-1 bg-white">
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 p-3 md:p-6">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`group p-3 md:p-4 rounded-xl transition-all duration-200 text-left border-2 ${
                    selectedCountry.code === country.code
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg scale-105'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-transparent hover:border-indigo-200 hover:shadow-md hover:scale-102'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold text-base md:text-lg">{country.name}</div>
                    {selectedCountry.code === country.code && (
                      <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-white/30 rounded-full flex-shrink-0">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      </span>
                    )}
                  </div>
                  <div className={`text-xs md:text-sm font-semibold mb-1 ${selectedCountry.code === country.code ? 'text-indigo-100' : 'text-indigo-600'}`}>
                    {country.currency}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-16">
              <Globe className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mb-4" />
              <p className="text-base md:text-lg font-semibold text-gray-600">No countries found</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">Try searching with a different term</p>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="border-t border-gray-100 p-3 md:p-6 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Currently Selected</p>
            <p className="text-base md:text-lg font-bold text-gray-900 truncate">{selectedCountry.name} ({selectedCountry.code})</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2 group text-sm md:text-base"
          >
            <span>Continue</span>
            <Zap className="w-4 h-4 group-hover:rotate-12 transition duration-200" />
          </button>
        </div>
      </div>
    </div>
  )
}
