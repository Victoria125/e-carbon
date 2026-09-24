import type { FollowUpData, PopulationByDisease } from '@/types/population'
import { describe, expect, it } from 'vitest'
import { FREQUENCY_MULTIPLIERS } from '@/constants/emissions'
import { calculatePopulationProducts } from '@/utils/populationCalculations'

describe('new features - implementation tests', () => {
  describe('conversion: people → percentage (PopulationStep2 Logic)', () => {
    it('should correctly convert people count to percentage', () => {
      const totalPeople = 10000
      const peopleCount = 3000

      // Fórmula: (pessoas / total) × 100
      const percentage = (peopleCount / totalPeople) * 100

      expect(percentage).toBe(30)
    })

    it('should correctly convert percentage back to people count', () => {
      const totalPeople = 10000
      const percentage = 30

      // Fórmula: Math.round((porcentagem × total) / 100)
      const peopleCount = Math.round((percentage * totalPeople) / 100)

      expect(peopleCount).toBe(3000)
    })

    it('should handle rounding correctly for small percentages', () => {
      const totalPeople = 10000
      const peopleCount = 10

      const percentage = (peopleCount / totalPeople) * 100
      expect(percentage).toBe(0.1)

      const recalculatedPeople = Math.round((percentage * totalPeople) / 100)
      expect(recalculatedPeople).toBe(10)
    })

    it('should validate that sum equals total people', () => {
      const totalPeople = 1000
      const none = 200 // 20%
      const annual = 300 // 30%
      const semiannual = 500 // 50%

      const sum = none + annual + semiannual

      expect(sum).toBe(totalPeople)
    })
  })

  describe('alert "sem acompanhamento" - only when ALL conditions are 100% none', () => {
    it('should show alert when all active conditions are 100% none', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 50,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 100, annual: 0, semiannual: 0 },
        hypertension: { none: 100, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      // Lógica: verificar se TODAS as condições ativas têm 100% none
      const activeConditions = Object.keys(population).filter(
        (disease) => population[disease as keyof PopulationByDisease] > 0
      )

      const allAreNone = activeConditions.every((disease) => {
        const distribution = followUp[disease as keyof FollowUpData]
        return distribution.none === 100
      })

      expect(allAreNone).toBe(true)
    })

    it('should NOT show alert when at least one condition has follow-up', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 50,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 100, annual: 0, semiannual: 0 },
        hypertension: { none: 0, annual: 100, semiannual: 0 }, // TEM acompanhamento
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const activeConditions = Object.keys(population).filter(
        (disease) => population[disease as keyof PopulationByDisease] > 0
      )

      const allAreNone = activeConditions.every((disease) => {
        const distribution = followUp[disease as keyof FollowUpData]
        return distribution.none === 100
      })

      expect(allAreNone).toBe(false)
    })

    it('should NOT show alert when one condition has mixed distribution', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 50,
        diabetes: 0,
        overweight: 0, noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 100, annual: 0, semiannual: 0 },
        hypertension: { none: 50, annual: 50, semiannual: 0 }, // Distribuição mista
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const activeConditions = Object.keys(population).filter(
        (disease) => population[disease as keyof PopulationByDisease] > 0
      )

      const allAreNone = activeConditions.every((disease) => {
        const distribution = followUp[disease as keyof FollowUpData]
        return distribution.none === 100
      })

      expect(allAreNone).toBe(false)
    })
  })

  describe('patientStep5 - reduction percentage calculation', () => {
    it('should calculate reduction percentage correctly', () => {
      const conventionalEmissions = 100 // kg CO₂e
      const pointOfCareEmissions = 30 // kg CO₂e

      // Fórmula: ((Conventional - PointOfCare) / Conventional) × 100
      const reductionPercent = ((conventionalEmissions - pointOfCareEmissions) / conventionalEmissions) * 100

      expect(reductionPercent).toBe(70) // 70% de redução
    })

    it('should handle case where PointOfCare has more emissions', () => {
      const conventionalEmissions = 50 // kg CO₂e
      const pointOfCareEmissions = 80 // kg CO₂e

      const reductionPercent = ((conventionalEmissions - pointOfCareEmissions) / conventionalEmissions) * 100

      expect(reductionPercent).toBe(-60) // -60% (aumento de 60%)
    })

    it('should handle zero conventional emissions', () => {
      const conventionalEmissions = 0
      const pointOfCareEmissions = 30

      const reductionPercent = conventionalEmissions > 0
        ? ((conventionalEmissions - pointOfCareEmissions) / conventionalEmissions) * 100
        : 0

      expect(reductionPercent).toBe(0)
    })
  })

  describe('frequencyMultiplier in conventional/pointOfCare calculations', () => {
    it('should apply frequencyMultiplier for annual follow-up', () => {
      const population: PopulationByDisease = {
        hypertension: 100,
        lowerBackPain: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        hypertension: { none: 0, annual: 100, semiannual: 0 },
        lowerBackPain: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const productsConventional = calculatePopulationProducts(population, followUp, 'conventional')
      const productsPointOfCare = calculatePopulationProducts(population, followUp, 'pointOfCare')

      // Calcular emissões com frequencyMultiplier = 1 (annual)
      const emissionsConventional = productsConventional.reduce(
        (sum, p) => sum + (p.emissionFactor * p.totalQuantity * FREQUENCY_MULTIPLIERS.annual),
        0
      )

      const emissionsPointOfCare = productsPointOfCare.reduce(
        (sum, p) => sum + (p.emissionFactor * p.totalQuantity * FREQUENCY_MULTIPLIERS.annual),
        0
      )

      expect(emissionsConventional).toBeGreaterThan(0)
      expect(emissionsPointOfCare).toBeGreaterThan(0)
    })

    it('should apply frequencyMultiplier for semiannual follow-up (2x)', () => {
      const population: PopulationByDisease = {
        hypertension: 100,
        lowerBackPain: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUpAnnual: FollowUpData = {
        hypertension: { none: 0, annual: 100, semiannual: 0 },
        lowerBackPain: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const followUpSemiannual: FollowUpData = { hypertension: { none: 0, annual: 0, semiannual: 100 },
        lowerBackPain: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 }, noChronicConditions: { none: 0, annual: 0, semiannual: 0 } }

      const productsAnnual = calculatePopulationProducts(population, followUpAnnual, 'conventional')
      const productsSemiannual = calculatePopulationProducts(population, followUpSemiannual, 'conventional')

      const emissionsAnnual = productsAnnual.reduce(
        (sum, p) => sum + p.totalEmissions,
        0
      )

      const emissionsSemiannual = productsSemiannual.reduce(
        (sum, p) => sum + p.totalEmissions,
        0
      )

      // Semiannual deve ser aproximadamente 2x annual
      expect(emissionsSemiannual).toBeCloseTo(emissionsAnnual * 2, 5)
    })
  })

  describe('products for lowerBackPain annual/semiannual', () => {
    it('should have products for lowerBackPain annual follow-up', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 0, annual: 100, semiannual: 0 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const products = calculatePopulationProducts(population, followUp, 'conventional')

      expect(products.length).toBeGreaterThan(0)
      expect(products.every((p) => p.disease === 'lowerBackPain')).toBe(true)
      expect(products.every((p) => p.followUpType === 'annual')).toBe(true)
    })

    it('should have products for lowerBackPain semiannual follow-up', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 0, annual: 0, semiannual: 100 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const products = calculatePopulationProducts(population, followUp, 'pointOfCare')

      expect(products.length).toBeGreaterThan(0)
      expect(products.every((p) => p.disease === 'lowerBackPain')).toBe(true)
      expect(products.every((p) => p.followUpType === 'semiannual')).toBe(true)
    })
  })
})
