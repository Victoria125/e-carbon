import { LoadingTransition } from '@/components/LoadingTransition'
import { PatientNavigation } from '@/components/patient/PatientNavigation'
import { PatientProgressBar } from '@/components/patient/PatientProgressBar'
import { PatientStep1 } from '@/components/patient/PatientStep1'
import { PatientStep2 } from '@/components/patient/PatientStep2'
import { PatientStep3 } from '@/components/patient/PatientStep3'
import { PatientStep4 } from '@/components/patient/PatientStep4'
import { PatientStep5 } from '@/components/patient/PatientStep5'
import { usePatient } from '@/hooks/usePatient'

function PatientJourneyContent() {
  const { currentStep, isLoading } = usePatient()

  const renderStep = () => {
    if (currentStep === 1) return <PatientStep1 />
    if (currentStep === 2) return <PatientStep2 />
    if (currentStep === 3) return <PatientStep3 />
    if (currentStep === 4) return <PatientStep4 />
    return <PatientStep5 />
  }

  return (
    <div className="container px-2 lg:px-12 mx-auto">
      {/* Progress Bar */}
      <PatientProgressBar currentStep={currentStep} totalSteps={5} />

      {/* Step Content */}
      <div>
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="w-full">
        <PatientNavigation />
      </div>

      {/* Loading Overlay */}
      {isLoading && <LoadingTransition />}
    </div>
  )
}

export function PatientJourney() {
  return <PatientJourneyContent />
}
