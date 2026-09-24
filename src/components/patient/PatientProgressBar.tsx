import useLanguage from '@/hooks/useLanguage'

interface PatientProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function PatientProgressBar({ currentStep, totalSteps }: Readonly<PatientProgressBarProps>) {
  const { language } = useLanguage()
  // Removido mapeamento incorreto 'cn' -> 'ch'. Os assets existentes usam sufixo '-cn'.
  // Se futuramente existir padronização para 'ch', pode-se adicionar lógica de fallback.
  const imageLang = language

  return (
    <div className="px-0 mt-2 lg:px-8 lg:mt-8">
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-[320px] lg:w-[425px]">
          <div className="flex items-center justify-center">
            <img
              src={`/ui/patient/steps/step${currentStep}-${imageLang}.png`}
              alt={`Step ${currentStep} - Language ${language}`}
              className="w-310px lg:w-[510px]"
              onError={(e) => {
                // Fallback: se imagem específica não existir, tenta versão em português ('br')
                const target = e.currentTarget as HTMLImageElement
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true'
                  target.src = `/ui/patient/steps/step${currentStep}-br.png`
                }
              }} />
          </div>
        </div>
        <p hidden>{`Total Steps: ${currentStep}/${totalSteps}`}</p>
      </div>
    </div>
  )
}
