import useLanguage from '@/hooks/useLanguage'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: Readonly<ProgressBarProps>) {
  const { language } = useLanguage()

  return (
    <div className="px-8 mt-8">
      <div className="relative flex items-center justify-center flex-col">
        <div className="w-[425px]">
          <div className="flex items-center justify-center">
            <img src={`/ui/population/steps/step${currentStep}-${language}.png`} alt={`Step ${currentStep} - Language ${language}`} className="w-[510px]" />
          </div>
        </div>
        <p hidden>{`Total Steps: ${currentStep}/${totalSteps}`}</p>
      </div>
    </div>
  )
}
