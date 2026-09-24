import type { ExamType, FollowUpType } from '@/types/shared'

/**
 * População por doença (número de pessoas)
 */
export interface PopulationByDisease {
  lowerBackPain: number
  hypertension: number
  diabetes: number
  overweight: number
  noChronicConditions: number
}

/**
 * Distribuição percentual de acompanhamento
 */
export interface FollowUpDistribution {
  none: number // Percentual de pessoas sem acompanhamento
  annual: number // Percentual de pessoas com acompanhamento anual
  semiannual: number // Percentual de pessoas com acompanhamento semestral
}

/**
 * Dados de acompanhamento por doença
 */
export interface FollowUpData {
  lowerBackPain: FollowUpDistribution
  hypertension: FollowUpDistribution
  diabetes: FollowUpDistribution
  overweight: FollowUpDistribution
  noChronicConditions: FollowUpDistribution
}

/**
 * Produto calculado para a população
 */
export interface PopulationProduct {
  id: string
  name: string
  category: string
  weight: number
  emissionFactor: number
  disease: string
  followUpType: FollowUpType
  examType: ExamType
  totalQuantity: number
  totalEmissions: number
}

/**
 * Resultados calculados para a população
 */
export interface PopulationResults {
  products: PopulationProduct[]
  totalEmissions: number
  emissionsByDisease: Record<string, number>
  conventionalVsPointOfCare: {
    conventional: number
    pointOfCare: number
  }
}

/**
 * Validação de inputs da população
 */
export interface PopulationValidation {
  valid: boolean
  errors: string[]
}

/**
 * Estado completo da jornada coletiva
 */
export interface PopulationState {
  population: PopulationByDisease
  followUp: FollowUpData
  examType: ExamType
  currentStep: number
}

/**
 * Contexto da jornada coletiva (Population)
 */
export interface PopulationContextType {
  // Estado
  population: PopulationByDisease
  followUp: FollowUpData
  examType: ExamType
  currentStep: number

  // Resultados calculados
  results: PopulationResults | null
  validation: PopulationValidation

  // Ações
  updatePopulation: (disease: keyof PopulationByDisease, value: number) => void
  updateFollowUp: (disease: keyof FollowUpData, type: keyof FollowUpDistribution, value: number) => void
  updateExamType: (type: ExamType) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  resetState: () => void
}
