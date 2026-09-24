import { Droplets, Heart, Scale, Zap } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import SliderWithControls from '@/components/ui/slider-with-controls'
import useLanguage from '@/hooks/useLanguage'
import { usePopulation } from '@/hooks/usePopulation'

export function PopulationStep1() {
  const { population, updatePopulation } = usePopulation()
  const { t } = useLanguage()

  const handleSliderChange = (key: keyof typeof population, value: number) => {
    updatePopulation(key, value)
  }

  const totalPeople = Object.values(population).reduce((sum, val) => sum + val, 0)

  const conditions = [
    {
      key: 'lowerBackPain' as const,
      label: t('step1.lowerBackPain'),
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      key: 'hypertension' as const,
      label: t('step1.hypertension'),
      icon: Heart,
      color: 'text-red-500'
    },
    {
      key: 'diabetes' as const,
      label: t('step1.diabetes'),
      icon: Droplets,
      color: 'text-purple-500'
    },
    {
      key: 'overweight' as const,
      label: t('step1.overweight'),
      icon: Scale,
      color: 'text-blue-500'
    },
    {
      key: 'noChronicConditions' as const,
      label: t('step1.noChronicConditions'),
      icon: Scale,
      color: 'text-blue-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="pt-12">
        <div className="flex justify-between w-full">
          <SectionHeader
            title={t('step1.totalDescription')}
            subtitle={t('step1.totalSubDescription')} />
          <div className="flex items-center justify-between gap-4 min-w-62.5">
            <img src="/ui/icon-group.png" alt="Usuários" className="w-12 h-12 lg:w-15 lg:h-14" />
            <div>
              <h3 className="w-auto text-sm font-light text-right text-white lg:text-lg">
                {t('step1.totalPeople').replace('{count}', totalPeople.toLocaleString())}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-x-20">
        {conditions.map(({ key, label }) => (
          <div key={key} className="w-[42.5%] py-4 transition-colors">
            <div className="flex flex-wrap items-center w-full gap-y-4">
              <div className="w-full">
                <h1 className="font-light text-white uppercase">{label}</h1>
              </div>
              <div className="w-full">
                <SliderWithControls
                  type="decimal"
                  label={label}
                  value={population[key]}
                  onChange={(value) => handleSliderChange(key, value)}
                  usePositionColumn={true} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
