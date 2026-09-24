import type { TransportationType } from '@/types/shared'
import { useState } from 'react'
import SectionHeader from '@/components/ui/section-header'
import SliderWithControls from '@/components/ui/slider-with-controls'
import useLanguage from '@/hooks/useLanguage'
import { usePatient } from '@/hooks/usePatient'

interface TransportationOption {
  type: TransportationType
  label: string
  img: string
}

export function PatientStep3() {
  const { data, updateTransportation } = usePatient()
  const { t } = useLanguage()

  const transportationOptions: TransportationOption[] = [
    { type: 'walking', label: t('step3.walking'), img: '/ui/icon-walking' },
    { type: 'motorcycle', label: t('step3.motorcycle'), img: '/ui/icon-motorcycle' },
    { type: 'car', label: t('step3.car'), img: '/ui/icon-car' },
    { type: 'bus', label: t('step3.bus'), img: '/ui/icon-bus' }
  ]

  const [distance, setDistance] = useState<number>(data.transportation.distanceKm)

  const handleTypeChange = (type: TransportationType) => {
    updateTransportation({
      type,
      distanceKm: distance
    })
  }

  const handleDistanceChange = (value: number) => {
    setDistance(value)
    updateTransportation({
      type: data.transportation.type,
      distanceKm: value
    })
  }

  return (
    <div className="mb-20 space-y-6">
      {/* Warning message for "none" follow-up */}
      {data.followUp.type === 'none' && (
        <div className="flex items-center justify-center my-20">
          <div className="glass-container rounded-2xl max-w-[800px]">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="glass-content">
              <div className="flex flex-col items-center gap-10 py-5">
                <div className="flex flex-col items-center justify-center gap-1">
                  <img src="ui/icon-warning.png" alt="Warning Sign" className="w-12 text-red-400" />
                  <h3 className="text-sm font-thin text-[#FFF15C]">
                    {t('noFollowUp.title')}
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <img src="ui/icon-carbon.png" alt="Carbon Icon" className="h-16" />
                  <p className="mt-1 text-xs text-center max-w-70">
                    {t('noFollowUp.body')}
                  </p>
                  <img src="ui/icon-hospital.png" alt="Hospital Icon" className="h-14" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className="mt-1 text-sm text-center">
                    {t('noFollowUp.footer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transportation Type Selection */}
      {data.followUp.type !== 'none' && (
        <>
          <div className="h-12 mb-10 mt-14">
            <h1 className="text-center text-[#D7D7D7] text-xl">
              {t('step3.title')}
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 select-none sm:gap-4 md:gap-6 lg:gap-10">
            {transportationOptions.map(({ type, label, img }) => (
              <button
                key={type}
                type="button"
                className={`rounded-[32px] w-32 sm:w-36 md:w-40 shrink-0 cursor-pointer transition-all
                ${data.transportation.type === type
                  ? 'border-[#94CF5B] ring-2 ring-[#94CF5B] scale-105'
                  : 'border-white/20 hover:border-white/30 hover:scale-102'
                }
              `}
                onClick={() => handleTypeChange(type)}>
                <div className="glass-container">
                  {data.transportation.type !== type && (<div className="glass-filter"></div>)}
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-content">
                    <img
                      src={`${img}${data.transportation.type === type ? '-active' : ''}.png`}
                      alt={`${type}-img`}
                      className="mt-2 w-26 h-18" />
                    <h3
                      className={`
                    mt-[-5px] text-xs font-light whitespace-nowrap uppercase
                    ${data.transportation.type === type ? 'text-[#52AE32]' : 'text-white'}
                  `}>
                      {label}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Distance Slider */}
      {data.followUp.type !== 'none' && data.transportation.type && (
        <div className="w-full px-2.5">
          <SectionHeader
            title={t('step3.sectionTitle')}
            subtitle={t('step3.sectionSubtitle')}
            className="mb-5 mt-15" />
          <div className="flex flex-row items-center w-full gap-2">
            <div className="w-full">
              <SliderWithControls
                type="decimal"
                label="distance"
                value={distance}
                maxValue={200}
                onChange={handleDistanceChange} />
            </div>
            <span className="text-white">KM</span>
          </div>
        </div>
      )}
    </div>
  )
}
