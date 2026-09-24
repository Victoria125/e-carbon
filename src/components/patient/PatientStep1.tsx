import useLanguage from '@/hooks/useLanguage'
import { usePatient } from '@/hooks/usePatient'

export function PatientStep1() {
  const { data, updateFollowUp } = usePatient()
  const { t } = useLanguage()

  const handleFollowUpChange = (type: 'semiannual' | 'annual' | 'none') => {
    updateFollowUp({ type })
  }

  const followUpOptions = [
    {
      value: 'semiannual' as const,
      label: t('step1.semiannual'),
      img: '/ui/patient/semiannual-calendar',
      description: t('step1.semiannualDesc'),
      benefit: t('step1.semiannualBenefit')
    },
    {
      value: 'annual' as const,
      label: t('step1.annual'),
      img: '/ui/patient/annual-calendar',
      description: t('step1.annualDesc'),
      benefit: t('step1.annualBenefit')
    },
    {
      value: 'none' as const,
      label: t('step1.none'),
      img: '/ui/patient/none-calendar',
      description: t('step1.noneDesc'),
      benefit: t('step1.noneBenefit')
    }
  ]

  return (
    <div className="space-y-6">
      <div className="mt-14 mb-10 h-12">
        <h1 className="text-center text-[#D7D7D7] font-thin text-xl">
          {t('step1.title')}
        </h1>
        <p className="text-center text-[#52AE32] font-thin text-xs">
          {t('step1.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="select-none flex justify-center  separacao items-center  mb-25">
          {followUpOptions.map(({ value, label, img, description }) => (
            <button
              type="button"
              key={value}
              className={`
                cursor-pointer transition-all rounded-[32px]
                ${data.followUp.type === value
                  ? 'border-[#94CF5B] ring-2 ring-[#94CF5B] scale-105'
                  : 'border-white/20 hover:border-white/30 hover:scale-102'
                }
              `}
              onClick={() => handleFollowUpChange(value)}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="followUp"
                  value={value}
                  checked={data.followUp.type === value}
                  onChange={() => handleFollowUpChange(value)}
                  className="hidden"
                  onClick={(e) => e.stopPropagation()} />

                <div className="glass-container">
                  {data.followUp.type !== value && (<div className="glass-filter"></div>)}
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-content max-[950px]:h-[200px]">
                    <img src={`${img}${data.followUp.type === value ? '-active' : ''}.png`} alt={`${value} calendar`} className="w-14 h-14 md:w-18 md:h-18 mt-2" />
                    <h3
                      className={`-mt-2 text-sm lg:text-lg font-light uppercase 
                      ${data.followUp.type === value ? 'text-[#95F746]' : 'text-white'}
                      `}>
                      {label}
                    </h3>
                    <p className="-mt-5 text-[9px] text-[#94CF5B]">{description}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
