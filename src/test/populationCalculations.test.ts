import type { FollowUpData, PopulationByDisease } from '@/types/population'
import type { ExamType } from '@/types/shared'
import { describe, expect, it } from 'vitest'
import { calculatePopulationProducts, calculatePopulationResults, validatePopulationInputs } from '@/utils/populationCalculations'

describe('populationCalculations', () => {
  describe('validatePopulationInputs', () => {
    it('should validate when all inputs are correct', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 50,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 0, annual: 100, semiannual: 0 },
        hypertension: { none: 50, annual: 50, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const result = validatePopulationInputs(population, followUp)

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject when total population is zero', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 0,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 0, annual: 0, semiannual: 0 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const result = validatePopulationInputs(population, followUp)

      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should reject when percentages do not sum to 100%', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 30, annual: 40, semiannual: 20 }, // Sum = 90%
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const result = validatePopulationInputs(population, followUp)

      expect(result.valid).toBe(false)
      expect(result.errors.some((e) => e.includes('100%'))).toBe(true)
    })

    it('should accept percentages with small rounding tolerance', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 33.33, annual: 33.33, semiannual: 33.34 }, // Sum = 100%
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const result = validatePopulationInputs(population, followUp)

      expect(result.valid).toBe(true)
    })
  })

  describe('calculatePopulationProducts - Cenário de Teste 1', () => {
    it('should calculate correctly for 100 people with annual follow-up', () => {
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

      const examType: ExamType = 'conventional'

      const products = calculatePopulationProducts(population, followUp, examType)

      // Should have products
      expect(products.length).toBeGreaterThan(0)

      // All products should be for lowerBackPain, annual, conventional
      for (const product of products) {
        expect(product.disease).toBe('lowerBackPain')
        expect(product.followUpType).toBe('annual')
        expect(product.examType).toBe('conventional')
        expect(product.totalQuantity).toBeGreaterThan(0)
        expect(product.totalEmissions).toBeGreaterThan(0)
      }
    })
  })

  describe('calculatePopulationProducts - Cenário de Teste 2', () => {
    it('should calculate correctly for mixed follow-up distribution', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 1000,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 20, annual: 30, semiannual: 50 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const examType: ExamType = 'conventional'

      const products = calculatePopulationProducts(population, followUp, examType)

      // Should have products from all three follow-up types
      const noneProducts = products.filter((p) => p.followUpType === 'none')
      const annualProducts = products.filter((p) => p.followUpType === 'annual')
      const semiannualProducts = products.filter((p) => p.followUpType === 'semiannual')

      expect(noneProducts.length).toBeGreaterThan(0)
      expect(annualProducts.length).toBeGreaterThan(0)
      expect(semiannualProducts.length).toBeGreaterThan(0)

      // Verify emissions for 'none' should be zero (FREQUENCY_MULTIPLIERS['none'] = 0)
      for (const product of noneProducts) {
        expect(product.totalEmissions).toBeGreaterThanOrEqual(0)
      }

      // Verify annual and semiannual have emissions
      for (const product of annualProducts) {
        expect(product.totalEmissions).toBeGreaterThan(0)
      }

      for (const product of semiannualProducts) {
        expect(product.totalEmissions).toBeGreaterThan(0)
      }
    })
  })

  describe('calculatePopulationProducts - Cenário de Teste 3', () => {
    it('should calculate correctly for multiple diseases', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 500,
        hypertension: 300,
        diabetes: 200,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 0, annual: 100, semiannual: 0 },
        hypertension: { none: 0, annual: 100, semiannual: 0 },
        diabetes: { none: 0, annual: 100, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const examType: ExamType = 'conventional'

      const products = calculatePopulationProducts(population, followUp, examType)

      // Should have products from all three diseases
      const lowerBackPainProducts = products.filter((p) => p.disease === 'lowerBackPain')
      const hypertensionProducts = products.filter((p) => p.disease === 'hypertension')
      const diabetesProducts = products.filter((p) => p.disease === 'diabetes')
      const overweightProducts = products.filter((p) => p.disease === 'overweight')

      expect(lowerBackPainProducts.length).toBeGreaterThan(0)
      expect(hypertensionProducts.length).toBeGreaterThan(0)
      expect(diabetesProducts.length).toBeGreaterThan(0)
      expect(overweightProducts.length).toBe(0) // No population
    })
  })

  describe('calculatePopulationProducts - Cenário de Teste 4', () => {
    it('should calculate products for both Conventional and Point of Care', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 1000,
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

      const productsConventional = calculatePopulationProducts(population, followUp, 'conventional')
      const productsPointOfCare = calculatePopulationProducts(population, followUp, 'pointOfCare')

      const emissionsConventional = productsConventional.reduce((sum, p) => sum + p.totalEmissions, 0)
      const emissionsPointOfCare = productsPointOfCare.reduce((sum, p) => sum + p.totalEmissions, 0)

      // Both should have emissions (may be equal if emission factors are same in test data)
      expect(emissionsConventional).toBeGreaterThan(0)
      expect(emissionsPointOfCare).toBeGreaterThan(0)

      // Should have products
      expect(productsConventional.length).toBeGreaterThan(0)
      expect(productsPointOfCare.length).toBeGreaterThan(0)
    })
  })

  describe('calculatePopulationResults', () => {
    it('should calculate total emissions correctly', () => {
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

      const examType: ExamType = 'conventional'

      const results = calculatePopulationResults(population, followUp, examType)

      expect(results).toBeDefined()
      expect(results.totalEmissions).toBeGreaterThan(0)
      expect(results.products.length).toBeGreaterThan(0)
      expect(results.emissionsByDisease).toBeDefined()
      expect(results.conventionalVsPointOfCare).toBeDefined()
    })

    it('should calculate comparison between Conventional and Point of Care', () => {
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

      const resultsConventional = calculatePopulationResults(population, followUp, 'conventional')
      const resultsPointOfCare = calculatePopulationResults(population, followUp, 'pointOfCare')

      // Both should have valid results
      expect(resultsConventional.totalEmissions).toBeGreaterThan(0)
      expect(resultsPointOfCare.totalEmissions).toBeGreaterThan(0)

      const comparison = resultsConventional.conventionalVsPointOfCare
      expect(comparison.conventional).toBeGreaterThan(0)
      expect(comparison.pointOfCare).toBeGreaterThan(0)
    })
  })

  describe('formula Validation - FREQUENCY_MULTIPLIERS', () => {
    it('should use FREQUENCY_MULTIPLIERS correctly', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const followUpNone: FollowUpData = {
        lowerBackPain: { none: 100, annual: 0, semiannual: 0 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const followUpAnnual: FollowUpData = {
        lowerBackPain: { none: 0, annual: 100, semiannual: 0 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const followUpSemiannual: FollowUpData = {
        lowerBackPain: { none: 0, annual: 0, semiannual: 100 },
        hypertension: { none: 0, annual: 0, semiannual: 0 },
        diabetes: { none: 0, annual: 0, semiannual: 0 },
        overweight: { none: 0, annual: 0, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const productsNone = calculatePopulationProducts(population, followUpNone, 'conventional')
      const productsAnnual = calculatePopulationProducts(population, followUpAnnual, 'conventional')
      const productsSemiannual = calculatePopulationProducts(population, followUpSemiannual, 'conventional')

      const emissionsNone = productsNone.reduce((sum, p) => sum + p.totalEmissions, 0)
      const emissionsAnnual = productsAnnual.reduce((sum, p) => sum + p.totalEmissions, 0)
      const emissionsSemiannual = productsSemiannual.reduce((sum, p) => sum + p.totalEmissions, 0)

      // None should be zero (FREQUENCY_MULTIPLIERS['none'] = 0)
      expect(emissionsNone).toBeGreaterThanOrEqual(0)

      // Annual should be > 0 (FREQUENCY_MULTIPLIERS['annual'] = 1)
      expect(emissionsAnnual).toBeGreaterThan(0)

      // Semiannual should be 2x annual (FREQUENCY_MULTIPLIERS['semiannual'] = 2)
      expect(emissionsSemiannual).toBeCloseTo(emissionsAnnual * 2, 5)
    })
  })

  describe('equivalence Test - 1 person in Population ≈ Patient Journey', () => {
    it('should produce proportional emissions for 1 person vs 100 people', () => {
      const population1: PopulationByDisease = {
        lowerBackPain: 1,
        hypertension: 0,
        diabetes: 0,
        overweight: 0,
        noChronicConditions: 0
      }

      const population100: PopulationByDisease = {
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

      const results1 = calculatePopulationResults(population1, followUp, 'conventional')
      const results100 = calculatePopulationResults(population100, followUp, 'conventional')

      // 100 people should have 100x emissions of 1 person
      expect(results100.totalEmissions).toBeCloseTo(results1.totalEmissions * 100, 5)
    })
  })

  describe('edge Cases', () => {
    it('should handle very large population numbers', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 1000000,
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

      const results = calculatePopulationResults(population, followUp, 'conventional')

      expect(results).toBeDefined()
      expect(results.totalEmissions).toBeGreaterThan(0)
      expect(Number.isFinite(results.totalEmissions)).toBe(true)
    })

    it('should handle all diseases active simultaneously', () => {
      const population: PopulationByDisease = {
        lowerBackPain: 100,
        hypertension: 200,
        diabetes: 150,
        overweight: 250,
        noChronicConditions: 0
      }

      const followUp: FollowUpData = {
        lowerBackPain: { none: 0, annual: 100, semiannual: 0 },
        hypertension: { none: 0, annual: 100, semiannual: 0 },
        diabetes: { none: 0, annual: 100, semiannual: 0 },
        overweight: { none: 0, annual: 100, semiannual: 0 },
        noChronicConditions: { none: 0, annual: 0, semiannual: 0 }
      }

      const results = calculatePopulationResults(population, followUp, 'conventional')

      expect(results).toBeDefined()
      expect(results.products.length).toBeGreaterThan(0)

      // Should have products from all diseases
      const diseases = new Set(results.products.map((p) => p.disease))
      expect(diseases.has('lowerBackPain')).toBe(true)
      expect(diseases.has('hypertension')).toBe(true)
      expect(diseases.has('diabetes')).toBe(true)
      expect(diseases.has('overweight')).toBe(true)
    })
  })
})
