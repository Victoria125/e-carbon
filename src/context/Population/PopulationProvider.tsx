import type { ReactNode } from 'react'
import type { FollowUpData, PopulationByDisease, PopulationContextType, PopulationResults } from '@/types/population'
import type { ExamType } from '@/types/shared'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PopulationContext } from '@/context/Population/PopulationContext'
import { calculatePopulationResults, validatePopulationInputs } from '@/utils/populationCalculations'

type FollowUpType = 'none' | 'annual' | 'semiannual'

const initialPopulation: PopulationByDisease = {
  lowerBackPain: 0,
  diabetes: 0,
  hypertension: 0,
  overweight: 0,
  noChronicConditions: 0
}

const initialFollowUp: FollowUpData = {
  lowerBackPain: { none: 0, annual: 0, semiannual: 0 },
  diabetes: { none: 0, annual: 0, semiannual: 0 },
  hypertension: { none: 0, annual: 0, semiannual: 0 },
  overweight: { none: 0, annual: 0, semiannual: 0 },
  noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
}

interface PopulationProviderProps {
  readonly children: ReactNode
}

export function PopulationProvider({ children }: PopulationProviderProps) {
  const [population, setPopulation] = useState<PopulationByDisease>(initialPopulation)
  const [followUp, setFollowUp] = useState<FollowUpData>(initialFollowUp)
  const [examType, setExamType] = useState<ExamType>('conventional')
  const [currentStep, setCurrentStep] = useState(1)

  // Rastrear população anterior para detectar mudanças
  const prevPopulationRef = useRef<PopulationByDisease>(initialPopulation)

  // Detectar quando a população muda e resetar distribuições se necessário
  useEffect(() => {
    const diseases: Array<keyof PopulationByDisease> = ['lowerBackPain', 'diabetes', 'hypertension', 'overweight']
    const resetDiseases: Array<keyof PopulationByDisease> = []

    for (const disease of diseases) {
      const currentPop = population[disease]
      const prevPop = prevPopulationRef.current[disease]

      // Se a população mudou e há uma distribuição configurada
      if (currentPop !== prevPop && currentPop > 0) {
        const distribution = followUp[disease]
        const totalPercent = distribution.none + distribution.annual + distribution.semiannual

        // Se já havia uma distribuição configurada (totalPercent > 0)
        // e a população mudou, resetar para permitir nova configuração
        if (totalPercent > 0) {
          resetDiseases.push(disease)
        }
      }

      // Se a população foi zerada, resetar distribuição
      if (currentPop === 0 && prevPop > 0) {
        resetDiseases.push(disease)
      }
    }

    // Aplicar todos os resets de uma vez se necessário
    if (resetDiseases.length > 0) {
      // Usar setTimeout para evitar atualização durante render
      const timeoutId = setTimeout(() => {
        setFollowUp((prev) => {
          const updated = { ...prev }
          for (const disease of resetDiseases) {
            updated[disease] = { none: 0, annual: 0, semiannual: 0 }
          }
          return updated
        })
      }, 0)

      // Cleanup
      return () => clearTimeout(timeoutId)
    }

    // Atualizar referência
    prevPopulationRef.current = population
  }, [population, followUp])

  // Validar inputs (memoizado)
  const validation = useMemo(
    () => validatePopulationInputs(population, followUp),
    [population, followUp]
  )

  // Calcular resultados (memoizado)
  const results = useMemo<PopulationResults | null>(() => {
    // Só calcular se os dados forem válidos
    if (!validation.valid) {
      return null
    }
    return calculatePopulationResults(population, followUp, examType)
  }, [population, followUp, examType, validation.valid])

  // Funções de atualização
  const updatePopulation = useCallback((disease: keyof PopulationByDisease, value: number) => {
    setPopulation((prev) => ({
      ...prev,
      [disease]: Math.max(0, value)
    }))
  }, [])

  const updateFollowUp = useCallback(
    (disease: keyof FollowUpData, type: FollowUpType, value: number) => {
      setFollowUp((prev) => {
        const clampedValue = Math.max(0, Math.min(100, value))

        return {
          ...prev,
          [disease]: {
            ...prev[disease],
            [type]: clampedValue
          }
        }
      })
    },
    []
  )

  const updateExamType = useCallback((type: ExamType) => {
    setExamType(type)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4)) // Máximo 3 (steps 0-3)
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)) // Mínimo 0
  }, [])

  const resetState = useCallback(() => {
    setPopulation(initialPopulation)
    setFollowUp(initialFollowUp)
    setExamType('conventional')
    setCurrentStep(1)
  }, [])

  const value = useMemo<PopulationContextType>(
    () => ({
      // Estado
      population,
      followUp,
      examType,
      currentStep,

      // Resultados calculados
      results,
      validation,

      // Ações
      updatePopulation,
      updateFollowUp,
      updateExamType,
      setCurrentStep,
      nextStep,
      prevStep,
      resetState
    }),
    [
      population,
      followUp,
      examType,
      currentStep,
      results,
      validation,
      updatePopulation,
      updateFollowUp,
      updateExamType,
      nextStep,
      prevStep,
      resetState
    ]
  )

  return <PopulationContext value={value}>{children}</PopulationContext>
}
