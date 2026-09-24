import { motion } from 'framer-motion'
import { useEffect } from 'react'
import useLanguage from '@/hooks/useLanguage'
import { usePatient } from '@/hooks/usePatient'

export function PatientNavigation() {
  const { currentStep, nextStep, prevStep, data, resetPatientWizard } = usePatient()
  const { t, setHasSelectedLanguage, setShowLanguageSelector } = useLanguage()

  const getStep3ValidationMessage = () => {
    if (!data.transportation.type) {
      return t('step3.transportationType')
    }
    return t('step3.transportationDistanceKm')
  }

  const isStep1Valid = () => {
    return data.followUp.type
  }

  const isStep2Valid = () => {
    const conditions = data.conditions
    const selectedConditions = [
      conditions.lowerBackPain && 'lowerBackPain',
      conditions.hypertension && 'hypertension',
      conditions.diabetes && 'diabetes',
      conditions.overweight && 'overweight',
      conditions.noChronicConditions && 'noChronicConditions'
    ].filter(Boolean) as string[]

    if (selectedConditions.length === 0) return false

    // Check if all questions are answered for each selected condition
    for (const condition of selectedConditions) {
      switch (condition) {
        case 'noChronicConditions': return true

        case 'diabetes':
          if (
            conditions.diabetesControlled === undefined
            || conditions.diabetesEmergencyVisits === undefined
            || !(conditions.diabetesTreatment || []).length
          ) {
            return false
          }
          break

        case 'hypertension':
          if (
            conditions.hypertensionEmergencyVisits === undefined
            || conditions.hypertensionControlled === undefined
            || !(conditions.hypertensionTreatment || []).length
          ) {
            return false
          }
          break

        case 'overweight':
          if (
            conditions.overweightBariatricSurgery === undefined
            || conditions.overweightRecommendation === undefined
            || conditions.overweightMedication === undefined
            || !(conditions.overweightMeasures || []).length
          ) {
            return false
          }
          break

        case 'lowerBackPain': {
          const exams = conditions.lowerBackPainImagingExams || {}
          const hasExams = exams.none || Object.keys(exams).some((k) => {
            return k !== 'none' && typeof exams[k] === 'number' && exams[k] > 0
          })
          if (
            conditions.lowerBackPainMedication === undefined
            || !hasExams
            || conditions.lowerBackPainEmergencyVisits === undefined
          ) {
            return false
          }
          break
        }
      }
    }
    return true
  }

  const isStep3Valid = () => {
    if (data.followUp.type === 'none') {
      return true
    }
    return data.transportation.distanceKm > 0 && data.transportation.type
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid()
      case 2:
        return isStep2Valid()
      case 3:
        return isStep3Valid()
      case 4:
        return true
      case 5:
        return true
      default:
        return true
    }
  }

  const getValidationMessage = () => {
    switch (currentStep) {
      case 1:
        return t('step1.navTitle')
      case 2:
        return t('step2.navTitle')
      case 3:
        return isStep3Valid() ? '' : getStep3ValidationMessage()
      case 4:
        return data.followUp.type === 'none' ? '' : t('step4.navTitle')
      case 5:
        return data.followUp.type === 'none' ? '' : t('step5.navTitle')
      default:
        return ''
    }
  }

  const validationMessage = getValidationMessage()

  // Atalhos de teclado globais
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se estiver digitando em um input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Alt + Seta Direita ou Ctrl + Seta Direita = Próximo
      if ((e.altKey || e.ctrlKey) && e.key === 'ArrowRight') {
        e.preventDefault()
        if (currentStep < 5 && canProceed()) {
          nextStep()
        }
      }

      // Alt + Seta Esquerda ou Ctrl + Seta Esquerda = Anterior
      if ((e.altKey || e.ctrlKey) && e.key === 'ArrowLeft') {
        e.preventDefault()
        if (currentStep > 1) {
          prevStep()
        }
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  return (
    <div
      className="bottom-0 left-0 right-0 z-50 pb-0 md:pt-10 lg:fixed lg:pt-0 lg:pb-5"
      style={{ bottom: 'max(0px, calc(100svh - 950px))' }}>
      <div className="container px-12 mx-auto">
        <div className="flex items-center justify-center lg:justify-between">
          {(() => {
            if (currentStep > 1) {
              return (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      prevStep()
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ opacity: 0.75 }}
                  className="flex items-center justify-center w-36 py-4 cursor-pointer text-[#092D54] disabled:opacity-0 disabled:cursor-default">
                  <img src="/ui/button-prev.png" alt="Previous Button" className="absolute w-34 h-13" />
                  <span className="z-1 text-[14px] whitespace-nowrap">
                    {t('nav.previous')}
                  </span>
                </motion.button>
              )
            }
            return <div className="w-36"></div>
          })()}

          <div className="flex-1 mx-4 justify-center max-w-150">
            {validationMessage && (
              <div className="glass-container">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content">
                  <h3 className="text-[10px] lg:text-[14px] font-light text-[#52AE32] whitespace-nowrap">
                    {validationMessage}
                  </h3>
                </div>
              </div>
            )}
          </div>

          {(() => {
            if (currentStep === 5) {
              return null
            }
            if (canProceed()) {
              return (
                <motion.button
                  type="button"
                  onClick={() => nextStep()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      nextStep()
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ opacity: 0.75 }}
                  className="flex items-center justify-center w-36 py-4 cursor-pointer text-[#092D54]">
                  <img src="/ui/button-next.png" alt="Next Button" className="absolute w-34 h-13" />
                  <span className="z-1 text-[14px] whitespace-nowrap">
                    {currentStep === 4 ? t('nav.viewResults') : t('nav.next')}
                  </span>
                </motion.button>
              )
            }
            return <div className="w-36"></div>
          })()}

          <motion.button
            type="button"
            onClick={() => {
              resetPatientWizard()
              setHasSelectedLanguage(false)
              setShowLanguageSelector(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                resetPatientWizard()
                setHasSelectedLanguage(false)
                setShowLanguageSelector(false)
              }
            }}
            disabled={currentStep !== 5}
            whileTap={{ scale: 0.95 }}
            whileHover={{ opacity: 0.75 }}
            className={`
                ${currentStep === 5 ? '' : 'hidden'}
                flex items-center justify-center w-54 py-4 cursor-pointer text-[#092D54] disabled:opacity-0 disabled:cursor-default
              `}>
            <img src="/ui/button-finish.png" alt="Next Button" className="absolute w-52 h-13" />
            <span className="z-1 text-[13px] whitespace-nowrap">
              {t('nav.last')}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
