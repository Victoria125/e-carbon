import { motion } from 'framer-motion'
import { useEffect } from 'react'
import useLanguage from '@/hooks/useLanguage'
import { usePopulation } from '@/hooks/usePopulation'

export function PopulationNavigation() {
  const { currentStep, nextStep, prevStep, population, followUp, resetState } = usePopulation()
  const { t, setHasSelectedLanguage, setShowLanguageSelector } = useLanguage()

  const isStep1Valid = () => Object.values(population).some((val) => val > 0)
  const isStep2Valid = () => {
    return Object.entries(followUp).every(([disease, distribution]) => {
      const peopleCount = population[disease as keyof typeof population]
      if (peopleCount === 0) return true

      const noneCount = Math.round((distribution.none * peopleCount) / 100)
      const annualCount = Math.round((distribution.annual * peopleCount) / 100)
      const semiannualCount = Math.round((distribution.semiannual * peopleCount) / 100)

      return (noneCount + annualCount + semiannualCount) === peopleCount
    })
  }
  const isStep3Valid = () => true
  const isStep4Valid = () => true

  const canProceed = () => {
    if (currentStep === 1) return isStep1Valid()
    if (currentStep === 2) return isStep2Valid()
    if (currentStep === 3) return isStep3Valid()
    if (currentStep === 4) return isStep4Valid()
    return true
  }

  const getValidationMessage = () => {
    if (currentStep === 1) return isStep1Valid() ? '' : t('validation.selectPopulation')
    if (currentStep === 2) return isStep2Valid() ? '' : t('validation.completeDistribution')
    if (currentStep === 3) return t('validation.productsTable')
    return ''
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
        if (currentStep < 4 && canProceed()) {
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
      className="fixed bottom-0 left-0 right-0 z-50 pb-2 lg:pb-5"
      style={{ bottom: 'max(0px, calc(100svh - 950px))' }}>
      <div className="container px-12 mx-auto">
        <div className="flex items-center justify-between">
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
                  className="flex items-center justify-center w-32 py-4 cursor-pointer text-[#092D54] disabled:opacity-0 disabled:cursor-default">
                  <img src="/ui/button-prev.png" alt="Previous Button" className="absolute h-12" />
                  <span className="z-1 text-[14px] whitespace-nowrap">
                    {t('nav.previous')}
                  </span>
                </motion.button>
              )
            }
            return <div className="w-32"></div>
          })()}

          <div className="flex-1 mx-4 justify-center max-w-150">
            {validationMessage && (
              <div className="glass-container">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content">
                  <h3 className="-mt-1.25 text-md font-light text-[#52AE32] whitespace-nowrap">
                    {validationMessage}
                  </h3>
                </div>
              </div>
            )}
          </div>

          <motion.button
            type="button"
            onClick={nextStep}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                nextStep()
              }
            }}
            disabled={currentStep === 4 || (currentStep < 4 && !canProceed())}
            whileTap={{ scale: 0.95 }}
            whileHover={{ opacity: 0.75 }}
            className={`
              ${currentStep === 4 ? 'hidden' : ''}
              flex items-center justify-center w-32 py-4 cursor-pointer text-[#092D54] disabled:opacity-0 disabled:cursor-default
            `}>
            <img src="/ui/button-next.png" alt="Next Button" className="absolute h-12" />
            <span className="z-1 text-[14px] whitespace-nowrap">
              {t('nav.next')}
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              resetState()
              setHasSelectedLanguage(false)
              setShowLanguageSelector(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                resetState()
                setHasSelectedLanguage(false)
                setShowLanguageSelector(false)
              }
            }}
            disabled={currentStep !== 4}
            whileTap={{ scale: 0.95 }}
            whileHover={{ opacity: 0.75 }}
            className={`
              ${currentStep === 4 ? '' : 'hidden'}
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
