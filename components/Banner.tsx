"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Car, Truck, Bus, Ship, CheckCircle2, HelpCircle, Key, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GetReportForm from './GetReportForm'
import { useTranslations } from '@/lib/translations'

export default function Banner() {
  const [vin, setVin] = useState('')
  const [vinError, setVinError] = useState('')
  const [vehicleIdType, setVehicleIdType] = useState<'vin' | 'plate'>('vin')
  const [plateNumber, setPlateNumber] = useState('')
  const [plateError, setPlateError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { t } = useTranslations()

  const handleGetReport = () => {
    if (vehicleIdType === 'vin') {
      if (!vin.trim()) {
        setVinError(t('vin_no_vin_alert'))
        setTimeout(() => setVinError(''), 3000)
        return
      }
    } else {
      if (!plateNumber.trim()) {
        setPlateError('Please enter a plate number to continue')
        setTimeout(() => setPlateError(''), 3000)
        return
      }
    }

    setIsFormOpen(true)
  }

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#d7f0ff' }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('banner_title')}
              </h1>
              <p className="text-lg text-gray-700">
                {t('banner_subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center bg-white/10 p-1 rounded-full gap-1">
                    <button type="button" onClick={() => setVehicleIdType('vin')} className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${vehicleIdType === 'vin' ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 shadow' : 'text-black hover:bg-white/10'}`}>
                      <Key className="w-4 h-4" />
                      <span className="text-sm font-medium">By VIN</span>
                    </button>
                    <button type="button" onClick={() => setVehicleIdType('plate')} className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${vehicleIdType === 'plate' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow' : 'text-black hover:bg-white/10'}`}>
                      <Hash className="w-4 h-4" />
                      <span className="text-sm font-medium">By Plate</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  {vehicleIdType === 'vin' ? (
                    <>
                      <Input
                        type="text"
                        placeholder={t('banner_input_placeholder')}
                        value={vin}
                        onChange={(e) => { setVin(e.target.value.toUpperCase()); if (vinError) setVinError('') }}
                        className="h-12 pr-10 text-base sm:text-lg w-full bg-white"
                      />
                      {vinError && (
                        <p className="text-xs text-red-500 mt-1">{vinError}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        placeholder="Enter Plate Number"
                        value={plateNumber}
                        onChange={(e) => { setPlateNumber(e.target.value.toUpperCase()); if (plateError) setPlateError('') }}
                        className="h-12 pr-10 text-base sm:text-lg w-full bg-white"
                      />
                      {plateError && (
                        <p className="text-xs text-red-500 mt-1">{plateError}</p>
                      )}
                    </>
                  )}
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-3 sm:mt-4 flex">
                  <Button
                    onClick={handleGetReport}
                    className="bg-black hover:bg-yellow-500 text-white font-semibold h-12 px-6 sm:px-8 w-full sm:w-100"
                    disabled={vehicleIdType === 'vin' ? !vin.trim() : !plateNumber.trim()}
                  >
                    {t('banner_get_report')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{t('banner_we_check')}</span>
                <div className="flex gap-3">
                  <Car className="w-5 h-5" />
                  <Truck className="w-5 h-5" />
                  <Bus className="w-5 h-5" />
                  <Ship className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">{t('banner_report_title')}</p>
                <p className="text-sm text-gray-600">{t('banner_report_subtitle')}</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_damage')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_market_value')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_mileage')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_more')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_specs')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_title_check')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_safety_ratings')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{t('banner_checks_natural_disaster')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

              <div className="relative animate-float">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-500 rounded-3xl opacity-30 blur-2xl animate-spin-slow"></div>

                <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-500">
                  <div className="relative h-96">
                    <Image
                      src="/banner-hero.png"
                      alt="Banner hero image"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <h3 className="font-bold text-gray-900 mb-1">Comprehensive Report</h3>
                        <p className="text-sm text-gray-600">Complete vehicle history in seconds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow z-10">
                <CheckCircle2 className="w-12 h-12 text-gray-900" strokeWidth={2.5} />
              </div>

              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow z-10">
                <Car className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GetReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        prefilledIdentType={vehicleIdType}
        prefilledIdentValue={vehicleIdType === 'vin' ? vin : plateNumber}
      />
    </section>
  )
}