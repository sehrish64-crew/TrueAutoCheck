"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCountry, countries } from '@/contexts/CountryContext'
import { X, MapPin, Search } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Select Your Location</h2>
              <p className="text-blue-100 text-sm">We'll adjust currency and language for your region</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-600 rounded-lg transition text-white"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by country name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Countries List */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    selectedCountry.code === country.code
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="font-semibold">{country.name}</div>
                  <div className={`text-sm ${selectedCountry.code === country.code ? 'text-blue-100' : 'text-gray-600'}`}>
                    {country.currency} • {country.code}
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <p>No countries found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Currently selected: <span className="font-semibold">{selectedCountry.name}</span>
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
