import type { ReactNode } from 'react'
import type { PatientConditions, PatientData, PatientDisposalData, PatientExamData, PatientFollowUp, PatientProduct, PatientQuestionnaireData, PatientTransportation } from '@/types/patient'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import useLanguage from '@/hooks/useLanguage'
import { getConsolidatedConditionsTitle } from '@/utils/materialsTableHelpers'
import { calculateFullResults } from '@/utils/patientCalculations'

interface PatientContextType {
  data: PatientData
  currentStep: number
  isLoading: boolean
  updateTransportation: (transportation: PatientTransportation) => void
  updateConditions: (conditions: PatientConditions) => void
  updateFollowUp: (followUp: PatientFollowUp) => void
  updateExamData: (examData: PatientExamData) => void
  updateDisposalData: (disposalData: PatientDisposalData) => void
  updateQuestionnaireData: (questionnaireData: PatientQuestionnaireData) => void
  addProduct: (product: PatientProduct) => void
  removeProduct: (id: string) => void
  nextStep: () => Promise<void>
  prevStep: () => void
  resetPatientWizard: () => void
  getConditionsTitle: () => string
  setAnamnesisId: (id: string) => void
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export { PatientContext }

const initialData: PatientData = {
  language: 'br',
  transportation: {
    type: undefined,
    distanceKm: 0
  },
  conditions: {
    lowerBackPain: false,
    hypertension: false,
    diabetes: false,
    overweight: false,
    noChronicConditions: false,
    hypertensionEmergencyVisits: undefined,
    hypertensionControlled: undefined,
    hypertensionTreatment: [],
    diabetesControlled: undefined,
    diabetesEmergencyVisits: undefined,
    diabetesTreatment: [],
    overweightBariatricSurgery: undefined,
    overweightRecommendation: undefined,
    overweightMedication: undefined,
    overweightMeasures: [],
    lowerBackPainMedication: undefined,
    lowerBackPainImagingExams: {},
    lowerBackPainEmergencyVisits: undefined
  },
  followUp: {
    type: undefined
  },
  examData: {
    type: 'pointOfCare',
    products: []
  },
  disposalData: {
    products: {}
  },
  results: null
}

export function PatientProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [data, setData] = useState<PatientData>(initialData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { language, t } = useLanguage()

  const updateTransportation = useCallback((transportation: PatientTransportation) => {
    setData((prev) => ({ ...prev, transportation }))
  }, [])

  const updateConditions = useCallback((conditions: PatientConditions) => {
    setData((prev) => ({ ...prev, conditions }))
  }, [])

  const updateFollowUp = useCallback((followUp: PatientFollowUp) => {
    setData((prev) => ({ ...prev, followUp }))
  }, [])

  const updateExamData = useCallback((examData: PatientExamData) => {
    setData((prev) => ({ ...prev, examData }))
  }, [])

  const updateDisposalData = useCallback((disposalData: PatientDisposalData) => {
    setData((prev) => ({ ...prev, disposalData }))
  }, [])

  const updateQuestionnaireData = useCallback((questionnaireData: PatientQuestionnaireData) => {
    setData((prev) => ({ ...prev, questionnaireData }))
  }, [])

  const addProduct = useCallback((product: PatientProduct) => {
    setData((prev) => ({
      ...prev,
      examData: {
        ...prev.examData,
        products: [...prev.examData.products, product]
      }
    }))
  }, [])

  const removeProduct = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      examData: {
        ...prev.examData,
        products: prev.examData.products.filter((p) => p.id !== id)
      }
    }))
  }, [])

  // Recalcular resultados automaticamente quando dados relevantes mudarem
  useEffect(() => {
    if (!data.followUp.type || !data.examData.type) {
      return // Sair cedo se dados incompletos
    }

    const allProductsByFollowUp = data.examData.allProductsByFollowUp

    const results = allProductsByFollowUp
      ? calculateFullResults(
          allProductsByFollowUp,
          data.followUp.type,
          data.examData.type,
          data.conditions,
          data.transportation,
          language
        )
      : null

    // Atualizar resultados calculados
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setData((prev) => ({ ...prev, results }))
  }, [data.conditions, data.followUp.type, data.examData.type, data.examData.allProductsByFollowUp, data.transportation, language])

  const prepareUpdatePayload = useCallback((data: PatientData) => {
    const { conditions } = data

    interface ConditionPayload {
      [key: string]: string | null | undefined
    }

    interface UpdatePayload {
      chronic_dx: string[]
      hipertensao?: ConditionPayload | null
      diabetes?: ConditionPayload | null
      sobrepeso?: ConditionPayload | null
      lombalgia?: ConditionPayload | null
    }

    const payload: UpdatePayload = {
      // Atualiza chronic_dx com as condições selecionadas, mapeadas para os nomes do backend
      chronic_dx: ['hypertension', 'diabetes', 'overweight', 'lowerBackPain', 'noChronicConditions']
        .filter((key) => conditions[key as keyof typeof conditions])
        .map((key) => {
          switch (key) {
            case 'hypertension': return 'hipertensao'
            case 'diabetes': return 'diabetes'
            case 'overweight': return 'sobrepeso'
            case 'lowerBackPain': return 'lombalgia'
            case 'noChronicConditions': return 'noChronicConditions'
            default: return key
          }
        })
    }

    // Hipertensão: envia dados se marcada, null se desmarcada (para limpar no banco)
    if (conditions.hypertension) {
      payload.hipertensao = {
        tratamento: conditions.hypertensionTreatment ? conditions.hypertensionTreatment.join(', ') : undefined,
        controlado: conditions.hypertensionControlled,
        emergencias: conditions.hypertensionEmergencyVisits
      }
    } else {
      payload.hipertensao = null
    }

    // Diabetes: envia dados se marcada, null se desmarcada
    if (conditions.diabetes) {
      payload.diabetes = {
        controlado: conditions.diabetesControlled,
        emergencias: conditions.diabetesEmergencyVisits,
        tratamento: conditions.diabetesTreatment ? conditions.diabetesTreatment.join(', ') : undefined
      }
    } else {
      payload.diabetes = null
    }

    // Sobrepeso: envia dados se marcada, null se desmarcada
    if (conditions.overweight) {
      payload.sobrepeso = {
        cirurgia_bariatrica: conditions.overweightBariatricSurgery,
        recomendacao: conditions.overweightRecommendation,
        medicacao: conditions.overweightMedication,
        medidas: conditions.overweightMeasures ? conditions.overweightMeasures.join(', ') : undefined
      }
    } else {
      payload.sobrepeso = null
    }

    // Lombalgia: envia dados se marcada, null se desmarcada
    if (conditions.lowerBackPain) {
      payload.lombalgia = {
        medicacao: conditions.lowerBackPainMedication,
        exames_imagem: JSON.stringify(conditions.lowerBackPainImagingExams || {}),
        emergencias: conditions.lowerBackPainEmergencyVisits
      }
    } else {
      payload.lombalgia = null
    }

    return payload
  }, [])

  const nextStep = useCallback(async () => {
    if (currentStep < 5) {
      setIsLoading(true)

      if (currentStep === 2) {
        // Para o step 2, atualizar a anamnese antes de avançar
        try {
          const payload = prepareUpdatePayload(data)

          const response = await fetch(`/api/anamnesis/${data.anamnesisId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })

          if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`)
          }

          await response.json()
        } catch (error) {
          console.error('Erro ao atualizar anamnese:', error)
          // Mesmo com erro, continua? Ou para? Por enquanto, continua.
        }
      }

      // Simular um delay mínimo para mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 800))

      setCurrentStep((prev) => prev + 1)

      setIsLoading(false)
    }
  }, [currentStep, data, prepareUpdatePayload])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const resetPatientWizard = useCallback(() => {
    setData(initialData)
    setCurrentStep(1)
  }, [])

  const setAnamnesisId = useCallback((id: string) => {
    setData((prev) => ({ ...prev, anamnesisId: id }))
  }, [])

  /**
   * Gera título consolidado baseado nas condições selecionadas
   * Formata automaticamente com "e" entre condições
   */
  const getConditionsTitle = useCallback(() => {
    const selectedConditions = Object.entries(data.conditions)
      .filter(([_, selected]) => selected)
      .map(([condition]) => condition)

    // Criar labels traduzidos dinamicamente
    const translatedLabels: Record<string, string> = {
      lowerBackPain: t('step1.lowerBackPain'),
      hypertension: t('step1.hypertension'),
      diabetes: t('step1.diabetes'),
      overweight: t('step1.overweight'),
      noChronicConditions: t('step1.noChronicConditions')
    }

    return getConsolidatedConditionsTitle(selectedConditions, translatedLabels, t('step4.title'))
  }, [data.conditions, t])

  const contextValue = useMemo(() => ({
    data,
    currentStep,
    isLoading,
    updateTransportation,
    updateConditions,
    updateFollowUp,
    updateExamData,
    updateDisposalData,
    updateQuestionnaireData,
    addProduct,
    removeProduct,
    nextStep,
    prevStep,
    resetPatientWizard,
    getConditionsTitle,
    setAnamnesisId
  }), [
    data,
    currentStep,
    isLoading,
    updateTransportation,
    updateConditions,
    updateFollowUp,
    updateExamData,
    updateDisposalData,
    updateQuestionnaireData,
    addProduct,
    removeProduct,
    nextStep,
    prevStep,
    resetPatientWizard,
    getConditionsTitle,
    setAnamnesisId
  ])

  return (
    <PatientContext value={contextValue}>
      {children}
    </PatientContext>
  )
}
